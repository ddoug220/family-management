import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, homeSharp, settingsSharp, textSharp } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

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
import TaskListView from './components/TaskList';
import MainDashboard from './pages/task-pages/Dashboard';
import TaskDetailView from './components/TaskDetail';
import DetailedCalendarView from './components/Calendar';
import SettingsPage from './pages/Settings';
import MessagesPage from './pages/task-pages/Messages';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
        <Route exact path="/dashboard" component={MainDashboard} />
        <Route exact path="/tasks" component={TaskListView} />
        <Route path="/tasks/:taskId" component={TaskDetailView} />
        <Route exact path="/calendar" component={DetailedCalendarView} />
        <Route exact path="/messages" component={MessagesPage} />
        <Route exact path="/settings" component={SettingsPage} />
   {
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
          }
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/dashboard">
            <IonIcon aria-hidden="true" icon={homeSharp} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/messages">
            <IonIcon aria-hidden="true" icon={textSharp} />
            <IonLabel>Messages</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/settings">
            <IonIcon aria-hidden="true" icon={settingsSharp} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
