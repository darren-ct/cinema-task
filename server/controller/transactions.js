const Transaction = require("../models/transaction");
const Movie = require("../models/movie");
const User = require("../models/user");

const sequelize = require("../config/connect")
const { QueryTypes } = require('sequelize');
const {sendErr} = require("../helper/other");

const midTransClient = require("midtrans-client");
const nodemailer = require("nodemailer");
require("dotenv").config();


const getAllTransactions = async(req,res) => {
    const query = `
    SELECT transaction_id, title , username, status 
    FROM transaction INNER JOIN movie 
    ON transaction.movie_id = movie.movie_id 
    INNER JOIN user
    ON user.user_id = transaction.buyer_id
    `

   try {
         const AllTransactions = await sequelize.query(
            query , {type:QueryTypes.SELECT}
         );

         

         return res.status(201).send({
            status : "Success",
            data : AllTransactions
         })

   } catch (err) {
    console.log(err)
          return sendErr("Server error",res)
   }
}

const getTransactions = async(req,res) => {
    const userID = req.user.id;

    const query = `
    SELECT transaction_id, status , EXTRACT( DAY FROM createdAt) AS day, EXTRACT( MONTH FROM createdAt) AS month, EXTRACT( YEAR FROM createdAt) AS year,  movie.movie_id, price, title, thumbnail
    FROM transaction INNER JOIN movie 
    ON transaction.movie_id = movie.movie_id AND transaction.buyer_id = ${userID}
    `

    try {
         const mytransaction_movies = await sequelize.query(
            query , {type:QueryTypes.SELECT}
         );
         
        
         return res.status(201).send({
            status : "Success",
            data : {
                transactions : mytransaction_movies.map(item => {
                    return {
                        id : item.transaction_id,
                        movie : {
                           id: item.movie_id,
                           image: process.env.SERVER_URL + item.thumbnail,
                           title : item.title ,
                           price: item.price
                        },
                        day : item.day ,
                        month : item.month,
                        year : item.year,
                        status: item.status
                    }
                })
            }
         })

    } catch(err) {
        return sendErr("Error in server",res)
    }
      
};

const deleteTransaction = async(req,res) => {
   const id = req.params.id;

   try {
      await Transaction.destroy({
        where : {transaction_id:id}
      });

      return res.status(201).send({
         status:"Success"
      });


   } catch(err) {

    return sendErr("Server error",res)
   }
}

const postTransaction = async(req,res) => {
    const userID = req.user.id;
    
    const {idMovie} = req.body;
    
    
try{

    const movieBought = await Movie.findOne(
        {where: {movie_id:idMovie},
         attributes: ["price"]
        }
        );

    

    if(!movieBought){
        return sendErr("Movie doesnt exist",res)
    }
    


  const transaction = await Transaction.create({
      transaction_id : parseInt(idMovie + Math.random().toString().slice(3,8)),
      buyer_id : userID,
      movie_id : idMovie,
      status : "pending"
  });


//   Mid trans time
let snap = new midTransClient.Snap({
    isProduction:false,
    serverKey: process.env.MIDTRANS_SERVER_KEY
});

let parameter = {
    transaction_details: {
        order_id: transaction.transaction_id,
        gross_amount: movieBought.price
    },
    credit_card:{
        secure : true
    },
    customer_details: {
        email: req.user.email,
        username : req.user.name
    }
}

const payment = await snap.createTransaction(parameter);


  return res.status(201).send({
      status:"Success",
      payment : payment
  });

    } catch(err) {

        return sendErr("Server error",res)

    }

};

const notification = async(req,res) => {
      try {
       
          
          // Create core
         const core = new midTransClient.CoreApi();

         core.apiConfig.set({
                 isProduction:false,
                 serverKey: process.env.MIDTRANS_SERVER_KEY,
                 clientKey:process.env.MIDTRANS_CLIENT_KEY
                 });

          const statusResponse = await core.transaction.notification(req.body);

          let orderId = statusResponse.order_id;
          let transactionStatus = statusResponse.transaction_status;
          let fraudStatus = statusResponse.fraud_status;
   
          console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);
   
          // Sample transactionStatus handling logic
   
          if (transactionStatus == 'capture'){
              if (fraudStatus == 'challenge'){
                 
                  sendEmail("pending",orderId)
                  updateTransaction("pending",orderId)
                  res.status(200);
              } else if (fraudStatus == 'accept'){
                sendEmail("success",orderId)
                updateTransaction("success",orderId)
                res.status(200);
              }
          } else if (transactionStatus == 'settlement'){
              sendEmail("success",orderId);
              updateTransaction("success",orderId);
              res.status(200);
          } else if (transactionStatus == 'cancel' ||
            transactionStatus == 'deny' ||
            transactionStatus == 'expire'){
            
               sendEmail("failed",orderId)
               updateTransaction("failed",orderId);
               res.status(200)
          } else if (transactionStatus == 'pending'){
             sendEmail("pending",orderId)
             updateTransaction("pending",orderId)
             res.status(200)
          }

      } catch(err) {
           console.log(err)
      }
}


// other functions

const updateTransaction = async(status,orderId) => {
       await Transaction.update({
        status : status
       },{
        where : {
            transaction_id : orderId
        }
       });
};

const sendEmail = async(status,transactionId) => {
   
    // transporter
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
            user: process.env.SYSTEM_EMAIL,
            pass: process.env.SYSTEM_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // get transaction data
    const query = `
    SELECT email , username , title ,price,status
    FROM transaction INNER JOIN user
    ON transaction.buyer_id = user.user_id AND transaction_id = ${transactionId}
    INNER JOIN movie 
    ON transaction.movie_id = movie.movie_id
    `

    
         const transactionInfo = await sequelize.query(
            query , {type:QueryTypes.SELECT}
         );

        

    // Email options content
    const mailOptions = {
        from : process.env.SYSTEM_EMAIL,
        to: transactionInfo[0].email,
        subject: "Payment Status",
        text: "Your payment is <br/>" + "Done",
        html: `<!doctype html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="description" content="My Page Description">
          
        </head>
        <body style="background-color:#0B0B0B;color:white;padding:32">
           <div style="font-weight:bold;font-size:24;color:rgba(86, 192, 90, 1)"> Dear ${transactionInfo[0].username}, </div>
           <span style="margin-bottom:48;">Your order payment with the total of ${transactionInfo[0].price} has status of ${status}! </span>

           <p>This is your order details:</p>
           <p>Movie name: ${transactionInfo[0].title} </p>
          <p style="color:rgb(254, 78, 48);font-weight:bold;">Total transaction : ${transactionInfo[0].price} </p>
          

           <span style="color:rgba(86, 192, 90, 1)">Thank you for ordering here!<span>
        </body>
        </html>`
    }

    if(transactionInfo[0].status != status ){
        transporter.sendMail(mailOptions, (err,info)=>{
            if(err) throw err

            console.log(`Email sent: ${info.response}`)

            return res.send({
                status:"Success",
                message: info.response
            })
        })
    }



}

module.exports = {notification,getAllTransactions,getTransactions,postTransaction,deleteTransaction};

