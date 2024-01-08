import { CommonModule } from '@angular/common';
import { Component, OnDestroy, importProvidersFrom } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { GameInfoService } from '../firebase-services/game-info.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnDestroy{
  pickCardAnimation = false;
  currentCard: string = '' ;
  game = new Game();

  unsubGame: any;

  constructor(private gameinfoService: GameInfoService , private route: ActivatedRoute,public dialog: MatDialog) {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log('Game Id: ',params['id']);
      this.unsubGame = this.gameinfoService.subGame(params['id'], this.game);
    });
  }

  ngOnDestroy(): void {
    this.unsubGame();
  }

  newGame() {
    this.game = new Game();
    // this.gameinfoService.addGame(this.game.toJson());
  }

  takeCard() {
    if (this.game.players.length >= 2) {
      if (!this.pickCardAnimation) {
        let x = this.game.stack.pop();
        this.currentCard = x != undefined ? x : ''; 
        this.pickCardAnimation = true;
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        setTimeout(() => {
          this.game.playedCards.push(this.currentCard);
          setTimeout(() => this.pickCardAnimation = false, 100);
        }, 1000);
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
