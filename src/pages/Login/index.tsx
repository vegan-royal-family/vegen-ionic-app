import "./style/style.scss";
import { IonPage, IonContent, IonText, IonButton } from "@ionic/react";
import styled from "@emotion/styled";
import Icon from "components/common/Icon";
import theme from "styles/theme";

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
              <Icon icon="kakao" />
            </IonButton>
            <IonButton className="google-btn">
              <Icon icon="google" />
            </IonButton>
            <IonButton className="apple-btn">
              <Icon icon="apple" />
            </IonButton>
          </div>
        </ContentWrapper>
      </IonContent>
    </IonPage>
  );
};

export default Login;
