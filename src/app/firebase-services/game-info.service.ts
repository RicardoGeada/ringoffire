import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, doc, onSnapshot, getDoc } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameInfoService{

  firestore: Firestore = inject(Firestore);

  constructor() { 
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
    }).then((docRef) => {
      console.log('Document written with ID: ', docRef?.id);
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
}
