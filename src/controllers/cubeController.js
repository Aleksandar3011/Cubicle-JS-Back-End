const router = require("express").Router();
const cubeService = require("../services/cubeService");
const accessoryService = require('../services/accessoryService');
const { isAuth } = require("../middlewares/authMiddleware");


router.get("/create", isAuth, (req, res) => {
    res.render("create");
});

router.post("/create", isAuth, async (req, res) => {
    const cube = req.body;
    cube.owner = req.user._id;

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
    const cube = await cubeService.getOneDetails(req.params.id).lean();
    res.render('details', { cube });
});

router.get('/:cubeId/attach', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    const accessories = await accessoryService.getAllAvailable(cube.accessories).lean();

    res.render('accessory/attach', {cube, accessories})
});

router.post('/:cubeId/attach', async (req, res) => {
    const accessoryId = req.body.accessory;

    await cubeService.attachAcc(req.params.cubeId, accessoryId)

    res.redirect(`/cube/details/${req.params.cubeId}`)
});

router.get('/:cubeId/edit', isAuth, async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();

    if(cube.owner != req.user._id){
        //TODO: add notif...
        return res.redirect('/404');
    }

    if(!cube){
        return res.redirect('/404')
    }

    res.render('cube/edit', { cube });
});

router.post('/:cubeId/edit', async (req, res) => {
   const modifiedCube = await cubeService.edit(req.params.cubeId, req.body);

    res.redirect(`/cube/details/${modifiedCube._id}`);
});

module.exports = router;
