import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps, useParams, withRouter } from 'react-router';
import './HomePage.css';

import { APP_ROUTES } from '../../components/Menu';
import Page from '../Page';

interface HomePageProps extends RouteComponentProps {
    history: any;
}
const HomePage: React.FC<HomePageProps> = ({ history }: HomePageProps) => {

    // const goHome = () => history.push(APP_ROUTES.home);

    return (
        <Page pageName='Home'>
            <IonContent fullscreen>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Poklad</IonCardTitle>
                        {/* <IonCardSubtitle>Yo</IonCardSubtitle> */}
                    </IonCardHeader>
                    <IonCardContent>
                        This is the home page. Welcome to Poklad
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </Page>
    );
};

export default withRouter(HomePage);
