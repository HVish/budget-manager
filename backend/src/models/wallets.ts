import { model, Schema } from 'mongoose';

export interface Wallet {
  name: string;
  balance: number;
}

const WalletSchema = new Schema<Wallet>(
  {
    name: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const WalletModel = model('wallet', WalletSchema);

export default WalletModel;
