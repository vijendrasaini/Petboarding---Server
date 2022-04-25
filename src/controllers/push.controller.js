
let query = [
    {
        $lookup : {
            from : "",
            localField : "",
            foreignField : "",
            as : ""
        }
    },
    {
        unwind : "$ontherDatabase"
    },
    {
        $lookup : {

        }
    },
    {
        unwind : ""
    }

]