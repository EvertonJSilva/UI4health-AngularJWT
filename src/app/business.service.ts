import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest,  } from '@angular/common/http';
import { RequestOptions } from "@angular/http";
import { Token }  from "./auth/token";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import {JwtService} from "./jwt.service";
import {AlertService} from "./login/alert.service";
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  //uri = 'http://localhost:56655/api/Beneficiario';
  uri = 'https://api-4health.azurewebsites.net/api/Beneficiario';
  public token = new Token(false, '','','','');
  errorMessage: string;

  constructor(private http: HttpClient,  private jwt: JwtService, private alertService: AlertService,  
                        private route: ActivatedRoute,
                        private router: Router,) { }
  nome: String;
  id: number;
  cpf: String;


  addBusiness(nome, cpf){
    const obj = {
      nome: nome,
      id: 0,
      cpf: cpf
    };
    
    //this.jwt.login('usuario01','94be650011cf412ca906fc335f615cdc');

    this.http.post<void>(`${this.uri}`, obj)
            .subscribe(
                  data => {             
                    if(data["result"] != null){
                        this.alertService.success("Sucesso");   
                        this.router.navigate(["/business"]);               
                    }else{
                        this.alertService.error("Falha ao inserir: "+ data["errors"] );
                    }
                      
                    },
                    error => {
                        console.log(error);
                        this.alertService.error(error.statusText);
                        //this.alertService.error(JSON.stringify(error));

                
                    }
            );
  }

  getBusinesses(){  
   
   // this.jwt.login('usuario01','94be650011cf412ca906fc335f615cdc');
    return this
           .http.get(`${this.uri}`);
         
  }

  editBusiness(id) {
    
    //this.jwt.login('usuario01','94be650011cf412ca906fc335f615cdc');
    return this
            .http
            .get(`${this.uri}/${id}`);
    }

  updateBusiness(nome, id, cpf) {

    const obj = {
        nome: nome,
        id: id,
        cpf: cpf
      };

     // this.jwt.login('usuario01','94be650011cf412ca906fc335f615cdc');
    this
      .http
      .put(`${this.uri}`, obj)
      .subscribe
      (res => {
        this.alertService.success("Registro Atualizado com sucesso!");   
        this.router.navigate(['/business']);
        }
      ),
      error => {
          console.log(error);
          this.alertService.error(error["message"]);
      }
  }

 deleteBusiness(id) {
    return this
              .http
              .delete(`${this.uri}/${id}`)
              .subscribe
              (res => {
                this.alertService.success("Registro deletado com sucesso!");
               // window.location.href = "/business";    
               this.router.navigate(['/business']);
                }
              ),
              error => {
                  console.log(error);
                  this.alertService.error(error["message"]);
              }
              
  }
}
