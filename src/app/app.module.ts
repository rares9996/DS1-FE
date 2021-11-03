import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from './NotAuthenticated/login/login.component';
import {RegisterComponent} from './NotAuthenticated/register/register.component';
import {PageNotFoundComponent} from './Authenticated/page-not-found/page-not-found.component';
import {AdminPageComponent} from './Authenticated/admin-page/admin-page.component';
import {UserPageComponent} from './Authenticated/user-page/user-page.component';
import {AuthAdminGuard} from './service/guard/auth-admin.guard';
import {AuthUserGuard} from './service/guard/auth-user.guard';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {authInterceptorProviders} from './util/auth.interceptor';
import { EditUsersComponent } from './Authenticated/admin-page/edit-users/edit-users.component';
import { EditDevicesComponent } from './Authenticated/admin-page/edit-devices/edit-devices.component';
import { EditSensorsComponent } from './Authenticated/admin-page/edit-sensors/edit-sensors.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { UpdateDeviceComponent } from './Authenticated/admin-page/edit-devices/update-device/update-device.component';
import { UpdateSensorComponent } from './Authenticated/admin-page/edit-sensors/update-sensor/update-sensor.component';
import { UpdateUserComponent } from './Authenticated/admin-page/edit-users/update-user/update-user.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { MonitoredValuesDialogComponent } from './Authenticated/admin-page/edit-sensors/monitored-values-dialog/monitored-values-dialog.component';
import { UserChartComponent } from './Authenticated/user-page/user-chart/user-chart.component';
import { ChartsModule } from 'ng2-charts';
import { DeviceHistoryComponent } from './Authenticated/admin-page/edit-devices/device-history/device-history.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    AdminPageComponent,
    UserPageComponent,
    EditUsersComponent,
    EditDevicesComponent,
    EditSensorsComponent,
    UpdateDeviceComponent,
    UpdateSensorComponent,
    UpdateUserComponent,
    MonitoredValuesDialogComponent,
    UserChartComponent,
    DeviceHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule,
    ChartsModule
  ],
  providers: [AuthAdminGuard, AuthUserGuard, MatDatepickerModule, MatNativeDateModule, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
