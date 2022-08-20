import { StatusCodes } from 'http-status-codes';

import { createAPIErrorClass } from '../utils/error';

export const NotFoundError = createAPIErrorClass({
  name: 'NotFoundError',
  defaultCode: StatusCodes.NOT_FOUND,
  defaultmessage: 'Requested resource does not exist.',
});
