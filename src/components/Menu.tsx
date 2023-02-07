import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { appsOutline, home, informationOutline, mailSharp } from 'ionicons/icons';
import './Menu.css';
import { logout } from '../utils/firebase';

interface AppPage {
  url: APP_ROUTES;
  iosIcon: string;
  mdIcon: string;
  title: string;
  requireAuth: boolean;
  hideWhenLoggedIn?: boolean;
}


export enum RouteNames {
  HOME = 'HOME',
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  REGISTRATION = 'REGISTRATION',
  POKLAD_DETAIL = 'POKLAD DETAIL'
}

export enum APP_ROUTES {
  home = '/home',
  about = '/about',
  poklads = '/poklads',
  pokladDetail = '/',
  register = '/register',
  login = '/login'
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: APP_ROUTES.home,
    iosIcon: home,
    mdIcon: mailSharp,
    requireAuth: false,
  },
  {
    title: 'Login',
    url: APP_ROUTES.login,
    iosIcon: home,
    mdIcon: mailSharp,
    requireAuth: false,
    hideWhenLoggedIn: true,
  },
  {
    title: 'Poklads',
    url: APP_ROUTES.poklads,
    iosIcon: appsOutline,
    mdIcon: appsOutline,
    requireAuth: true,
  },
  {
    title: 'About',
    url: APP_ROUTES.about,
    iosIcon: informationOutline,
    mdIcon: informationOutline,
    requireAuth: true,
  },


];

interface iMenuProps {
  loggedIn: boolean
}

const Menu: React.FC<iMenuProps> = ({ loggedIn }: iMenuProps) => {
  const location = useLocation();

  const authRoutesFilter = (page: AppPage) => {
    if (loggedIn && page.hideWhenLoggedIn) {
      return false;
    }

    return loggedIn === page.requireAuth || !page.requireAuth
  };

  return (
    <IonMenu contentId="main" type="push">
      <IonContent>
        <IonList id="nav_menu">
          {appPages.filter(authRoutesFilter).map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
          {!!loggedIn &&
            <IonItem button onClick={logout}>
              <IonLabel>Log Out</IonLabel>
            </IonItem>
          }
        </IonList>

      </IonContent>
    </IonMenu>
  );
};

export default Menu;
