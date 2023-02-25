import styled from "@emotion/styled";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonContent,
  IonText,
} from "@ionic/react";
import TextButton from "components/common/TextButton";
import { useRef } from "react";
import theme from "styles/theme";
import FilterField from "./FilterField";

const TitleContainer = styled.div`
  padding: 24px 16px 8px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  .title {
    ${theme.typography.body2}
    ${theme.typography.weightBold}
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`;

const ListItem = styled.div`
  width: 100%;
  background: #ffffff;
  border: 1px solid #e9eef1;
  border-radius: 16px;
  padding: 16px 8px;
`;

const SearchModal = ({
  isOpen,
  closeSearchModal,
}: {
  isOpen: boolean;
  closeSearchModal: Function;
}) => {
  const modalRef = useRef<HTMLIonModalElement>(null);

  // useEffect(() => {
  //   if (isOpen) {
  //     setTimeout(() => {
  //       const inputElement = document.getElementById("search-modal-input");
  //       if (inputElement) {
  //         inputElement.focus();
  //       }
  //     }, 500);
  //   }
  // }, [isOpen]);

  return (
    <IonModal id="search-modal" ref={modalRef} isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <FilterField
            isSearchMode={true}
            closeSearchModal={closeSearchModal}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <TitleContainer>
          <IonText className="title">최근 검색</IonText>
          <TextButton size="sm" type="secondary">
            최근 검색 삭제
          </TextButton>
        </TitleContainer>
        <ListContainer>
          <ListItem>검색 되었던 식당1</ListItem>
        </ListContainer>
      </IonContent>
    </IonModal>
  );
};

export default SearchModal;
