const
    express = require('express'),
    vrTextsRouter = new express.Router(),
    vrTextsCtrl = require('../controllers/vrTexts.js')

vrTextsRouter.route('/')
    .get(vrTextsCtrl.index)
    .post(vrTextsCtrl.create)


vrTextsRouter.route('/:id')
    .get(vrTextsCtrl.show)
    .patch(vrTextsCtrl.update)
    .delete(vrTextsCtrl.destroy)

module.exports = vrTextsRouter