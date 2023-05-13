import { useState } from "react";
import useGenres, { Genre } from "../hooks/useGenres";

import genresData from "../data/genres";

import {
  Button,
  HStack,
  Heading,
  Image,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import GetCroppedImageUrl from "../services/image-url";

interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ selectedGenre, onSelectGenre }: Props) => {
  // instead of getting it from API or database, we will get static data for genres.
  //const { genres, error, isLoading } = useGenres();

  // here genresData is genres data loaded from data/genres.ts file
  const { genres, error, isLoading } = {
    genres: genresData,
    error: null,
    isLoading: false,
  };

  // you can comment below lines as we are loading static data so not required.
  // if there are an error, we dont want to show anything
  if (error) return null;
  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading fontSize="2xl" marginBottom={3}>
        Genres
      </Heading>
      <List>
        {genres.map((genre) => (
          <ListItem key={genre.id} paddingY="7px">
            <HStack>
              <Image
                src={GetCroppedImageUrl(genre.image_background)}
                borderRadius={8}
                boxSize="32px"
                objectFit="cover"
              ></Image>
              <Button
                whiteSpace="normal"
                textAlign="left"
                color={genre.id === selectedGenre?.id ? "gray.100" : "gray.500"}
                fontSize="lg"
                variant="link"
                onClick={() => onSelectGenre(genre)}
              >
                {genre.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
