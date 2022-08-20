import { model, Schema } from 'mongoose';
import { Models } from '../common/constants';

export interface Category {
  name: string;
  balance: number;
  maxLimit: number;
}

const CategorySchema = new Schema<Category>(
  {
    name: {
      type: String,
      required: true,
    },
    maxLimit: {
      type: Number,
      require: true,
    },
    balance: {
      type: Number,
      default: function defaultValue(this: Category) {
        return this.maxLimit;
      },
    },
  },
  { timestamps: true }
);

const CategoryModel = model(Models.CATEGORY, CategorySchema);

export default CategoryModel;
