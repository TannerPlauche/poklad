import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonInput, IonItem, IonLabel } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';
import './RegisterPage.css';
import { useEffect, useState } from 'react';

import { auth, registerWithEmailAndPassword } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { APP_ROUTES } from '../../components/Menu';
import Page from '../Page';

interface RegisterPageProps extends RouteComponentProps {
    history: any;
}
const RegisterPage: React.FC<RegisterPageProps> = ({ history }: RegisterPageProps) => {

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);

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
        <Page pageName='Register'>
            <IonContent>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Register</IonCardTitle>
                        {/* <IonCardSubtitle>Yo</IonCardSubtitle> */}
                    </IonCardHeader>
                    <IonCardContent>
                        <IonItem>
                            <IonLabel position="floating" color="primary"
                            >Name</IonLabel>
                            <IonInput
                                type="text"
                                color="primary"
                                value={name}
                                onIonChange={(event) => {
                                    console.log('text: ', event.target.value);

                                    setName(event.target.value as string);
                                }}
                                placeholder="E-mail Address"
                            ></IonInput>
                        </IonItem>
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
                            Already have an account?
                            <IonItem routerLink={APP_ROUTES.login} routerDirection="none" lines="none" detail={false}>
                                <IonLabel>LOG IN HERE</IonLabel>
                            </IonItem>
                        </IonItem>
                    </IonCardContent>
                    <IonButton
                        color='primary'
                        shape="round"
                        size="default"
                        onClick={() => registerWithEmailAndPassword(name, email, password)}
                    >Register</IonButton>
                </IonCard>


            </IonContent>
        </Page >

    );
};

export default withRouter(RegisterPage);
