export enum SubscriptionName {
  FREE = 'free',
  PRO = 'pro',
  PREMIUM = 'premium',
}

export enum SubscriptionPrice {
  FREE = 0,
  PRO = 10,
  PREMIUM = 20,
}

export interface SubscriptionI {
  id?: string;
  name: SubscriptionName;
  price: SubscriptionPrice;
  startDate?: Date;
  endDate?: Date;
}
