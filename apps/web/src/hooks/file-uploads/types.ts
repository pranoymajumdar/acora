export type FileObject = {
  id: string;
  preview: string;
  source: File;
};

export type FileUploadsConfigs = {
  multiple: boolean;
  maxFiles: number;
  maxSize: number;
  onError?: (error: string) => void;
  allowedTypes: string[];
};

export type FileValidationOptions = { files: FileObject[] } & Omit<
  FileUploadsConfigs,
  "onError" | "multiple"
>;

export type FileValidationResult =
  | {
      success: true;
      validFiles: FileObject[];
    }
  | { success: false; error: string };
