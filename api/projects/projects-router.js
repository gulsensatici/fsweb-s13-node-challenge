
const router = require("express").Router();
const projectsModel= require("./projects-model");
const mw = require("./projects-middleware");
// "project" routerını buraya yazın!

router.get("/", async (req,res,next)=>{
    try {
        const allProjects = await projectsModel.get();
        res.json(allProjects);
    } catch (error) {
        next(error);
    }
});
router.get("/:id", mw.validateProjectId, (req,res,next)=>{
    try {
        res.json(req.currentproject);
    } catch (error) {
        next(error);
    }
});
router.post("/", mw.validateProjectPayload, async (req,res,next)=>{
try {
    const inserted = await projectsModel.insert({name:req.body.name, description:req.body.description, completed:req.body.completed});
    res.status(201).json(inserted);
} catch (error) {
    next(error);
    
}
});
router.put("/:id", mw.validateProjectId, mw.validateProjectPayload, async(req,res,next)=>{
    try {
        let model ={
            name:req.body.name, 
            description:req.body.description, 
            completed:req.body.completed
        };
        const updated= await projectsModel.update(req.params.id, model);
        res.json(updated);
    } catch (error) {
        next(error);
        
    }
});
router.delete("/:id", mw.validateProjectId, async(req,res,next)=>{
    try {
       await projectsModel.remove(req.params.id);
        res.json({message:"silme işlemi başarılı"});
    } catch (error) {
        next(error);
        
    }
});
router.get("/:id/actions",  mw.validateProjectId, async(req,res,next)=>{
    try {
        const projectsActions = await projectsModel.getProjectActions(req.params.id);
        res.json(projectsActions);
    } catch (error) {
        next (error);
    }
});

module.exports =router;