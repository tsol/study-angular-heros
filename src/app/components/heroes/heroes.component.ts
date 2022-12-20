import { Component } from '@angular/core';
import { Hero } from '../../types/hero';
import { HeroHttpService } from '../../services/hero-http.service';
import { HeroesRepository } from '../../state/heroes.repository';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {

  constructor(
    public state: HeroesRepository,
    private heroHttpService: HeroHttpService
  ) {}

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroHttpService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.state.addHero(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroHttpService.deleteHero(hero.id).subscribe(() => {
      this.state.deleteHero(hero.id);
    });
  }

}
