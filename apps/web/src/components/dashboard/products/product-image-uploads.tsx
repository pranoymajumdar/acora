import { Button } from "@/components/ui/button";
import { useFileUploads } from "@/hooks/file-uploads";
import { LucideImage, LucidePlus, LucideUpload, LucideX } from "lucide-react";
import { useCallback, type ChangeEvent, type DragEvent } from "react";
import { toast } from "sonner";

export const ProductImageUploads = () => {
  const {
    files,
    handleFileDrop,
    openFileDialog,
    getFileInputProps,
    removeFile,
  } = useFileUploads({
    allowedTypes: ["image/jpeg"],
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024,
    multiple: true,
    onError: (error: string) => {
      toast.error(error);
    },
  });

  const preventDefault = useCallback(
    (e: DragEvent<HTMLDivElement> | ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.stopPropagation();
    },
    [],
  );
  return (
    <div className="rounded-md border border-dashed">
      <input {...getFileInputProps} />
      {files.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center px-4 py-3 text-center"
          onDrag={preventDefault}
          onDragEnter={preventDefault}
          onDragEnd={preventDefault}
          onDragLeave={preventDefault}
          onDragOver={preventDefault}
          onDragCapture={preventDefault}
          onDrop={handleFileDrop}
        >
          <div
            className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
            aria-hidden="true"
          >
            <LucideImage className="size-4 opacity-60" />
          </div>
          <p className="mb-1.5 font-medium text-sm">Drop your images here</p>
          <p className="text-muted-foreground text-xs">
            SVG, PNG, JPG or GIF (max. 5MB)
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={openFileDialog}
          >
            <LucideUpload className="-ms-1 opacity-60" aria-hidden="true" />
            Select images
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="truncate font-medium text-sm">{`Uploaded Files (${files.length})`}</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={openFileDialog}
            >
              <LucidePlus />
              Add More
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {files.map((file) => (
              <div
                className="relative aspect-square rounded-md bg-accent"
                key={file.name}
              >
                <img
                  src={file.preview}
                  alt={file.name}
                  className="size-full rounded-[inherit] object-cover"
                />
                <Button
                  type="button"
                  size="icon"
                  className="-top-2 -right-2 absolute size-6 rounded-full border-2 border-background shadow-none focus-visible:border-background"
                  aria-label="Remove image"
                  onClick={() => removeFile(file.id)}
                >
                  <LucideX className="size-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
