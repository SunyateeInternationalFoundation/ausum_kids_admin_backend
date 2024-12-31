const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
const  Admin  = require('../models/admin');
dotenv.config();

function isStringInvalid(string) {
    return string === undefined || string.length === 0;
  }

const login = async (req, res) => {
    try{
        const { email,password } = req.body;
        console.log(`email: ${email} password: ${password}`)
        if(isStringInvalid(email) || isStringInvalid(password)){
          return res.status(400).json({success: false, message: `Email and password is missing`})
        }
        const user = await Admin.findOne({email})
        if(!user){
          return res.status(400).json({success: false, message: `Kindly contact admins to create an account`})
        }
        if (user.password !== password) {
          return res.status(401).json({
              success: false, 
              message: `Invalid email or password`
          });
      }
        else{
            res.status(200).json({
              success: true,
               message:`User Logged in succesfully`, 
        })
        }
        }catch(err){
          res.status(400).json({message: err, success: false})
        }
  };


  module.exports = {
    login
  }