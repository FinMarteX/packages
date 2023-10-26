import {findOne, fromDDBItem} from '@fintex/common-ddb';
import type {Users} from '@fintex/types-ddb';
import {getUserFacetKeys, tableName} from '../../table-helpers';

export async function getUserById(userId: string, email: string): Promise<Users.User | undefined> {
  const params = {
    TableName: tableName,
    Key: getUserFacetKeys(userId, email),
  };

  const user = await findOne<Users.DDBUserFacet>(params);

  if (!user) {
    return;
  }

  return fromDDBItem<Users.DDBUserFacet>(user);
}
