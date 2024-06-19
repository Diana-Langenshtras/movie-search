import { defineStore } from 'pinia'
import axios from 'axios'
import { MOVIES_URL } from '../constants'

export const useRootStore = defineStore('root', 
    {
        state: () => ({
          movies: [],
        }),

        actions: {
            async getMovies() {
                const data = await axios.get(MOVIES_URL);
                this.movies = data?.data;
            //    console.log(this.movies);
            }
        }
    }
)