import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Pokemon } from '../Pokemon';
import { AppService } from '../app.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit, OnChanges {

	selectedPokemon: string = 'Escolha um pokemon';

	@Input('pokemonInfo') pokemon: Pokemon = {
		id: 0,
		url: '',
		name: '--',
		sprite: '/assets/pokeball.png',
		weight: 0.0,
		height: 0.0,
		base_exp: 0,
		types: [],
		abilities: [],
		stats: []
	}

	constructor(private service: AppService){
	}

  	ngOnInit():void {
	}

	ngOnChanges(){
		console.log("card component changes");
	}

	addFavorite(pokemon) {
		this.service.writeFavData(pokemon);
	}
}
