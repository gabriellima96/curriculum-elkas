const mongoose = require('mongoose');

const CurriculumSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
  },
  activity: {
    type: Boolean,
  },
  template: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
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
        type: Number,
      },
      conclusion: {
        type: Number,
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
  goals: {
    type: String,
  },
  skills: [
    {
      type: String,
    },
  ],
  experiences: [
    {
      office: {
        type: String,
      },
      location: {
        type: String,
      },
      company: {
        type: String,
      },
      description: {
        type: String,
      },
      initialization: {
        type: Number,
      },
      conclusion: {
        type: Number,
      },
    },
  ],
  languages: [
    {
      language: {
        type: String,
      },

      fluency: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model('Curriculum', CurriculumSchema);
