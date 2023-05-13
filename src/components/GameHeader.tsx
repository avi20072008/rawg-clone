import { Heading } from "@chakra-ui/react";
import { Platform } from "../hooks/useGames";
import { Genre } from "../hooks/useGenres";

interface Props {
  selectedGenre: Genre | null;
  selectedPlatform: Platform | null;
}
const GameHeader = ({ selectedGenre, selectedPlatform }: Props) => {
  var strHeader = "Games";

  //   if (selectedGenre !== null) strHeader = selectedGenre.name + " " + strHeader;

  //   if (selectedPlatform !== null)
  //     strHeader = selectedPlatform.name + " " + strHeader;

  strHeader =
    `${selectedGenre?.name || ""} ${selectedPlatform?.name || ""} ` + strHeader;

  return (
    <Heading as="h1" paddingY={4} fontSize="5xl">
      {" "}
      {strHeader}
    </Heading>
  );
};

export default GameHeader;
