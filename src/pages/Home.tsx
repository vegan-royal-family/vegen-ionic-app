import {
  IonContent,
  IonPage,
  useIonViewDidEnter,
  IonFabButton,
  IonFab,
  IonModal,
} from "@ionic/react";
import { useState, useRef } from "react";
import { Geolocation } from "@capacitor/geolocation";
import { ReactComponent as PlusIcon } from "../assets/icons/plus.svg";
import { ReactComponent as AimingIcon } from "../assets/icons/aiming.svg";
import "./Home.scss";

declare global {
  interface Window {
    kakao: any;
  }
}

const getDeviceLocation = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  console.log("Current position:", coordinates);
};

const Home: React.FC = () => {
  const [marker, setMarker] = useState([]);
  const modalRef = useRef<HTMLIonModalElement>(null);

  useIonViewDidEnter(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);
  });

  return (
    <IonPage>
      <IonModal
        id="ion-user-modal"
        ref={modalRef}
        isOpen={true}
        initialBreakpoint={0.15}
        breakpoints={[0.15, 1]}
        backdropDismiss={false}
        backdropBreakpoint={0.75}
      >
        <IonContent className="ion-padding"></IonContent>
      </IonModal>
      <IonContent fullscreen>
        <IonFab slot="fixed" vertical="center" horizontal="end">
          <IonFabButton>
            <AimingIcon />
          </IonFabButton>
          <IonFabButton>
            <PlusIcon width={24} height={24} />
          </IonFabButton>
        </IonFab>
        <div id="map" style={{ width: "100%", height: "100%" }}></div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
