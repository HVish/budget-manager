import { WithId } from 'mongodb';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import CategoryModel, { Category } from '../models/categories';
import { NotFoundError } from '../common/errors';

const getAll: RequestHandler<never, WithId<Category>[]> = async (
  req,
  res,
  next
) => {
  try {
    const categories = await CategoryModel.find({});
    return res.status(StatusCodes.OK).json(categories);
  } catch (error) {
    next(error);
  }
};

const create: RequestHandler<never, WithId<Category>, Category> = async (
  req,
  res,
  next
) => {
  try {
    const category = new CategoryModel(req.body);
    await category.save();
    return res.status(StatusCodes.CREATED).json(category);
  } catch (error) {
    next(error);
  }
};

const update: RequestHandler<
  { categoryId: string },
  WithId<Category>,
  Partial<Category>
> = async (req, res, next) => {
  try {
    const category = await CategoryModel.findById(req.params.categoryId);
    if (!category) throw new NotFoundError({ message: 'Category not found' });

    category.set(req.body);
    await category.save();

    return res.status(StatusCodes.OK).json(category);
  } catch (error) {
    next(error);
  }
};

const remove: RequestHandler<{ categoryId: string }, WithId<Category>> = async (
  req,
  res,
  next
) => {
  try {
    const result = await CategoryModel.remove({ _id: req.params.categoryId });
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const CategoryController = {
  getAll,
  create,
  update,
  remove,
};

export default CategoryController;
