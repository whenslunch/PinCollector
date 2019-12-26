import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, useIonViewWillEnter, IonThumbnail } from '@ionic/react';
import React, { useState } from 'react';


// These names must match EXACTLY to the JSON returned. Case sensitive and everything.

interface Pin {
  itemNumber: string;
  country: string;
  city: string;

}

const Home: React.FC = () => {

  const [collection, setCollection] = useState<Pin[]>([]);

  useIonViewWillEnter(async () => {
    const result = await fetch('https://collections-svc-dn.azurewebsites.net/api/GetAllItems', {
      headers: { 'Accept': 'application/json'}
    });
    const data = await result.json();
    setCollection(data);
  
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Guitar Pin Collection</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {collection.map((pin, idx) => <CollectionItem key={idx} pin={pin} />)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

const CollectionItem: React.FC<{ pin: Pin }> = ({ pin }) => {

  const imagesource = 'https://collections-svc-dn.azurewebsites.net/api/GetImage/'.concat(pin.itemNumber);
  console.log( "CollectionItem: request image ", imagesource);

  return (
    <IonItem >
      <IonThumbnail slot="start">
        <img src={imagesource} />
      </IonThumbnail>
      <IonLabel>
        <h2>{pin.city}</h2>
        <p>{pin.country}</p>
      </IonLabel>
    </IonItem>
  );
}

export default Home;
