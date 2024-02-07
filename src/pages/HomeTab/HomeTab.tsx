import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonPage,
  IonRouterLink,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
//Scss
import "./HomeTab.scss";
//Components
import Map from "../../components/Map/Map";
//Custom function useRouter like next js

//React
import { useState, useEffect } from "react";
import { useHistory } from "react-router";

//FireBase
import { onAuthStateChanged, signOut } from "firebase/auth";
//FireBase File in root folder
import { auth } from "../../Firebase";

interface MapsProps {
  pickupCoordinates: number[];
  dropOffCoordinates: number[];
  username: string;
  password: string;
  prevState: null;
  name: string;
}

const HomeTab: React.FC<MapsProps> = () => {
  const [user, setUser] = useState<any | null>(null);
  const history = useHistory();
  console.log(user);
  console.log(setUser);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user != null) {
        setUser({
          name: user.displayName,
          photoUrl: user.photoURL,
        });
      } else if (!user) {
        setUser(null);
        history.push("/login");
      }
    });
  }, [history]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Map
          name={"map"}
          dropOffCoordinates={[31.239661, 30.056156]}
          pickupCoordinates={[31.239661, 30.056156]}
        />
        {/**Header */}

        <IonGrid>
          <IonRow>
            <IonCol size="4">
              <IonRouterLink href="/tabs/search">
                <IonCard color={"light"}>
                  <IonCardContent>
                    <IonCardSubtitle class="ion-text-center">
                      Ride
                    </IonCardSubtitle>
                    <IonAvatar slot="end">
                      <IonImg src="https://res.cloudinary.com/dxgqvvg0z/image/upload/v1656550658/UBERCLONE%20APP/car-svgrepo-com_oojscg.svg" />
                    </IonAvatar>
                  </IonCardContent>
                </IonCard>
              </IonRouterLink>
            </IonCol>

            <IonCol size="4">
              <IonRouterLink href="/tabs/search">
                <IonCard color={"light"}>
                  <IonCardContent>
                    <IonCardSubtitle class="ion-text-center">
                      Type
                    </IonCardSubtitle>
                    <IonAvatar>
                      <IonImg src="https://res.cloudinary.com/dxgqvvg0z/image/upload/v1655585697/FIXITAPP/nextjs-app-images/ActionButtonImages/worker-tool-search_au8m9f.svg" />
                    </IonAvatar>
                  </IonCardContent>
                </IonCard>
              </IonRouterLink>
            </IonCol>
            <IonCol size="4">
              <IonRouterLink href="/tabs/search">
                <IonCard color={"light"}>
                  <IonCardContent>
                    <IonCardSubtitle class="ion-text-center">
                      Reserve
                    </IonCardSubtitle>
                    <IonAvatar class="ion-text-center">
                      <IonImg src="https://res.cloudinary.com/dxgqvvg0z/image/upload/v1655623254/FIXITAPP/nextjs-app-images/ActionButtonImages/clock-svgrepo-com_b913bl.svg" />
                    </IonAvatar>
                  </IonCardContent>
                </IonCard>
              </IonRouterLink>
            </IonCol>

            <IonCol>
              <IonRouterLink href="/tabs/search">
                <IonButton href="/tabs/search" expand="full" color={"dark"}>
                  Where to?
                </IonButton>
              </IonRouterLink>
            </IonCol>
          </IonRow>
        </IonGrid>
        {/**Action Btns */}

        {/**input btn */}

        <IonGrid size-sm>
          <IonRow>
            <IonCol size="6">
              <IonCard color={"light"}>
                <IonCardContent>
                  <IonCardTitle>WUBER CLONE APP</IonCardTitle>
                  <IonCardSubtitle>
                    By Omar Ashraf Zeinhom Abdelrahman
                  </IonCardSubtitle>
                  <IonImg
                    src={
                      "https://res.cloudinary.com/dxgqvvg0z/image/upload/v1656556781/UBERCLONE%20APP/undraw_electric_car_b-7-hl_uiuqju.svg"
                    }
                    className="fixit__header__logo"
                    slot="start"
                  />
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6">
              <IonCard color={"light"}>
                <IonCardContent>
                  <IonCardSubtitle class="ion-text-center">
                    {user && user?.name}
                  </IonCardSubtitle>

                  <IonAvatar>
                    {/**{user && user.phototUrl} */}
                    <IonImg
                      src={user && user?.photoUrl}
                      className="fixit__header__avatar"
                    />
                  </IonAvatar>
                  {user && (
                    <IonButton
                      color={"danger"}
                      expand={"block"}
                      onClick={() => signOut(auth)}
                    >
                      Logout
                    </IonButton>
                  )}

                  {!user && (
                    <IonRouterLink href="/login">
                      <IonButton color={"success"} expand={"block"}>
                        LogIn
                      </IonButton>
                    </IonRouterLink>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomeTab;
