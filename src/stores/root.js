import { defineStore } from 'pinia'
import axios from 'axios'
import { MOVIES_URL } from '../constants'

const STORE_NAME = 'root'

const getDefault = () => {
  return Array.from(Array(this.movies.length), () => ({
    rating: 0,
    save: false,
  }));
}

const getSavesAndRatings = () => {
    const savesAndRatings = localStorage.getItem(STORE_NAME);
    console.log(JSON.parse(savesAndRatings));
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
          /*    let flag = true;
              this.savesAndRatings.forEach((item) => {
                  if (item.id === id) 
                  {
                      item.save = active;
                      flag = false;
                  }
              })
              if (flag) this.savesAndRatings.push({
                  id: id,
                  rating: 0,
                  save: active,
              })*/
              this.savesAndRatings[id].save = active;
              localStorage.setItem(STORE_NAME, JSON.stringify(this.savesAndRatings));
              console.log(this.savesAndRatings)
            },

            updateRatings(active, rating, id){
         /*     let flag = true;
              this.savesAndRatings.forEach((item) => {
                      if (item.id === id) 
                      {
                          item.rating = rating;
                          flag = false;
                      }
                  })
                  if (flag) this.savesAndRatings.push({
                      id: id,
                      rating: rating,
                      save: active,
                })*/
                this.savesAndRatings[id].rating = rating;
                localStorage.setItem(STORE_NAME, JSON.stringify(this.savesAndRatings));
                console.log(this.savesAndRatings)
            },
        }
    }
)