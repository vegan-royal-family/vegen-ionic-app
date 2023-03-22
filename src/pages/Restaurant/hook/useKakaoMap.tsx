import { useIonViewDidEnter } from "@ionic/react";
import { useState, useEffect, useCallback } from "react";
import { Geolocation } from "@capacitor/geolocation";
import { PositionDataType } from "types/restaurant";

declare global {
  interface Window {
    kakao: any;
  }
}

type HookParametersType = {
  markerDatas: Array<PositionDataType>;
  openSearchModal: boolean;
};

const INIT_CENTER_LAT = 37.5581772;
const INIT_CENTER_LNG = 126.934464;
const DEFAULT_IMG_SRC = "/assets/icon/marker_default.svg";
const ACTIVE_IMG_SRC = "/assets/icon/marker_active.svg";

function useKakaoMap({ markerDatas, openSearchModal }: HookParametersType) {
  const [map, setMap] = useState<any | null>(null);
  const [viewportMarkerDatas, setViewportMarkerDatas] = useState<
    Array<PositionDataType>
  >([]);
  const [activeMarkerKey, setActiveMarkerKey] = useState<string | null>(null);

  const imgSize = new window.kakao.maps.Size(32, 32);
  const defaultMarkerImage = new window.kakao.maps.MarkerImage(
    DEFAULT_IMG_SRC,
    imgSize
  );
  const activeMarkerImage = new window.kakao.maps.MarkerImage(
    ACTIVE_IMG_SRC,
    imgSize
  );

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

  const setAllMarkers = (map: any) => {
    for (let index = 0; index < markerDatas.length; index++) {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(
          parseFloat(markerDatas[index].lat),
          parseFloat(markerDatas[index].lng)
        ),
        image: defaultMarkerImage,
        clickable: true,
      });
      window.kakao.maps.event.addListener(marker, "click", () =>
        onMarkerClicked(marker, markerDatas[index]?.id)
      );
      markerDatas[index].marker = marker;
    }
  };

  const updateViewportMarkerList = useCallback(() => {
    const { ha: swlng, oa: nelng, qa: swlat, pa: nelat } = map.getBounds();

    const newMarkerDatas = [];
    for (let index = 0; index < markerDatas.length; index++) {
      const markerBounds = [
        parseFloat(markerDatas[index].lat),
        parseFloat(markerDatas[index].lng),
      ];

      if (
        swlat < markerBounds[0] &&
        markerBounds[0] < nelat &&
        swlng < markerBounds[1] &&
        markerBounds[1] < nelng
      ) {
        const markerData = markerDatas[index];
        newMarkerDatas.push({
          ...markerData,
        });
      }
    }
    setViewportMarkerDatas(newMarkerDatas);
  }, [map]);

  const changeActiveMarker = (
    viewportMarkers: Array<PositionDataType>,
    marker: any
  ) => {
    if (viewportMarkers.length > 0) {
      viewportMarkers.forEach((item) =>
        item.marker.setImage(defaultMarkerImage)
      );
    }
    if (marker) {
      marker.setImage(activeMarkerImage);
    }
  };

  const onMarkerClicked = (marker: any, markerKey: string) => {
    marker.setImage(activeMarkerImage);
    setActiveMarkerKey(markerKey);
  };

  useIonViewDidEnter(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(INIT_CENTER_LAT, INIT_CENTER_LNG),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);
    setMap(map);
    setAllMarkers(map);
  });

  // 지도 첫 렌더링 시 한번 실행
  useEffect(() => {
    if (map && markerDatas.length > 0) {
      // 검색용 Modal이 열린 경우, idle 이벤트 리스너를 삭제해주어야 키보드가 정상적으로 표시됨
      if (!openSearchModal) {
        updateViewportMarkerList();
        window.kakao.maps.event.addListener(
          map,
          "idle",
          updateViewportMarkerList
        );
      } else {
        window.kakao.maps.event.removeListener(
          map,
          "idle",
          updateViewportMarkerList
        );
      }
    }
  }, [map, markerDatas, openSearchModal]);

  useEffect(() => {
    if (viewportMarkerDatas.length > 0) {
      viewportMarkerDatas.forEach((item) => {
        if (item.id === activeMarkerKey) {
          item.marker.setImage(activeMarkerImage);
        } else {
          item.marker.setImage(defaultMarkerImage);
        }
      });
    }
  }, [activeMarkerKey]);

  return {
    viewportMarkerDatas,
    activeMarkerKey,
    changeActiveMarker,
    setCurrentPosition,
    zoomIn,
  };
}

export default useKakaoMap;
