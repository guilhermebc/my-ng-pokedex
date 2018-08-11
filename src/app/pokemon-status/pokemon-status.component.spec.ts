import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonStatusComponent } from './pokemon-status.component';

describe('PokemonStatusComponent', () => {
  let component: PokemonStatusComponent;
  let fixture: ComponentFixture<PokemonStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
