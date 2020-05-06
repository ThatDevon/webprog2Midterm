import { Component, OnInit, OnDestroy } from "@angular/core";
import { PageEvent, MAT_PAGINATOR_INTL_PROVIDER, MatPaginator } from "@angular/material";
import { Subscription } from "rxjs";

import { Champion } from '../champion.model';
import { ChampionsService } from '../champions.service';
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.css']
})
export class ChampionsComponent implements OnInit, OnDestroy {
  champs: Champion[] = [];
  isLoading = false;
  totalChampions = 0;
  championsPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10, 15];
  userIsAuthenticated = false;
  currentFilter: string;
  paginator: MatPaginator;
  private championsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public championsService: ChampionsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.onFilter('name');

    this.championsSub = this.championsService
      .getChampionUpdateListener()
      .subscribe((championData: { champions: Champion[]; championCount: number }) => {
        this.isLoading = false;
        this.totalChampions = championData.championCount;
        this.champs = championData.champions;
      });
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onChangedPage(pageData: PageEvent, pager: MatPaginator) {
    // The piece of code that is commented out below this was breaking page navigation. Not sure why, all I know is that it took 2 hours to find it :).
    // this.isLoading = true;
    this.paginator = pager;
    this.currentPage = pageData.pageIndex + 1;
    this.championsPerPage = pageData.pageSize;
    this.onFilter(this.currentFilter);
  }

  changeFilter(searchParam: string) {
    this.currentFilter = searchParam;
    this.currentPage = 1;
    if (this.paginator != null) {
      this.paginator.firstPage();
    }
    this.onFilter(this.currentFilter);
  }

  onFilter(searchParam:string) {
    this.currentFilter = searchParam;
    this.championsService.getChampions(this.championsPerPage, this.currentPage, searchParam);
  }

  ngOnDestroy() {
    this.championsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
