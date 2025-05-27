import {
  useCallback,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import { Button } from "../ui/button";
import { LucideImage, LucidePlus, LucideUpload, LucideX } from "lucide-react";

type File = {
  id: string;
  name: string;
  type: string;
  size: number;
  preview: string;
};

const DropArea = ({
  handleFileDrop,
  openFileDialog,
}: {
  handleFileDrop: (e: DragEvent<HTMLDivElement>) => void;
  openFileDialog: () => void;
}) => {
  const preventDefault = useCallback(
    (e: DragEvent<HTMLDivElement> | ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.stopPropagation();
    },
    [],
  );
  return (
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
  );
};

export const FileDropzone = () => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file drop
  const handleFileDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e);
  }, []);

  // Handle When File input change
  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray: File[] = [];
      for (const file of e.target.files) {
        filesArray.push({
          id: crypto.randomUUID().toString().normalize(),
          name: file.name,
          size: file.size,
          type: file.type,
          preview: URL.createObjectURL(file),
        });
      }

      setFiles((prev) => [...filesArray, ...prev]);
    }
  }, []);

  return (
    <div className="rounded-md border border-dashed">
      <input
        type="file"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {files.length === 0 ? (
        <DropArea
          handleFileDrop={handleFileDrop}
          openFileDialog={() => fileInputRef.current?.click()}
        />
      ) : (
        <div className="flex flex-col gap-3 px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="truncate font-medium text-sm">{`Uploaded Files (${files.length})`}</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
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
                  onClick={() =>
                    setFiles((prev) =>
                      prev.filter((filterValue) => filterValue.id !== file.id),
                    )
                  }
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
