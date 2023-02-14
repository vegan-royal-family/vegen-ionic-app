import { useIonViewDidEnter } from "@ionic/react";
import { useState } from "react";
import { Geolocation } from "@capacitor/geolocation";

declare global {
  interface Window {
    kakao: any;
  }
}

const useKakaoMap = () => {
  const [map, setMap] = useState<any | null>(null);

  const setCurrentPosition = async () => {
    if (!map) {
      return;
    }
    const coordinates = await Geolocation.getCurrentPosition();
    const lat = coordinates?.coords?.latitude;
    const lng = coordinates?.coords?.longitude;
    // TODO: 실제 기기에서 테스트 필요 (android, ios)
    map.setCenter(new window.kakao.maps.LatLng(lat, lng));
  };

  const zoomIn = () => {
    if (!map) {
      return;
    }
    const level = map.getLevel();
    map.setLevel(level - 1);
  };

  useIonViewDidEnter(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    setMap(new window.kakao.maps.Map(container, options));
  });

  return { setCurrentPosition, zoomIn };
};

export default useKakaoMap;
