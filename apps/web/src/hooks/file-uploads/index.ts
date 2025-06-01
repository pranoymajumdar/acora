import {
  useCallback,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentProps,
  type DragEvent,
} from "react";
import type { FileUploadsConfigs, File } from "./types";
import { useFileValidation } from "./use-file-validation";

export const useFileUploads = (config: FileUploadsConfigs) => {
  // File state management
  const [files, setFiles] = useState<File[]>([]);

  // Reference to hidden file input element
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File validation hook
  const { validateAll } = useFileValidation({
    allowedTypes: config.allowedTypes,
    maxFiles: config.maxFiles,
    maxSize: config.maxSize,
    files,
  });

  /**
   * Handles file selection from input element
   * Validates files and adds them to state on success
   */
  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;

      const result = validateAll(e.target.files);
      if (result.success) {
        return setFiles((prev) => [...prev, ...result.validFiles]);
      }
      if (config.onError) {
        config.onError(result.error);
      }

      // Reset input value to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [validateAll, config.onError],
  );

  /**
   * Handles drag and drop file events
   * Transfers dropped files to the hidden input element
   */
  const handleFileDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (fileInputRef.current && e.dataTransfer.files.length > 0) {
      // Trigger file validation by setting files on input
      fileInputRef.current.files = e.dataTransfer.files;

      // Manually trigger change event
      const changeEvent = new Event("change", { bubbles: true });
      fileInputRef.current.dispatchEvent(changeEvent);
    }
  }, []);

  /**
   * Opens the native file selection dialog
   */
  const openFileDialog = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  /**
   * Removes a file from state and cleans up its object URL
   */
  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((file) => file.id === id);

      if (fileToRemove) {
        // Clean up object URLs on failure
        URL.revokeObjectURL(fileToRemove.preview);
      }

      return prev.filter((file) => file.id !== id);
    });
  }, []);

  return {
    files,
    handleFileDrop,
    openFileDialog,
    removeFile,
    get getFileInputProps(): ComponentProps<"input"> {
      return {
        multiple: config.multiple,
        type: "file",
        onChange: handleFileChange,
        className: "hidden",
        ref: fileInputRef,
        accept: config.allowedTypes.join(","),
      };
    },
  };
};
