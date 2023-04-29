const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    phone: {
        type:Number,
        required:true
    },
    company: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    cpassword: {
        type:String,
        required:true
    },
    date: {
        type: Date,
        default:Date.now
    },
    websites: [{
        website: {
            type:String,
            required:true
        },
      websiteUrl: {
        type: String,
        required: true
      },
      quesCat:{
        type: String,
        required: true
      },
      rquestionScores:[{
        type: String,
        required: true
      }],
      rresult: {
        amainquestions: {
          type: Number,
          required: true
        },
        "First Impression": {
          type: Number,
          required: true
        },
        Forms: {
          type: Number,
          required: true
        },
        Information: {
          type: Number,
          required: true
        },
        Interaction: {
          type: Number,
          required: true
        },
        Navigation: {
          type: Number,
          required: true
        }, 
        Search: {
          type: Number,
          required: true
        },
        
        "Trust and Persuasion": {
          type: Number,
          required: true
        }     
        
      },
      rvalid: {
        type: Number,
        required: true
      },
      categoryRValid: {
        amainquestions: {
          type: Number,
          required: true
        },
        "First Impression": {
          type: Number,
          required: true
        },
        Forms: {
          type: Number,
          required: true
        },
        Information: {
          type: Number,
          required: true
        },
        Interaction: {
          type: Number,
          required: true
        },
        Navigation: {
          type: Number,
          required: true
        },
        Search: {
          type: Number,
          required: true
        },
        
        "Trust and Persuasion": {
          type: Number,
          required: true
        } 
      },
    }],
    tokens: [
        {
            token: {
                type:String,
                required:true
            }
        }
    ] 
});


//hashing the password
userSchema.pre('save', async function( next ) {
    console.log("bcrypt succcess");
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, 12);
        this.cpassword = bcrypt.hashSync(this.cpassword, 12);
    }
    next();
});

//generating jwt token
userSchema.methods.generateAuthToken = async function() {
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    }catch (err) {
        console.log(err);
    }
}

// stored website result
userSchema.methods.addResult = async function (website, websiteUrl, quesCat, rquestionScores, rresult, rvalid, categoryRValid){
    try {
        this.websites = this.websites.concat({website, websiteUrl, quesCat, rquestionScores, rresult, rvalid, categoryRValid})
        await this.save();
        return this.websites;
    } catch (error) {
        console.log(error);
    }
}

const User = mongoose.model('USER', userSchema);

module.exports = User;