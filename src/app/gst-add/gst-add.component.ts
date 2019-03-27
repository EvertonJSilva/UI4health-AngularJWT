import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { BusinessService } from '../business.service';
import {AlertService} from "./../login/alert.service";
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-gst-add',
  templateUrl: './gst-add.component.html',
  styleUrls: ['./gst-add.component.css']
})
export class GstAddComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private bs: BusinessService, private alertService: AlertService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      nome: ['', Validators.required ],
      cpf: ['', Validators.required ]
    });
  }

  addBusiness(nome, cpf) {
    this.bs.addBusiness(nome, cpf);
  }

  ngOnInit() {
  }

}
