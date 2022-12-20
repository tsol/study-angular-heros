import { Injectable } from '@angular/core';
import { createStore, withProps, select, setProp } from '@ngneat/elf';
import {
  addEntities,
  selectAllEntities,
  selectAllEntitiesApply,
  updateEntities,
  deleteEntities,
  withEntities,
  setEntities,
  getEntitiesCount,
  getEntity
} from '@ngneat/elf-entities';
import { Observable, switchMap } from 'rxjs';

import { Hero } from '../types/hero';

interface Filter {
  searchTerm: string | undefined;
}

const store = createStore(
  { name: 'heroes' },
  withProps<Filter>({ searchTerm: undefined }),
  withEntities<Hero>()
);

@Injectable({ providedIn: 'root' })
export class HeroesRepository {
  
  heroes$ = store.pipe(selectAllEntities());
  searchTerms$ = store.pipe(select((state) => state.searchTerm));

  filteredHeroes$ = this.searchTerms$.pipe(
    switchMap((term) => {
      return store.pipe(
        selectAllEntitiesApply({
          filterEntity({ name }) {
            return ( ! term ? false : name.toUpperCase().includes(term));
          },
        })
      );
    })
  );

  setSearchTerm(term: Filter['searchTerm']) {
    store.update(setProp('searchTerm', term?.toUpperCase()));
  }

  getHeroesCount(): number {
    return store.query(getEntitiesCount());
  }

  getHero(id: number): Hero | undefined {
    return store.query(getEntity(id));
  }

  setHeroes(heroes: Hero[]): void {
    store.update(setEntities(heroes));
  }

  addHero(hero: Hero): void {
    store.update(addEntities(hero));
  }

  deleteHero(id: Hero['id']): void {
    store.update(deleteEntities([id]));
  }

  updateHero(hero: Hero): void {
    store.update(
      updateEntities(hero.id, (entity) => hero)
    );
  }



}
