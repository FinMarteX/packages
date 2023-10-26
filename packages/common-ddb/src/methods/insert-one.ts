import type {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';
import {put} from '../ddb';
import {PutItemInputAttributeMap} from 'aws-sdk/clients/dynamodb';

type InsertOneParams<T> = {
  Item: T;
  uniqValidationKey?: keyof T;
  TableName: string;
};

export async function insertOne<T extends PutItemInputAttributeMap>({
  Item,
  uniqValidationKey,
  TableName,
}: InsertOneParams<T>): Promise<void> {
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
