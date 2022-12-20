import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../../types/hero';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroHttpService } from '../../services/hero-http.service';
import { HeroesRepository } from '../../state/heroes.repository';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private heroHttpService: HeroHttpService,
    private state: HeroesRepository,
    private location: Location
  ) {}

  @Input() hero?: Hero;

  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.hero = this.state.getHero(id);
  }

  save(): void {
    this.state.setSearchTerm(undefined);
    if (this.hero) {
      this.heroHttpService.updateHero(this.hero)
        .subscribe(() => {
          if (this.hero)
            this.state.updateHero(this.hero);
          this.goBack()
        });
    }
  }

  goBack(): void {
    this.location.back();
  }

}
