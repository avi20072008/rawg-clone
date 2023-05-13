import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchBar from "./SearchBar";

interface Props {
  onSearch: (searchText: string) => void;
  searchText: string;
}

const NavBar = ({ onSearch, searchText }: Props) => {
  return (
    <HStack justifyContent="space-between" padding="20px">
      <Image src={logo} boxSize="60px"></Image>
      <SearchBar
        searchText={searchText}
        onSearch={(q) => {
          onSearch(q);
        }}
      ></SearchBar>
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
