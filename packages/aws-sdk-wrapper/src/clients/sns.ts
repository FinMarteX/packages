import type {
  PublishCommandInput as PublishInput,
  PublishCommandOutput as PublishResponse,
} from '@aws-sdk/client-sns';
import {PublishCommand, SNS} from '@aws-sdk/client-sns';

const sns = new SNS({
  region: process.env.AWS_REGION,
});

export function publish(params: PublishInput): Promise<PublishResponse> {
  return sns.send(new PublishCommand(params));
}
