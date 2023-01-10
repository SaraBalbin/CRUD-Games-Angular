import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  games: any = []

  constructor(private gameService: GamesService){}

  ngOnInit(){
    this.getGames()
  }

  getGames(){
    this.gameService.getGames().subscribe(
      res => {
        this.games = res;

      },
      err => console.error(err)
    )
  }

  deleteGame(id: string){
    this.gameService.deleteGame(id).subscribe(
      res => {
        console.log(res);
        this.getGames()

      },
      err => console.error(err)
    )
  }

}
