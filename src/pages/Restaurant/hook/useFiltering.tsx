import { useState } from "react";

const defaultFilterChips = ["폴로", "페스코", "락토", "오보"];

const useFiltering = (isSearchMode?: boolean) => {
  const [filterOptions, setFilterOptions] = useState(
    defaultFilterChips.map((name, index) => {
      return {
        name,
        isActive: index === 2 ? true : false,
      };
    })
  );

  const onFilterChanged = (index: number) => {
    const newList = [...filterOptions];
    if (filterOptions[index].isActive) {
      newList[index].isActive = false;
    } else {
      newList[index].isActive = true;
    }
    setFilterOptions(newList);
  };

  return { filterOptions, onFilterChanged };
};

export default useFiltering;
