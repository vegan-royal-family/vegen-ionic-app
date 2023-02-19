import "./style/style.scss";
import { IonContent, IonPage, IonFabButton, IonFab } from "@ionic/react";
import { useState } from "react";
import styled from "@emotion/styled";
import Icon from "components/common/Icon";
import BottomModal from "./component/BottomModal";
import useKakaoMap from "./hook/useKakaoMap";
import SearchModal from "./component/SearchModal";
import FilterField from "./component/FilterField";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css";
import "@ionic/react/css/ionic-swiper.css";

const TopContentWrapper = styled.div`
  width: 100%;
  position: absolute;
  z-index: 20000;
  top: 0;
`;

const SliderWrapper = styled.div`
  width: 100%;
  position: absolute;
  z-index: 20000;
  bottom: 96px;
  padding-left: 20px;
  .swiper-slide {
    width: calc(100% - 20px) !important;
    height: 240px;
  }
`;

const SliderCard = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
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
        <SliderWrapper>
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
