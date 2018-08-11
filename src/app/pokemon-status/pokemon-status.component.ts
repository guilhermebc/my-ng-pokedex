import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-status',
  templateUrl: './pokemon-status.component.html',
  styleUrls: ['./pokemon-status.component.scss']
})
export class PokemonStatusComponent implements OnInit {

  pokemon: string = '';

  constructor() { }

  ngOnInit() {
  }

  getPokemonStatus(){
    return this.pokemon;
  }

  setPokemonStatus(name){
      this.pokemon = name;
  }

}
