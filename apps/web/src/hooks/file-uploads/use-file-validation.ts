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
}: FileValidationOptions) => {
  const validateAll = useCallback(
    (fileList: FileList): FileValidationResult => {
      const errors: string[] = [];
      const files: File[] = Array.from(fileList).map((file) => ({
        id: crypto.randomUUID().toString().normalize(),
        name: file.name,
        preview: URL.createObjectURL(file),
        size: file.size,
        type: file.type,
      }));

      if (files.length > maxFiles) {
        return {
          errors: [`Too many files. Maximum: ${maxFiles}`],
          validFiles: [],
        };
      }

      const validFiles = files.filter((file) => {
        // Check size
        if (file.size > maxSize) {
          errors.push(`${file.name} is too large`);
          return false;
        }

        // Check type (if not wildcard)
        if (!allowedTypes.includes("*")) {
          const isValidType = allowedTypes.some((type) => {
            if (type.includes("/")) {
              return (
                file.type === type ||
                file.type.startsWith(type.replace("*", ""))
              );
            }
            return file.name.toLowerCase().endsWith(type.toLowerCase());
          });

          if (!isValidType) {
            errors.push(`${file.name} has invalid type`);
            return false;
          }

          return true;
        }
      });

      return {
        errors,
        validFiles,
      };
    },
    [maxFiles, maxSize, allowedTypes],
  );

  return { validateAll };
};
