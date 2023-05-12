import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronBarDown } from "react-icons/bs";

interface Props {
  onSortSelection: (criteria: string) => void;
  selectedCriteria: string;
}

const SortSelector = ({ onSortSelection, selectedCriteria }: Props) => {
  const sortCriterias = [
    { value: "", label: "Relevance" },
    { value: "-added", label: "Date added" },
    { value: "name", label: "Name" },
    { value: "-released", label: "Release Date" },
    { value: "-metacritic", label: "Popularity" },
    { value: "-rating", label: "Average Rating" },
  ];

  const currentSortOrder = sortCriterias.find(
    (order) => order.value === selectedCriteria
  );

  return (
    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<BsChevronBarDown />}>
          Order by: {currentSortOrder?.label || "Relevance"}
        </MenuButton>
        <MenuList>
          {sortCriterias.map((criteria) => (
            <MenuItem
              value={criteria.value}
              key={criteria.value}
              onClick={() => onSortSelection(criteria.value)}
            >
              {criteria.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};

export default SortSelector;
