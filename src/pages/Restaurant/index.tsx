import "./style/style.scss";
import { IonContent, IonPage, IonFabButton } from "@ionic/react";
import { useState } from "react";
import styled from "@emotion/styled";
import Icon from "components/common/Icon";
import BottomModal from "./component/BottomModal";
import useKakaoMap from "./hook/useKakaoMap";
import SearchModal from "./component/SearchModal";
import FilterField from "./component/FilterField";
import RestaurantSlider from "./component/RestaurantSlider";
import allMarkerDatas from "mock/restaurant.json";

const TopContentWrapper = styled.div`
  width: 100%;
  position: absolute;
  z-index: 20000;
  top: 0;
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  position: absolute;
  z-index: 20000;
  bottom: 100px;
  padding-left: 20px;
`;

const Restaurant: React.FC = () => {
  const [openSearchModal, setOpenSearchModal] = useState<boolean>(false);
  const {
    viewportMarkerDatas,
    activeMarkerKey,
    changeActiveMarker,
    setCurrentPosition,
    zoomIn,
  } = useKakaoMap({
    markerDatas: allMarkerDatas,
    openSearchModal,
  });

  return (
    <IonPage id="restaurant-page">
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
        <SliderWrapper>
          <div className="fab-btn-group">
            <IonFabButton onClick={() => setCurrentPosition()}>
              <Icon icon="aiming" />
            </IonFabButton>
            <IonFabButton onClick={() => zoomIn()}>
              <Icon icon="plus" />
            </IonFabButton>
          </div>
          <RestaurantSlider
            viewportMarkerDatas={viewportMarkerDatas}
            activeMarkerKey={activeMarkerKey}
            changeActiveMarker={changeActiveMarker}
          />
        </SliderWrapper>
        <div id="map" style={{ width: "100%", height: "100%" }}></div>
      </IonContent>
    </IonPage>
  );
};

export default Restaurant;
