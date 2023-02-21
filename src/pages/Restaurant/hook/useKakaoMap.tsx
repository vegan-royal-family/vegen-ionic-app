import { useIonViewDidEnter } from "@ionic/react";
import { useState, useEffect } from "react";
import { Geolocation } from "@capacitor/geolocation";

declare global {
  interface Window {
    kakao: any;
  }
}

const useKakaoMap = (data: Array<any>) => {
  const [map, setMap] = useState<any | null>(null);
  const [markers, setMarkers] = useState<Array<any>>([]);

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

  // 지도 첫 렌더링 시 한번 실행
  useEffect(() => {
    if (map) {
      // "dragend" 이벤트 리스너 삭제, 등록
      // "zoom_changed" 이벤트 리스너 삭제, 등록
      // 현재 바운드 체크해서 마커 리스트(상태) 바꿔주는 함수임
      //const markerImage = new window.kakao.maps.MarkerImage(imgSrc, imgSize)

      const markerList = [];
      for (let index = 0; index > data.length; index++) {
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: new window.kakao.maps.LatLng(
            data[index].lat,
            data[index].lng
          ),
          //image: markerImage
        });
        markerList.push(marker);
      }
      setMarkers(markerList);
    }
  }, [map, data]);

  return { setCurrentPosition, zoomIn };
};

export default useKakaoMap;
