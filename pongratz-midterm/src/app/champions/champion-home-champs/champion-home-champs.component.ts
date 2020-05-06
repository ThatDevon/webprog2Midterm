import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Champion } from '../../models/champion';
import { ChampionsService } from '../champions.service';

@Component({
  selector: 'app-champion-home-champs',
  templateUrl: './champion-home-champs.component.html',
  styleUrls: ['./champion-home-champs.component.css']
})
export class ChampionHomeChampsComponent implements OnInit, OnDestroy {
  champions$: Observable<Champion[]>;
  private championsSub: Subscription;
  statTitle: string;
  currentStat: string;
  isLoading = true;
  champs: Champion[] = [];
  currentFilter: string;
  @Output() champions: Champion[] = [];
  allChamps: Champion[] = [];
  featuredChamp: Champion;

  constructor(private championsService: ChampionsService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    }
  }

  ngOnInit() {
    this.onFilter('stats.armor');
  }

  // Picks a random champion to be featured.
  loadFeatured() {
    let rand = Math.floor(Math.random() * 141);
    this.featuredChamp = this.allChamps[rand];
  }

  onFilter(searchParam:string) {
    this.currentFilter = searchParam;
    switch (searchParam) {
      case 'stats.hp':
        this.statTitle = 'Healthiest';
        break;
      case 'stats.armor':
        this.statTitle = 'Tankiest';
        break;
      case 'stats.movespeed':
        this.statTitle = 'Fastest';
        break;
      case 'stats.attackdamage':
        this.statTitle = 'Strongest';
        break;
      case 'stats.attackrange':
        this.statTitle = 'Highest Range';
        break;
      default:
        this.statTitle = "Healthiest";
        break;
    }
    this.currentStat = searchParam;
    this.championsService.getChampions(141, 1, this.currentStat);
    this.championsSub = this.championsService
      .getChampionUpdateListener()
      .subscribe((championData: { champions: Champion[]; championCount: number }) => {
        this.isLoading = false;
        this.allChamps = championData.champions;
        this.champs = [];
        if (this.featuredChamp == null) {
          this.loadFeatured();
        }
        for (let i = 0;i<5;i++) {
          this.champs.push(this.allChamps[i]);
        }
      });
  }

  openPage(champion: Champion) {
    this.router.navigate(['/detail/' + champion.key]);
  }

  ngOnDestroy() {
    this.championsSub.unsubscribe();
  }
}
