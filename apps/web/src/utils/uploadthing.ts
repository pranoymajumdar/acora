import {
  generateUploadButton,
  generateUploadDropzone,
  type GenerateTypedHelpersOptions,
} from "@uploadthing/react";

import type { OurFileRouter } from "@server/src/lib/uploadthing/router";

const initOpts = {
  url: `${import.meta.env.VITE_SERVER_URL}/api/uploadthing`,
} satisfies GenerateTypedHelpersOptions;
console.log(initOpts);
export const UploadButton = generateUploadButton<OurFileRouter>(initOpts);
export const UploadDropzone = generateUploadDropzone<OurFileRouter>(initOpts);
