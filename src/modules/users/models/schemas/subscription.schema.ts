import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  SubscriptionName,
  SubscriptionPrice,
} from '@users/models/interfaces/subscription.interface';

@Schema({
  collection: 'subscriptions',
  versionKey: false,
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class Subscription {
  @Prop({
    required: true,
  })
  name: SubscriptionName;

  @Prop({
    required: true,
  })
  price?: SubscriptionPrice;

  @Prop({
  })
  startDate?: Date;

  @Prop({
  })
  endDate?: Date;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
