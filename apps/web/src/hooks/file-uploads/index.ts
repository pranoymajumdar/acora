import { useReducer, useRef } from "react";
import type { FileAction, FileState, FileUploadsConfigs } from "./types";
import { useFileValidation } from "./use-file-validation";

const fileUploadReducer = (state: FileState, action: FileAction): FileState => {
  const actions: Record<FileAction["type"], () => FileState> = {
    ADD_FILES: () => state,
    REMOVE_FILE: () => state,
    CLEAR_ERRORS: () => state,
    SET_ERROR: () => state,
  };

  return actions[action.type]();
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
