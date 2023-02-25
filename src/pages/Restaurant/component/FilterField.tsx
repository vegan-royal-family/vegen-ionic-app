import styled from "@emotion/styled";
import Chip from "components/common/Chip";
import Input from "components/common/Input";
import useFiltering from "../hook/useFiltering";

const InputOverlay = styled.div`
  position: absolute;
  top: 8px;
  width: 100%;
  height: 42px;
`;

const SearchField = styled.div`
  position: relative;
  padding: 8px 16px;
`;

const ChipGroups = styled.div`
  display: flex;
  padding: 8px 16px;
  overflow: auto;
  .filter-item:not(:last-child) {
    margin-right: 8px;
  }
`;

const FilterField = ({
  isSearchMode,
  openSearchModal,
  closeSearchModal,
}: {
  isSearchMode: boolean;
  openSearchModal?: Function;
  closeSearchModal?: Function;
}) => {
  const { filterOptions, onFilterChanged } = useFiltering(isSearchMode);

  const SearchContents = () => {
    if (isSearchMode) {
      return (
        <SearchField className="map-search-field">
          <Input
            id="search-modal-input"
            className="search-input"
            placeholder="채식식당을 검색해주세요!"
            prefixIcon="left"
            onPrefixIconClick={closeSearchModal}
          />
        </SearchField>
      );
    } else {
      return (
        <SearchField className="map-search-field">
          <Input
            id="map-input"
            className="search-input"
            placeholder="채식식당을 검색해주세요!"
          />
          <InputOverlay
            onClick={() => {
              if (typeof openSearchModal === "function") {
                openSearchModal();
              }
            }}
          />
        </SearchField>
      );
    }
  };

  return (
    <>
      <SearchContents />
      <ChipGroups>
        {filterOptions.map((item, index) => {
          return (
            <Chip
              className="filter-item"
              key={item.name}
              active={item?.isActive}
              suffixIcon={item?.isActive ? "close-small" : null}
              suffixIconColor="#fff"
              type={isSearchMode ? "primary" : "secondary"}
              style={
                !isSearchMode
                  ? { boxShadow: "0px 1px 2px rgba(15, 23, 42, 0.25)" }
                  : {}
              }
              onClick={() => onFilterChanged(index)}
            >
              {item.name}
            </Chip>
          );
        })}
      </ChipGroups>
    </>
  );
};

export default FilterField;
