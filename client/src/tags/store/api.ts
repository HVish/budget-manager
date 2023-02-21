import request from '../../shared/request';
import { Tag } from '../../shared/types';

export async function getAllTags() {
  const response = await request.get<Tag[]>('/tags');
  return response.data;
}

interface AddTagRequest {
  name: string;
}

export async function addTag(payload: AddTagRequest) {
  const response = await request.post<Tag>('/tags', payload);
  return response.data;
}
