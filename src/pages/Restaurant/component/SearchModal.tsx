import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonContent,
  IonText,
} from "@ionic/react";
import { useRef } from "react";
import FilterField from "./FilterField";

const SearchModal = ({
  isOpen,
  closeSearchModal,
}: {
  isOpen: boolean;
  closeSearchModal: Function;
}) => {
  const modalRef = useRef<HTMLIonModalElement>(null);

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
        <IonText>콘텐츠</IonText>
      </IonContent>
    </IonModal>
  );
};

export default SearchModal;
