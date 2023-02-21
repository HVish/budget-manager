import request from '../../shared/request';
import { Tag } from '../../shared/types';

export async function getAllTags() {
  const response = await request.get<Tag[]>('/tags');
  return response.data;
}
