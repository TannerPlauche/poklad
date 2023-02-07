import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonInput, IonItem, IonLabel } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';
import './LoginPage.css';
import { useEffect, useState } from 'react';

import { auth, logInWithEmailAndPassword } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { APP_ROUTES } from '../../components/Menu';
import Page from '../Page';

interface LoginPageProps extends RouteComponentProps {
    history: any;
}
const LoginPage: React.FC<LoginPageProps> = ({ history }: LoginPageProps) => {


    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState("");
    const [
        user,
        loading,
        //  error
    ] = useAuthState(auth);

    const goHome = () => history.push(APP_ROUTES.home);

    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) {
            goHome();
        }
    }, [user, loading]);

    return (
        <Page pageName='Login'>

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
                    <IonCardContent>
                        <IonItem>
                            Don't have an account?
                            <IonItem routerLink={APP_ROUTES.register} routerDirection="none" lines="none" detail={false}>
                                <IonLabel>REGISTER HERE</IonLabel>
                            </IonItem>
                        </IonItem>
                    </IonCardContent>
                    <IonButton
                        color='primary'
                        shape="round"
                        size="default"
                        onClick={() => logInWithEmailAndPassword(email, password)}
                    >Login</IonButton>
                </IonCard>


            </IonContent>
        </Page>
    );
};

export default withRouter(LoginPage);
