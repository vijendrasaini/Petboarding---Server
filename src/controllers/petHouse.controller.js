const PetHouse = require('../models/petHouse.model')


const router = require('express').Router()

router.post('/add', async (req, res)=>{
    try {
        const petHouse = await PetHouse.create(req.body)
        return res
        .status(201)
        .send(petHouse)
    } catch (error) {
        return res
        .status(500)
        .send({
            message : error.message
        })
    }
})
router.get('/pethouses', async (req, res)=>{
    try {
        const query = []
        const { search, filter, sortKey, sortOrder, askedLimit, askedPage} = req.query

        if(search)
        {
            const searchPipeline = {
                $match : {
                    $or : [
                        { "overview.name" : { $regex :new RegExp(search, "i") } },
                        { "overview.address" : { $regex :new RegExp(search, "i") } },
                        { "overview.city" : { $regex :new RegExp(search, "i") } }
                            ]
                }
            }
            query.push(searchPipeline)
        }
        if(filter){
            const filterPipeLine = {
                $match : {
                    "overview.verified" : filter == 'true'?true : false
                }
            }
            query.push(filterPipeLine)
        }

        let newQuery = [...query,{$count: "totalDocs"}]
        let totalDocs = await PetHouse.aggregate(newQuery)
        
        if(Array.isArray(totalDocs))
            totalDocs = totalDocs[0]
        totalDocs = totalDocs.totalDocs
        let page = +askedPage || 0
        let limit = +askedLimit || 10
        

        let offset = page * limit
        const totalPages = Math.ceil(totalDocs/limit)
        
        const limitPipeLine = {
            $skip : offset
        }
        const skipPipeLine = {
            $limit : limit
        }
        query.push(limitPipeLine)
        query.push(skipPipeLine)

        if(sortKey && sortOrder){
            const sortPipeLine = {
                $sort : { [`overview.${sortKey}`] : +(sortOrder)}
            }
            query.push(sortPipeLine)
        }

        const petHouses = await PetHouse.aggregate(query)
        return res
        .status(201)
        .send({
            petHouses,
            totalPages,
            count : totalDocs,
            rowsPerPage : limit,
            page 
        })
    } catch (error) {
        console.log(error.message)
        return res
        .status(500)
        .send({
            message : error.message
        })
    }
})

module.exports  = router