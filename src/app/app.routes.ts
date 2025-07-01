

import {Routes} from '@angular/router';

import {Home} from './home'
import { Site1 } from './site1';
import { Site2 } from './site2';
import { Site3 } from './site3';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },

    {
        path: 'home',
        title: 'Home',
        component: Home,
    },
    {
        path: 'site1',
        title: 'Site 1',
        component: Site1,
    },
    {
        path: 'site2',
        title: 'Site 2',
        component: Site2,
    },
    {
        path: 'site3',
        title: 'Site 3',
        component: Site3,
    },
];

