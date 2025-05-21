export const convertRole = (value: 0 | 1): string =>
  ({
    0: "USER",
    1: "ADMIN",
  })[value];
