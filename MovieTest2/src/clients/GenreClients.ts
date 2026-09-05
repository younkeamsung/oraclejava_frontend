import type { Genre } from '../models/Genre'

class GenreClients{
    private baseUrl = "/api";   

    async getGenresAsync(): Promise<Genre[]> {
        const response = await fetch(`${this.baseUrl}/genres`);
        if(!response.ok){
            throw new Error(`Failed to fetch genres: ${response.statusText}`);
        }   
        const data = await response.json();
        return data as Genre[];
    }
}

export default GenreClients;