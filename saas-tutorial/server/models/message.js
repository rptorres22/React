const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const MessageSchema = new Schema({
  conversationId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},
{
    timestamps: true // Saves createAt and updatedAt as dates. createdAt will be our timestamp.
});

module.exports = mongoose.model('Message', MessageSchema);

/*
RPT NOTES:

MongoDB would have allowed us to simply embed the messages as an array in the
conversation collection, but that is an anti-pattern, as the array could grow
without bounds.  This would affect performance.
*/
