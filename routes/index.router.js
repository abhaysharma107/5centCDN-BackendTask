const express = require('express')
const router = express.Router()

const ctrlUser = require('../controller/user.controller')
const jwtHelper = require('../config/jwtHelper');
const ctrlPost = require('../controller/post.controller')   


router.get('/',jwtHelper.verifyJwtToken, ctrlUser.account)
// router.get('/',test.test)

router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile)
// router.get('/getAllSubject', jwtHelper.verifyJwtToken, resultPrediction.getAllSubject)
router.post('/signup', ctrlUser.signup)
router.post('/login', ctrlUser.login);
router.put('/updateUser/:id',  ctrlUser.updateUser)
router.delete('/deleteUser/:id',  ctrlUser.deleteUser)
router.get('/getAdmin',  ctrlUser.getAdmin)
router.get('/getRole', jwtHelper.verifyJwtToken, ctrlUser.getRole)
router.post('/add-post', ctrlPost.addPost);
router.post('/get-post', ctrlPost.getPost);
router.get('/get-post-by-id/:id', ctrlPost.getPostById);
router.get('/get-all-post', ctrlPost.getAllPost);
router.put('/update-post', ctrlPost.updatePost);
router.delete('/delete-post/:id', ctrlPost.deletePost);

module.exports = router