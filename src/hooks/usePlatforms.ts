import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { Genre } from "./useGenres";

export interface Platform{
    id: number;
    name: string;
    slug: string;
}

interface FetchPlatformResponse {
    count: number;
    results: Platform[];
  }

const usePlatforms = () => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    const controller = new AbortController();
    let url = "/platforms/lists/parents";

    setIsLoading(true);
    apiClient
      .get<FetchPlatformResponse>(url, {signal: controller.signal})
      .then((res) => {
        console.log(res.data);
        setPlatforms(res.data.results);
        setIsLoading(false);
      })
      .catch((err) => {
        if(err instanceof CanceledError) return;

        setError(err.message)
        setIsLoading(false);
      });

      return ()=>controller.abort();
  }, []);

  return {platforms, error, isLoading};
}
 
export default usePlatforms;