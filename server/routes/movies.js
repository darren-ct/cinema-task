const express = require("express");
const router = express.Router();
const verifyAdmin = require("../middleware/verifyAdmin");
const {uploadFile} = require("../middleware/uploadFile");

const {  getMovies, getMovie ,getMyMovies  , postMovie, editMovie, deleteMovie } = require("../controller/movies");


router.get("/movies", getMovies);
router.get("/movie/:id", getMovie);
router.get("/mymovies",getMyMovies);
router.post("/movie", verifyAdmin, uploadFile("image"), postMovie); 
router.put("/movie/:id", verifyAdmin, uploadFile("image"), editMovie);
router.delete("/movie/:id",verifyAdmin, deleteMovie);


module.exports = router;


