type SuccessResult<T> = {
  success: true;
  data: T;
};

type ErrorResult = {
  success: false;
  error: string;
};

export type ActionResult<T> = Promise<SuccessResult<T> | ErrorResult>;

export const ok = <T>(data: T): SuccessResult<T> => ({
  success: true,
  data,
});

export const err = (error: string): ErrorResult => ({
  success: false,
  error,
});
