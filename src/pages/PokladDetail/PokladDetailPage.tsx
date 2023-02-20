import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import { RouteComponentProps, useParams, withRouter } from 'react-router';
import './PokladDetailPage.css';

import Page from '../Page';
import { iPoklad } from '../../utils/types';
import { APP_ROUTES } from '../../components/Menu';
import { chevronBackOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { getDocs, query, where } from 'firebase/firestore';
import { CLUES_COLLECTION } from '../../utils/firebase';

interface PolkadDetailPageProps extends RouteComponentProps {
    history: any;
    poklads: iPoklad[];
}
const PolkadDetailPage: React.FC<PolkadDetailPageProps> = ({ poklads, history }: PolkadDetailPageProps) => {

    const [clues, setClues] = useState<any[]>([])

    const params = useParams() as any;
    console.log('params: ', params);
    const id = params.id;
    const poklad = poklads.find(poklad => poklad.id === id);
    console.log('poklad: ', poklad);
    const goToPokladList = () => {
        history.push(APP_ROUTES.poklads);
    }

    useEffect(() => {
        console.log('getting poklad');
        const getData = async () => {

            const q = query(CLUES_COLLECTION, where('pokladId', '==', id));

            const querySnapshot = await getDocs(q);
            const pokladData: any[] = [];
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                pokladData.push({ id: doc.id, ...doc.data() });
            });
            setClues(pokladData);
            console.log('poklad clues: ', pokladData);

        }

        getData();

    }, [id]);;



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
                    {!!clues?.length &&
                        <IonList>
                            {clues.map((clue) => (
                                <IonItem key={clue.id}>{clue.clue}</IonItem>
                            ))}
                        </IonList>
                    }
                    <IonCardContent>

                    </IonCardContent>
                </IonCard>
            </IonContent>
        </Page>
    );
};

export default withRouter(PolkadDetailPage);
