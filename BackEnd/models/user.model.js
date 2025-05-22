import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		firstName: { 
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["Client", "Admin"],
			default: "Client",
			required: true,
		},
		lastLogin: {
			type: Date,
			default: Date.now,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		firstLogin: {
			type: Boolean,
			default: true,
		},
		resetPasswordToken: String,
		resetPasswordExpiresAt: Date,
		verificationToken: String,
		verificationTokenExpiresAt: Date,
	},
	{ timestamps: true }
);

export const User = mongoose.model("User", userSchema);
