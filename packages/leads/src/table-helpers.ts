import type {DDB, Leads} from '@fintex/types-ddb';

export const tableName = 'leads';

export const LEAD_PREFIX = 'lead';
export const LEAD_FACET_TYPE = 'Lead';

export function getLeadFacetKeys(leadId: string, country: string): DDB.FacetKeys {
  return {
    hash_key: getLeadHashKey(leadId),
    range_key: getLeadRangeKey(country),
  };
}

export function getLeadHashKey(email: string): string {
  return `${LEAD_PREFIX}#${email}`;
}

export function getLeadRangeKey(country: string): string {
  return `${LEAD_PREFIX}#${country}`;
}

export function getUserFacetType(): Leads.LeadFacet {
  return LEAD_FACET_TYPE;
}
