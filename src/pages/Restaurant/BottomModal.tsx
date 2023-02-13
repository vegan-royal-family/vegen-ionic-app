import { IonContent, IonModal } from "@ionic/react";
import { useRef } from "react";

const BottomModal = () => {
  const modalRef = useRef<HTMLIonModalElement>(null);

  return (
    <IonModal
      id="ion-user-modal"
      ref={modalRef}
      isOpen={true}
      initialBreakpoint={0.15}
      breakpoints={[0.15, 1]}
      backdropDismiss={false}
      backdropBreakpoint={0.8}
    >
      <IonContent className="ion-padding"></IonContent>
    </IonModal>
  );
};

export default BottomModal;
