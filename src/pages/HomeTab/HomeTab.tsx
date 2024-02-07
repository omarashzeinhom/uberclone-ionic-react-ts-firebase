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
import { goldTool,  threeDCar, threeDClock } from "../../utilities/useRouter/constants";

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
  const [currentLocation, setCurrentLocation] = useState<number[]>([0, 0]);
  const history = useHistory();
  
  // DEBUG  
  // console.log(user);
  // console.log(setUser);
  console.log(`currentLocation ---> ${currentLocation}`);

  const handleCurrentLocationChange = (location: number[]) => {
    setCurrentLocation(location);
  };
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
          onCurrentLocationChange={handleCurrentLocationChange} // Add this prop
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
                      <IonImg src={threeDCar} />
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
                      <IonImg src={goldTool}
                      />
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
                      <IonImg src={threeDClock} />
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
                      threeDCar
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
