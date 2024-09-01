import mongoose, { Document, Schema } from 'mongoose';

export interface MessageDocument extends Document {
  user: string;
  text: string;
  time: Date;
}

const MessageSchema = new Schema<MessageDocument>({
  user: { type: String, required: true },
  text: { type: String, required: true },
  time: { type: Date, default: Date.now },
});

const Message = mongoose.model<MessageDocument>('Message', MessageSchema);
export default Message;
