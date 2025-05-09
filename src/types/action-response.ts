type SuccessResponseType = {
  success: true;
};

type ErrorResponseType = {
  success: false;
  error: string;
};

export type ActionResponseType = SuccessResponseType | ErrorResponseType;
