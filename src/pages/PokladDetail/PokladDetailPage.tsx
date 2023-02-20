import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import { RouteComponentProps, useParams, withRouter } from 'react-router';
import './PokladDetailPage.css';

import Page from '../Page';
import { iPoklad } from '../../utils/types';
import { APP_ROUTES } from '../../components/Menu';
import { chevronBackOutline } from 'ionicons/icons';
import { Colors } from '../../utils/colors';

interface PolkadDetailPageProps extends RouteComponentProps {
    history: any;
    poklads: iPoklad[];
}
const PolkadDetailPage: React.FC<PolkadDetailPageProps> = ({ poklads, history }: PolkadDetailPageProps) => {

    const params = useParams() as any;
    console.log('params: ', params);
    const id = params.id;
    const poklad = poklads.find(poklad => poklad.id === id);
    console.log('poklad: ', poklad);
    const goToPokladList = () => {
        history.push(APP_ROUTES.poklads);
    }

    return (
        <Page pageName='Poklads'>
            <IonContent fullscreen>
                <div onClick={goToPokladList}>
                    <IonIcon icon={chevronBackOutline} />Back
                </div>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Poklad</IonCardTitle>
                        <IonCardTitle>{poklad?.name}</IonCardTitle>
                        <IonCardTitle>{poklad?.region}</IonCardTitle>
                        <IonCardTitle>{poklad?.amount}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>

                    </IonCardContent>
                </IonCard>
            </IonContent>
        </Page>
    );
};

export default withRouter(PolkadDetailPage);
