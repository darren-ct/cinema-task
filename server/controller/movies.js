const Movie = require("../models/movie");
const Category = require("../models/category");
const Favorite = require("../models/favorite");
const Transaction = require("../models/transaction");
const User = require("../models/user")


const fs = require('fs');
const path = require("path"); 
const jwt = require("jsonwebtoken");

const sequelize = require("../config/connect");
const { Op,QueryTypes } = require("sequelize");
const {minimumChecker} = require("../helper/auth");
const {sendErr} = require("../helper/other");

const checkMoviesUser = async(req,res) => {
    const bearer = req.headers.authorization;
       
       if(!bearer){
              return getMovies(null,null,res)
       };

       const token = bearer.split(" ")[1];
       
       jwt.verify(token ,process.env.SECRET, async(err,decoded)=>{
              if(err) return getMovies(null,null,res);

              const userArr = await User.findAll({
                     where: {
                            user_id : decoded.id
                     }
              });

              if(userArr.length === 0){
                 return getMovies(null,null,res)
              }

              const user = userArr[0];

              getMovies(user.user_id,user.isAdmin,res);

       })
}

const checkMovieUser = async(req,res) => {
    const bearer = req.headers.authorization;
    const movieId = Number(req.params.id);

    if(!bearer){
           return getMovie(null,movieId,null,res)
    };

    const token = bearer.split(" ")[1];
    
    jwt.verify(token ,process.env.SECRET, async(err,decoded)=>{
           if(err) return getMovie(null,movieId,null,res);

           const userArr = await User.findAll({
                  where: {
                         user_id : decoded.id
                  }
           });

           if(userArr.length === 0){
              return getMovie(null,movieId,null,res)
           }

           const user = userArr[0];

           getMovie(user.user_id,movieId,user.isAdmin,res);

    })
}

const getMovies = async(id,isAdmin,res) => {

    // Kalau belum login
    if(!id || isAdmin === "true"){
          try {
            const movies = await Movie.findAll();

            return res.status(201).send({
                status : "Success",
                data : {
                    movies : movies.map(movie => {
                        return {
                            id : movie.movie_id,
                            image:process.env.SERVER_URL + movie.thumbnail,
                            title:movie.title,
                            desc: movie.description,
                            price: movie.price,
                            link : movie.link
                        }
                    })
                }
            })
          } catch(err) {
            return sendErr("Server error",res)
          }
    };

    // Kalau udah login
    

    try{

        const query = `
        SELECT user_id , movie.movie_id, title, thumbnail, price , description , category_name , status , link
        FROM favorite RIGHT JOIN movie
        ON favorite.movie_id = movie.movie_id AND favorite.user_id = ${id}
        LEFT JOIN category 
        ON movie.category_id = category.category_id
        LEFT JOIN transaction
        ON transaction.movie_id = movie.movie_id AND transaction.buyer_id = ${id}
        `

        const movies = await sequelize.query(query,{type:QueryTypes.SELECT});

        return res.status(201).send({
            status:"Success",
            data: {
                movies : movies.map(movie => {
                    return {
                        id : movie.movie_id,
                        image:process.env.SERVER_URL + movie.thumbnail,
                        title:movie.title,
                        desc: movie.description,
                        price: movie.price,
                        link : movie.link,
                        isFavorite: movie.user_id ? true : false,
                        category:movie.category_name,
                        isBought : movie.status ? movie.status : false
                    }
                })
            }
        })

    } catch(err) {

        return sendErr("Server Error",res)

    }
    

   
};

const getMovie = async(id,movieId,isAdmin,res) => {
    // Kalau belum login
    if(!id || isAdmin === "true"){
        try {
            const movie = await Movie.findOne({
                where : {
                    movie_id : movieId
                }
            });

            const category = await Category.findOne({
                where : {
                    category_id : movie.category_id
                }
            })

            return res.status(201).send({
                status : "Success",
                data : {
                    movie : {
                        id : movie.movie_id,
                        image:process.env.SERVER_URL + movie.thumbnail,
                        title:movie.title,
                        desc:movie.description,
                        price: movie.price,
                        category : category.category_name
                    }
                }
            });

        } catch(err) {
          return sendErr("Server error",res)
        }
      };

    // Kalau sudah login
    
    try{
        const movie = await Movie.findByPk(movieId);

        if(!movie){
            return sendErr("Product not found",res)
        };

        // check fav
        const favorite = await Favorite.findAll({
            where : {
            user_id : id,
            movie_id:movieId }
        });

        const isFavorite  = favorite.length === 0 ? false : true;

        // check bought or not

        const transaction = await Transaction.findAll({
            where : {
                buyer_id : id,
                movie_id : movieId
            },
            attributes : ["status"]
        });

        const isBought = transaction.length === 0 ? false : transaction[0].status;


       //check category
        const category = await Category.findByPk(movie.category_id);

        if(!category){
            return sendErr("Category not found",res)
        };


        return res.status(201).send({
            status:"Success",
            data: {
                movie : {
                    id : movie.movie_id,
                    image:process.env.SERVER_URL + movie.thumbnail,
                    title:movie.title,
                    desc:movie.description,
                    price: movie.price,
                    link:movie.link,
                    category:category.category_name,
                    isFavorite:isFavorite,
                    isBought : isBought
                }
            }
        })

    } catch(err) {
        console.log(err)
        return sendErr("Server error",res)
    }

};

