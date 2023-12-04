import { apiClient } from "./apiClient";

export const postInitiateUpload = async (fileName) => {
  const response = await apiClient.post("/s3/initiate-upload", { fileName });
  return response;
};

export const postUploadSignedUrl = async (fileName, partNumber, uploadId) => {
  const response = await apiClient.post("/s3/upload-signed-url", {
    fileName, partNumber, uploadId,
  });
  return response;
}

export const postCompleteUpload = async (fileName, uploadId, parts) => {
  const response = await apiClient.post("/s3/complete-upload", {
    parts, fileName, uploadId,
  });
  return response;
}

export const postAbortUpload = async (fileName, uploadId) => {
  const response = await apiClient.post("/s3/abort-upload", {
    fileName, uploadId,
  });
  return response;
}