import { useReducer, useRef } from "react";
import type { FileAction, FileState, FileUploadsConfigs } from "./types";
import { useFileValidation } from "./use-file-validation";

const fileUploadReducer = (state: FileState, action: FileAction): FileState => {
  switch (action.type) {
    case "ADD_FILES":
      return {
        files: action.payload,
        errors: state.errors,
      };
    case "REMOVE_FILE":
      return {
        files: state.files,
        errors: state.errors,
      };
    case "SET_ERROR":
      return {
        files: state.files,
        errors: state.errors,
      };
    case "CLEAR_ERRORS":
      return {
        files: state.files,
        errors: state.errors,
      };
  }
};

export const useFileUploads = ({ config }: { config: FileUploadsConfigs }) => {
  // STATE
  const [state, dispatch] = useReducer(fileUploadReducer, {
    files: [],
    errors: [],
  });

  // INPUT REF
  const fileInputRef = useRef<HTMLInputElement>(null);

  // CUSTOM HOOKS
  const { validateAll } = useFileValidation({
    allowedTypes: config.allowedTypes,
    maxFiles: config.maxFiles,
    maxSize: config.maxSize,
  });
  return;
};
