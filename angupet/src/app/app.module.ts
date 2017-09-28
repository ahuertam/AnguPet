import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { PetPanelComponent } from './game-board/pet-panel/pet-panel.component';
import { ControllerPanelComponent } from './game-board/controller-panel/controller-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    PetPanelComponent,
    ControllerPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
