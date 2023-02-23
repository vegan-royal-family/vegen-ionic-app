import { useIonViewDidEnter } from "@ionic/react";
import { useState, useEffect } from "react";
import { Geolocation } from "@capacitor/geolocation";

declare global {
  interface Window {
    kakao: any;
  }
}

type PositionDataType = {
  lat: string;
  lng: string;
};

const INIT_CENTER_LAT = 37.5581772;
const INIT_CENTER_LNG = 126.934464;

function useKakaoMap(data: Array<PositionDataType>) {
  const [map, setMap] = useState<any | null>(null);
  const [markers, setMarkers] = useState<Array<any>>([]);
  const [dragendHandler, setDragendHandler] = useState(null);
  const [zoomHandler, setZoomHandler] = useState(null);

  const imgSrc = "/assets/icon/marker_default.svg";

  const setCurrentPosition = async () => {
    if (!map) {
      return;
    }
    const coordinates = await Geolocation.getCurrentPosition();
    const lat = coordinates?.coords?.latitude;
    const lng = coordinates?.coords?.longitude;
    // TODO: 실제 기기에서 테스트 필요 (android, ios)
    // Android 기기 테스트 완료
    map.setCenter(new window.kakao.maps.LatLng(lat, lng));
  };

  const zoomIn = () => {
    if (!map) {
      return;
    }
    const level = map.getLevel();
    map.setLevel(level - 1);
  };

  const updateRenderMarkers = () => {
    const imgSize = new window.kakao.maps.Size(32, 32);
    const markerImage = new window.kakao.maps.MarkerImage(imgSrc, imgSize);

    for (let index = 0; index < markers.length; index++) {
      const marker = markers[index];
      marker.setMap(null);
    }

    const { ha, oa, qa, pa } = map.getBounds();
    const sw = [qa, ha];
    const ne = [pa, oa];

    const markerList = [];
    for (let index = 0; index < data.length; index++) {
      // TODO: 현재 뷰포트 바운드 안에 들어가는 마커 객체 생성
      //   const marker = new window.kakao.maps.Marker({
      //     map: map,
      //     position: new window.kakao.maps.LatLng(
      //       parseFloat(data[index].lat),
      //       parseFloat(data[index].lng)
      //     ),
      //     image: markerImage,
      //   });
      //   markerList.push(marker);
    }
    //setMarkers(markerList);
  };

  useIonViewDidEnter(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(INIT_CENTER_LAT, INIT_CENTER_LNG),
      level: 3,
    };
    setMap(new window.kakao.maps.Map(container, options));
  });

  // 지도 첫 렌더링 시 한번 실행
  useEffect(() => {
    if (map) {
      window.kakao.maps.event.addListener(map, "idle", updateRenderMarkers);
    }
  }, [map, data]);

  return { markers, setCurrentPosition, zoomIn };
}

export default useKakaoMap;
