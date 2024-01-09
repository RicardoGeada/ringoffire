import { Component } from '@angular/core';
import { GameInfoService } from '../firebase-services/game-info.service';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  game: Game = new Game();

  constructor(private gameinfoService: GameInfoService) { 

  }

  newGame() {
    this.gameinfoService.addGame(this.game.toJson());
  }

}
