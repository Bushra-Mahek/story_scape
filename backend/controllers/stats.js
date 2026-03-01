import { statsModel } from "../models/stats.model.js";
export const getStats = async (req,res)=>{
    try{
const [summary, stats, monthlyStats] = await Promise.all([
            statsModel.getSummary(),
            statsModel.getPostsPerUser(),
            statsModel.getPostsPerMonth()
        ]);

        console.log(summary);
        console.log(stats.rows);
        console.log(monthlyStats);

        return res.json({
            summary,
            users : stats.rows,
            monthly : monthlyStats.rows
        });
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'server error'});
    }
};

