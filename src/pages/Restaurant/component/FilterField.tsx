import styled from "@emotion/styled";
import Icon from "components/common/Icon";
import Input from "components/common/Input";

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
  padding: 8px 16px;
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
  return (
    <>
      <SearchField className="map-search-field">
        <Input
          className="search-input"
          placeholder="채식식당을 검색해주세요!"
          prefixIcon={isSearchMode ? "left" : ""}
          focusMode={isSearchMode ? true : false}
          onPrefixIconClick={closeSearchModal}
        />
        {!isSearchMode && (
          <InputOverlay
            onClick={() => {
              if (typeof openSearchModal === "function") {
                openSearchModal();
              }
            }}
          />
        )}
      </SearchField>
      <ChipGroups></ChipGroups>
    </>
  );
};

export default FilterField;
