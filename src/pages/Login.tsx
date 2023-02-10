import { IonPage, IonContent, IonText, IonButton } from "@ionic/react";
import styled from "@emotion/styled";
import theme from "../styles/theme";
import "./Login.scss";
import { ReactComponent as KakaoIcon } from "../assets/icons/kakao.svg";
import { ReactComponent as GoogleIcon } from "../assets/icons/google.svg";
import { ReactComponent as AppleIcon } from "../assets/icons/apple.svg";

const ImageBox = styled.div`
  margin: 75px 0 12px;
  width: 100%;
  height: 400px;
  background: #ededed;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .info-text {
    ${theme.typography.body3}
  }
  .btn-group {
    margin-top: 16px;
  }
`;

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <ImageBox />
        <ContentWrapper>
          <IonText>
            <span className="info-text">
              간편하게 로그인하고 비건에 대해 알아보아요
            </span>
          </IonText>
          <div className="btn-group">
            <IonButton className="kakao-btn">
              <KakaoIcon />
            </IonButton>
            <IonButton className="google-btn">
              <GoogleIcon />
            </IonButton>
            <IonButton className="apple-btn">
              <AppleIcon />
            </IonButton>
          </div>
        </ContentWrapper>
      </IonContent>
    </IonPage>
  );
};

export default Login;
