import "./style.scss";
import { IonContent, IonPage, IonFabButton, IonFab } from "@ionic/react";
import Icon from "components/common/Icon";
import styled from "@emotion/styled";
import BottomModal from "./BottomModal";
import useKakaoMap from "./useKakaoMap";
import Input from "components/common/Input";

const TopContentWrapper = styled.div`
  position: absolute;
  z-index: 20000;
  top: 0;
`;

const SearchField = styled.div`
  padding: 8px 16px;
`;

const FilterField = styled.div`
  padding: 8px 16px;
`;

const Restaurant: React.FC = () => {
  const { setCurrentPosition, zoomIn } = useKakaoMap();

  return (
    <IonPage>
      <IonContent fullscreen>
        <BottomModal />
        <TopContentWrapper>
          <SearchField>
            <Input />
          </SearchField>
          <FilterField></FilterField>
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
