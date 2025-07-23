import mongoose, { Schema, Document } from "mongoose";

export interface IComplaint extends Document {
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  dateSubmitted: Date;
}

const ComplaintSchema: Schema = new Schema<IComplaint>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    enum: ["Product", "Service", "Support"],
    required: true,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending",
  },
  dateSubmitted: {
    type: Date,
    default: Date.now,
  },
});

const Complaint = mongoose.models.Complaint || mongoose.model<IComplaint>("Complaint", ComplaintSchema);

export default Complaint;
