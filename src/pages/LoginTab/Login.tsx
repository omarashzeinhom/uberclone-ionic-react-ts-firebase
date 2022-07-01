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
import  { useEffect } from "react";
import "./Login.scss";
//Custom use router
//Sign with popup imported directly from firebase auth
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
//from Firebase.tsx file in root folder
import { auth, provider } from "../../Firebase";
import { useHistory } from "react-router";
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
                  src="https://res.cloudinary.com/dxgqvvg0z/image/upload/v1656556783/UBERCLONE%20APP/Black_Gold_Luxury_Jewelry_Logo_uerwjw.png"
                />
              </IonCol>
              <IonCol size="12">
                <IonImg
                  src={
                    "https://res.cloudinary.com/dxgqvvg0z/image/upload/v1656556781/UBERCLONE%20APP/undraw_electric_car_b-7-hl_uiuqju.svg"
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
          
      <IonCardSubtitle>
       @ Made By Omar Zeinhom 2022
      </IonCardSubtitle>
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
