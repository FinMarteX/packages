import {findOne, fromDDBItem} from '@fintex/common-ddb';
import type {Leads} from '@fintex/types-ddb';
import {getUnconfirmedLeadFacetKeys, tableName} from '../table-helpers';

export async function getUnconfirmedLeadById(
    userId: string,
    leadId: string,
    country: string,
): Promise<Leads.Lead | undefined> {
  const params = {
    TableName: tableName,
    Key: getUnconfirmedLeadFacetKeys(userId, leadId, country),
  };

  const lead = await findOne<Leads.DDBLeadFacet>(params);

  if (!lead) {
    return;
  }

  return fromDDBItem<Leads.DDBLeadFacet>(lead);
}
