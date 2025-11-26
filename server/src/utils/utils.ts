export const getErrorMessage = (error: unknown) => {
  return error instanceof Error ? error.message : "An unknown error occurred";
};
