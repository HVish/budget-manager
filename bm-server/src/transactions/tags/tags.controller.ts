import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/auth/users/schemas/user.schema';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@CurrentUser() user: User) {
    return this.tagsService.getAll(user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTagDto: CreateTagDto, @CurrentUser() user: User) {
    return this.tagsService.create(createTagDto, user._id);
  }
}
