const mongoose=require("mongoose")

const validator=require("validator")

const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const crypto=require("crypto")


const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required:[true,"please enter your name"],
        maxlength:[30,"Name cannot exceed"]
    },
    email:{
        type: String,
        required:[true,"please enter emailid"],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,"Enter valid email"]

    },
    password:{
        type:String,
        required:[true,"Enter password"],
        minlength:8,
        select:false
    },
    passwordConfirm:{
        type:String,
        required:[true,"Confirm password"],
        validate:{
            validator:function(el){
                return el === this.password
            },
            message: "Password are not same"
        }
    },
    phoneNumber:{
        type:String,
        required:true,
        match: [/^[0-9]{10}$/, "enter valid number"]
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    avatar:{
        public_id:String,
        url:String,
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date
},
{timestamps:true}
);

// hash password
//pre(save)

userSchema.pre("save",async function(){
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password,12)
    this.passwordConfirm = undefined
})

userSchema.methods.correctPassword = async function(
    candidatePassword, userPassword
){
    return await bcrypt.compare(candidatePassword,userPassword)
}

userSchema.methods.changedPasswordAfter= function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime()/1000,10
        )
        return JWTTimestamp < changedTimestamp
    }
    return false;
}

//custom method to genarate jwt token

userSchema.methods.getJWTToken = function(){
    return jwt.sign(
        {id:this._id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES} 
    )
}

module.exports = mongoose.model("User",userSchema)


