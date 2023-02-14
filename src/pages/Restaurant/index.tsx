import "./style/style.scss";
import { IonContent, IonPage, IonFabButton, IonFab } from "@ionic/react";
import { useState } from "react";
import styled from "@emotion/styled";
import Icon from "components/common/Icon";
import BottomModal from "./component/BottomModal";
import useKakaoMap from "./hook/useKakaoMap";
import SearchModal from "./component/SearchModal";
import FilterField from "./component/FilterField";

const TopContentWrapper = styled.div`
  width: 100%;
  position: absolute;
  z-index: 20000;
  top: 0;
`;

const Restaurant: React.FC = () => {
  const { setCurrentPosition, zoomIn } = useKakaoMap();
  const [openSearchModal, setOpenSearchModal] = useState<boolean>(false);

  return (
    <IonPage>
      <IonContent>
        <BottomModal />
        <SearchModal
          isOpen={openSearchModal}
          closeSearchModal={() => setOpenSearchModal(false)}
        />
        <TopContentWrapper>
          <FilterField
            isSearchMode={false}
            openSearchModal={() => setOpenSearchModal(true)}
          />
        </TopContentWrapper>
        <IonFab slot="fixed" vertical="center" horizontal="end">
          <IonFabButton onClick={() => setCurrentPosition()}>
            <Icon icon="aiming" />
          </IonFabButton>
          <IonFabButton onClick={() => zoomIn()}>
            <Icon icon="plus" />
          </IonFabButton>
        </IonFab>
        <div id="map" style={{ width: "100%", height: "100%" }}></div>
      </IonContent>
    </IonPage>
  );
};

export default Restaurant;
