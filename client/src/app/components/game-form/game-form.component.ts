import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { Router, ActivatedRoute } from '@angular/router';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {
  
  game: Game ={
    id: 0,
    title: '',
    description:'',
    image: '',
    created_at: new Date()
  };

  edit: boolean = false;

  // Se instancia el servicio
  constructor(private gameService: GamesService, private router: Router, private activedRoute: ActivatedRoute){}

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    if (params['id']){
      this.gameService.getOneGame(params['id']).subscribe(
        res => {
          console.log(res);
          this.game = res;
          this.edit = true;
        },
        err => console.error(err)
      )

    }
  }

  saveNewGame(){
    delete this.game.id;
    delete this.game.created_at;
    this.gameService.saveGame(this.game).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/games'])
      },
      err => console.error(err)
    )
  }

  updateGame(){
    delete this.game.created_at;
    let id: string = this.game.id as unknown as string;
    this.gameService.updateGame(id, this.game).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/games'])
      },
      err => console.error(err)

    )


  }


}
