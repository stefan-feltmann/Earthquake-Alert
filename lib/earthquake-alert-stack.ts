import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda-nodejs'
import events = require('@aws-cdk/aws-events');
import targets = require('@aws-cdk/aws-events-targets')
import secretsmanager = require('@aws-cdk/aws-secretsmanager')
import rds = require('@aws-cdk/aws-rds')
import ec2 = require('@aws-cdk/aws-ec2')
import ecsPatterns = require('@aws-cdk/aws-ecs-patterns')
import ecs = require('@aws-cdk/aws-ecs')
import certmgr = require('@aws-cdk/aws-certificatemanager')
import route53 = require('@aws-cdk/aws-route53')
import route53Targets = require('@aws-cdk/aws-route53-targets')

let account = process.env.CDK_DEPLOY_ACCOUNT
let region = process.env.CDK_DEPLOY_REGION 

type HasuraStackProps = {
  rootDomainName: any
} & cdk.StackProps

export class EarthquakeAlertStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: HasuraStackProps) {
    super(scope, id, props);

    const lambdaFn = new lambda.NodejsFunction(this, 'EarthquakeParser', {
      entry: 'handlers/EarthquakeParser/index.ts', // accepts .js, .jsx, .ts and .tsx files
      handler: 'handler'
    })

    const rule = new events.Rule(this, 'EarthquakeParserRule', {
      schedule: events.Schedule.expression('rate(1 minute)')
    });

    rule.addTarget(new targets.LambdaFunction(lambdaFn))

    let hasuraConfig = {
      url: 'url',
      user: 'user'
    }

    const vpc = new ec2.Vpc(this, 'QuakeAlertVPC', {
      cidr: "10.0.0.0/16"
    })

    const templatedSecret = new secretsmanager.Secret(this, 'hasuraConfigSecret', {
      generateSecretString:{
        secretStringTemplate: JSON.stringify(hasuraConfig),
        generateStringKey: 'password',
      },
    })

    // Create an ECS cluster
    let cluster = new ecs.Cluster(this, 'iv-cdk-cluster', {
      vpc: vpc,
    })

    const rootDomainName: string = props?.rootDomainName ? props.rootDomainName : 'mothman.io'
    const zone = route53.HostedZone.fromLookup(this, 'IoT-Zone', { domainName: rootDomainName })

    // let hasuraConfigFoo = {
    //   url: rootDomainName,
    //   user: 'user'
    // }

    // const templatedSecretFoo = new secretsmanager.Secret(this, 'hasuraConfigSecretFoo', {
    //   generateSecretString:{
    //     secretStringTemplate: JSON.stringify(hasuraConfigFoo),
    //     generateStringKey: 'password',
    //   },
    // })

    const graphqlSubDomainName = `graphql.${rootDomainName}`
    const graphqlCert = new certmgr.DnsValidatedCertificate(this, `${graphqlSubDomainName}-cert`, {
      domainName: graphqlSubDomainName,
      hostedZone: zone,
    })

    const dbInstance = new rds.DatabaseInstance(this, 'QuakeInstance', {
      engine: rds.DatabaseInstanceEngine.postgres({version: rds.PostgresEngineVersion.VER_13}),
      // optional, defaults to m5.large
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      credentials: rds.Credentials.fromGeneratedSecret('hasuraConfigSecret'), // Optional - will default to 'admin' username and generated password
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE
      },
      deletionProtection: false,
      deleteAutomatedBackups: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })

    const dbUser = 'aws_master'
    const dbPass = templatedSecret.secretValue.toString()
    const dbHost = 'ivgis.chvqnzrgsf7c.us-west-2.rds.amazonaws.com'
    // const dbName = stage === 'prod' ? 'ivgis' : 'ivgis_dev'
    // const dbUrl = `postgres://${dbUser}:${dbPass}@${dbHost}:5432/${dbName}`

    const hasuraApplicationService = new ecsPatterns.ApplicationLoadBalancedFargateService(
      this,
      'HasuraApplicationService',
      {
        cluster,
        cpu: 512,
        memoryLimitMiB: 1024,
        desiredCount: 1,
        publicLoadBalancer: true,
        certificate: graphqlCert,
        domainZone: zone,
        domainName: graphqlSubDomainName,
        taskImageOptions: {
          image: ecs.ContainerImage.fromRegistry('hasura/graphql-engine:v1.3.2'),
          containerPort: 8080,
          environment: {
            HASURA_GRAPHQL_DATABASE_URL: dbInstance.dbInstanceEndpointAddress,
            HASURA_GRAPHQL_ENABLE_CONSOLE: 'false',
            HASURA_GRAPHQL_SERVER_PORT: '8080',
            HASURA_GRAPHQL_ADMIN_SECRET: templatedSecret.secretValue.toString(),
            HASURA_GRAPHQL_JWT_SECRET:
              '{"type":"RS512", "jwk_url": "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"}',
            HASURA_GRAPHQL_UNAUTHORIZED_ROLE: 'anonymous',
          },
        },
      }
    )

    

    
    // const instance = new  rds.DatabaseInstance(this, 'QuakeAlertPostgres', {
    //   engine: rds.DatabaseInstanceEngine.postgres({version: rds.PostgresEngineVersion.VER_13}),
    //   instanceProps: {
    //   instanceClass: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
    //   },
    //   masterUsername: dbUser,
    //   masterUserPassword: new cdk.SecretValue(dbPassword),
    //   databaseName: 'Temperature_Postgres',
    //   securityGroups: [iot_db_security_group],
    //   vpcPlacement: {
    //     subnetType: ec2.SubnetType.PUBLIC
    //   },
    //   vpc,
    //   deletionProtection: false,
    //   deleteAutomatedBackups: true,
    //   removalPolicy: cdk.RemovalPolicy.DESTROY
    // })

    

    // const asset = new DockerImageAsset(this, 'MyBuildImage', {
    //   directory: './docker'
    // })
  }
}
