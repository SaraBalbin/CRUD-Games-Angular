import { Request, Response} from 'express';

import connection from '../database'

class GamesController {

    public async list(req: Request, res: Response): Promise<void> {
        const  gameList = await connection.query('SELECT * FROM games');
        // console.log(gameList[0]);
        res.json(gameList[0]);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params; // Obtener solo una parte de un objeto
        const games = await connection.query('SELECT * FROM games WHERE id = ?', [id]);
        if (games.length > 0) {
            let result = Object.values(JSON.parse(JSON.stringify(games[0])));
            return res.json(result[0]); // Para tener solo el elemento entre {}
        }
        res.status(404).json({ text: "The game doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void>{
        await connection.query('INSERT INTO games set ?', [req.body]); 
        res.json({message:'Game saved'})
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await connection.query('DELETE FROM games WHERE id = ?', [id]);
        res.json({ message: "The game was deleted" });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldGame = req.body;
        await connection.query('UPDATE games set ? WHERE id = ?', [oldGame, id]);
        res.json({ message: "The game was Updated" });
    }

}

export const gamesController = new GamesController(); 