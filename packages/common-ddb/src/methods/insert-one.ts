import type {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';
import {put} from '../ddb';

type InsertOneParams = {
  Item: any;
  uniqValidationKey?: any;
  TableName: string;
};

export async function insertOne({
  Item,
  uniqValidationKey,
  TableName,
}: InsertOneParams): Promise<void> {
  const insertParams: DocumentClient.PutItemInput = {
    TableName,
    Item,
    ReturnValues: 'NONE',
  };

  if (uniqValidationKey) {
    insertParams.ConditionExpression = `attribute_not_exists(${String(uniqValidationKey)})`;
  }

  await put(insertParams);
}
