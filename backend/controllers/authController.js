//import req packages

const User = require("../models/user")
const ErrorHandler = require("../utils/errorHandler")

const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const sendToken = require("../utils/sendToken")

const cloudinary = require("../config/cloudinary")

exports.signup = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password,passwordConfirm,phoneNumber} = req.body;
    let avatar=[]
    if(!req.body.avatar || req.body.avatar === "/images/images.png"){
        avatar = {
            public_id: "default",
            url: "/images/images.png"
        }
    }    
        else{
            const result = await cloudinary.UploadStream(req.body.avatar,{
                folder:"avatar",
                width:150,
                crop:"scale",
            })
            avatar={
                public_id:result.public_id,
                url:result.url
            }
        }
    

    const user = await User.create({
        name,
        email,
        password,
        passwordConfirm,
        phoneNumber,
        avatar
    })

    sendToken(user,200,res)
})

exports.login = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;

    console.log("Login Request:", email);

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    console.log("User Found:", user);

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.correctPassword(
        password,
        user.password
    );

    console.log("Password Matched:", isPasswordMatched);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
});