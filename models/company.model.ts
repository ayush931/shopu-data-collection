import { model, Schema } from 'mongoose';

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
        type: Schema.Types.ObjectId, // Change to ObjectId for referencing
        ref: 'CompanyName', // Reference the CompanyName model
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Company = model('Company', companySchema);
export default Company;
