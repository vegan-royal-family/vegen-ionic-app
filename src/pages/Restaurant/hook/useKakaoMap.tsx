import { useIonViewDidEnter } from "@ionic/react";
import { useState, useEffect, useCallback } from "react";
import { Geolocation } from "@capacitor/geolocation";

declare global {
  interface Window {
    kakao: any;
  }
}

type PositionDataType = {
  id: string;
  lat: string;
  lng: string;
};

const INIT_CENTER_LAT = 37.5581772;
const INIT_CENTER_LNG = 126.934464;

function useKakaoMap(data: Array<PositionDataType>, isSearchOpen: boolean) {
  const [map, setMap] = useState<any | null>(null);
  const [markerDatas, setMarkerDatas] = useState<Array<any>>([]);
  const markerMap = new Map();

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

  const updateRenderMarkers = useCallback(() => {
    //console.log("idle event!!");
    const imgSize = new window.kakao.maps.Size(32, 32);
    const markerImage = new window.kakao.maps.MarkerImage(imgSrc, imgSize);

    markerMap.forEach((item) => item.setMap(null));
    markerMap.clear();

    const { ha: swlng, oa: nelng, qa: swlat, pa: nelat } = map.getBounds();

    const newMarkerDatas = [];
    for (let index = 0; index < data.length; index++) {
      const markerBounds = [
        parseFloat(data[index].lat),
        parseFloat(data[index].lng),
      ];

      if (
        swlat < markerBounds[0] &&
        markerBounds[0] < nelat &&
        swlng < markerBounds[1] &&
        markerBounds[1] < nelng
      ) {
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: new window.kakao.maps.LatLng(
            parseFloat(data[index].lat),
            parseFloat(data[index].lng)
          ),
          image: markerImage,
        });
        markerMap.set(data[index].id, marker);
        newMarkerDatas.push(data[index]);
      }
    }
    setMarkerDatas(newMarkerDatas);
  }, [map]);

  useIonViewDidEnter(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(INIT_CENTER_LAT, INIT_CENTER_LNG),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);
    setMap(map);
  });

  // 지도 첫 렌더링 시 한번 실행
  useEffect(() => {
    if (map && data.length > 0) {
      if (!isSearchOpen) {
        updateRenderMarkers();
        window.kakao.maps.event.addListener(map, "idle", updateRenderMarkers);
      } else {
        window.kakao.maps.event.removeListener(
          map,
          "idle",
          updateRenderMarkers
        );
      }
    }
  }, [map, data, isSearchOpen]);

  return { markerDatas, setCurrentPosition, zoomIn };
}

export default useKakaoMap;
