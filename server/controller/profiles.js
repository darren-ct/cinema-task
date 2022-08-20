const Profile = require("../models/profile");
const {sendErr} = require("../helper/other")
const {minimumChecker} = require("../helper/auth")

const fs = require('fs');
const path = require("path"); 

const getProfile = async(req,res) => {
    const userID = req.user.id;
    

    try {
         const profile = await Profile.findOne({
            where : {
                user_id : userID
            }
         });

         

         if(!profile){
            return sendErr("Profile not found",res)
         };

         return res.status(201).send({
            status: "Success",
            data : {
                image : profile.profile_img ? process.env.SERVER_URL + profile.profile_img : null,
                gender : profile.gender ? profile.gender : null ,
                phone : profile.phone ? profile.phone : null,
                country : profile.country ? profile.country : null,
                city : profile.city ? profile.city : null,
                address: profile.address ? profile.address : null
            }
         });


    } catch (err) {
         return sendErr("Server error",res)
    };
};

const postProfile = async(req,res) => {
    const userID = req.user.id;

    try {
        await Profile.create({
            user_id : userID
        });


        return res.status(201).send({
            status : "Success"
        })


    } catch(err) {
        sendErr("Server Error",res)
    }
};

const editProfile = async(req,res) => {
    const userID = req.user.id;
    const{gender,phone,country,city,address} = req.body;

    try {

        // Check format
    if(!minimumChecker(gender,4)){
        return sendErr("Gender minimum 4 characters",res)
    };

    if(!minimumChecker(country,4)){
        return sendErr("Country minimum 4 characters",res)
    };

    if(!minimumChecker(city,4)){
        return sendErr("City minimum 4 characters",res)
    };

    if(!minimumChecker(address,4)){
        return sendErr("Address minimum 4 characters",res)
    };

    if(!minimumChecker(phone,8)){
        return sendErr("Phone minimum 8 characters",res)
    };

       if(!req.file){

        await Profile.update({
            gender : gender,
            phone : phone,
            country : country,
            city : city,
            address : address
       },{
           where : {
                user_id : userID
           }
       });


        } else {
        const file = req.file.filename;

        const oldProfileImage = await Profile.findOne({
            where : {user_id:userID},
            attributes : ["profile_img"]
        });

        await Profile.update({
             profile_img : file,
             gender : gender,
             phone : phone,
             country : country,
             city : city,
             address : address
        },{
            where : {
                 user_id : userID
            }
        });

        if(oldProfileImage.profile_img){
            fs.unlink(path.join(__dirname,"..","uploads",oldProfileImage.profile_img),(err)=>{console.log(err)});
        }; 
    }

        return res.status(201).send({
            status : "Success"
        });

    } catch(err) {
        console.log(err);
        sendErr("Server Error", res);
    }


};

module.exports = {getProfile,postProfile,editProfile};
