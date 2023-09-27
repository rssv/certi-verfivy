const {
    Semester,
    Subject,
    SubOffering,
    Department,
    Instructor
} = require('../models');
const { stringToIntId, intToStringId } = require('../utils/transformers');

module.exports = {
    createSubjects: async (req, res, next) => {
        let reqSubjects  = req.body.subjects;
        const hod = req.authUser;
        const int_emp_id = stringToIntId(hod.employeeId);
        const dept = await Department.findOne({
            where:{
                head: int_emp_id
            }
        });
        
        const stirngDeptId = intToStringId(dept.id);
        reqSubjects = reqSubjects.map((reqSub) => {
            return {...reqSub, departmentId: stirngDeptId}
        });

        let createdSubjects;

        try{
            createdSubjects =  await Subject.bulkCreate(reqSubjects, { returning: true });
        } catch(err){
            return next(err);
        }

        createdSubjects = createdSubjects.map((sub) => {
            const stringId = intToStringId(sub.id);
            return {
                id: stringId,
                sub_code: sub.sub_code,
                sub_name: sub.sub_name,
                departmentId: sub.departmentId
            };
        });
        return res.json(createdSubjects);
    },

    getSubjects: async (req, res, next) => {
        const hod = req.authUser;
        const int_emp_id = stringToIntId(hod.employeeId);
        const dept = await Department.findOne({
            where:{
                head: int_emp_id
            }
        });
        
        let allSubjects;        

        try{
            allSubjects = await Subject.findAll({
                where:{
                    departmentId: dept.id
                }
            });
        }catch(err){
            return next(err);
        }

        allSubjects = allSubjects.map((sub) => {
            const stringId = intToStringId(sub.id);
            return {
                id: stringId,
                sub_code: sub.sub_code,
                sub_name: sub.sub_name,
                departmentId: sub.departmentId
            };
        });
        return res.json(allSubjects);
    },
    
    createSubject: async (req, res, next) => {
        let reqSubject  = req.body;
        const hod = req.authUser;
        const int_emp_id = stringToIntId(hod.employeeId);

        const dept = await Department.findOne({
            where:{
                head: int_emp_id
            }
        });

        const stirngDeptId = intToStringId(dept.id);
        reqSubject = {...reqSubject, departmentId: stirngDeptId};
        let createdSubject;

        try{
            createdSubject =  await Subject.create(reqSubject);
        } catch(err){
            return next(err);
        }

        const stringId = intToStringId(createdSubject.id);

        return res.json({
            id: stringId,
            sub_code: createdSubject.sub_code,
            sub_name: createdSubject.sub_name,
            departmentId: createdSubject.departmentId
        });
    },

    getSubject: async (req, res, next) => {
        const hod = req.authUser;
        const int_emp_id = stringToIntId(hod.employeeId);
        const dept = await Department.findOne({
            where:{
                head: int_emp_id
            }
        });

        const intParamsId = stringToIntId(req.params.id);
        let fetchedSubject;

        try{
            fetchedSubject = await Subject.findOne({
                where: {
                    id: intParamsId,
                    departmentId: dept.id
                }
            });
        } catch(err){
            return next(err);
        }
        
        if(!fetchedSubject){
            return res.status(404).send({msg: 'subject not found'});
        }

        const stringId = intToStringId(fetchedSubject.id);
        return res.json({
            id: stringId,
            sub_code: fetchedSubject.sub_code,
            sub_name: fetchedSubject.sub_name,
            departmentId: fetchedSubject.departmentId
        });
    },

    updateSubject: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        const hod = req.authUser;
        const int_emp_id = stringToIntId(hod.employeeId);
        const dept = await Department.findOne({
            where:{
                head: int_emp_id
            }
        });
        console.log("dept.id", dept.id);
        let updatedSubject;
        console.log("intParmsId", intParamsId);

        if(req.body.id){
            return res.status(400).send({'msg': 'cannot update id'});
        }

        if(req.body.departmentId){
            return res.status(400).send({'msg': 'cannot update departmentId'});
        }

        try{
            updatedSubject = await Subject.update(req.body, {
                where: {
                  id: intParamsId,
                  departmentId: dept.id
                }
            });
        } catch(err){
            return next(err);
        }

        return res.json(updatedSubject);
    },

    removeSubject: async (req, res, next) => {
        const hod = req.authUser;
        const int_emp_id = stringToIntId(hod.employeeId);
        const dept = await Department.findOne({
            where:{
                head: int_emp_id
            }
        });
        const intParamsId = stringToIntId(req.params.id);
        let removedSubject;

        try{
            removedSubject = await Subject.destroy({
                where: {
                    id: intParamsId,
                    departmentId: dept.id
                }
            });
        } catch(err){
            return next(err);
        }
        
        return res.json(removedSubject);
    },

    createSubOfferings: async (req, res, next) => {
        const hod = req.authUser;
        const int_emp_id = stringToIntId(hod.employeeId);

        const dept = await Department.findOne({
            where:{
                head: int_emp_id
            }
        });

        const reqSubOff = req.body.subOfferings;
        let fetchedSubjects = [];
        let fetchedInstructors = [];
        reqSubOff.map(async(subOff) => {
            const intSubId = stringToIntId(subOff.subjectId);
            const intInstId = stringToIntId(subOff.instructorId);
    
            fetchedSubjects.push(Subject.findOne({
                where:{
                    id: intSubId
                }
            }));

            fetchedInstructors.push(Instructor.findOne({
                where:{
                    id: intInstId
                }
            }));
        });

        fetchedSubjects = await Promise.all(fetchedSubjects);
        fetchedInstructors = await Promise.all(fetchedInstructors);

        const flagSubjects = fetchedSubjects.every((fsub) => {
            return (dept.id == stringToIntId(fsub.departmentId));
        });
        const flagInstructors = fetchedInstructors.every((finst) => {
            return (dept.id == stringToIntId(finst.departmentId));
        })

        if(!flagInstructors || !flagSubjects){
            return res.status(400).send({'msg': 'hod.department not matched with subject.department or instructor.department'});
        }

        let createdSubOfferings;

        try{
            createdSubOfferings =  await SubOffering.bulkCreate(req.body.subOfferings, { returning: true });
        } catch(err){
            return next(err);
        }

        createdSubOfferings = createdSubOfferings.map((subOff) => {
            const stringId = intToStringId(subOff.id);
            return {
                id: stringId,
                subjectId: subOff.subjectId,
                semesterId: subOff.semesterId,
                instructorId: subOff.instructorId
            };
        });
        return res.json(createdSubOfferings);
    },

    getSubOfferings: async (req, res, next) => {
        const hod = req.authUser;
        const int_emp_id = stringToIntId(hod.employeeId);

        const dept = await Department.findOne({
            where:{
                head: int_emp_id
            }
        });
        let allSubOfferings;        

        try{
            allSubOfferings = await SubOffering.findAll();
        }catch(err){
            return next(err);
        }
        let allSubjects = [];
        
        let sampleSub = await allSubOfferings[0].getSubject();
        console.log("sampleSub", sampleSub);
        allSubOfferings = allSubOfferings.map((subOff) => {
            const stringId = intToStringId(subOff.id);
            return {
                id: stringId,
                subjectId: subOff.subjectId,
                semesterId: subOff.semesterId,
                instructorId: subOff.instructorId
            };
        });
        return res.json(sampleSub);
    },

    createSubOffering: async (req, res, next) => {
        const hod = req.authUser;
        const int_emp_id = stringToIntId(hod.employeeId);

        const dept = await Department.findOne({
            where:{
                head: int_emp_id
            }
        });

        const intSubId = stringToIntId(req.body.subjectId);
        const intInstId = stringToIntId(req.body.instructorId);
    
        const fetchedSubject = await Subject.findOne({
            where:{
                id: intSubId
            }
        });

        const fetchedInstructor = await Instructor.findOne({
            where:{
                id: intInstId
            }
        });

        if((dept.id != stringToIntId(fetchedSubject.departmentId)) || (dept.id != stringToIntId(fetchedInstructor.departmentId))){
            return res.status(400).send({'msg': 'hod.department not matched with subject.department or instructor.department'});
        }

        let createdSubOffering;

        try{
            createdSubOffering =  await SubOffering.create(req.body);
        } catch(err){
            return next(err);
        }

        const stringId = intToStringId(createdSubOffering.id);

        return res.json({
            id: stringId,
            subjectId: createdSubOffering.subjectId,
            semesterId: createdSubOffering.semesterId,
            instructorId: createdSubOffering.instructorId
        });
    },

    getSubOffering: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let fetchedSubOffering;

        try{
            fetchedSubOffering = await SubOffering.findOne({
                where: {
                    id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }
        
        if(!fetchedSubOffering){
            return res.status(404).send({msg: 'subOffering not found'});
        }

        const stringId = intToStringId(fetchedSubOffering.id);
        return res.json({
            id: stringId,
            subjectId: fetchedSubOffering.subjectId,
            semesterId: fetchedSubOffering.semesterId,
            instructorId: fetchedSubOffering.instructorId
        });
    },

    updateSubOffering: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let updatedSubOffering;

        if(req.body.id){
            return res.status(400).send({'msg': 'cannot update id'});
        }

        try{
            updatedSubOffering = await SubOffering.update(req.body, {
                where: {
                  id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }

        return res.json(updatedSubOffering);
    },

    removeSubOffering: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let removedSubOffering;

        try{
            removedSubOffering = await SubOffering.destroy({
                where: {
                id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }
        
        return res.json(removedSubOffering);
    },

    getInstructors: async (req, res, next) => {
        const hod = req.authUser;
        const int_emp_id = stringToIntId(hod.employeeId);
        const dept = await Department.findOne({
            where:{
                head: int_emp_id
            }
        });
        
        let allInstructors;        

        try{
            allInstructors = await Instructor.findAll({
                where:{
                    departmentId: dept.id
                }
            });
        }catch(err){
            return next(err);
        }

        allInstructors = allInstructors.map((inst) => {
            const stringId = intToStringId(inst.id);
            return {
                id: stringId,
                cv_link: inst.cv_link,
                departmentId: inst.departmentId,
                employeeId: inst.employeeId
            };
        });
        return res.json(allInstructors);
    },

    getInstructor: async (req, res, next) => {
        const hod = req.authUser;
        const int_emp_id = stringToIntId(hod.employeeId);
        const dept = await Department.findOne({
            where:{
                head: int_emp_id
            }
        });

        const intParamsId = stringToIntId(req.params.id);
        let fetchedInstructor;

        try{
            fetchedInstructor = await Instructor.findOne({
                where: {
                    id: intParamsId,
                    departmentId: dept.id
                }
            });
        } catch(err){
            return next(err);
        }
        
        if(!fetchedInstructor){
            return res.status(404).send({msg: 'instructor not found'});
        }

        const stringId = intToStringId(fetchedInstructor.id);
        return res.json({
            id: stringId,
            cv_link: fetchedInstructor.cv_link,
            employeeId: fetchedInstructor.employeeId,
            departmentId: fetchedInstructor.departmentId
        });
    },

    getSemesters: async (req, res, next) => {
        let allSemesters;

        try {
            allSemesters = await Semester.findAll();
        } catch(err){
            return next(err);
        }

        allSemesters = allSemesters.map((sem) => {
            const stringId = intToStringId(sem.id);
            return {
                id: stringId,
                sem_session: sem.sem_session,
                sem_type: sem.sem_type
            };
        })
        return res.json(allSemesters);
    }, 

    getSemester: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let fetchedSemester;

        try{
            fetchedSemester =  await Semester.findOne({
                where:{
                    id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }
        
        if(!fetchedSemester){
            return res.status(404).send({msg: 'semester not found'});
        }
       
        const stringId = intToStringId(fetchedSemester.id);
        return res.json({
            id: stringId,
            sem_session: fetchedSemester.sem_session,
            sem_type: fetchedSemester.sem_type
        });
    }
}