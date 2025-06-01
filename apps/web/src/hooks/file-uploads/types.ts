export type File = {
  id: string;
  name: string;
  type: string;
  size: number;
  preview: string;
};

export type FileAction =
  | {
      type: "ADD_FILES";
      payload: File[];
    }
  | { type: "REMOVE_FILE"; id: File["id"] }
  | { type: "SET_ERROR"; error: string }
  | { type: "CLEAR_ERRORS" };

export type FileUploadsConfigs = {
  multiple: boolean;
  maxFiles: number;
  maxSize: number;
  onError?: (error: string) => void;
  allowedTypes: string[];
};

export type FileValidationOptions = { files: File[] } & Omit<
  FileUploadsConfigs,
  "onError" | "multiple"
>;

export type FileValidationResult =
  | {
      success: true;
      validFiles: File[];
    }
  | { success: false; error: string };
