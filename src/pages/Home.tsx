import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, useIonViewWillEnter, IonThumbnail } from '@ionic/react';
import React, { useState } from 'react';

interface Pin {
  city: string;
  country: string;
  image: string;
}

const Home: React.FC = () => {

  const [collection, setCollection] = useState<Pin[]>([]);

  useIonViewWillEnter(async () => {
    const result = await fetch('https://collections-svc.azurewebsites.net/api/GetAllItems', {
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
  return (
    <IonItem >
      <IonThumbnail slot="start">
        <img src={pin.image+'?sv=2019-02-02&ss=bfqt&srt=sco&sp=rwdlacup&se=2020-01-01T14:27:59Z&st=2019-12-21T06:27:59Z&spr=https&sig=2F42cYKvNvTgH%2BpOPCMoadR7tAF9sUPNe0%2Br05jo89Y%3D'} />
      </IonThumbnail>
      <IonLabel>
        <h2>{pin.city}</h2>
        <p>{pin.country}</p>
      </IonLabel>
    </IonItem>
  );
}

export default Home;
