import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Subscription } from '@users/models/schemas/subscription.schema';
import mongoose from 'mongoose';
import { type } from 'os';

@Schema({
  collection: 'users',
  versionKey: false,
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  identifier: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    type: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' } ],
  })
  subscriptions?: Subscription[];
}

export const UserSchema = SchemaFactory.createForClass(User);
