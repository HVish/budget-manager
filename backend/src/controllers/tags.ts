import { WithId } from 'mongodb';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import TagModel, { Tag } from '../models/tags';
import { NotFoundError } from '../common/errors';

const getAll: RequestHandler<never, WithId<Tag>[]> = async (
  _req,
  res,
  next
) => {
  try {
    const tags = await TagModel.find({});
    return res.status(StatusCodes.OK).json(tags);
  } catch (error) {
    next(error);
  }
};

const create: RequestHandler<never, WithId<Tag>, Tag> = async (
  req,
  res,
  next
) => {
  try {
    const tag = new TagModel(req.body);
    await tag.save();
    return res.status(StatusCodes.CREATED).json(tag);
  } catch (error) {
    next(error);
  }
};

const update: RequestHandler<
  { tagId: string },
  WithId<Tag>,
  Partial<Tag>
> = async (req, res, next) => {
  try {
    const tag = await TagModel.findById(req.params.tagId);
    if (!tag) throw new NotFoundError({ message: 'Tag not found' });

    tag.set(req.body);
    await tag.save();

    return res.status(StatusCodes.OK).json(tag);
  } catch (error) {
    next(error);
  }
};

const remove: RequestHandler<{ tagId: string }, WithId<Tag>> = async (
  req,
  res,
  next
) => {
  try {
    const result = await TagModel.remove({ _id: req.params.tagId });
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const TagController = {
  getAll,
  create,
  update,
  remove,
};

export default TagController;
