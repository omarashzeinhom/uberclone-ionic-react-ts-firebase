import {
  IonAvatar,
  IonImg,
  IonItem,
  IonItemDivider,
  IonList,
  IonText,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import "./RideSelector.scss";
// Fake api data to test out functionality for now
import rideList from "../../data/rideList";

interface MapsProps {
  pickupCoordinates: number[];
  dropOffCoordinates: number[];
}

const RideSelector: React.FC<MapsProps> = ({
  pickupCoordinates,
  dropOffCoordinates,
}) => {
  // Make Sure Maps
  //console.log(pickupCoordinates,dropOffCoordinates)
  const [tripTime, setTripTime] = useState(0);

  useEffect(() => {
    const pickupdrive = `${pickupCoordinates[0]},${pickupCoordinates[1]}`;
    const dropoffdrive = `${dropOffCoordinates[0]},${dropOffCoordinates[1]}`;
    const access_token = `?access_token=pk.eyJ1Ijoib21hcmFzaHplaW5ob205OCIsImEiOiJjbDRrMXY5c3MwN3ZpM2NxcHp3ZGVmN3ZyIn0.3Ziuh7Utama_wz_4s8qh2g`;
    const apidirections = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupdrive};${dropoffdrive}${access_token}`;

    //get trip time from map box api
    //2pickup coordinates and 2 points for the dropoff location [x]
    const tripTime = fetch(`${[apidirections]}`)
      .then((response) => response.json())
      .then((data) => {
        setTripTime(data.routes[0].duration / 100);
      });
    //these are added to the dependency array to show the setTripTime dont remove or it will not be shown
 console.log(tripTime);
  
  }, [pickupCoordinates, dropOffCoordinates]);

  return (
    <IonList>
      {rideList.map((ride, index) => (
        <IonItem key={index}>
          <IonAvatar slot="start">
            <IonImg src={ride.imgUrl} />
          </IonAvatar>
          <IonText slot="start">
            <p>{ride.service}</p>
            <small className="worker__time">15 mins away</small>
          </IonText>
          <IonText slot="end">
            <p> {"$" + (tripTime * ride.multiplier).toFixed(2)}</p>
          </IonText>
        </IonItem>
      ))}

      <IonItemDivider />
    </IonList>
  );
};

export default RideSelector;
