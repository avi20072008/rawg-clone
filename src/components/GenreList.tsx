import { useState } from "react";
import useGenres, { Genre } from "../hooks/useGenres";
import { HStack, Image, List, ListItem, Text } from "@chakra-ui/react";
import GetCroppedImageUrl from "../services/image-url";

const GenreList = () => {
  const { genres, error, isLoading } = useGenres();

  return (
    <>
      <List>
        {genres.map((genre) => (
          <ListItem key={genre.id} paddingY="7px">
            <HStack>
              <Image
                src={GetCroppedImageUrl(genre.image_background)}
                borderRadius={8}
                boxSize="32px"
              ></Image>
              <Text fontSize="lg">{genre.name}</Text>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
