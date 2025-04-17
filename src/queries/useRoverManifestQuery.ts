import axios from "axios";
import { useQuery } from "@tanstack/react-query";

async function getRoverManifests(roverName: string): Promise<any> {
  const url =
    import.meta.env.VITE_SPACE_API_URL +
    `/api/v1/rovers/manifests/${roverName}`;

  const response = await axios.get(url);

  return response.data;
}

export function useRoverManifestQuery(roverName: string) {
  return useQuery({
    queryKey: [`${roverName}`],
    queryFn: async () => await getRoverManifests(roverName),
  });
}
