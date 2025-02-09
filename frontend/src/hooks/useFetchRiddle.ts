import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchRiddle = () => {
  return useQuery({
    queryKey: ["riddle"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5001/riddle");
      return data;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
