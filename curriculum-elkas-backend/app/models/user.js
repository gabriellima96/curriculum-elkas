const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  personalInformation: {
    emails: [
      {
        type: String,
        trim: true,
      },
    ],
    phones: [
      {
        type: String,
      },
    ],
    dateOfBirth: {
      type: Date,
    },
    maritalStatus: {
      type: String,
    },
    academicDegree: [
      {
        institution: {
          type: String,
        },
        degree: {
          type: String,
        },
        course: {
          type: String,
        },
        initialization: {
          type: Date,
        },
        conclusion: {
          type: Date,
        },
      },
    ],
    address: {
      publicArea: {
        type: String,
      },
      district: {
        type: String,
      },
      city: {
        type: String,
      },
      postalCode: {
        type: String,
      },
      country: {
        type: String,
        required: false,
        default: 'Brasil',
      },
      state: {
        type: String,
        required: false,
      },
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/*
  Se for salvar/criar um novo user e a senha for modificada
  essa função vai encryptar o password antes de salvar.
*/
UserSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 5);
});

UserSchema.pre('save', function addingEmail() {
  if (this.personalInformation.emails.length === 0) {
    this.personalInformation.emails.push(this.email);
  }
});

UserSchema.methods = {
  compareHash(password) {
    return bcrypt.compare(password, this.password);
  },
  generateToken() {
    return jwt.sign({ id: this.id }, authConfig.secret, {
      expiresIn: 86400,
    });
  },
};

mongoose.model('User', UserSchema);