const getMyMovies = async(req,res) => {

     const userID = req.user.id;

     try {
     const query = `
     SELECT movie.movie_id, title, thumbnail, price , favorite.user_id
     FROM movie INNER JOIN transaction
     ON movie.movie_id = transaction.movie_id AND transaction.buyer_id = ${userID} AND transaction.status = 'success'
     LEFT JOIN favorite 
     ON movie.movie_id = favorite.movie_id
     `;

        const myMovies = await sequelize.query(query,{type:QueryTypes.SELECT});


        return res.status(201).send({
            status: "Success",
            data : {
                mymovies : myMovies.map(myMov => {
                    return {
                        id:myMov.movie_id,
                        image : process.env.SERVER_URL + myMov.thumbnail,
                        title:myMov.title,
                        price: myMov.price,
                        isFavorite : myMov.user_id ? true : false
                    }
                })
            }
          })

     } catch(err) {
        console.log(err)
        return sendErr("Server error",res)

    }
}

const postMovie = async(req,res) => {
    if(!req.file){
        return sendErr("No image sent",res)
    };


    const file = req.file.filename;
    const{title,desc,price,link,category} = req.body;

    // Check format
    if(!minimumChecker(title,4)){
        return sendErr("Title minimum 4 characters",res)
    };

    if(!minimumChecker(link,4)){
        return sendErr("Link minimum 4 characters",res)
    };

    if(!minimumChecker(desc,8)){
        return sendErr("Desc minimum 8 characters",res)
    };

    if(price < 1){
        return sendErr("Price must be greater than 0",res)
    };

    try{
        // If not unique throw error
        const duplicate = await Movie.findOne({where : {
            title : title },
            attributes: ["title"]
        });
    
        if(duplicate){
            return sendErr("Other movie with this name already exists",res)
        };

        // Check category name
        const categoryMatch = await Category.findOne({where:{
           category_name:category
        }, attributes: ["category_id"]});

        if(!categoryMatch){
            return sendErr("Category doesnt exist",res)
        };

            const movie = await Movie.create({
            title:title, 
            thumbnail:file, 
            price:price, 
            description:desc, 
            link : link,
            category_id:categoryMatch.category_id, 
            });

        return res.status(201).send({
            status: "Success",
            
        })
       
    } catch(err) {
        return sendErr("Server error",res)
    }
};

const editMovie = async(req,res) => {
    const movieID = req.params.id;


    const{title,desc,price,link,category} = req.body;

    // Check format
    if(!minimumChecker(title,4)){
        return sendErr("Title minimum 4 characters",res)
    };

    if(!minimumChecker(link,4)){
        return sendErr("Link minimum 4 characters",res)
    };

    if(!minimumChecker(desc,8)){
        return sendErr("Desc minimum 8 characters",res)
    };

    if(price < 1){
        return sendErr("Price and quantity  must be greater than 0",res)
    };




    try{
        // If not unique throw error
        const duplicate = await Movie.findOne({
            where : {
            movie_id : {[Op.ne]:movieID},
            title : title 
            },
            attributes: ["title"]
        });
    
        if(duplicate){
            return sendErr("Movie name cannot be the same as others",res)
        };

        // Check category id
        const categoryMatch = await Category.findOne({where:{
           category_name:category
        }, attributes: ["category_id"]});

        if(!categoryMatch){
            return sendErr("Category doesnt exist",res)
        };

        // Update
        if(!req.file){

            await Movie.update({
                title:title,
                price:price, 
                description:desc, 
                link : link,
                category_id:categoryMatch.category_id,
            },{
                where : {
                    movie_id : movieID,
                }
            });
            
        } else {
            const file = req.file.filename;

            // delete old file
            const oldImage = await Movie.findOne({
            where :{movie_id : movieID},
            attributes : ["thumbnail"]
            });

            await Movie.update({
                title:title, 
                thumbnail:file,  
                price:price, 
                description:desc, 
                link : link,
                category_id:categoryMatch.category_id,
            },{
                where : {
                    movie_id : movieID,
                }
            });
    
            fs.unlink(path.join(__dirname,"..","uploads",oldImage.thumbnail),(err)=>{console.log(err)});
    
        }

        return res.status(201).send({
            status: "Success",
        })

    } catch(err) {
        console.log(err);
        return sendErr("Server error",res)
    }
};

const deleteMovie = async(req,res) => {
    const movieID = Number(req.params.id);
    
    

    try{

        const movie = await Movie.findOne({
            where: {movie_id : movieID},
            attributes: ["movie_id","thumbnail"]
        });

        

        if(!movie){
            return sendErr("Product isnt found",res)
        };




        await Movie.destroy({
            where : {
                movie_id :movieID
            }
        });

        // remove image
        fs.unlink(path.join(__dirname,"..","uploads",movie.thumbnail),(err)=>{console.log(err)});

        return res.status(201).send({
            status: "Success",
        })

    } catch(err) {
        console.log(err)
        return sendErr("server error",res)
    }
};

module.exports = {checkMovieUser,checkMoviesUser,getMovies,getMyMovies,getMovie,postMovie,editMovie,deleteMovie};
