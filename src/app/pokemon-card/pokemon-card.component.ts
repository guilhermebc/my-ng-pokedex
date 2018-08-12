import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Pokemon } from '../Pokemon';
import { Favorites } from '../Favorites';
import { AppService } from '../app.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {

	selectedPokemon: string = 'Escolha um pokemon';
	pokemonList: Favorites[] = [];

	@Input('pokemonInfo') pokemon: Pokemon = {
		id: 0,
		url: '',
		name: '--',
		sprite: '/assets/pokeball.png',
		weight: 0.0,
		height: 0.0,
		base_exp: 0
	}

	constructor(private service: AppService){
	}

  	ngOnInit():void {
	}

	writeFavorite(){
		this.service.writeFavData(this.pokemon);
	}
}
