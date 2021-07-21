// Instructions
// Frontend applications will come to us asking for information about breweries. We want to offer them three different endpoints 
// - A GET endpoint /breweries to have a full list of breweries available. The return type expected is an array of objects.
// - A GET endpoint /brewery/:id to have details of a single brewery, specifying an id (e.g /brewery/:9094). The return type expected is a single object
// - A GET endpoint /breweries?brewery_type=TYPE to have a filtered list by brewery_type. The return type expected is (always) an array of objects. (e.g /breweries?brewery_type=micro should return an array of objects representing all breweries having micro as brewery_type)



// Where do we get the data about breweries?
// Real backends have a database (spoiler!) but, for today, we will use an array of objects stored "in memory", so in a simple variable in our .js file.
// To have real information, you can tour the breweries of your neighbourhood or you can copy/paste what you can find here: https://api.openbrewerydb.org/breweries
// So, at the top of your file, you should declare
// const breweries = [{"id":9094,"obdb_id.....blahblah....}]

const express = require("express")
const fetch = require("node-fetch")

const app = express()

let breweryData = []

fetch("https://api.openbrewerydb.org/breweries")
.then(resp=>resp.json())
.then(data=> {
    runRoutes(data)
})

function runRoutes(breweries) {
    app.get("/breweries", (req, res) => {
        const { id, brewery_type } = req.query
        if (id) {
            const itemById = breweries.find(brewery=>brewery.id===Number(id))
            return res.json(itemById)
        }
        if (brewery_type) {
            const filterByBreweryType = breweries.filter(brewery=>brewery.brewery_type===brewery_type)
            return res.json(filterByBreweryType)
        }
        res.json(breweries)
    })

    app.get("/breweries/:id", (req, res) => {
        const { id } = req.params
        res.json(breweries[Number(id) - 1])
    })

}

app.listen(4000, ()=>{
    console.log("Lift off 🚀")
})