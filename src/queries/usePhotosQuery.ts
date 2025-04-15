import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { RoverPhotos } from "../interfaces/interfaces";

export type CAMERA =
  | "FHAZ"
  | "RHAZ"
  | "MAST"
  | "CHEMCAM"
  | "MAHLI"
  | "MARDI"
  | "NAVCAM"
  | "PANCAM"
  | "MINITES";

async function getRoverPhotosBySol(
  roverName: string,
  sol: number,
  camera?: CAMERA,
  page?: number
): Promise<RoverPhotos> {
  const url =
    import.meta.env.VITE_SPACE_API_URL +
    `/api/v1/rovers/${roverName}/photos/by_sol`;

  const response = await axios.get(url, {
    params: { sol, camera, page },
  });

  const photos: RoverPhotos = response.data;
  return photos;
}

async function getRoverPhotosByEarthDate(
  roverName: string,
  earthDate: string,
  camera?: CAMERA,
  page?: number
): Promise<RoverPhotos> {
  const url = import.meta.env
    .VITE_SPACE_API_URL`/api/v1/rovers/${roverName}/photos/by_earth_date`;

  const response = await axios.get(url, {
    params: { earthDate, camera, page },
  });

  const photos: RoverPhotos = response.data;
  return photos;
}

export function useRoverPhotosBySolQuery(
  roverName: string,
  sol: number,
  camera?: CAMERA,
  page?: number
) {
  return useQuery({
    queryKey: ["sol"],
    queryFn: async () =>
      await getRoverPhotosBySol(roverName, sol, camera, page),
    staleTime: 3600000,
    refetchOnWindowFocus: false,
  });
}

export function useRoverPhotosByEarthDateQuery(
  roverName: string,
  earthDate: string,
  camera?: CAMERA,
  page?: number
) {
  return useQuery({
    queryKey: ["earthDate"],
    queryFn: async () =>
      await getRoverPhotosByEarthDate(roverName, earthDate, camera, page),
    staleTime: 3600000,
    refetchOnWindowFocus: false,
  });
}
