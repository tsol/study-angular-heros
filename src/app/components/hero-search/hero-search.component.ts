
import { Component } from '@angular/core';

import { HeroesRepository } from '../../state/heroes.repository';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent {
 
  constructor(public state: HeroesRepository) {}

  search(term: string): void {
    this.state.setSearchTerm(term);
  }

}