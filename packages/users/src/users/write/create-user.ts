
import {insertOne} from '@fintex/common-ddb';
import type {Users} from '@fintex/types-ddb';
import {
  getUserFacetKeys,
  getUserFacetType,
  getUserGSIFacetKeys,
  tableName,
} from '../../table-helpers';

export async function createUser(user: Users.User): Promise<void> {
  const {id, email} = user;

  const item: Users.DDBUserFacet = {
    ...getUserFacetKeys(id, email),
    ...getUserGSIFacetKeys(email),
    ...user,
    facetType: getUserFacetType(),
  };

  await insertOne({TableName: tableName, Item: item});
}
