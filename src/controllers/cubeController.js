const router = require("express").Router();
const cubeSevice = require("../services/cubeService");

router.get("/create", (req, res) => {
    res.render("create");
});

router.post("/create", async (req, res) => {
    const cube = req.body;
    // Validate
    if (cube.name.trim == ``) {
        res.status(400).send("Invalid request");
        return;
    }
    // Save data
    try{
        await cubeSevice.create(cube);

        res.redirect('/');
    }catch(err){
        console.log(err);
        res.status(400).send(err)
    }
        
});

router.get('/details/:id', async (req, res) => {
    const cube = await cubeSevice.getOne(req.params.id).lean();
    res.render('details', { cube });
});

module.exports = router;
