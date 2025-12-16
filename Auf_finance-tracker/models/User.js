import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const userSchema = new mongoose.Schema({
     initialBalance: {
    type: Number,
    required: [true, 'Начальный баланс обязателен'],
    min: [0, 'Начальный баланс не может быть отрицательным']
  },
  currentBalance: {
    type: Number,
    required: true,
    min: 0
  },
  transactions: {
    type: [transactionSchema],
    default: []
  }
});
const User = mongoose.model('User', userSchema);

export default User;