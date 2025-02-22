import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { 
    registerUser, 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    updateAccountDetails, 
    updateUserAvatar, 
    updateUserCoverImage, 
    getCurrentUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route('/register').post(
    upload.fields([
        {
            name: 'avatar',
            maxCount: 1,
        },
        {
            name: 'coverImage',
            maxCount: 1,
        },
    ]),registerUser
)
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);
router.route('/refresh-token').post(refreshAccessToken);
router.route('/change-password').post(verifyJWT,upload.none(), changeCurrentPassword);
router.route('/current-user').get(verifyJWT, getCurrentUser);
router.route('/update-account').patch(verifyJWT, upload.none(), updateAccountDetails);
router.route('/update-avatar').patch(verifyJWT, upload.single('avatar'), updateUserAvatar);
router.route('/update-cover_image').patch(verifyJWT, upload.single('coverImage'), updateUserCoverImage);

export default router;