import { IonContent, IonModal, IonText } from "@ionic/react";
import { useRef } from "react";

const BottomModal = () => {
  const modalRef = useRef<HTMLIonModalElement>(null);
  const initialModalHeight = 80;
  const initialBreakPoint = parseFloat(
    (initialModalHeight / window.innerHeight).toFixed(3)
  );

  return (
    <IonModal
      id="main-bottom-modal"
      ref={modalRef}
      isOpen={true}
      initialBreakpoint={initialBreakPoint}
      breakpoints={[initialBreakPoint, 0.98]}
      backdropDismiss={false}
      backdropBreakpoint={0.8}
    >
      <IonContent className="ion-padding">
        <IonText>
          안녕하세요 <span>김땡땡</span>님
        </IonText>
      </IonContent>
    </IonModal>
  );
};

export default BottomModal;
