import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './NotAuthenticated/login/login.component';
import {PageNotFoundComponent} from './Authenticated/page-not-found/page-not-found.component';
import {AdminPageComponent} from './Authenticated/admin-page/admin-page.component';
import {AuthAdminGuard} from './service/guard/auth-admin.guard';
import {UserPageComponent} from './Authenticated/user-page/user-page.component';
import {RegisterComponent} from './NotAuthenticated/register/register.component';
import {AuthUserGuard} from './service/guard/auth-user.guard';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'page-not-found', component: PageNotFoundComponent},
  {
    path: 'admin', component: AdminPageComponent,
    canActivate: [AuthAdminGuard], children: [],
  },
  {
    path: '', component: UserPageComponent,
    canActivate: [AuthUserGuard], children: []
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/page-not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
