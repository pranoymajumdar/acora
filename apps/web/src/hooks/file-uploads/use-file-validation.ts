import { useCallback } from "react";
import type {
  FileObject,
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
      const files: FileObject[] = Array.from(fileList).map((file) => ({
        id: crypto.randomUUID().toString().normalize(),
        preview: URL.createObjectURL(file),
        source: file,
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
            stateFile.source.name === file.source.name &&
            stateFile.source.size === file.source.size &&
            stateFile.source.type === file.source.type,
        );

        if (isDuplicate) {
          // Clean up object URLs on failure
          for (const file of files) {
            URL.revokeObjectURL(file.preview);
          }
          return {
            success: false,
            error: `${file.source.name} is already exists.`,
          };
        }

        // Check file size limit
        if (file.source.size > maxSize) {
          // Clean up object URLs on failure
          for (const file of files) {
            URL.revokeObjectURL(file.preview);
          }
          return {
            success: false,
            error: `${file.source.name} is too large`,
          };
        }

        // Check file type (skip if wildcard "*" is allowed)
        if (!allowedTypes.includes("*")) {
          const isValidType = allowedTypes.some((type) => {
            // Handle MIME types (e.g., "image/*", "image/jpeg")
            if (type.includes("/")) {
              return (
                file.source.type === type ||
                file.source.type.startsWith(type.replace("*", ""))
              );
            }

            // Handle file extensions (e.g., ".pdf", ".jpg")
            return file.source.name.toLowerCase().endsWith(type.toLowerCase());
          });

          if (!isValidType) {
            // Clean up object URLs on failure
            for (const file of files) {
              URL.revokeObjectURL(file.preview);
            }
            return {
              success: false,
              error: `${file.source.name} has invalid type`,
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
