import Expert from '../models/Event.js'

//1) TO CREATE A NEW EXPERT
export const createNewEvent = async (req, res)=>{

    const newExpert = new Expert(req.body)

    try{
        const savedExpert = await newExpert.save()
        res.status(201).json({status: "success", success:"true", 
                             message: "Expert Sucessfully Created", data: savedExpert})

    }catch(err){
        res.status(500).json({status: "failed", success:"false",
                             message: "Expert Cannot be Created. Try again"})
    }
}

//2) TO UPDATE AN EXPERT
export const updateEvent = async (req, res) =>{

    const id = req.params.id

    try{
        const updatedExpert = await Expert.findByIdAndUpdate(id, {$set: req.body}, {new: true})
        res.status(200).json({status: "success", success:"true", 
                             message: "Expert Sucessfully Updated", data: updatedExpert})

    }catch(err){
         res.status(500).json({status: "failed", success:"false",
                             message: "Expert Cannot be Updated. Try again"})
    }
}

//3) TO DELETE AN EXPERT
export const deleteEvent = async (req, res) =>{

    const id = req.params.id

    try{
        await Expert.findByIdAndDelete(id)
        res.status(200).json({status: "success", success:"true", 
                             message: "Expert Sucessfully Deleted"})

    }catch(err){
         res.status(500).json({status: "failed", success:"false",
                             message: "Expert Cannot be Deleted. Try again"})
    }
}

//4) TO GET A SINGLE EXPERT
export const getSingleEvent = async (req, res) =>{

    const id = req.params.id

    try{
        const singleExpert = await Expert.findById(id)
        res.status(200).json({status: "success", success:"true", 
                             message: "Sucessful", data: singleExpert})

    }catch(err){
         res.status(404).json({status: "failed", success:"false",
                             message: "Error: Expert Data Not Found."})
    }
}

//5) TO GET ALL EXPERTS
export const getAllEvents = async (req, res) =>{

    //for pagination
    const page = parseInt(req.query.page) || 0

    try{
        const allExperts = await Expert.find({}).skip(page * 8).limit(8)
        res.status(200).json({status: "success", success:"true", count: allExperts.length,
                             message: "Sucessful", data: allExperts})

    }catch(err){
         res.status(404).json({status: "failed", success:"false",
                             message: "Error: Data Not Found."})
    }
}

//6) TO GET EXPERTS BY SEARCH
export const getEventsBySearch = async(req, res)=>{

    try{
        const query = {};
        if (req.query.name) {
            query.name = new RegExp(req.query.name, 'i');
        }
        if (req.query.category && req.query.category !== 'all') {
            query.category = new RegExp(req.query.category, 'i');
        }

        const page = parseInt(req.query.page) || 0;

        const Experts = await Expert.find(query).skip(page * 8).limit(8)
        res.status(200).json({status: "success", success:"true", count: Experts.length,
                             message: "Sucessful", data: Experts})

    }catch(err){
        res.status(404).json({status: "failed", success:"false",
                            message: "Error: Data Not Found."})
    }
}

//7) TO GET ONLY FEATURED EXPERTS
export const getFeaturedEvents = async (req, res) =>{

    try{
        const FeaturedExperts = await Expert.find({featured: true}).limit(8)
        res.status(200).json({status: "success", success:"true", count: FeaturedExperts.length,
                             message: "Sucessful", data: FeaturedExperts})

    }catch(err){
         res.status(404).json({status: "failed", success:"false",
                             message: "Error: Data Not Found."})
    }
}

//8) TO GET EXPERTS COUNT
export const getEventsCount = async (req, res)=>{

    try{
        const query = {};
        if (req.query.name) {
            query.name = new RegExp(req.query.name, 'i');
        }
        if (req.query.category && req.query.category !== 'all') {
            query.category = new RegExp(req.query.category, 'i');
        }
        const ExpertCount = await Expert.countDocuments(query);
        
        res.status(200).json({status: "success", success:"true",
                             message: "Sucessful",data: ExpertCount})

    }catch(err){
        res.status(500).json({status: "failed", success:"false",
                             message: "Error: Failed to Fetch."})
    }
}

