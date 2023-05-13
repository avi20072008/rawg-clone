import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import { Genre } from "../hooks/useGenres";
import { Platform } from "../hooks/usePlatforms";

interface Props {
  searchText: string;
  selectedGenre: Genre | null;
  selectedPlatform: Platform | null;
  selectedCriteria: string;
}
//Through the props, we will get both search params and we will use it to send it to fetch filtered games.
const GameGrid = ({
  searchText,
  selectedGenre,
  selectedPlatform,
  selectedCriteria,
}: Props) => {
  let param = -1;
  let platformParam = -1;

  if (selectedGenre != null) param = selectedGenre.id;

  if (selectedPlatform != null) platformParam = selectedPlatform.id;

  const { games, error, isLoading } = useGames(
    searchText,
    param,
    platformParam,
    selectedCriteria
  );

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      {error && <Text> {error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={10}
        padding="10px"
      >
        {isLoading &&
          skeletons.map((skeleton) => <GameCardSkeleton key={skeleton} />)}
        {games.map((game) => (
          <GameCard key={game.id} game={game}></GameCard>
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
