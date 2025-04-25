import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { SPACE_API_URL } from "../App";

export interface APod {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
  copyright: string;
}

async function getAPod(): Promise<APod> {
  const response = await axios.get(SPACE_API_URL + "/api/v1/apod");

  const apod: APod = response.data;
  return apod;
}

export function useAPodQuery() {
  return useQuery({
    queryKey: ["aPod"],
    queryFn: async () => await getAPod(),
  });
}
