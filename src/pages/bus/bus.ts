import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-bus',
  templateUrl: 'bus.html'
})
export class BusPage {

  times = [];

  constructor(public navCtrl: NavController, private http: Http) {}

  getBus(type : string): void {
    this.http.get('tan/ewp/tempsattente.json/CTRE')
      .toPromise()
      .then(response => {
         this.times = response.json().data
          .filter(schedule => schedule.ligne.numLigne === type && schedule.sens === 2)
          .map(schedule => schedule.temps);
      })
      .catch(error => console.error(error));
  }

}
