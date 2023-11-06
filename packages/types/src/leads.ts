export type LeadFacet = 'Lead';

export type DDBLeadFacet = Lead & {
  hash_key: string;
  range_key: string;
  facetType: LeadFacet;
}

export type Lead = {
  id: string;
  affiliateId: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  phonePrefix: string;
  phone: string;
  ip: string;
  createdAt: string;
  updatedAt?: string;
  source?: string;
  funnel?: string;
  adId?: string;
  adName?: string;
  adSetId?: string;
  adSetName?:string;
  campainId?: string;
  campainName?: string;
}
