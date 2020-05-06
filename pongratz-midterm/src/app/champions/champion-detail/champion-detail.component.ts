import { Component, OnInit, Input } from '@angular/core';
import { Champion } from '../../models/champion';
import { ActivatedRoute } from '@angular/router';
import { ChampionsService } from '../champions.service';

@Component({
  selector: 'app-champion-detail',
  templateUrl: './champion-detail.component.html',
  styleUrls: ['./champion-detail.component.css']
})
export class ChampionDetailComponent implements OnInit {
  champion: Champion;
  champions: Champion[];

  constructor(
    private route: ActivatedRoute,
    private championService: ChampionsService,
  ) { }

  ngOnInit() {
    this.getChampion();
  }

  getChampion() {
    const id = +this.route.snapshot.paramMap.get('id');
    let observableChampions = this.championService.getChampion(id.toString());

    observableChampions.toPromise().then(result => {
      this.champions = result.champions;
    }).catch(err => {
      console.log(err);
    });

    // Special mention: Took a few hours of frustration to come to reach this solution.
    // HTTPClient will do what it wants when its good and ready, so I have a timeout so the champions value is correct.
    // Shoutout to https://stackoverflow.com/questions/54092337/angular-httpclient-get-service-returning-too-early for helping with search functionality.
    setTimeout(() => {
      this.champion = this.champions[0];
      if (this.champion == null) {
        setTimeout(() => {
          this.champion = this.champions[0];
        }, 1000);
      }
    }, 400);

    if (this.champion == null) {
      console.log("No champion found");
    }
  }
}
