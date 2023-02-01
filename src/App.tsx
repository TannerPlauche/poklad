import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact, useIonRouter } from '@ionic/react';
import { useEffect, useState } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useHistory } from 'react-router-dom';
import Menu, { APP_ROUTES } from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import './theme/variables.css';
import { POKLAD_COLLECTION } from './utils/firebase';
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, registerWithEmailAndPassword } from './utils/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import LoginPage from './pages/Login/LoginPage';
import { createBrowserHistory } from 'history';
setupIonicReact();

const App: React.FC = () => {

  const [poklads, setPoklads] = useState<any[]>([]);
  const [user, loading, error] = useAuthState(auth);


  useEffect(() => {
    const getData = async () => {
      const q = query(POKLAD_COLLECTION);

      const querySnapshot = await getDocs(q);
      const pokladData: any[] = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        pokladData.push({ id: doc.id, ...doc.data() });
      });
      setPoklads(pokladData.reverse());
      console.log(JSON.stringify(pokladData));
    }

    getData();

    // setDoc(
    //     doc(POKLAD_COLLECTION),
    //     { name: 'poklad 3', amount: 10000, region: 'midwest' }
    // );
  }, []);;

  const history = useIonRouter()

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu loggedIn={!!user} />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/page/Inbox" />
            </Route>
            <Route path={APP_ROUTES.login} exact={true}>
              <LoginPage />
            </Route>
            <Route path={APP_ROUTES.home} exact={true}>
              <Page />
            </Route>
            <Route path={APP_ROUTES.poklads} exact={true}>
              <Page />
            </Route>
            <Route path={APP_ROUTES.pokladDetail} exact={true}>
              <Page />
            </Route>
            <Route path={APP_ROUTES.about} exact={true}>
              <Page />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
