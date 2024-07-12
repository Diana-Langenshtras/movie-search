import { defineStore } from 'pinia'
import axios from 'axios'
import { MOVIES_URL } from '../constants'

const STORE_NAME = 'root'

const getDefault = () => ([])

const getSavesAndRatings = () => {
    const savesAndRatings = localStorage.getItem(STORE_NAME)
              
    return savesAndRatings ? JSON.parse(savesAndRatings) : getDefault()
  }

export const useRootStore = defineStore(STORE_NAME, 
    {
        state: () => ({
          movies: [],
          savesAndRatings: getSavesAndRatings(),
        }),

        actions: {
            async getMovies() {
                const data = await axios.get(MOVIES_URL);
                this.movies = data?.data;
            //    console.log(this.movies);
            },
            
            updateSavesAndRatings(data) {
                this.savesAndRatings = {
                  ...this.savesAndRatings,
                  ...data,
                }
            
                localStorage.setItem(STORE_NAME, JSON.stringify(this.savesAndRatings))
            },
        }
    }
)