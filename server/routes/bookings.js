import express from "express";
import { verifyAdmin, verifyUser, verifyToken } from "../utils/verifyToken.js";
import {
    createBooking, deleteBooking,
    getAllBookings, getBooking, updateBooking
} from "../Controllers/bookingController.js";

const router = express.Router()

//router.post('/', verifyToken ,createBooking)
router.post("/", createBooking);
//router.get('/:id', verifyUser, getBooking)
router.get("/:id", getBooking);
// 
router.get("/", getAllBookings);
router.put('/:id', verifyAdmin, updateBooking)
router.delete('/:id', verifyAdmin, deleteBooking)

export default router
