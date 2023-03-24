const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
    title: {
      type: String,
      required: [true, 'Please provide title'],
      
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
      
    },
    price: {
      type: Number,
      required: [true, 'Pls provide a price']
    },
    amount: {
      type: Number,
      required: [true, 'Pls provide amount'],
      default: 0
    },
    category: {
      type: String,
      enum: ['clothes', 'smartphones', 'electronics', 'books', 'sports', 'kids item', 'automobiles','home interior', 'other'],
      default: 'other',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', ProductSchema)
