import type { CommandResult } from '../models/CommandReasult';
import type { MovieDetails } from '../models/MovieDetails';
import type {MovieSummary} from '../models/MovieSummary'

class MovieClients{
    private baseUrl = "/api";

    async getMoviesAsync(): Promise<MovieSummary[]> {
        const response = await fetch(`${this.baseUrl}/movies`);
        if(!response.ok){
            throw new Error(`Failed to fetch movies: ${response.statusText}`);
        }

        const data = await response.json();
        return data as MovieSummary[];
    }     

    async getMovieAsync(id: string): Promise<MovieDetails> {
        const response = await fetch(`${this.baseUrl}/movies/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch movie: ${response.statusText}`);
        }
        const data = await response.json();
        return data as MovieDetails;
    }

    async addMovieAsync(movie: MovieDetails): Promise<CommandResult> {
        const response = await fetch(`${this.baseUrl}/movies`, {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        });

        if (!response.ok) {
            //throw new Error(`Failed to add movie: ${response.statusText}`);
            return {
                succeeded: false,
                errors: [`Failed to add movie: ${response.statusText}`]
            };
        }

        
        return {
            succeeded: true,
            errors: []
        };
    }
}

export default MovieClients;