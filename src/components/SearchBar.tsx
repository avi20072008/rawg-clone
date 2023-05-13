import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FormEvent, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import useGames from "../hooks/useGames";

interface Props {
  onSearch: (searchText: string) => void;
  searchText: string;
}

const SearchBar = ({ onSearch, searchText }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  function handleSubmit(e: any): void {
    e.preventDefault();
    if (ref.current) {
      searchText = ref.current.value;
      onSearch(searchText);
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <InputGroup>
        <InputLeftElement children={<BsSearch />}></InputLeftElement>
        <Input
          ref={ref}
          placeholder="Search games..."
          borderRadius={20}
          variant="filled"
        ></Input>
      </InputGroup>
    </form>
  );
};

export default SearchBar;
