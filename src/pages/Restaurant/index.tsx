import "./style/style.scss";
import { IonContent, IonPage, IonFabButton } from "@ionic/react";
import { useState } from "react";
import styled from "@emotion/styled";
import Icon from "components/common/Icon";
import BottomModal from "./component/BottomModal";
import useKakaoMap from "./hook/useKakaoMap";
import SearchModal from "./component/SearchModal";
import FilterField from "./component/FilterField";
import { Swiper, SwiperSlide } from "swiper/react";
import data from "mock/restaurant.json";

import "swiper/swiper.min.css";
import "@ionic/react/css/ionic-swiper.css";

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

const SliderCard = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

const Restaurant: React.FC = () => {
  const { setCurrentPosition, zoomIn } = useKakaoMap(data);
  const [openSearchModal, setOpenSearchModal] = useState<boolean>(false);

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
          <Swiper slidesPerView="auto" spaceBetween={8}>
            <SwiperSlide>
              <SliderCard>Slide 1</SliderCard>
            </SwiperSlide>
            <SwiperSlide>
              <SliderCard>Slide 2</SliderCard>
            </SwiperSlide>
            <SwiperSlide>
              <SliderCard>Slide 3</SliderCard>
            </SwiperSlide>
          </Swiper>
        </SliderWrapper>
        <div id="map" style={{ width: "100%", height: "100%" }}></div>
      </IonContent>
    </IonPage>
  );
};

export default Restaurant;
