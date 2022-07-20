const express = require('express');
const axios = require('axios')
const router = express.Router();

//GET http://localhost:3000/`
router.get('/', async (req, res) => {
    try {
        res.render("webpages/homepage", { pageName: "Show Finder" })
    } catch (e) {
        res.status(404).json({ error: 'Error: Home page not found.' });
    }
});



//http://localhost:3000/shows/{id}
router.get("/shows/:id", async (req, res) => {
    try {
        const { id } = req.params

        if (isNaN(id)) {
            res.status(404).json({ error: 'Error: please input text.' });
        }

        const { data } = await axios.get(`http://api.tvmaze.com/shows/` + id);
        data.summary = data.summary.replace(/(<([^>]+)>)/gi, ""); //filter out the unwanted tags using regex
        res.render("webpages/singleshow", { showsList: data, pageName: data.name });
    }
    catch (e) {
        res.status(404);
    }
});



//http://localhost:3000/search
router.post("/search", async (req, res) => {
    if (!req.body) {
        res.status(404).json({ error: 'Error: please input text.' });
        return;
    }
    const { searchTerm } = req.body

    try {
        const { data } = await axios.get(`http://api.tvmaze.com/search/shows?q=}` + searchTerm);
        data.slice(0, 10);

        res.render("webpages/showslistpage", { lengthofsearch: (data.length !== 0), showsList: data, pageName: "Shows Found", term: searchTerm });
    }
    catch (e) {
        res.status(404);
    }
});


module.exports = router;