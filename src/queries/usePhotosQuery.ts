import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { RoverPhotos } from "../interfaces/interfaces";
import { SPACE_API_URL } from "../App";

async function getRoverLatestPhotos(roverName: string): Promise<RoverPhotos> {
  const url = SPACE_API_URL + `/api/v1/rovers/${roverName}/latest_photos`;

  const response = await axios.get(url);

  const photos: RoverPhotos = response.data;
  return photos;
}

async function getRoverPhotosBySol(
  roverName: string,
  sol: number,
  camera?: string,
  page?: number
): Promise<RoverPhotos> {
  const url = SPACE_API_URL + `/api/v1/rovers/${roverName}/photos/by_sol`;

  const response = await axios.get(url, {
    params: { sol, camera, page },
  });

  const photos: RoverPhotos = response.data;
  return photos;
}

async function getRoverPhotosByEarthDate(
  roverName: string,
  earthDate: string,
  camera?: string,
  page?: number
): Promise<RoverPhotos> {
  const url =
    SPACE_API_URL + `/api/v1/rovers/${roverName}/photos/by_earth_date`;

  const response = await axios.get(url, {
    params: { earthDate, camera, page },
  });

  const photos: RoverPhotos = response.data;
  return photos;
}

export function useRoverLatestPhotosQuery(roverName: string) {
  return useQuery({
    queryKey: [`${roverName}`],
    queryFn: async () => await getRoverLatestPhotos(roverName),
  });
}

export function useRoverPhotosBySolQuery(
  roverName: string,
  sol: number,
  camera?: string,
  page?: number
) {
  return useQuery({
    queryKey: [`${roverName}:${sol}`],
    queryFn: async () =>
      await getRoverPhotosBySol(roverName, sol, camera, page),
  });
}

export function useRoverPhotosByEarthDateQuery(
  roverName: string,
  earthDate: string,
  camera?: string,
  page?: number
) {
  return useQuery({
    queryKey: [`${roverName}:${earthDate}`],
    queryFn: async () =>
      await getRoverPhotosByEarthDate(roverName, earthDate, camera, page),
  });
}
