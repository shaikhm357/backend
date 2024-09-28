const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  profile_picture: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  mobile_no: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v); // Regex for 10-digit mobile number
      },
      message: (props) => `${props.value} is not a valid mobile number!`,
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\S+@\S+\.\S+$/.test(v); // Basic email format validation
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  highest_qualification: {
    type: String,
    required: true,
  },
  working_with: {
    type: String,
    enum: [
      "Not Working",
      "Business/Self Employee",
      "Defence/Civil Services",
      "Government/Public Sector",
      "Private Company",
    ],
    required: true,
  },
  working_as: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    enum: ["Ulwe", "Belapur", "Seawood", "Nerul"],
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

userSchema.methods.matchPassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Create the model
const User = mongoose.model("User", userSchema);

module.exports = User;
