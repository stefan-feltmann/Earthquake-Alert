#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { EarthquakeAlertStack } from '../lib/earthquake-alert-stack';

interface EnvProps {
  env: any
  stage: string
}

class QuakeAlertService extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: EnvProps) {
    super(scope, id)

    const app = new cdk.App();
    new EarthquakeAlertStack(app, 'EarthquakeAlertStack', { 
      rootDomainName: process.env.ROOT_DOMAIN,
      env: { 
        account: process.env.CDK_DEFAULT_ACCOUNT, 
        region: process.env.CDK_DEFAULT_REGION
    }});
  }
}

const app = new cdk.App()
new QuakeAlertService(app, 'prod', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
    rootDomainName: process.env.ROOT_DOMAIN,
  },
  stage: 'prod',
})
