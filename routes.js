const express = require('express');

const userController = require('./controllers/userController');

const groupController = require('./controllers/groupController');

const validationMiddleware = require('./middlewares/validationMiddleware')

const router = express.Router();  

router.route('/users')
    .post(userController.create)
    .get(userController.getAll);

router.route('/users/:user_id')
    .all(validationMiddleware.validateObjectId)
    .get(userController.getOne)
    .patch(userController.updateOne)
    .delete(userController.deleteOne);

router.route('/groups')
    .post(groupController.create)
    .get(groupController.getAll);

router.route('/groups/:group_id')
    .all(validationMiddleware.validateObjectId)
    .get(groupController.getOne)
    .patch(groupController.updateName);

router.route('/groups/:group_id/users')
    .all(validationMiddleware.validateObjectId)
    .post(groupController.addUserToGroup);

router.route('/groups/:group_id/users/:user_id')
    .all(validationMiddleware.validateObjectId)
    .delete(groupController.removeUserFromGroup);

module.exports = router;