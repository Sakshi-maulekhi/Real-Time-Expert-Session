import Booking from '../models/Booking.js'

//1) TO CREATE A BOOKING
export const createBooking = async (req, res)=>{

    const { expert_id, date, slot } = req.body;

    // Check if there's an existing booking for expert at the selected date and slot
    const existingBooking = await Booking.findOne({ expert_id, date, slot });

    if (existingBooking) {
        return res.status(400).json({status: "failed",success: "false",
                                     message: "Cannot book at that slot, already booked"});
    }

    const newBooking = new Booking(req.body)

    try{
        const savedBooking = await newBooking.save()
        res.status(200).json({status: "success", success:"true", 
                                 message: "Your Session is Booked", data: savedBooking})

    }catch(err){
        console.error(err);
        res.status(500).json({status: "failed", success:"false", 
                                 message: "Failed to Book Session"})
    }
}

//2) TO GET BOOKING DETAILS BY ID
export const getBooking = async (req, res)=>{

    const id = req.params.id

    try{
        const singleBooking = await Booking.findById(id).populate('expert_id')
        res.status(200).json({status: "success", success:"true", 
                                 message: "Succesful", data: singleBooking})

    }catch(err){
        res.status(404).json({status: "failed", success:"false", 
                                 message: "Booking Not Found"})
    }
}

//3) TO GET All BOOKINGS DETAILS
export const getAllBookings = async (req, res)=>{

    console.log("getAllBookings called with req.query:", req.query);

    // Add filter by email if provided
    const email = req.query.email;
    const query = {};
    if (email) {
        query.email = email;
    }

    try{
        const allBookings = await Booking.find(query).populate('expert_id')
        console.log("fetched bookings:", allBookings);
        res.status(200).json({status: "success", success:"true", 
                                 message: "Succesful", count: allBookings.length, data: allBookings})

    }catch(err){
        res.status(500).json({status: "failed", success:"false", 
                                 message: "Internal Server Error"})
    }
}

//4) TO DELETE A BOOKING
export const deleteBooking = async (req, res) =>{

    const id = req.params.id

    try{
        await Booking.findByIdAndDelete(id)
        res.status(200).json({status: "success", success:"true", 
                             message: "Booking Sucessfully Deleted"})

    }catch(err){
         res.status(500).json({status: "failed", success:"false",
                             message: "Booking Cannot be Deleted. Try again"})
    }
}

//5) TO UPDATE A BOOKING
export const updateBooking = async (req, res) =>{

    const id = req.params.id

    try{
        const updateBooking = await Booking.findByIdAndUpdate(id, {$set: req.body}, {new: true})
        res.status(200).json({status: "success", success:"true", 
                             message: "Booking Sucessfully Updated", data: updateBooking})

    }catch(err){
         res.status(500).json({status: "failed", success:"false",
                             message: "Booking Cannot be Updated. Try again"})
    }
}