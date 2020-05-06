import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionSearchComponent } from '../champion-search/champion-search.component';

describe('ChampionSearchComponent', () => {
  let component: ChampionSearchComponent;
  let fixture: ComponentFixture<ChampionSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChampionSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});