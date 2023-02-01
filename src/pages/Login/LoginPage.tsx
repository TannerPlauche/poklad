import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps, useParams, withRouter } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import { capitalize } from 'lodash'
import './LoginPage.css';
import { useEffect, useState } from 'react';

import { auth, logInWithEmailAndPassword } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { APP_ROUTES } from '../../components/Menu';

interface LoginPageProps extends RouteComponentProps {
    history: any;
}
const LoginPage: React.FC<LoginPageProps> = ({ history }: LoginPageProps) => {

    const { name } = useParams<{ name: string; }>();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState("");
    const [modalVisible, setModalVisible] = useState("");
    const [user, loading, error] = useAuthState(auth);

    const goHome = () => history.push(APP_ROUTES.home);

    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) {
            // navigation.reset({
            //     index: 0,
            //     routes: [{ name: RouteNames.HOME }],
            // });
            goHome();
        }
    }, [user, loading]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Login</IonCardTitle>
                        {/* <IonCardSubtitle>Yo</IonCardSubtitle> */}
                    </IonCardHeader>
                    <IonCardContent>
                        <IonItem>
                            <IonLabel position="floating" color="primary"
                            >Email</IonLabel>
                            <IonInput
                                type="email"
                                color="primary"
                                value={email}
                                onIonChange={(event) => {
                                    console.log('text: ', event.target.value);

                                    setEmail(event.target.value as string);
                                }}
                                placeholder="E-mail Address"
                            ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel
                                position="floating"
                                color="primary"
                            >Password</IonLabel>
                            <IonInput
                                type="password"
                                color="primary"
                                value={password}
                                onIonChange={(event) => {
                                    console.log('text: ', event.target.value);
                                    setPassword(event.target.value as string);
                                }}
                                placeholder="E-mail Address"
                            ></IonInput>
                        </IonItem>
                        {/* <IonItem> */}

                        {/* </IonItem> */}
                    </IonCardContent>
                    <IonButton
                        color='primary'
                        shape="round"
                        size="default"
                        onClick={() => logInWithEmailAndPassword(email, password)}
                    >Login</IonButton>
                </IonCard>


            </IonContent>
        </IonPage>
    );
};

export default withRouter(LoginPage);
