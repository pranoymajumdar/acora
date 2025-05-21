export const generateSKU = (name: string): string => {
  return name
    .toUpperCase()
    .replace(/[^\w\s-]/g, "") // Remove non-word characters except space and hyphen
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Collapse multiple hyphens
    .replace(/^-+|-+$/g, ""); // Trim hyphens from start and end
};
