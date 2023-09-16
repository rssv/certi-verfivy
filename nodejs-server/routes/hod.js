const express = require('express');

const hodController = require('../controllers/hod');
const { auth } = require('../middlewares/auth');
const { hodRoute } = require('../middlewares/roles');


const router = express.Router();


router.get('/subjects', auth, hodRoute, hodController.getSubjects);
router.post('/subjects', auth, hodRoute, hodController.createSubjects);
router.get('/subject/:id', auth, hodRoute, hodController.getSubject);
router.post('/subject', auth, hodRoute, hodController.createSubject);
router.put('/subject/:id', auth, hodRoute, hodController.updateSubject);
router.delete('/subject/:id', auth, hodRoute, hodController.removeSubject);


router.get('/subOfferings', auth, hodRoute, hodController.getSubOfferings);
router.post('/subOfferings', auth, hodRoute, hodController.createSubOfferings);
router.get('/subOffering/:id', auth, hodRoute, hodController.getSubOffering);
router.post('/subOffering', auth, hodRoute, hodController.createSubOffering);
router.put('/subOffering/:id', auth, hodRoute, hodController.updateSubOffering);
router.delete('/subOffering/:id', auth, hodRoute, hodController.removeSubOffering);


router.get('/instructors', auth, hodRoute, hodController.getInstructors);
router.get('/instructor/:id', auth, hodRoute, hodController.getInstructor);

router.get('/semesters', auth, hodRoute, hodController.getSemesters);
router.get('/semester/:id', auth, hodRoute, hodController.getSemester);


module.exports = router;