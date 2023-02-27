import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export interface TagInterface {
  name: string;
}

export type TagDocument = HydratedDocument<Tag>;

@Schema({ versionKey: false })
export class Tag implements TagInterface {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
