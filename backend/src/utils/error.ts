import { StatusCodes } from 'http-status-codes';

export const KNOWN_ERROR = Symbol('KNOWN_ERROR');

interface ErrorConfig {
  name: string;
  defaultCode: StatusCodes;
  defaultmessage: string;
}

export interface ErrorParams<T> {
  code?: StatusCodes;
  message?: string;
  extras?: T;
}

type Extras = Record<string, string | number | undefined>;

export interface ServerError {
  readonly [KNOWN_ERROR]: boolean;
  code: StatusCodes;
  message: string;
  extras?: Extras;
}

export function isKnownError(err: unknown): err is ServerError {
  return (err as ServerError)[KNOWN_ERROR];
}

export function createAPIErrorClass({
  name,
  defaultCode,
  defaultmessage,
}: ErrorConfig) {
  return class APIError<T extends Extras = never>
    extends Error
    implements ServerError
  {
    public readonly [KNOWN_ERROR] = true;

    public code: StatusCodes;
    public extras?: T;

    constructor(params?: ErrorParams<T>) {
      super(params?.message || defaultmessage);

      this.name = name;

      const { code, message, extras } = {
        code: defaultCode,
        message: defaultmessage,
        extras: undefined,
        ...params,
      };

      this.message = message;
      this.code = code;
      this.extras = extras;
    }
  };
}
