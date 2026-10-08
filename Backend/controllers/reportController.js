const Report = require('../models/reportModel');
const Review = require('../models/reviewModel');

exports.reportUser = async (req,res)=>{
    try {
        const { note ,reviewId,reason} = req.body
        const reporterId = req.user.userId;
        

    if(!reason||!note){
        return res.status(400).json({
            success:false,
            message:'reason and note cannot be empty'
        })
    }

    const review = Review.findById(reviewId)

    if(!review){
        return res.status(404).json({
            success:false,
            message:'No review found'
        })
    }

    if(review.user.toString() === reporterId.toString()){
        return res.status(500).json({
            success:false,
            message:'Cant report to own review'
        })
    }

    const report = await Report.create({
        reporterId : reporterId,
        review : reviewId,
        note : note,
        reportedUser : review.user,
        reason
    })
    console.log(report);

    res.status(200).json({
        success : true,
        message:'Reported user',
        report
    })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }

}


exports.getAllReports = async (req,res)=>{
    try {
        const {status} = req.querry;
    const filter = {};
    if(status) filter.status = status;
    

    const allReports = Report.find(filter)
    .populate('reporter' , 'userName email' )
    .populate('reportedUser' ,'userName email isBanned')
    .populate({
        path:review,
        populate : {path:'Movie',select:'title'}
    }
    .sort({createdAt : -1})    
)

    if(!allReports){
        return res.status(404).json({
            success:false,
            message:'No reports found'
        })
    }

    res.status(200).json({
        success:true,
        allReports
    })


    } catch (error) {
        res.status(500).json({
            success: fasle,
            message:error.message
        })
    }
}

exports.updateReportStatus = async (req,res)=>{
    try {
        const {status} = req.body;
        const {id } = req.params;


        if(!id || !status){
            return res.status(404).json({
                success :false,
                message:'No id or status found'
            })
        }

        const report = await Report.findByIdAndUpdate(
            id,
            {status},
            {new:true}
        )

        if(!report){
            return res.status(404).json({
                success:false,
                message:'no report found'
            })
        }

        res.status(200).json({
            success: true,
            message:'updated successfully',
            report
        })
        
    } catch (error) {
         res.status(500).json({
            success: fasle,
            message:error.message
        })
    }
}

