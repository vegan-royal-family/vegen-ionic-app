import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import "swiper/swiper.min.css";
import "@ionic/react/css/ionic-swiper.css";

const SliderCard = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

const RestaurantCard = ({ item, index }: { item: any; index: number }) => {
  return (
    <SliderCard>
      식당 no.{item.id} ({index + 1})
    </SliderCard>
  );
};

const RestaurantSlider = ({
  viewportMarkerDatas,
  activeMarkerKey,
}: {
  viewportMarkerDatas: Array<any>;
  activeMarkerKey: string | null;
}) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const activeCardItem = viewportMarkerDatas.filter(
    (item) => item.id === activeMarkerKey
  )[0];

  useEffect(() => {
    if (swiper && !swiper.destroyed) {
      swiper.slideTo(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMarkerKey]);

  return (
    <Swiper slidesPerView="auto" spaceBetween={8} onSwiper={setSwiper}>
      {activeCardItem && (
        <SwiperSlide key={activeCardItem.id}>
          <RestaurantCard item={activeCardItem} index={0} />
        </SwiperSlide>
      )}
      {viewportMarkerDatas.map((item, index) => {
        return (
          <SwiperSlide key={item.id}>
            <RestaurantCard item={item} index={index} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default RestaurantSlider;
