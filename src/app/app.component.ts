import { Component } from '@angular/core';
import { HeroHttpService } from './services/hero-http.service';
import { HeroesRepository } from './state/heroes.repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = $localize `:{main title}:Tour of Heroes`;

  constructor( 
    private heroHttpService: HeroHttpService,
    private heroRepository: HeroesRepository
  ) {}

  ngOnInit(): void {
    this.heroHttpService.getHeroes().subscribe( heroes => {
      this.heroRepository.setHeroes(heroes);
    })
  }

}
