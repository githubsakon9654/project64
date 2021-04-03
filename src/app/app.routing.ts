import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './index/login/login.component';
import { HomeComponent } from './index/home/home.component';
import { RegisterComponent } from './material-component/register/register.component';
import { ProfileComponent } from './index/profile/profile.component';
import { BoardAdminComponent } from './index/board-admin/board-admin.component';
import { BoardModeratorComponent } from './index/board-moderator/board-moderator.component';
import { BoardUserComponent } from './index/board-user/board-user.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  { path: 'login',component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
];
