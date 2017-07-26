import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-bus',
  templateUrl: 'bus.html'
})
export class BusPage implements OnInit {
  times = [];
  ligne = "C6";

  constructor(private http: Http) {}

  ngOnInit(): void {
    this.getBus()
  }

  getBus(): void {
    this.http.get('tan/ewp/tempsattente.json/CTRE')
      .toPromise()
      .then(response => {
         this.times = response.json()
          .filter(schedule => schedule.ligne.numLigne === this.ligne && schedule.sens === 2)
          .map(schedule => schedule.temps);
         if (this.times.length === 0) {
           this.times.push('Pas de bus prochainement')
         }
      })
      .catch(error => console.error(error));
  }

}
