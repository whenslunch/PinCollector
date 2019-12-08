import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, useIonViewWillEnter, IonThumbnail } from '@ionic/react';
import React, { useState } from 'react';

interface Pin {
  Partitionkey: string;
  Rowkey: string;
  Timestamp: string;
  City: string;
  Country: string;
  Image: string;
}

const Home: React.FC = () => {

  const [collection, setCollection] = useState<Pin[]>([]);

  useIonViewWillEnter(async () => {
    const result = await fetch('https://collectionsappsa.table.core.windows.net/Collections?sv=2019-02-02&ss=bt&srt=sco&sp=rwdlacu&se=2019-12-15T05:47:01Z&st=2019-12-08T21:47:01Z&spr=https&sig=EJoaJ4V%2FPsi9XVAf%2FPsf9Jx59doeKLm7K3P48Nglhx4%3D', {
      headers: { 'Accept': 'application/json;odata=nometadata'}
    });
    const data = await result.json();
    setCollection(data.value);
  
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
        <img src={pin.Image+'?sv=2019-02-02&ss=bt&srt=sco&sp=rwdlacu&se=2019-12-15T05:47:01Z&st=2019-12-08T21:47:01Z&spr=https&sig=EJoaJ4V%2FPsi9XVAf%2FPsf9Jx59doeKLm7K3P48Nglhx4%3D'} />
      </IonThumbnail>
      <IonLabel>
        <h2>{pin.City}</h2>
        <p>{pin.Country}</p>
      </IonLabel>
    </IonItem>
  );
}

export default Home;
