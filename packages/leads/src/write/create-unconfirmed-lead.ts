import {insertOne} from '@fintex/common-ddb';
import type {Leads} from '@fintex/types-ddb';
import {
  getUnconfirmedLeadFacetKeys,
  getUserFacetType,
  tableName,
} from '../table-helpers';

export async function createUnconfirmedLead(lead: Leads.Lead): Promise<void> {
  const {country, id, userId} = lead;

  const item: Leads.DDBLeadFacet = {
    ...lead,
    ...getUnconfirmedLeadFacetKeys(userId, id, country),
    facetType: getUserFacetType(),
  };

  await insertOne({TableName: tableName, Item: item});
}
