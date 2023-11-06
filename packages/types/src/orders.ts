export type CostPerLead = 'CPL';
export type CostPerAction = 'CPA';

export type OrderType = CostPerAction | CostPerLead

export type Order = {
  sellerId: string;
  bayerId: string;
  leadsCount: number;
  orderType: OrderType
  leadsUploaded: number;
};

export type OrderFacet = 'Order';

export type DDBOrderFacet = Order & {
  hash_key: string;
  range_key: string;
  facetType: OrderFacet;
}
