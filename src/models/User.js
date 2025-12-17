import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6, 
      trim: true,
    },

    searchHistory: {
      type: [String],
      default: [],
    },

    Saved: {
      type: Schema.Types.ObjectId,
      ref: 'Saved'
    }
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  return;
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
