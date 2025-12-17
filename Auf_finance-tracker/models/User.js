import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['income', 'expense'],//тип транзакции доход и расход
        required: true
    },
    amount: {
        type: Number,
        required: true//сумма по умолчанию
    },
    date: {
        type: Date,
        default: Date.now //Дата текущая по умолчанию
    }
});

const userSchema = new mongoose.Schema({
     initialBalance: {
    type: Number,
    required: [true, 'Начальный баланс обязателен'], //Начальный баланс должен быть указан
    min: [0, 'Начальный баланс не может быть отрицательным']
  },
  currentBalance: {
    type: Number,
    required: true,//Текущий баланс должен быть указан
    min: 0
  },
  transactions: {
    type: [transactionSchema], //Массив транзакций
    default: []
  }
});
const User = mongoose.model('User', userSchema);

export default User;