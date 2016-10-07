"use strict"

const Conversation = require('../models/conversation'),
      Message = require('../models/message'),
      User = require('../models/user');

/*
First, we search our conversation collection for conversations in which our
authenticated user is as particpant. Next, we create an empty array,
fullConversations, which we will push the results olf our next query onto. Our
next query takes the results of our first one (which are stored in an array),
and searches the message collection for any messsages which are a part of the
given conversation. We sort those by most recent, limit the results to one, and
populate the author path. Finally, we push those results to our
fullConversations array, and when teh array is equal in size to the length of
the converseations array, we are done, so we respond to the request with the
array of conversations.
*/
exports.getConversations = function(req, res, next) {
  // Only return one message from each conversation to display as snippet
  Conversation.find({ participants: req.user._id })
              .select('_id')
              .exec(function(err, conversations) {
                if (err) {
                  res.send({ error: err });
                  return next(err);
                }

                // Set up empty array to hold conversations + most recent message
                let fullConversations = [];
                conversations.forEach(function(conversation) {
                  Message.find({ 'conversationId': conversation._id })
                         .sort('-createdAt')
                         .limit(1)
                         .populate({
                           path: "author",
                           select: "profile.firstName profile.lastName"
                         })
                         .exec(function(err, message) {
                           if (err) {
                             res.send({ error: err });
                             return next(err);
                           }
                           fullConversations.push(message);
                           if(fullConversations.length === conversations.length) {
                             return res.status(200).json({ conversations: fullConversations });
                           }
                         });
                });
              });
}

/*
To get all the messages in a single conversation.
*/
exports.getConversation = function(req, res, next) {
  Message.find({ conversationId: req.params.conversationId })
         .select('createdAt body author')
         .sort('-createdAt')
         .populate({
           path: 'author',
           select: 'profile.firstName profile.lastName'
         })
         .exec(function(err, messages) {
           if (err) {
             res.send({ error: err });
             return next(err);
           }

           res.status(200).json({ conversation: messages });
         });
}

/*
Starting a new conversation

First, we do some simple checking to make sure the required fields were sent
with the request.
Next, we create a new conversation with the authenticated user and their
specified recipient as the participants.
Following that, we created and saved a new message, which we affiliated with the
conversation we just created.
*/
exports.newConversation = function(req, res, next) {
  if(!req.params.recipient) {
    res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
    return next();
  }

  if(!req.body.composedMessage) {
    res.status(422).send({ error: 'Please enter a message.' });
    return next();
  }

  const conversation = new Conversation({
    participants: [req.user._id, req.params.recipient]
  });

  conversation.save(function(err, newConversation) {
    if (err) {
      res.send({ error: err });
      return next(err);
    }

    const message = new Message({
      conversationId: newConversation._id,
      body: req.body.composedMessage,
      author: req.user._id
    });

    message.save(function(err, newMessage) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      res.status(200).json({ message: 'Conversation started!', conversationId: conversation._id });
      return next();
    });
  });
}

/*
Sending a reply, or adding a new message to an existing conversation.
*/
exports.sendReply = function(req, res, next) {
  const reply = new Message({
    conversationId: req.params.conversationId,
    body: req.body.composedMessage,
    author: req.user._id
  });

  reply.save(function(err, sentReply) {
    if (err) {
      res.send({ error: err });
      return next(err);
    }

    res.status(200).json({ message: 'Reply successfully send!' });
    return(next);
  });
}

/*
DELETE route to Delete Conversation
*/
exports.deleteConversation = function(req, res, next) {
  Conversation.findOneAndRemove({
    $and : [
            { '_id': req.params.conversationId }, { 'participants': req.user._id }
          ]}, function(err) {
            if (err) {
              res.send({ error: err });
              return next(err);
            }

            res.status(200).json({ message: 'Conversation removed!' });
            return next();
          });
}

/*
PUT route to Update Message
*/
exports.updateMessage = function(req, res, next) {
  Conversation.find({
    $and : [
            { '_id' : req.params.messageId }, { 'author': req.user._id }
          ]}, function(err, message) {
            if (err) {
              res.send({ error: err });
              return next(err);
            }

            message.body = req.body.composedMessage;

            message.save(function(err, updatedMessage) {
              if(err) {
                res.send({ error: err });
                return next(err);
              }

              res.status(200).json({ message: 'Message udpated!' });
              return next();
            });
  });
}
