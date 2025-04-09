import axios from "axios";
import { APod } from "../types/APod";
import { useQuery } from "@tanstack/react-query";

async function getAPod(): Promise<APod> {
  const response = await axios.get(
    import.meta.env.VITE_SPACE_API_URL + "/api/v1/nasa/apod"
  );

  const apod: APod = response.data;
  return apod;
}

export function useAPodQuery() {
  return useQuery({
    queryKey: ["aPod"],
    queryFn: async () => await getAPod(),
  });
}
