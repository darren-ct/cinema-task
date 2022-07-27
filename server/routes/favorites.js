const express = require("express");
const router = express.Router();


const { getFavorites,deleteFavorite,postFavorite } = require("../controller/favorites.js");

router.get("/favorites",getFavorites);
router.delete("/favorite/:id",deleteFavorite);
router.post("/favorite",postFavorite);




module.exports = router;