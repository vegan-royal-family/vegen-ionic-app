import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { PositionDataType } from "types/restaurant";

import "swiper/swiper.min.css";
import "@ionic/react/css/ionic-swiper.css";

const SliderCard = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

const RestaurantCard = ({
  item,
  index,
}: {
  item: PositionDataType;
  index: number;
}) => {
  return (
    <SliderCard>
      식당 no.{item?.id} ({index + 1})
    </SliderCard>
  );
};

const RestaurantSlider = ({
  viewportMarkerDatas,
  activeMarkerKey,
  changeActiveMarker,
}: {
  viewportMarkerDatas: Array<PositionDataType>;
  activeMarkerKey: string | null;
  changeActiveMarker: Function;
}) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const newViewportMarkerDatas = [
    ...viewportMarkerDatas.filter((item) => item.id === activeMarkerKey),
    ...viewportMarkerDatas.filter((item) => item.id !== activeMarkerKey),
  ];

  useEffect(() => {
    if (swiper && !swiper.destroyed) {
      swiper.slideTo(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMarkerKey]);

  return (
    <Swiper
      slidesPerView="auto"
      spaceBetween={8}
      onSwiper={setSwiper}
      onActiveIndexChange={(swiper) => {
        const activeIndex = swiper.activeIndex;
        const activeMarkerData = newViewportMarkerDatas[activeIndex];
        changeActiveMarker(
          newViewportMarkerDatas,
          activeMarkerData?.marker,
          activeMarkerData?.id
        );
      }}
    >
      {newViewportMarkerDatas.map((item, index) => {
        return (
          <SwiperSlide key={item?.id}>
            <RestaurantCard item={item} index={index} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default RestaurantSlider;
