import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';

import { useEffect, useState } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
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
import { query, getDocs } from "firebase/firestore";
import { auth } from './utils/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import HomePage from './pages/Home/HomePage';
import { iPoklad } from './utils/types';
import PokladsPage from './pages/Poklads/PokladsPage';
import PokladDetailPage from './pages/PokladDetail/PokladDetailPage';
setupIonicReact();

const App: React.FC = () => {

  const [
    poklads,
    setPoklads
  ] = useState<iPoklad[]>([]);
  const [
    user,
    // loading,
    // error
  ] = useAuthState(auth);

  useEffect(() => {
    console.log(user);
  }, [user])

  useEffect(() => {
    const getData = async () => {
      if (!user) {
        return;
      }

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

  }, [user]);;

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu loggedIn={!!user} />
          <IonRouterOutlet id="main">
            <Route path={[APP_ROUTES.login, APP_ROUTES.default]}
              exact={true}>
              <LoginPage />
            </Route>
            <Route path={APP_ROUTES.register}
              exact={true}>
              <RegisterPage />
            </Route>
            <Route path={APP_ROUTES.home}
              exact={true}>
              <HomePage />
            </Route>
            <Route path={APP_ROUTES.poklads}
              exact={true}>
              <PokladsPage poklads={poklads} />
            </Route>
            <Route path={APP_ROUTES.pokladDetail}
              exact={true}>
              <PokladDetailPage poklads={poklads} />
            </Route>
            <Route path={APP_ROUTES.about}
              exact={true}>
              <Page
                pageName='About'
                children={null} />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
