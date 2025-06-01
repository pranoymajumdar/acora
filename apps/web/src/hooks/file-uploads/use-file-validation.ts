import { useCallback } from "react";
import type {
  File,
  FileValidationOptions,
  FileValidationResult,
} from "./types";

export const useFileValidation = ({
  maxSize,
  maxFiles,
  allowedTypes,
  files: stateFiles,
}: FileValidationOptions) => {
  const validateAll = useCallback(
    (fileList: FileList): FileValidationResult => {
      // Convert FileList to our File type with preview URLs
      const files: File[] = Array.from(fileList).map((file) => ({
        id: crypto.randomUUID().toString().normalize(),
        name: file.name,
        preview: URL.createObjectURL(file),
        size: file.size,
        type: file.type,
      }));

      // Validation 1: Check file count limit
      if (files.length > maxFiles) {
        // Clean up object URLs on failure
        for (const file of files) {
          URL.revokeObjectURL(file.preview);
        }
        return {
          success: false,
          error: `Too many files. Maximum: ${maxFiles}`,
        };
      }

      // Validation 2-4: Check each file individually
      for (const file of files) {
        // Check for duplicates based on name, size, and type
        const isDuplicate = stateFiles.some(
          (stateFile) =>
            stateFile.name === file.name &&
            stateFile.size === file.size &&
            stateFile.type === file.type,
        );

        if (isDuplicate) {
          // Clean up object URLs on failure
          for (const file of files) {
            URL.revokeObjectURL(file.preview);
          }
          return {
            success: false,
            error: `${file.name} is already exists.`,
          };
        }

        // Check file size limit
        if (file.size > maxSize) {
          // Clean up object URLs on failure
          for (const file of files) {
            URL.revokeObjectURL(file.preview);
          }
          return {
            success: false,
            error: `${file.name} is too large`,
          };
        }

        // Check file type (skip if wildcard "*" is allowed)
        if (!allowedTypes.includes("*")) {
          const isValidType = allowedTypes.some((type) => {
            // Handle MIME types (e.g., "image/*", "image/jpeg")
            if (type.includes("/")) {
              return (
                file.type === type ||
                file.type.startsWith(type.replace("*", ""))
              );
            }

            // Handle file extensions (e.g., ".pdf", ".jpg")
            return file.name.toLowerCase().endsWith(type.toLowerCase());
          });

          if (!isValidType) {
            // Clean up object URLs on failure
            for (const file of files) {
              URL.revokeObjectURL(file.preview);
            }
            return {
              success: false,
              error: `${file.name} has invalid type`,
            };
          }
        }
      }

      // All validations passed
      return {
        success: true,
        validFiles: files,
      };
    },
    [maxFiles, maxSize, allowedTypes, stateFiles],
  );

  return { validateAll };
};
