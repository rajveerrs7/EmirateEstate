import mongoose, { Schema } from "mongoose";

const SavedSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    agencies: [
      {
        agencyId: {
          type: Number,
          required: true,
        },
        name: String,
        logo: String,
        base_location: String,
        active_agents: Number,
      },
    ],

    properties: [
      {
        propertyId: {
          type: Number,
          required: true,
        },
        title: String,
        price: Number,
        coverPhoto: String,
        city: String,
        agency: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Saved || mongoose.model("Saved", SavedSchema);
