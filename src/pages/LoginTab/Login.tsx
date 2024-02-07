import {
  IonButton,
  IonCardSubtitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect } from "react";
import "./Login.scss";
//Custom use router
//Sign with popup imported directly from firebase auth
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
//from Firebase.tsx file in root folder
import { auth, provider } from "../../Firebase";
import { useHistory } from "react-router";
import { logo, threeDCar } from "../../utilities/useRouter/constants";
//

const Login = () => {
  const history = useHistory();
  console.log(history);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        history.push("/");
        setUser({
          name: user.displayName,
          photoUrl: user.photoURL,
        });
      }
    });
  });

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar>
            <IonTitle size={"large"}>Login</IonTitle>
          </IonToolbar>

          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonImg
                  className="login__icon"
                  src={logo}
                />
              </IonCol>
              <IonCol size="12">
                <IonImg
                  src={
                    threeDCar
                  }
                  class="login__svg"
                />
              </IonCol>
              <IonCol size="12">
                <IonButton
                  color={"success"}
                  expand={"block"}
                  onClick={() => signInWithPopup(auth, provider)}
                >
                  Sign in with Google
                </IonButton>
              </IonCol>

              <IonCardSubtitle>@ Made By Omar Zeinhom 2022</IonCardSubtitle>
            </IonRow>
          </IonGrid>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Login;

function setUser(arg0: { name: string | null; photoUrl: string | null }) {
  throw new Error("Function not implemented.");
}
