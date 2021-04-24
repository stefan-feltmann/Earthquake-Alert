import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda-nodejs'

export class EarthquakeAlertStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new lambda.NodejsFunction(this, 'MyFunction', {
      entry: 'handlers/EarthquakeParser/index.ts', // accepts .js, .jsx, .ts and .tsx files
      handler: 'handler'
    })
    // The code that defines your stack goes here
  }
}
