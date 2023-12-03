import { apiClient } from "./apiClient";

export const getVideos = async (id) => {
  const response = await apiClient.get(`/videos/${id}`);
  return response.data;
}

export const getVideosList = async () => {
  const response = await apiClient.get(`/List`);
  return response.data;
}