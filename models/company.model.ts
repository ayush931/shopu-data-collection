import mongoose, { Schema } from 'mongoose';

const companySchema = new Schema(
  {
    shopName: {
      type: String,
    },

    addressLine1: {
      type: String,
    },

    addressLine2: {
      type: String,
    },

    state: {
      type: String,
    },

    city: {
      type: String,
    },

    pincode: {
      type: Number,
    },

    phone: {
      type: Number,
    },

    companyName: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyName',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Company =
  mongoose.models.Company || mongoose.model('Company', companySchema);
export default Company;
