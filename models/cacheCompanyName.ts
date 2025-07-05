import mongoose, { model, Schema } from "mongoose";

const cacheCompanyName = new Schema({
  data: {
    type: Array,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: { expires: 3600 }
  }
})

const CacheCompanyModel = mongoose.models.CacheCompanyModel || model('CacheCompanyName', cacheCompanyName);

export default CacheCompanyModel