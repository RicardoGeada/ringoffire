import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { Game } from '../../models/game';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameInfoService{

  firestore: Firestore = inject(Firestore);

  constructor(private router: Router) { 
  }

  ngOnDestroy() {
  }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  // CREATE
  async addGame(game: {}) {
    let ref = this.getGamesRef();
    await addDoc(ref, game).catch((err) => {
      console.error(err);
    }).then((gameInfo: any) => {
      // console.log('Document written with ID: ', gameInfo.id);
      this.router.navigateByUrl('/game/' + gameInfo.id);
    })
  }


  // READ
  subGame(id: string, game: Game) {
    const docRef = doc(this.firestore, 'games', id);
    return onSnapshot(docRef, (doc) => {
      console.log('Game update', doc.data());
      let cloudData: any = doc.data();
      game.currentPlayer = cloudData.currentPlayer;
      game.players = cloudData.players;
      game.stack = cloudData.stack;
      game.playedCards = cloudData.playedCards;
    });
  }


  // UPDATE
  async updateGame(id: string, game: Game) {
    const docRef = doc(this.firestore, 'games', id); 
    await updateDoc(docRef, game.toJson()).catch((err) => {
      console.error(err);
    })
  }
}
