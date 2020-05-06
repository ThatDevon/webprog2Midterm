import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionUserInputComponent } from './champion-user-input.component';

describe('ChampionUserInputComponent', () => {
  let component: ChampionUserInputComponent;
  let fixture: ComponentFixture<ChampionUserInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChampionUserInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionUserInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
