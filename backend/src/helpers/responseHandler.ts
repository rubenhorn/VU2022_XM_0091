import getErrorMessage from "./dbErrorHandler";

/**
 * Sort data for a successful response
 *
 * @param data
 */
export const handleSuccess = (data: any) => {
  return {
    success: true,
    data,
  };
};

/**
 * Sort data for a error response
 *
 * @param error
 */
export const handleError = (error: any) => {
  const errorString =
    typeof error !== "string" ? getErrorMessage(error) : error;

  return {
    success: false,
    error: errorString,
  };
};
