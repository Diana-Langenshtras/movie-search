import { defineStore } from 'pinia'
import axios from 'axios'
import { MOVIES_URL } from '../constants'

const STORE_NAME = 'root'

const getDefault = () => {
        return {};
	}

const getSavesAndRatings = () => {
        const savesAndRatings = localStorage.getItem(STORE_NAME);
        return savesAndRatings ? JSON.parse(savesAndRatings) : getDefault();
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
            },

            updateSaves(active, id){
                if (!(id in this.savesAndRatings))
                this.savesAndRatings[id] = {
                    save: active,
                    rating: 5,
                };
                else this.savesAndRatings[id].save = active;
                localStorage.setItem(STORE_NAME, JSON.stringify(this.savesAndRatings));
            },

            deleteSave(id){
                if (id in this.savesAndRatings)
                    this.savesAndRatings[id].save = false;
                localStorage.setItem(STORE_NAME, JSON.stringify(this.savesAndRatings));
            },

            updateRatings(active, rating, id){
                if (!(id in this.savesAndRatings))
                    this.savesAndRatings[id] = {
                        save: active,
                        rating: rating,
                    };
                else this.savesAndRatings[id].rating = rating;
                localStorage.setItem(STORE_NAME, JSON.stringify(this.savesAndRatings));
            },
        }
    }
)