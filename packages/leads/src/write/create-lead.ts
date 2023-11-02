import {insertOne} from '@fintex/common-ddb';
import type {Leads} from '@fintex/types-ddb';
import {
  getLeadFacetKeys,
  getUserFacetType,
  tableName,
} from '../table-helpers';

export async function createLead(lead: Leads.Lead): Promise<void> {
  const {email, country} = lead;

  const item: Leads.DDBLeadFacet = {
    ...getLeadFacetKeys( email, country),
    ...lead,
    facetType: getUserFacetType(),
  };

  await insertOne({TableName: tableName, Item: item});
}
