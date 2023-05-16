import {Welcome} from './Welcome';
import {Signup} from './SignUp';
import {Signin} from './SignIn';
import {Home} from './Home';
import {Search} from './Search';
import {MainNavigator} from './MainNavigator';
import {Profile} from './Profile';
import {Place} from './Place';
import {Gallery} from './Gallery';
import {Reviews} from './Reviews';
import {SearchResults} from './SearchResults';
import {Attraction} from './Attraction';
import {FAQ} from './FAQ';
import {Favorites} from './Favorites';

export const routes = {
  Auth: [
    {path: 'Welcome', component: Welcome},
    {path: 'SignUp', component: Signup},
    {path: 'SignIn', component: Signin},
  ],
  App: [
    {path: 'Home', component: Home, icon: 'home'},
    {path: 'Search', component: Search, icon: 'magnify'},
    {path: 'Favorites', component: Favorites, icon: 'heart'},
    // {path: 'Profile', component: Profile, icon: 'account'},
    {path: 'Settings', component: Profile, icon: 'cog'},
  ],
  Common: [
    {path: 'MainNavigator', component: MainNavigator},
    {path: 'Place', component: Place},
    {path: 'Attraction', component: Attraction},
    {path: 'Gallery', component: Gallery},
    {path: 'Reviews', component: Reviews},
    {path: 'SearchResults', component: SearchResults},
    {path: 'FAQ', component: FAQ},
  ],
};
