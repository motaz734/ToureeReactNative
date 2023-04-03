import {Welcome} from './Welcome';
import {Signup} from './SignUp';
import {Signin} from './SignIn';
import {Home} from './Home';
import {Search} from './Search';
import {MainNavigator} from './MainNavigator';
import {Profile} from './Profile';
import {Place} from './Place';

export const routes = {
  Auth: [
    {path: 'Welcome', component: Welcome},
    {path: 'SignUp', component: Signup},
    {path: 'SignIn', component: Signin},
  ],
  App: [
    {path: 'Home', component: Home, icon: 'home'},
    {path: 'Search', component: Search, icon: 'search'},
    {path: 'Profile', component: Profile, icon: 'person'},
  ],
  Common: [
    {path: 'MainNavigator', component: MainNavigator},
    {path: 'Place', component: Place},
  ],
};
