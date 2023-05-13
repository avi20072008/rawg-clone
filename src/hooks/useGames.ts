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

const useGames = (searchText: string, selectedGenre: number, selectedPlatform: number, selectedCriteria: string) => {
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
      search?: string;
      genres?: number;
      parent_platforms?: number;
      ordering?: string;
    }
    
    const params: IParamList = {
      search: searchText,
      genres: selectedGenre,
      parent_platforms: selectedPlatform,
      ordering: selectedCriteria
    };

    console.log('searchText.length' + searchText.length);

    if(searchText.length < 1)
      delete params.search;
    
    // if search param is not provided, remove the search parameter
    if(selectedGenre === -1)
      delete params.genres;
    
    // if search param is not provided, remove the search parameter
    if(selectedPlatform === -1)
      delete params.parent_platforms;

    if(selectedCriteria.length <= 0)
      delete params.ordering;
  

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
  }, [searchText, selectedGenre, selectedPlatform, selectedCriteria]);

  return { games, error, isLoading};
}
 
export default useGames;