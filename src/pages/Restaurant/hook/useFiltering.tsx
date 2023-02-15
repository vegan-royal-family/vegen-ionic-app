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

  return [filterOptions];
};

export default useFiltering;
