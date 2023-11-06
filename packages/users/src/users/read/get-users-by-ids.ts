import {batchGet, fromDDBItem} from '@fintex/common-ddb';
import type {Users} from '@fintex/types-ddb';
import {getUserFacetKeys, tableName} from '../../table-helpers';

type Params = {
  userIds: string[];
}

export async function getUsersByIds(
    {userIds}
: Params): Promise<Users.User[]> {
  const keys = userIds.map((userId) => {
    return getUserFacetKeys(userId);
  });

  const ddbUsers = await batchGet<Users.DDBUserFacet>({
    tableName,
    keys,
  });

  return ddbUsers.map((item) => fromDDBItem<Users.DDBUserFacet>(item));
}
