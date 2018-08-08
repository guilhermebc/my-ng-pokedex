import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-ng-pokedex';
  private apiURL = 'https://pokeapi.co/api/v2/pokemon/';
  nextPage;
  results = [];

  constructor(private http: HttpClient){
	console.log('Requesting...');
  }

  ngOnInit():void {
	this.getData(this.apiURL);  
  }

  getData(url){
	this.http.get(url).subscribe(response => {
		this.pokemonList(response);
	  }, err => {
		  console.log('error', err);
	  });
  }

  pokemonList(data){
	data.results.forEach((obj: any, index: any) => {
		console.log(obj.name);
		this.results = obj.name;
	});
	this.nextPage = data.next;
}

  getNextPage(url) {
	  this.getData(url);
  }

}
