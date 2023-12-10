const express = require('express');
const userController = require('../controllers/usersController');
const preferencesController = require('../controllers/preferencesController');
const { verifyToken } = require('../middlewares/verifyToken');
const newsController = require('../controllers/newsController');

const router = express.Router();

router.post('/register', userController.registerController)
router.get('/login', userController.loginController)
router.get('/preferences', verifyToken, preferencesController.getPreferencesController)
router.put('/preferences', verifyToken, preferencesController.putPreferencesController)
router.get('/news', verifyToken, newsController.getNewsController)
router.get('/news/read', verifyToken, newsController.getNewsReadController)
router.post('/news/:id/read', verifyToken, newsController.postNewsReadController)
router.get('/news/favorite', verifyToken, newsController.getNewsFavoriteController)
router.post('/news/:id/favorite', verifyToken, newsController.postNewsFavoriteController)
router.get('/news/search/:keyword', verifyToken, newsController.getNewsSearchController)

module.exports = router;