import mongoose, { model, Schema } from 'mongoose';

const companyNameSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Provide company name'],
    index: true,
  },
});

const CompanyName =
  mongoose.models.CompanyName || model('CompanyName', companyNameSchema);
export default CompanyName;
