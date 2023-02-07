import { IonButtons, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Page.css';

interface iPageProps {
  pageName: string;
  children: any;
}


const Page: React.FC<iPageProps> = ({ children, pageName }: iPageProps) => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton auto-hide={false} disabled={false} />
          </IonButtons>
          <IonTitle>{pageName}</IonTitle>
        </IonToolbar>

      </IonHeader>

      {children}

    </IonPage>
  );
};

export default Page;
