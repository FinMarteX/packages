import {findOne, fromDDBItem} from '@fintex/common-ddb';
import type {Leads} from '@fintex/types-ddb';
import {getLeadFacetKeys, tableName} from '../table-helpers';

export async function getLeadById(
    userId: string,
    leadId: string,
    country: string,
): Promise<Leads.Lead | undefined> {
  const params = {
    TableName: tableName,
    Key: getLeadFacetKeys(userId, leadId, country),
  };

  const lead = await findOne<Leads.DDBLeadFacet>(params);

  if (!lead) {
    return;
  }

  return fromDDBItem<Leads.DDBLeadFacet>(lead);
}
