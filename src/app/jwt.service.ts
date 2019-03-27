import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import {  HttpHeaders, HttpRequest,  } from '@angular/common/http';
import { Token }  from "./auth/token";

@Injectable({
providedIn: 'root'
})

export class JwtService {
    constructor(private httpClient: HttpClient) { }

  //url = 'http://localhost:56655/api/login'; 
  url = 'https://api-4health.azurewebsites.net/api/login';


  loginUser(UserID: string, Accesskey: string) {
      return this.httpClient.post<any>(`${this.url}`, { UserID: UserID, Accesskey: Accesskey })
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
              if (user["message"] != "Falha ao autenticar") {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser',UserID);
                  localStorage.setItem('currentPass',Accesskey);
                  localStorage.setItem('access_token', user["accessToken"]);

              }

              return user["message"] ;
          }));
  }

login(UserID:string, Accesskey:string) {
  return this.httpClient.post(`${this.url}`, {UserID, Accesskey})
             .subscribe(res => localStorage.setItem('access_token', res["accessToken"]));
   
}

register(UserID:string, Accesskey:string) {
  return this.httpClient.post<{access_token: string}>(`${this.url}`, {UserID, Accesskey}).pipe(tap(res => {
  this.login(UserID, Accesskey)
}));
}

logout() {
  localStorage.removeItem('access_token');
}

public get loggedIn(): boolean{
  return localStorage.getItem('access_token') !==  null;
}

}