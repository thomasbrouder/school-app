import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-bus',
  templateUrl: 'bus.html'
})
export class BusPage implements OnInit {
  times = [];
  sens = 2;

  constructor(private http: Http) {}

  ngOnInit(): void {
    this.getBus()
  }

  getBus(): void {
    this.http.get('tan/ewp/tempsattente.json/BJOI')
      .toPromise()
      .then(response => {
         this.times = response.json()
          .filter(schedule => schedule.ligne.numLigne === "C6" && schedule.sens === this.sens)
          .map(schedule => schedule.temps);
         if (this.times.length === 0) {
           this.times.push('Pas de bus prochainement (>1h) :(')
         }
      })
      .catch(error => console.error(error));
  }

}
