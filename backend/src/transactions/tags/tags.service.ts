import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag, TagDocument } from './schemas/tag.schema';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag.name)
    private tagModel: Model<TagDocument>,
  ) {}

  async getAll(userId: Types.ObjectId) {
    const tags = await this.tagModel.find({ userId });
    return tags;
  }

  async create(createTagDto: CreateTagDto, userId: Types.ObjectId) {
    const tag = new this.tagModel({
      ...createTagDto,
      userId,
      _id: new Types.ObjectId(),
    });
    await tag.save();
    return tag;
  }
}
