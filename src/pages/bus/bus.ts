import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-bus',
  templateUrl: 'bus.html'
})
export class BusPage implements OnInit {
  times = [];
  sensSelectione= ['Ville'];
  ligneSelectione={bus:'C6',sens:['Ville']};
  arretSelectione={id:'CTRE', nom:'Chantrerie',lignes:[{bus:'C6',sens:['Ville']},{bus:'75',sens:['Ville']}]};
  arrets=[
    {id:'CTRE', nom:'Chantrerie',lignes:[{bus:'C6',sens:['Ville']},{bus:'75',sens:['Ville']}]},
    {id:'BJOI', nom:'Beaujoire',lignes:[{bus:'C6',sens:['Campups','Ville']},{bus:'75',sens:['Campus','Ville']}]},
    {id:'COCH', nom:'Cochard',lignes:[{bus:'C6',sens:['Campus','Ville']}]},
    {id:'FOCH', nom:'Foch',lignes:[{bus:'C6',sens:['Campus','Ville']}]},
    {id:'CRQU', nom:'Place du Cirque',lignes:[{bus:'C6',sens:['Campus','Ville']}]},
    {id:'FACU', nom:'Facultés',lignes:[{bus:'75',sens:['Campus']}]},
    ];
  //lignes=['C6','75'];
 // sens=['Campus','Ville'];

  constructor(private http: Http) {}

  ngOnInit(): void {
    this.getBus()
  }

  getBus(): void {
    console.log(this.sensSelectione[0]);
    this.http.get('tan/ewp/tempsattente.json/'+this.arretSelectione.id)
      .toPromise()
      .then(response => {
         this.times = response.json()
          .filter(schedule => schedule.ligne.numLigne === this.ligneSelectione.bus /*&& schedule.sens === this.sensSelectione[0]*/)
          .map(schedule => schedule.temps);
         if (this.times.length === 0) {
           this.times.push('Pas de bus prochainement (>1h) :(')
         }
      })
      .catch(error => console.error(error));
  }

}
