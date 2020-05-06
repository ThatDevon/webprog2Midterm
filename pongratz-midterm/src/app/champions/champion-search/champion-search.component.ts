import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Champion } from '../../models/champion';
import { ChampionsService } from '../champions.service';

@Component({
  selector: 'app-champion-search',
  templateUrl: './champion-search.component.html',
  styleUrls: ['./champion-search.component.css']
})
export class ChampionSearchComponent implements OnInit {
  champions$: Observable<Champion[]>;
  @Output() champions: Champion[] = [];
  private searchTerms = new Subject<string>();

  constructor(private championService: ChampionsService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    }
  }

  ngOnInit() {
    this.onSearch(" ");
  }

  onSearch(term: string) {
    this.searchTerms.next(term);

    let observableChampions = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.championService.searchChampions(term))
    );

    observableChampions.subscribe(result => {
      this.champions = result.champions;
    });
  }

  openPage(champion: Champion) {
    this.router.navigate(['/detail/' + champion.key]);
  }
}
