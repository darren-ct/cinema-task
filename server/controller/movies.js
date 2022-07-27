const Movie = require("../models/movie");
const Category = require("../models/category");
const Favorite = require("../models/favorite")

const fs = require('fs');
const path = require("path"); 

const sequelize = require("../config/connect");
const { Op,QueryTypes } = require("sequelize");
const {minimumChecker} = require("../helper/auth");
const {sendErr} = require("../helper/other");

require("dotenv").config();


const getMovies = async(req,res) => {
    const userId = req.user.id;

    try{

        const query = `
        SELECT user_id , link , movie.movie_id, title, thumbnail, price , description
        FROM favorite RIGHT JOIN movie
        ON favorite.movie_id = movie.movie_id AND favorite.user_id = ${userId}
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
                        link:movie.link,
                        isFavorite: movie.user_id ? true : false
                    }
                })
            }
        })

    } catch(err) {
        console.log(err)
        return sendErr(err,res)

    }
    

   
};

const getMovie = async(req,res) => {
    const movieId = Number(req.params.id);
    const userId = req.user.id;
    try{
        const movie = await Movie.findByPk(movieId);
        const favorite = await Favorite.findAll({
            where : {
            user_id : userId,
            movie_id:movieId }
        });

        const isFavorite  = favorite.length === 0 ? false : true;

        if(!movie){
            return sendErr("Product not found",res)
        };

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
                    isFavorite:isFavorite
                }
            }
        })

    } catch(err) {
        return sendErr("Server error",res)
    }

};

const postMovie = async(req,res) => {
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

module.exports = {getMovies,getMovie,postMovie,editMovie,deleteMovie};
