import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Router } from "@angular/router";

import { Champion } from "./champion.model";
import { environment } from "src/environments/environment";
import { stringify } from "querystring";

const BACKEND_URL = environment.apiUrl + "/champion/";

@Injectable({ providedIn: "root" })
export class ChampionsService {
  private champions: Champion[] = [];
  private championsUpdated = new Subject<{ champions: Champion[]; championCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getChampions(championsPerPage: number, currentPage: number, filter: string) {
    const queryParams = `?pagesize=${championsPerPage}&page=${currentPage}&filter=${filter}`;
    this.http
      .get<{ message: string; champions: any; maxChampions: number }>(
        BACKEND_URL + "/champions" + queryParams
      )
      .pipe(
        map(championData => {
          console.log(championData.message);
          return {
            champions: championData.champions.map(champion => {
              return {
                _id: champion._id,
                title: champion.title,
                content: champion.content,
                id: champion._id,
                icon: champion.icon,
                name: champion.name,
                key: champion.key,
                description: champion.description
              };
            }),
            maxChampions: championData.maxChampions
          };
        })
      )
      .subscribe(transformedChampionData => {
        this.champions = transformedChampionData.champions;
        this.championsUpdated.next({
          champions: [...this.champions],
          championCount: transformedChampionData.maxChampions
        });
      });
  }

  initializeChampions() {
    this.http.get<{ message: string; }>(BACKEND_URL + "init")
      .subscribe(resp => {
        console.log(resp.message);
        location.reload();
      });
  }

  searchChampions(term: string) {
    const queryParams = `?id=${term}`;
    return this.http
      .get<{ message: string; champions: any; maxChampions: number }>(
        BACKEND_URL + "/search" + queryParams
      )
      .pipe(
        map(championData => {
          console.log(championData);
          return {
            champions: championData.champions.map(champion => {
              return {
                _id: champion._id,
                title: champion.title,
                content: champion.content,
                id: champion._id,
                icon: champion.icon,
                name: champion.name,
                key: champion.key,
                description: champion.description
              };
            }),
            maxChampions: championData.maxChampions
          };
        })
      );
  }

  getChampion(id: string) {
    const queryParams = `?key=${id}`;
    return this.http
    .get<{ message: string, champions: any; maxChampions: number}>(
      BACKEND_URL + "/detail" + queryParams
    )
    .pipe(
      tap(response => console.log(response))
    );
  }

  getChampionUpdateListener() {
    return this.championsUpdated.asObservable();
  }
}
