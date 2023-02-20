import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonItem, IonLabel, IonList } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';
import './PokladsPage.css';

import Page from '../Page';
import { iPoklad } from '../../utils/types';
import { APP_ROUTES } from '../../components/Menu';

interface PolkadsPageProps extends RouteComponentProps {
    history: any;
    poklads: iPoklad[];
}
const PolkadsPage: React.FC<PolkadsPageProps> = ({ poklads, history }: PolkadsPageProps) => {

    const goToDetail = (pokladId: string) => {
        if (!pokladId) {
            return;
        }

        history.push(APP_ROUTES.pokladDetail.replace(':id', pokladId));
    }

    return (
        <Page pageName='Poklads'>
            <IonContent fullscreen>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Poklad</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonList>
                            {!!poklads.length && poklads.map((poklad) => (
                                <IonItem key={poklad.id} onClick={() => goToDetail(poklad.id)}>
                                    <IonLabel>{poklad.name}</IonLabel>
                                </IonItem>
                            ))}
                        </IonList>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </Page>
    );
};

export default withRouter(PolkadsPage);
