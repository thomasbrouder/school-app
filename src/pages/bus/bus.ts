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
  ligne="C6";
  arretSelectione={id:'CTRE', nom:'Chantrerie'};
  arrets=[{id:'CTRE', nom:'Chantrerie'},{id:'BJOI', nom:'Beaujoire'},{id:'COCH', nom:'Cochard'},
    {id:'FOCH', nom:'Foch'},{id:'CRQU', nom:'Place du Cirque'},{id:'FACU', nom:'Facultés'}];

  constructor(private http: Http) {}

  ngOnInit(): void {
    this.getBus()
  }

  getBus(): void {
    console.log(this.arretSelectione);
    this.http.get('tan/ewp/tempsattente.json/'+this.arretSelectione.id)
      .toPromise()
      .then(response => {
         this.times = response.json()
          .filter(schedule => schedule.ligne.numLigne === this.ligne && schedule.sens === this.sens)
          .map(schedule => schedule.temps);
         if (this.times.length === 0) {
           this.times.push('Pas de bus prochainement (>1h) :(')
         }
      })
      .catch(error => console.error(error));
  }

}
