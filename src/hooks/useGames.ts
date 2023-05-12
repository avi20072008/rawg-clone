import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { Genre } from "./useGenres";

export interface Platform{
    id: number;
    name: string;
    slug: string;
}

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: {platform: Platform}[]
    metacritic: number;
  }
  
  interface FetchGameResponse {
    count: number;
    results: Game[];
  }

const useGames = (param: number) => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    const controller = new AbortController();
    let url = "/games";

    if(param > 0){
      url = "/games?genres=" + param;
    }

    setIsLoading(true);
    apiClient
      .get<FetchGameResponse>(url, {signal: controller.signal})
      .then((res) => {
        console.log(res.data.results);
        setGames(res.data.results);
        setIsLoading(false);
      })
      .catch((err) => {
        if(err instanceof CanceledError) return;

        setError(err.message)
        setIsLoading(false);
      });

      return ()=>controller.abort();
  }, [param]);

  return {games, error, isLoading};
}
 
export default useGames;