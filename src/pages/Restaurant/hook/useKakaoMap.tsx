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
  marker?: any;
};

type HookParametersType = {
  markerDatas: Array<PositionDataType>;
  openSearchModal: boolean;
};

const INIT_CENTER_LAT = 37.5581772;
const INIT_CENTER_LNG = 126.934464;

function useKakaoMap({ markerDatas, openSearchModal }: HookParametersType) {
  const [map, setMap] = useState<any | null>(null);
  const [viewportMarkerDatas, setViewportMarkerDatas] = useState<
    Array<PositionDataType>
  >([]);
  const [activeMarkerKey, setActiveMarkerKey] = useState<string | null>(null);

  const markerMap = new Map<string, any>();
  let selectedMarkerKey: string | null = null;

  const imgSize = new window.kakao.maps.Size(32, 32);
  const defaultImgSrc = "/assets/icon/marker_default.svg";
  const activeImgSrc = "/assets/icon/marker_active.svg";
  const defaultMarkerImage = new window.kakao.maps.MarkerImage(
    defaultImgSrc,
    imgSize
  );
  const activeMarkerImage = new window.kakao.maps.MarkerImage(
    activeImgSrc,
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

  const updateRenderMarkers = useCallback(() => {
    markerMap.forEach((item) => item.setMap(null));
    markerMap.clear();

    const { ha: swlng, oa: nelng, qa: swlat, pa: nelat } = map.getBounds();

    const newMarkerDatas = [];
    let existCurActiveMarker = false;
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
          onMarkerClicked(marker, markerDatas[index].id)
        );

        const isSelectedMarker = markerDatas[index].id === selectedMarkerKey;
        if (isSelectedMarker) {
          existCurActiveMarker = true;
          marker.setImage(activeMarkerImage);
        }
        markerMap.set(markerDatas[index].id, marker);
        newMarkerDatas.push({
          ...markerDatas[index],
          marker,
        });
      }
    }
    if (!existCurActiveMarker) {
      selectedMarkerKey = null;
      setActiveMarkerKey(null);
    }
    setViewportMarkerDatas(newMarkerDatas);
  }, [map]);

  const changeActiveMarker = (
    markerDatas: Array<any>,
    marker: any,
    markerKey: string
  ) => {
    if (selectedMarkerKey) {
      const beforeSelectedItem = markerDatas.filter(
        (item) => item.id === selectedMarkerKey
      )[0]?.marker;
      if (beforeSelectedItem) {
        beforeSelectedItem.setImage(defaultMarkerImage);
      }
    }

    if (marker) {
      marker.setImage(activeMarkerImage);
      selectedMarkerKey = markerKey;
    }
  };

  const onMarkerClicked = (marker: any, markerKey: string) => {
    if (selectedMarkerKey) {
      const beforeSelectedItem = markerMap.get(selectedMarkerKey);
      if (beforeSelectedItem) {
        beforeSelectedItem.setImage(defaultMarkerImage);
      }
    }
    marker.setImage(activeMarkerImage);
    selectedMarkerKey = markerKey;
    setActiveMarkerKey(markerKey);

    const { La, Ma } = marker.getPosition();
    map.setCenter(new window.kakao.maps.LatLng(Ma, La));
  };

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
    if (map && markerDatas.length > 0) {
      // 검색용 Modal이 열린 경우, idle 이벤트 리스너를 삭제해주어야 키보드가 정상적으로 표시됨
      if (!openSearchModal) {
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
  }, [map, markerDatas, openSearchModal]);

  return {
    viewportMarkerDatas,
    activeMarkerKey,
    changeActiveMarker,
    setCurrentPosition,
    zoomIn,
  };
}

export default useKakaoMap;
