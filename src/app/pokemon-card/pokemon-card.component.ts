import { Component, OnInit } from '@angular/core';

import { AppService } from '../app.service';

import { Pokemon } from '../Pokemon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {

  	private nextPage;
	private prevPage;
	selectedPokemon: string = 'Escolha um pokemon';

	pokemon: Pokemon = {
		id: 0,
		url: '',
		name: '--',
		sprite: '/assets/pokeball.png',
		weight: 0.0,
		height: 0.0,
		base_exp: 0
	}
	
  	results = [];

	constructor(private appService: AppService){
	}

  	ngOnInit():void {
		this.getPokemonList();
	}

  	setPokemonList(data){
		this.results = data.results;
	}

	setNextPage(url){
		this.nextPage = url.next;
	}

	setPrevPage(url) {
		this.prevPage = url.previous;
	}

	getNextPage() {
		return this.nextPage;
	}

	getPrevPage(){
		return this.prevPage;
	}

	getPokemonList(){

		const SELF = this;

		this.appService.getAllPokemons().subscribe(response => {
			SELF.setPokemonList(response);
			SELF.setNextPage(response);
			SELF.setPrevPage(response);
		},err => console.log('error', err));
	}

	toNextPage(url){

		const SELF = this;

		this.appService.requestUrl(url).subscribe(response => {
			SELF.setPokemonList(response);
			SELF.setNextPage(response);
			SELF.setPrevPage(response);
			SELF.getPokemonStatus(response);
		},err => console.log('error', err));
	}

	getPokemonStatus(url){
		const SELF = this;
		this.appService.requestUrl(url).subscribe(response => {
			SELF.setPokemonStatus(response);
		});
	}

	setPokemonStatus(status){
		this.pokemon = {
			id: status.id,
			url: status.url,
			name: status.name,
			sprite: status.sprites.front_default,
			weight: status.weight,
			height: status.height,
			base_exp: status.base_experience
		}
	}

	onChangePokemon(name, url){
		this.selectedPokemon = name;
		this.getPokemonStatus(url);
	}

}
