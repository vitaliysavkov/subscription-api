export enum SubscriptionType {
  BASIC = 'basic',
  PREMIUM = 'premium',
}

export interface SubscriptionModelFields {
  id: string;
  type: SubscriptionType;
  price: number;
  createdAt: string;
  updatedAt: string;
}
