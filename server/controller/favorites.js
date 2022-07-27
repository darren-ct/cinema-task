const Favorite = require("../models/favorite");
const {sendErr} = require("../helper/other")

const {QueryTypes} = require("sequelize");
const sequelize = require("../config/connect");

require("dotenv").config();


const getFavorites = async(req,res) => {
       const userId = req.user.id;

       try {

        const query = `
     SELECT movie_id, title, thumbnail, price 
     FROM favorite INNER JOIN movie
     ON favorite.movie_id = movie.movie_id 
     WHERE favorite.user_id = ${userId}
     `;

        const favorites = await sequelize.query(query,{type:QueryTypes.SELECT});
           

          return res.status(201).send({
            status: "Success",
            data : {
                favorites : favorites.map(favorite => {
                    return {
                        id:favorite.movie_id,
                        image : process.env.SERVER_URL + favorite.thumbnail,
                        title:favorite.title,
                        price: favorite.price,
                        isFavorite : true
                    }
                })
            }
          })
       } catch(err) {
        return sendErr("Server error",res)
       }
}

const deleteFavorite = async(req,res) => {
     const movieId = req.params.id;
     const userId = req.user.id;

     try {
        await Favorite.destroy({
            where : {
                user_id : userId,
                movie_id : movieId
            }
        });

        return res.status(201).send({
            status:"Success"
        })

        


     } catch (err) {
        return sendErr("Server error",res)
     }
};

const postFavorite = async(req,res) => {
      const {id} = req.body;
      const userId = req.user.id;

      console.log("Received")

      try {

        await Favorite.create({user_id:userId,movie_id:id});

        return res.status(201).send({
            status:"Success"
        })
      } catch(err) {
        return sendErr("Server error",res)
      }
}

module.exports.getFavorites = getFavorites;
module.exports.deleteFavorite = deleteFavorite;
module.exports.postFavorite = postFavorite;