import { Component } from '@angular/core';
import { HeroesRepository } from '../../state/heroes.repository';

@Component({
  selector: 'app-heroes',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(public state: HeroesRepository) {}

}
