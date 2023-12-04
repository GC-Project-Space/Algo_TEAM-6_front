import { apiClient } from "./apiClient";

export const getVideo = async (fileName) => {
  const response = await apiClient.get(`/Video/${fileName}`);
  return response;
}

export const getVideosList = async () => {
  const response = await apiClient.get(`/List`);
  return response;
}