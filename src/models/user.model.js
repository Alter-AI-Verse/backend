import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema(
{
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    fullName:{
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar:{
        type: String,
        required: true
    },
    coverImage:{
        type: String,
    },
    bio:{
        type: String,
        default: "Hey, I'm using Persona AI"
    },
    socialLinks:{
        linkedin:{
            type: String,
            require: true
        },
        twitter:{
            type: String,
        },
        facebook:{
            type: String,
        },
        portfolio:{
            type: String,
        }
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    subscriptionStatus:{
        type: String,
        enum: ['free', 'basic', 'standard', 'premium'],
        default: 'free',
    },
    chatBots: [
        {
            type: Schema.Types.ObjectId,
            ref: 'ChatBot'
        }
    ],
    settings:{
        theme: {
            type: String,
            enum: ['light', 'dark'],
            default: 'dark',
        },
        notifications: {
            type: Boolean,
            default: true,
        },
        language:{
            type: String,
            enum: ['en', 'es', 'fr', 'zh-CN', 'zh-TW'],
            default: 'en',
        },
    },
    password:{
        type: String,
        required: [true, 'password is required']
    },
    refreshToken:{
        type: String
    }
},
{
    timestamps: true,
}
);    


UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function () {
   return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

export const User = mongoose.model('User', UserSchema);