import {
  generateReactHelpers,
  type GenerateTypedHelpersOptions,
} from "@uploadthing/react";

import type { OurFileRouter } from "@server/src/lib/uploadthing/router";

const initOpts = {
  url: `${import.meta.env.VITE_SERVER_URL}/api/uploadthing`,
} satisfies GenerateTypedHelpersOptions;

export const { useUploadThing } = generateReactHelpers<OurFileRouter>(initOpts);
