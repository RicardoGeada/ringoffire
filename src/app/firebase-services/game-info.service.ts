import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, onSnapshot } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameInfoService{

  firestore: Firestore = inject(Firestore);

  unsubGames;

  constructor() { 
    this.unsubGames = this.subGamesList();
  }

  ngOnDestroy() {
    this.unsubGames();
    console.log('Unsubbed on Destroy');
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
  subGamesList() {
    return onSnapshot(this.getGamesRef(), (list) => {
      list.forEach((game) => {
        console.log('Game: ', game.data());
      })
    })
  }
}
