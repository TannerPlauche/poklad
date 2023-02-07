import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonItem, IonLabel, IonList } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';
import './PokladsPage.css';

import Page from '../Page';
import { iPoklad } from '../../utils/types';

interface PolkadsPageProps extends RouteComponentProps {
    history: any;
    poklads: iPoklad[];
}
const PolkadsPage: React.FC<PolkadsPageProps> = ({ poklads }: PolkadsPageProps) => {

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
                                <IonItem key={poklad.id}>
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
