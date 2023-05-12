import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";
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

const useGames = (param: number, platformParam: number) => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    const controller = new AbortController();
    let url = "/games";

    // if(param > 0){
    //   url = "/games?genres=" + param;
    // }
    // if(platformParam > 0){
    //   url = "/games?parent_platforms=" + platformParam;
    // }
    
    interface IParamList {
      genres?: number;
      parent_platforms?: number;
    }
    
    const params: IParamList = {
      genres: param,
      parent_platforms: platformParam
    };
    
    // if search param is not provided, remove the search parameter
    if(param === -1)
      delete params.genres;
    
    // if search param is not provided, remove the search parameter
    if(platformParam === -1)
      delete params.parent_platforms;

    setIsLoading(true);
    apiClient
      .get<FetchGameResponse>(url,{params : params, signal: controller.signal})
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
  }, [param, platformParam]);

  return {games, error, isLoading};
}
 
export default useGames;