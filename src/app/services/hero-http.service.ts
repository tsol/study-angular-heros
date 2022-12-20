import { Injectable } from '@angular/core';
import { Hero } from '../types/hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import '@angular/localize'

@Injectable({
  providedIn: 'root'
})
export class HeroHttpService {
  
  private heroesUrl = 'api/heroes';  // URL to web api
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`HeroHttpService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {  
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log($localize `fetched heroes`)),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log($localize `get hero id=${id}:heroId:`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

    /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log($localize `updated hero id=${hero.id}:heroId:`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

    /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log($localize `added hero id=${newHero.id}:heroId:`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

    /** DELETE: delete the hero from the server */
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log($localize `deleted hero id=${id}:heroId:`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }


    /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log($localize `found heroes matching "${term}:searchTerm:"`) :
        this.log($localize `no heroes matching "${term}:searchTerm:"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

}

