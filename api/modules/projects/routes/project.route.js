const express = require('express');
const router = express.Router();

const projectController = require('../controllers/project.controller');

router.post('/project/save', projectController.saveProject);
router.patch('/project/update/:id', projectController.updateProject);
router.delete('/project/delete/:id', projectController.deleteProject);

router.get('/project/get', projectController.getProjects);
router.get('/project/getById/:id', projectController.getProhectById);

module.exports = router;