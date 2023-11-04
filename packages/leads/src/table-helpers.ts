import type {DDB, Leads} from '@fintex/types-ddb';

export const tableName = 'leads';

export const LEAD_PREFIX = 'lead';
export const USER_PREFIX = 'user';
export const LEAD_FACET_TYPE = 'Lead';

export function getLeadFacetKeys(userId: string, leadId: string, country: string): DDB.FacetKeys {
  return {
    hash_key: getLeadHashKey(userId, leadId),
    range_key: getLeadRangeKey(country),
  };
}

export function getLeadHashKey(userId: string, leadId: string): string {
  return `${USER_PREFIX}#${userId}#${LEAD_PREFIX}#${leadId}`;
}

export function getLeadRangeKey(country: string): string {
  return `${LEAD_PREFIX}#${country}`;
}

export function getUserFacetType(): Leads.LeadFacet {
  return LEAD_FACET_TYPE;
}
