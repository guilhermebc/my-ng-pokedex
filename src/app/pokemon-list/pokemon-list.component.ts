import { Component, OnInit, OnChanges } from '@angular/core';

import { AppService } from '../app.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})

export class PokemonListComponent implements OnInit, OnChanges {

	private nextPage;
	private prevPage;
	pokemonUrl: any = '';
	isFavList: boolean = false;
	infoLabel: string = 'Loading...';
	results = [];
	favorites = [];

	constructor(private appService: AppService) {
	}

	ngOnInit() {
		this.getPokemonList();
		this.getAllFavorites();
	}

	ngOnChanges(){
		// console.log("list component changes");
	}

	getAllFavorites(){
		this.appService.readFavData().subscribe((response) => {
			if(response != null) {
				this.favorites = [];
				this.favorites = response;
			} else {
				this.favorites = [];
			}
		});
	}

	setFilter(event: any) {

		this.getAllFavorites();

		if(event.target.value == 1){
			this.isFavList = true;
		} else {
			this.isFavList = false;
		}
	}

	setPokemonList(data) {
		this.results = data.results;
	}

	setNextPage(url) {
		this.nextPage = url.next;
	}

	setPrevPage(url) {
		this.prevPage = url.previous;
	}

	setLabelInfo(text) {
		this.infoLabel = text;
	}

	getNextPage() {
		return this.nextPage;
	}

	getPrevPage() {
		return this.prevPage;
	}
  
	getPokemonList() {

		const SELF = this;

		this.appService.getAllPokemons().subscribe(response => {
			SELF.setPokemonList(response);
			SELF.setNextPage(response);
			SELF.setPrevPage(response);
			SELF.setLabelInfo('');
		},err => this.setLabelInfo('An unexpected error occurred, please try again, or check back later.'));
	}
  
	toNextPage(url) {

		const SELF = this;

		this.results = [];
		this.pokemonUrl = '';

		this.appService.requestUrl(url).subscribe(response => {
			SELF.setPokemonList(response);
			SELF.setNextPage(response);
			SELF.setPrevPage(response);
		},err => this.setLabelInfo('An unexpected error occurred, please try again, or check back later.'));
	}

	setPokemonUrl(url) {
		const SELF = this;
		SELF.infoLabel = 'Loading pokemon...';
		this.appService.requestUrl(url).subscribe(response => {
			SELF.setPokemonStatus(response, url);
			window.scrollTo(0, 0);
			SELF.infoLabel = '';
		},err => this.setLabelInfo('An unexpected error occurred, please try again, or check back later.'));
	}

	setPokemonStatus(info, url) {
		let types = [];
		let abilities = [];
		let status = [];

		info.types.forEach(element => {
			types.push(element.type.name);
		});

		info.abilities.forEach(element => {
			if(element.is_hidden) abilities.push(element.ability.name);
		});

		info.stats.forEach(element => {
			status.push({stat: element.stat.name, num: element.base_stat});
		});

		this.pokemonUrl = {
			id: info.id,
			url: url,
			name: info.name,
			sprite: info.sprites.front_default,
			weight: info.weight,
			height: info.height,
			base_exp: info.base_experience,
			types: types,
			abilities: abilities,
			stats: status
		}
	}
}
