import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as EarthquakeAlert from '../lib/earthquake-alert-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new EarthquakeAlert.EarthquakeAlertStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
