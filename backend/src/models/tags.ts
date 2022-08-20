import { model, Schema } from 'mongoose';
import { Models } from '../common/constants';

export interface Tag {
  name: string;
}

const TagSchema = new Schema<Tag>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TagModel = model(Models.TAGS, TagSchema);

export default TagModel;
