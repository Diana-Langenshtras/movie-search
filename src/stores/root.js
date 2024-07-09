import { defineStore } from 'pinia'
import axios from 'axios'
import { MOVIES_URL } from '../constants'

const STORE_NAME = 'root'

const getDefault = () => {
   /* const array = {};
    console.log(this.movies)
    this.movies.map(movie =>
        {
            let newElement = {}
            newElement.rating = 0;
            newElement.save = false;
            let keyName = movie.id
            let obj = {};
            array[keyName] = newElement
        }
    )
   console.log(array);*/
   return {};
	}
/*  return Array.from(Array(this.movies.length), () => ({
    rating: 0,
    save: false,
  }));
}*/

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
          //      if (this.savesAndRatings.get(id)) console.log(this.savesAndRatings.get(id));
      //        this.savesAndRatings[id].save = active;
              localStorage.setItem(STORE_NAME, JSON.stringify(this.savesAndRatings));
    //          console.log(this.savesAndRatings)
            },

            updateRatings(active, rating, id){
                if (!(id in this.savesAndRatings))
                    this.savesAndRatings[id] = {
                        save: active,
                        rating: rating,
                    };
                    else this.savesAndRatings[id].rating = rating;
              //  this.savesAndRatings[id].rating = rating;
             //   console.log(this.savesAndRatings);
                localStorage.setItem(STORE_NAME, JSON.stringify(this.savesAndRatings));
     //           console.log(this.savesAndRatings)
            },
        }
    }
)