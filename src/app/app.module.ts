
//import { myInterceptor } from './auth/httpconfig.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { AppComponent } from './app.component';
import { GstAddComponent } from './gst-add/gst-add.component';
import { GstGetComponent } from './gst-get/gst-get.component';
import { GstEditComponent } from './gst-edit/gst-edit.component';
import { AlertComponent } from './alert/alert.component';
import { BusinessService } from './business.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AlertService } from './login/alert.service';


@NgModule({
  declarations: [
    AppComponent,
    GstAddComponent,
    GstGetComponent,
    GstEditComponent,
    LoginComponent,
    AlertComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
          console.log("Procurando Token")
          console.log(localStorage.getItem('access_token'))
             return  localStorage.getItem('access_token');},
        whitelistedDomains: ['api-4health.azurewebsites.net', 'localhost:56655'],                                       
        blacklistedRoutes: ['api-4health.azurewebsites.net/api/login', 'localhost:56655/api/login']
      }
    })
    
  ],
  providers: [BusinessService,  AlertService
  /*  {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true
    }*/
  ],
//providers: [ BusinessService],
  bootstrap: [AppComponent]
})
export class AppModule { }
