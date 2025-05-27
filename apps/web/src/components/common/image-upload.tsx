import { genUploader } from "uploadthing/client";
import type { OurFileRouter } from "@server/src/lib/uploadthing/router";
import { Button } from "@/components/ui/button";
import { LucidePlus, LucideX } from "lucide-react";

const uploadFiles = genUploader<OurFileRouter>();
const initialFiles = [
  {
    name: "image-01.jpg",
    size: 1528737,
    type: "image/jpeg",
    url: "https://picsum.photos/1000/800?grayscale&random=1",
    id: "image-01-123456789",
  },
  {
    name: "image-02.jpg",
    size: 1528737,
    type: "image/jpeg",
    url: "https://picsum.photos/1000/800?grayscale&random=2",
    id: "image-02-123456789",
  },
  {
    name: "image-03.jpg",
    size: 1528737,
    type: "image/jpeg",
    url: "https://picsum.photos/1000/800?grayscale&random=3",
    id: "image-03-123456789",
  },
  {
    name: "image-04.jpg",
    size: 1528737,
    type: "image/jpeg",
    url: "https://picsum.photos/1000/800?grayscale&random=4",
    id: "image-04-123456789",
  },
];
export const ImageUpload = () => {
  return (
    <div className="space-y-6 rounded-md border border-dashed px-4 py-3">
      <div className="flex items-center justify-between">
        <h2 className="truncate font-bold">Uploaded Files (4)</h2>
        <Button variant="outline" type="button">
          <LucidePlus /> Add More
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {initialFiles.map((file) => (
          <div
            key={file.id}
            className="relative aspect-square rounded-md bg-accent"
          >
            <img
              alt={file.name}
              src={file.url}
              className="size-full rounded-[inherit] object-cover"
            />
            <Button
              className="-top-2 -right-2 absolute size-6 rounded-full border-2 border-background shadow-none focus-visible:border-background"
              size="icon"
            >
              <LucideX className="size-3.5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
