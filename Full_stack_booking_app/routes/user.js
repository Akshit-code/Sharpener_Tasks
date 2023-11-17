const express =  require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/get-booking/:id', userController.getBookingByID);
router.get('/get-all-bookings', userController.getAllBooking);
router.post('/add-booking', userController.addBooking);
router.put('/update-booking/:id', userController.updateBooking);
router.delete("/delete-booking/:id", userController.deleteBooking);
module.exports = router;