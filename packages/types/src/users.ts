export type UserFacet = 'User';

export type UserType = 'seller' | 'bayer' | 'root';

export type User = {
  id: string;
  userName: string;
  password: string;
  email: string;
  createdAt: string;
  affiliateId: string;
  type: UserType;
}

export type DDBUserFacet = User & {
  hash_key: string;
  range_key: string;
  GSI1HK: string;
  GSI1RK: string;
  facetType: UserFacet;
}
