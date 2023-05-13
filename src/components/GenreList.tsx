import { useState } from "react";
import useGenres, { Genre } from "../hooks/useGenres";
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
  const { genres, error, isLoading } = useGenres();

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
