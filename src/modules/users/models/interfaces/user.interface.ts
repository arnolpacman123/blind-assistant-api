import { SubscriptionI } from "./subscription.interface";

export interface UserI {
	id?: string;
  identifier?: string;
  password?: string;
	subscriptions?: SubscriptionI[];
}
