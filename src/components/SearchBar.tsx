import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

const SearchBar = () => {
  return (
    <InputGroup>
      <InputLeftElement children={<BsSearch />}></InputLeftElement>
      <Input
        placeholder="Search games..."
        borderRadius={20}
        variant="filled"
      ></Input>
    </InputGroup>
  );
};

export default SearchBar;
