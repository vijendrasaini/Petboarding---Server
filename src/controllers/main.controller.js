// import mongoose from "mongoose"

// const query = []
// query = [
//     {
//         $lookup : {
//             from : "",
//             localField : "",
//             foreignField : "",
//             as : ""
//         }
//     },
//     {
//         unwind : "$ontherDatabase"
//     },
//     {
//         $lookup : {

//         }
//     },
//     {
//         unwind : ""
//     }

// ]
//     if(req.query.keyword && req.query.keyword != ''){
//         query.push(
//             {
//                 $match : {
//                     $or : [
//                         {
//                             title : { $regex : req.query.keyword}
//                         },
//                         {
//                             'catetegory_details.name' : { $regex : req.query.keyword}
//                         },
//                         {
//                             'creator.email' : { $regex : req.query.keyword}
//                         }
//                     ]
//                 }
//             }
//         )
//     }

//     if(req.query.category){
//         query.push(
//             {
//                 $match : {
//                     'category_details.$lug' : req.query.category,
//                 }
//             }
//         )
//     }

//     if(req.query.user_id){
//         query.push({
//             $match : {
//                 created_by : mongoose.Types.ObjectId(req.query.user_id)
//             }
//         })
//     }

//     let total = await Blog.countDocuments(query);
//     let page = req.query.page || 1
//     let limit = req.query.limit || 10

//     let offset = (page - 1)*limit

//     query.push({
//         $skip : skip
//     })
//     query.push({
//         $limit : limit
//     })

//     query.push(
//         {
//             $project : {
//                 "title" : 1,
//                 "categorty_details.name" : 1,
//                 "category_deatils.$lub" : 1
//             }
//         }
//     )
//     if(req.query.sortBy && req.query.sortOrder){
//         var sort = {}
//             sort[req.query.sortBy] = req.query.sortOrder == 'asc' ? 1 : 'des'
//             query.push({
//                 $sort : sort 
//             })
//     }
//     else{
//         query.push({
//             $sort : { createdAt : -1}
//         })
//     }


//     let Blogs = await Blog.aggregate(query)
//     return res.sent({
//         message : "Blog successfully fetched",
//         data : {
//             blogs : blogs.map(doc=> Blog.hydrate(doc)),
//             meta : {
//                 total : total,
//                 currentPage : page,
//                 totoalPages : Math.ceil(total/limit)
//             }
//         }
//     })
// }
// catch (err){
//     return res.status(400).send({
//         message : err.message,
//         data : err
//     })
// }