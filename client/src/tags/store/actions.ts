import { createAsyncThunk } from '@reduxjs/toolkit';

import * as API from './api';

export const fetchAllTags = createAsyncThunk('tags/fetch', API.getAllTags);

export const addTag = createAsyncThunk('tags/add', API.addTag);
