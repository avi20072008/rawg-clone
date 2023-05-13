import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
  HStack,
  Show,
} from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import Genres from "./components/GenreList";
import GenreList from "./components/GenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import PlatformSelector from "./components/PlatformSelector";
import { Platform } from "./hooks/usePlatforms";
import SortSelector from "./components/SortSelector";
import GameHeader from "./components/GameHeader";

function App() {
  //handle Genre selection from Side bar
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null
  );
  const [selectedCriteria, setSelectedCriteria] = useState("");
  const [searchText, setSearchText] = useState("");

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar
          onSearch={(q) => {
            setSearchText(q);
          }}
          searchText={searchText}
        />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList
            selectedGenre={selectedGenre}
            onSelectGenre={(genre) => setSelectedGenre(genre)}
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box paddingLeft={2}>
          <GameHeader
            selectedGenre={selectedGenre}
            selectedPlatform={selectedPlatform}
          ></GameHeader>
          <Flex marginBottom={5}>
            <Box marginRight={5}>
              <PlatformSelector
                selectedPlatform={selectedPlatform}
                onSelectPlatform={(platform) => setSelectedPlatform(platform)}
              ></PlatformSelector>
            </Box>
            <SortSelector
              selectedCriteria={selectedCriteria}
              onSortSelection={(criteria) => setSelectedCriteria(criteria)}
            />
          </Flex>
        </Box>
        <GameGrid
          searchText={searchText}
          selectedGenre={selectedGenre}
          selectedPlatform={selectedPlatform}
          selectedCriteria={selectedCriteria}
        ></GameGrid>
      </GridItem>
    </Grid>
  );
}

export default App;
