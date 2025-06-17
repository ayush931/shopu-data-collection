import { model, Schema } from "mongoose";

const companyNameSchema = new Schema({
  name: {
    type: String,
    required: [true, "Provide company name"],
    unique: [true, 'Data already exists']
  }
})

const CompayName = model("CompanyName", companyNameSchema);
export default CompayName;