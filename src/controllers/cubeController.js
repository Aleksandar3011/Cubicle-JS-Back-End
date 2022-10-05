const router = require("express").Router();
const cubeService = require("../services/cubeService");
const accessoryService = require('../services/accessoryService');

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
        await cubeService.create(cube);

        res.redirect('/');
    }catch(err){
        console.log(err);
        res.status(400).send(err)
    }
        
});

router.get('/details/:id', async (req, res) => {
    const cube = await cubeService.getOne(req.params.id).lean();
    res.render('details', { cube });
});

router.get('/:cubeId/attach', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    const accessories = await accessoryService.getAll().lean();

    res.render('accessory/attach', {cube, accessories})
});

module.exports = router;
