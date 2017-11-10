const
    express = require('express'),
    vrTextsRouter = new express.Router(),
    vrTextsCtrl = require('../controllers/vrTexts.js')

vrTextsRouter.route('/')
    
    .post(vrTextsCtrl.create)


vrTextsRouter.route('/:id')
    .get(vrTextsCtrl.index)
    .patch(vrTextsCtrl.update)
    .delete(vrTextsCtrl.destroy)

module.exports = vrTextsRouter