import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface APod {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

async function getAPod(): Promise<APod> {
  const response = await axios.get(
    import.meta.env.VITE_SPACE_API_URL + "/api/v1/apod"
  );

  const apod: APod = response.data;
  return apod;
}

export function useAPodQuery() {
  return useQuery({
    queryKey: ["aPod"],
    queryFn: async () => await getAPod(),
    staleTime: 3600000, // planetary image won't change often, so I just keep it to 1hr
    refetchOnWindowFocus: false,
  });
}
