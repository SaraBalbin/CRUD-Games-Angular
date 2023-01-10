import { Component } from '@angular/core';
import { Game } from 'src/app/models/game';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent {
  
  game: Game ={
    id: 0,
    title: '',
    description:'',
    image: '',
    created_at: new Date()
  };

  // Se instancia el servicio
  constructor(private gameService: GamesService){}

  saveNewGame(){
    delete this.game.id;
    delete this.game.created_at;
    this.gameService.saveGame(this.game).subscribe(
      res => {
        console.log(res)
      },
      err => console.error(err)
    )

  }


}
