import express from "express";
import { login, register, updateProfile , adminLogin, registerAdmin, changeEmail, saveContactDetails, getUsers, getContacts, addHouse, getHouses, getHouseById, deleteHouse, editHouse, rentHouse, getRentedHouses, rentedHousesByUserId, getAvailableHousesForRent, getUserProfile} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
import adminAuth from "../middlewares/adminAuth.js";
 
const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);

router.route("/contact").post(saveContactDetails);
router.route("/all-users").get(getUsers);
router.route("/contacts").get(getContacts);

router.route('/profile/:id').get(getUserProfile);

router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
router.route("/change-email").put(isAuthenticated,changeEmail)
router.route('/admin/login').post(adminLogin);
router.route('/admin/register').post(registerAdmin);



//houses routes
router.route('/houses/add-house').post(singleUpload,addHouse);
router.route('/houses/get-houses').get(getHouses);
router.route('/houses/get-house/:id').get(getHouseById);
router.route('/houses/delete-house/:id').delete(deleteHouse);
router.route('/houses/edit-house/:id').put(singleUpload,editHouse);

router.route('/houses/available-houses').get(getAvailableHousesForRent);
router.route('/houses/rent-house').post(rentHouse);
router.route('/houses/rented-houses').get(getRentedHouses);
router.route('/houses/rented-houses/:id').get(rentedHousesByUserId);




export default router;