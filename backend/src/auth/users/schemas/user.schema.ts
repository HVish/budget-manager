import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export interface UserInterface {
  name: string;
  email: string;
  password: string;
}

export type UserWithoutPassword = Omit<UserInterface, 'password'>;

export type UserDocument = HydratedDocument<User>;

@Schema({
  versionKey: false,
  toObject: {
    transform: function (doc, ret) {
      delete ret.password;
    },
  },
  toJSON: {
    transform: function (doc, ret) {
      delete ret.password;
    },
  },
})
export class User implements UserInterface {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
