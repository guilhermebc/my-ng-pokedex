import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppService } from './app.service';

import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokemonStatusComponent } from './pokemon-status/pokemon-status.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonCardComponent,
    PokemonStatusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
  ],
  exports: [
  ],
  providers: [
    AppService,
    PokemonCardComponent,
    PokemonStatusComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
