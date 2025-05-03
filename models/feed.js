import mongoose from "mongoose";

const feedSchema = mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    userName: {type:String},
    postContent:{type:String},
    postUrl:{type:String},
    postHypeLink:{type:String},
    metrics: {
        type: [
          {
            type: { type: String, enum: ['like', 'comment', 'share'], required: true },
            count: { type: Number, default: 0 }
          }
        ],
        default: [
          { type: 'like', count: 0 },
          { type: 'comment', count: 0 },
          { type: 'share', count: 0 }
        ]
      },
},
{
    timestamps: true
});

export const feedModel = mongoose.model('feed',feedSchema);