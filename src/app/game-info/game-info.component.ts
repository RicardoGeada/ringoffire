import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss',
})
export class GameInfoComponent {
  cardAction = [
    { title: 'Waterfall', description: 'Everyone starts drinking at the same time. Player 1 begins and cannot stop until they finish. Once player 1 stops, player 2 can stop, and so on. No one can stop drinking until the person before them stops.', },
    { title: 'Thumb Master', description: 'At any time during the game, the person who draws this card becomes the Thumb Master. They can discreetly put their thumb on the table, and the last person to notice and do the same must drink. The Thumb Master can do this as many times as they want until the next person draws a Thumb Master card.', },
    { title: 'Categories', description: "The person who draws this card picks a category (e.g., types of fruit, car brands). Everyone must then say something related to that category. The first person who can't think of something or repeats a previous answer drinks.", },
    { title: 'Rule Master', description: "The person who draws this card creates a rule that everyone must follow until the next Rule Master card is drawn. For example, 'No one is allowed to say anyone's name' or 'Every time someone swears, they have to drink.' Breaking the rule results in drinking.", },
    { title: 'Never Have I Ever', description: "The person who draws this card starts by saying 'Never have I ever...' followed by something they've never done. Anyone who has done that thing must drink.", },
    { title: 'Rhyme Time', description: "The person who draws this card says a word, and players take turns saying words that rhyme with it. The first person who can't think of a rhyming word or repeats one already said drinks.", },
    { title: 'Questions Only', description: 'The person who draws this card can only communicate by asking questions. Anyone who responds with a statement instead of a question drinks.', },
    { title: 'Two Truths and a Lie', description:'The person who draws this card says three statements about themselves: two true and one false. The others guess which is the lie. Those who guess incorrectly drink.', },
    { title: 'Finish Your Drink', description:'Everyone must finish their drink immediately.', },
    { title: 'Buddy Up', description: 'Choose a partner. Whenever one of you drinks, the other must drink as well.', },
    { title: 'Social', description:'Everyone drinks.', },
    { title: "King's Cup", description: "Pour a portion of your drink into a central cup. The person who draws the last king card must drink the contents of the King's Cup.", },
    { title: 'Make a Rule', description: 'The person who draws this card gets to create a new rule that lasts until the end of the game.', },
  ];

  title: string = '';
  description: string = '';
  @Input() card: string = '';

  ngOnChanges(): void {
    if (this.card) {
      console.log('Current card', this.card);
      console.log('Current number', +this.card.split('_')[1]);
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }
}
