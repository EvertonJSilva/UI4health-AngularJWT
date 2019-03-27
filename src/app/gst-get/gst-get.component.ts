import { Component, OnInit } from '@angular/core';
import Business from '../Business';
import { BusinessService } from '../business.service';
import {AlertService} from "./../login/alert.service";


@Component({
  selector: 'app-gst-get',
  templateUrl: './gst-get.component.html',
  styleUrls: ['./gst-get.component.css']
})
export class GstGetComponent implements OnInit {

  businesses: Business[];

  constructor(private bs: BusinessService, private alertService: AlertService) { }

  ngOnInit() {
    this.bs
      .getBusinesses()
        .subscribe(
          (data: Business[]) => {
              this.businesses = data;
          },
          error => {
              this.alertService.error(error["statusText"]);
          }
      );
  }

  /*ngOnInit() {
    this.bs
      .getBusinesses();
  }
  */
  deleteBusiness(id) {
    this.bs.deleteBusiness(id);
  }

}
