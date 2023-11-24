const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const { 
    Student,
    Employee,
    Department,
    Course, 
    User, 
    Instructor,
    Semester,
    StudentSubjectRegistration,
    SubOffering,
    SubOfferingForDept,
    Subject
} = require('../models')


module.exports = {
    getStudents: async (req, res, next) => {
        let allStudents;        

        try{
            allStudents = await Student.findAll();
        }catch(err){
            return next(err);
        }

        allStudents = allStudents.map(async (student) => {
            let department  = await student.getDepartment();
            let course = await student.getCourse();
            return {
                uuid: student.uuid,
                adm_no: student.adm_no,
                s_name: student.s_name,
                year_of_adm: student.year_of_adm,
                gender: student.gender,
                major1: student.major1,
                major2: student.major2,
                departmentId: department.uuid,
                courseId: course.uuid
            }
        });
        return res.json(await Promise.all(allStudents));
    },

    createStudents: async (req, res, next) => {
        let inputStudents = req.body.students.map(async(student) => {
            const department = await Department.findOne({
                where: {
                    uuid: student.departmentId
                }
            });
            const course = await Course.findOne({
                where: {
                    uuid: student.courseId
                }
            })
            return { ...student, courseId: course.id, departmentId: department.id }
        });
        inputStudents = await Promise.all(inputStudents);

        let createdStudents;

        try{
            createdStudents =  await Student.bulkCreate(inputStudents, { returning: true });
        } catch(err){
            return next(err);
        }

        createdStudents = createdStudents.map(async(student) => {
            let course = await student.getCourse();
            let department = await student.getDepartment();
            return {
                uuid: student.uuid,
                adm_no: student.adm_no,
                s_name: student.s_name,
                year_of_adm: student.year_of_adm,
                gender: student.gender,
                major1: student.major1,
                major2: student.major2,
                departmentId: department.uuid,
                courseId: course.uuid
            };
        });
        return res.json(await Promise.all(createdStudents));
    },

    getStudent: async (req, res, next) => {
        let fetchedStudent;

        try{
            fetchedStudent = await Student.findOne({
                where: {
                    uuid: req.params.id
                }
            });
        } catch(err){
            return next(err);
        }
        
        if(!fetchedStudent){
            return res.status(404).send({msg: 'student not found'});
        }

        return res.json({
            uuid: fetchedStudent.uuid,
            adm_no: fetchedStudent.adm_no,
            s_name: fetchedStudent.s_name,
            year_of_adm: fetchedStudent.year_of_adm,
            gender: fetchedStudent.gender,
            major1: fetchedStudent.major1,
            major2: fetchedStudent.major2,
            departmentId: fetchedStudent.departmentId,
            courseId: fetchedStudent.courseId
        });
    },

    createStudent: async (req, res, next) => {
        let createdStudent;

        try{
            createdStudent =  await Student.create(req.body);
        } catch(err){
            return next(err);
        }

        return res.json({
            uuid: createdStudent.uuid,
            adm_no: createdStudent.adm_no,
            s_name: createdStudent.s_name,
            year_of_adm: createdStudent.year_of_adm,
            gender: createdStudent.gender,
            major1: createdStudent.major1,
            major2: createdStudent.major2,
            departmentId: createdStudent.departmentId,
            courseId: createdStudent.courseId
        });
    },

    updateStudent: async (req, res, next) => {
        let updatedStudent;

        if(req.body.id || req.body.uuid){
            return res.status(400).send({'msg': 'cannot update id'});
        }

        try{
            updatedStudent = await Student.update(req.body, {
                where: {
                    uuid: req.params.id
                }
            });
        } catch(err){
            return next(err);
        }

        return res.json(updatedStudent);
    },

    removeStudent: async (req, res) => {
        let removedStudent;

        try{
            removedStudent = await Student.destroy({
                where: {
                    uuid: req.params.id
                }
            });
        } catch(err){
            return next(err);
        }
        
        return res.json(removedStudent);
    },

    getEmployees: async (req, res, next) => {
        let allEmployees;

        try {
            allEmployees = await Employee.findAll();
        } catch(err){
            return next(err);
        }

        allEmployees = allEmployees.map((emp) => {
            return {
                uuid: emp.uuid,
                emp_name: emp.emp_name,
                e_type: emp.e_type,
                e_role: emp.e_role,
                gender: emp.gender
            };
        });
        return res.json(allEmployees);
    },

    createEmployees: async (req, res, next) => {
        let createdEmployees;

        try{
            createdEmployees =  await Employee.bulkCreate(req.body.employees, { returning: true });
        } catch(err){
            return next(err);
        }

        createdEmployees = createdEmployees.map((emp) => {
            return {
                uuid: emp.uuid,
                emp_name: emp.emp_name,
                e_type: emp.e_type,
                e_role: emp.e_role,
                gender: emp.gender
            };
        })
        return res.json(createdEmployees);
    },

    getEmployee: async (req, res, next) => {
        let fetchedEmployee;

        try{
            fetchedEmployee = await Employee.findOne({
                where: {
                    uuid: req.params.id
                }
            });
        } catch(err){
            return next(err);
        }

        if(!fetchedEmployee){
            return res.status(404).send({msg: 'employe not found'});
        }
       
        return res.json({
            uuid: fetchedEmployee.uuid,
            emp_name: fetchedEmployee.emp_name,
            e_type: fetchedEmployee.e_type,
            e_role: fetchedEmployee.e_role,
            gender: fetchedEmployee.gender
        });
    },

    createEmployee: async (req, res) => {
        let createdEmployee;

        try{
            createdEmployee =  await Employee.create(req.body);
        } catch(err){
            return next(err);
        }

        return res.json({
            uuid: createdEmployee.uuid,
            emp_name: createdEmployee.emp_name,
            e_type: createdEmployee.e_type,
            e_role: createdEmployee.e_role,
            gender: createdEmployee.gender
        });
    },

    updateEmployee: async (req, res, next) => {
        let updatedEmployee;

        if(req.body.id || req.body.uuid){
            return res.status(400).send({'msg': 'cannot update id'});
        }

        try{
            updatedEmployee = await Employee.update(req.body, {
                where: {
                    uuid: req.params.id
                }
            });
        } catch(err){
            return next(err);
        }

        return res.json(updatedEmployee);
    },

    removeEmployee: async (req, res) => {
        let removedEmployee;

        try{
            removedEmployee = await Employee.destroy({
                where: {
                    uuid: req.params.id
                }
            });
        } catch(err){
            return next(err);
        }
        
        return res.json(removedEmployee);
    },

    getDepartments: async (req, res, next) => {
        let allDepartments;

        try {
            allDepartments = await Department.findAll();
        } catch(err){
            return next(err);
        }

        allDepartments = allDepartments.map((dept) => {
            return {
                uuid: dept.uuid,
                d_code: dept.d_code,
                d_name: dept.d_name,
                head: dept.head
            };
        });
        return res.json(allDepartments);
    },

    createDepartments: async (req, res, next) => {
        let inputDepartments = req.body.students.map(async(dept) => {
            const head = await Employee.findOne({
                where: {
                    uuid: dept.head
                }
            });
            return { ...dept, head: head.id }
        });
        inputStudents = await Promise.all(inputDepartments);

        let createdDepartments;

        try {
            createdDepartments = await Department.bulkCreate(inputDepartments, { returning: true });
        } catch(err){
            return next(err);
        }

        createdDepartments = createdDepartments.map(async(dept) => {
            const head = await dept.getEmployee();
            return {
                uuid: dept.uuid,
                d_code: dept.d_code,
                d_name: dept.d_name,
                head: head.uuid
            };
        });
        return res.json(await Promise.all(createdDepartments));
    },

    getDepartment: async (req, res, next) => {
        let fetchedDepartment;

        try{
            fetchedDepartment =  await Department.findOne({
                where:{
                    uuid: req.params.id
                }
            });
        } catch(err){
            return next(err);
        }
        
        if(!fetchedDepartment){
            return res.status(404).send({msg: 'department not found'});
        }
        
        return res.json({
            uuid: fetchedDepartment.uuid,
            d_code: fetchedDepartment.d_code,
            d_name: fetchedDepartment.d_name,
            head: fetchedDepartment.head
        });
    },

    createDepartment: async (req, res, next) => {
        let createdDepartment;

        try{
            createdDepartment =  await Department.create(req.body);
        } catch(err){
            return next(err);
        }
        
        return res.json({
            uuid: createdDepartment.uuid,
            d_code: createdDepartment.d_code,
            d_name: createdDepartment.d_name,
            head: createdDepartment.head
        });
    },

    updateDepartment: async (req, res, next) => {
        let updatedDepartment;

        if(req.body.id || req.body.uuid){
            return res.status(400).send({'msg': 'cannot update id'});
        }

        try{
            updatedDepartment = await Department.update(req.body, {
                where: {
                    uuid: req.params.id
                }
            });
        } catch(err){
            return next(err);
        }

        return res.json(updatedDepartment);
    },

    removeDepartment: async (req, res, next) => {
        let removedDepartment;

        try{
            removedDepartment = await Department.destroy({
                where: {
                    uuid: req.params.id
                }
            });
        } catch(err){
            return next(err);
        }
        
        return res.json(removedDepartment);
    },

    createCourses: async (req, res, next) => {
        let createdCourses;

        try{
            createdCourses =  await Course.bulkCreate(req.body.courses, { 
                returning: true,
            });
        } catch(err){
            return next(err);
        }
        
        createdCourses = createdCourses.map((course) => {
            return {
                uuid: course.uuid,
                c_name: course.c_name,
                c_duration: course.c_duration
            };
        });
        return res.json(createdCourses);
    },

    getCourses: async (req, res, next) => {
        let allCourses;

        try {
            allCourses = await Course.findAll();
        } catch(err){
            return next(err);
        }
        
        allCourses = allCourses.map((course) => {
            return {
                uuid: course.uuid,
                c_name: course.c_name,
                c_duration: course.c_duration
            }
        })
        return res.json(allCourses);
    },

    createCourse: async (req, res, next) => {
        let createdCourse;

        try{
            createdCourse =  await Course.create(req.body);
        } catch(err){
            return next(err);
        }
       
        return res.json({
            uuid: createdCourse.uuid,
            c_name: createdCourse.c_name,
            c_duration: createdCourse.c_duration
        });
    },

    getCourse: async (req, res, next) => {
        let fetchedCourse;

        try{
            fetchedCourse =  await Course.findOne({
                where:{
                    uuid: req.params.id
                }
            });
        } catch(err){
            return next(err);
        }
        
        if(!fetchedCourse){
            return res.status(404).send({msg: 'course not found'});
        }
        
        
        return res.json({
            uuid: fetchedCourse.uuid,
            c_name: fetchedCourse.c_name,
            c_duration: fetchedCourse.c_duration
        });
    },

    updateCourse: async (req, res, next) => {
        let updatedCourse;

        if(req.body.id || req.body.uuid){
            return res.status(400).send({'msg': 'cannot update id'});
        }

        try{
            updatedCourse = await Course.update(req.body, {
                where: {
                    uuid: req.params.id
                }
            });
        } catch(err){
            return next(err);
        }

        return res.json(updatedCourse);
    },

    removeCourse: async (req, res, next) => {
        let removedCourse;

        try{
            removedCourse = await Course.destroy({
                where: {
                    uuid: req.params.id
                }
            });
        } catch(err){
            return next(err);
        }
        
        return res.json(removedCourse);
    }, 

    createUsers: async (req, res, next) => {
        let reqUsers = req.body.users.map(async(r_user) => {
            const hashedPasscode = await bcrypt.hash(r_user.passcode, 10);
            let student = null;
            let employee = null;
            if(r_user.studentId){
                student = await Student.findOne({
                    where: {
                        uuid: r_user.studentId
                    }
                });
            }
            if(r_user.employeeId){
                employee = await Employee.findOne({
                    where: {
                        uuid: r_user.employeeId
                    }
                })
            }
            return {
                ...r_user, 
                passcode: hashedPasscode, 
                studentId: student && student.id, 
                employeeId: employee && employee.id
            };
        })
        reqUsers = await Promise.all(reqUsers);
        let createdUsers;

        try {
            createdUsers = await User.bulkCreate(reqUsers, { returning: true });
        } catch(err){
            return next(err);
        }

        createdUsers = createdUsers.map(async(user) => {
            let student = user.studentId && (await user.getStudent());
            let employee = user.employee && (await user.getEmployee());
            return {
                uuid: user.uuid,
                user_name: user.user_name,
                user_role: user.user_role,
                user_type: user.user_type,
                employeeId: employee && employee.uuid,
                studentId: student && student.uuid
            };
        })
        return res.json(createdUsers);
    },

    getUsers: async (req, res, next) => {
        let allUsers;

        try {
            allUsers = await User.findAll();
        } catch(err){
            return next(err);
        }

        allUsers = allUsers.map((user) => {
            return {
                uuid: user.uuid,
                user_name: user.user_name,
                user_role: user.user_role,
                user_type: user.user_type,
                employeeId: user.employeeId,
                studentId: user.studendId
            };
        });
        return res.json(allUsers);
    },

    createUser: async (req, res, next) => {
        const hashedPasscode = await bcrypt.hash(req.body.passcode, 10);
        const reqUser = {...req.body, passcode: hashedPasscode};
        let createdUser;

        try{
            createdUser =  await User.create(reqUser);
        } catch(err){
            return next(err);
        }
        
        return res.json({
            uuid: createdUser.uuid,
            user_name: createdUser.user_name,
            user_role: createdUser.user_role,
            user_type: createdUser.user_type,
            employeeId: createdUser.employeeId,
            studentId: createdUser.studentId
        });
    },

    getUser: async (req, res, next) => {
        let fetchedUser;

        try{
            fetchedUser =  await User.findOne({
                where:{
                    uuid: req.params.id
                }
            });
        } catch(err){
            return next(err);
        }
        
        if(!fetchedUser){
            return res.status(404).send({msg: 'user not found'});
        }
        
        return res.json({
            uuid: fetchedUser.uuid,
            user_name: fetchedUser.user_name,
            user_role: fetchedUser.user_role,
            user_type: fetchedUser.user_type,
            employeeId: fetchedUser.employeeId,
            studentId: fetchedUser.studentId
        });
    },

    updateUser: async (req, res, next) => {
        let updatedUser;

        if(req.body.id || req.body.uuid){
            return res.status(400).send({'msg': 'cannot update id'});
        }

        try{
            updatedUser = await User.update(req.body, {
                where: {
                    uuid: req.params.id
                }
            });
        } catch(err){
            return next(err);
        }

        return res.json(updatedUser);
    },

    removeUser: async (req, res, next) => {
        let removedUser;

        try{
            removedUser = await User.destroy({
                where: {
                    uuid: req.params.id
                }
            });
        } catch(err){
            return next(err);
        }
        
        return res.json(removedUser);
    },

    getInstructors: async (req, res, next) => {
        let allInstructors;

        try {
            allInstructors = await Instructor.findAll();
        } catch(err){
            return next(err);
        }

        allInstructors = allInstructors.map((instructor) => {
            return {
                uuid: instructor.uuid,
                cv_link: instructor.cv_link,
                departmentId: instructor.departmentId,
                employeeId: instructor.employeeId
            };
        })
        return res.json(allInstructors);
    },

    createInstructors: async (req, res, next) => {
        let createdInstructors;

        try {
            createdInstructors = await Instructor.bulkCreate(req.body.instructors, { returning: true });
        } catch(err){
            return next(err);
        }

        createdInstructors = createdInstructors.map((instructor) => {
            return {
                uuid: instructor.uuid,
                cv_link: instructor.cv_link,
                departmentId: instructor.departmentId,
                employeeId: instructor.employeeId
            };
        });
        return res.json(createdInstructors);
    },

    getInstructor: async (req, res, next) => {
        let fetchedInstructor;

        try{
            fetchedInstructor =  await Instructor.findOne({
                where:{
                    uuid: req.params.id
                }
            });
        } catch(err){
            return next(err);
        }
        
        if(!fetchedInstructor){
            return res.status(404).send({msg: 'instructor not found'});
        }
       
        return res.json({
            uuid: fetchedInstructor.uuid,
            cv_link: fetchedInstructor.cv_link,
            departmentId: fetchedInstructor.departmentId,
            employeeId: fetchedInstructor.employeeId
        });
    },

    createInstructor: async (req, res, next) => {
        let createdInstructor;

        try{
            createdInstructor =  await Instructor.create(req.body);
        } catch(err){
            return next(err);
        }
        
        return res.json({
            uuid: createdInstructor.uuid,
            cv_link: createdInstructor.cv_link,
            departmentId: createdInstructor.departmentId,
            employeeId: createdInstructor.employeeId
        });
    },

    updateInstructor: async (req, res, next) => {
        let updatedInstructor;

        if(req.body.id || req.body.uuid){
            return res.status(400).send({'msg': 'cannot update id'});
        }

        try{
            updatedInstructor = await Instructor.update(req.body, {
                where: {
                    uuid: req.params.id
                }
            });
        } catch(err){
            return next(err);
        }

        return res.json(updatedInstructor);
    },

    removeInstructor: async (req, res, next) => {
        let removedInstructor;

        try{
            removedInstructor = await Instructor.destroy({
                where: {
                    uuid: req.params.id
                }
            });
        } catch(err){
            return next(err);
        }
        
        return res.json(removedInstructor);
    },

    createSemesters: async (req, res, next) => {
        let createdSemesters;

        try {
            createdSemesters = await Semester.bulkCreate(req.body.semesters, { returning: true });
        } catch(err){
            return next(err);
        }

        createdSemesters = createdSemesters.map((sem) => {
            return {
                uuid: sem.uuid,
                sem_session: sem.sem_session,
                sem_type: sem.sem_type,
                sem_no: sem.sem_no
            };
        });
        return res.json(createdSemesters);
    },

    getSemesters: async (req, res, next) => {
        let allSemesters;

        try {
            allSemesters = await Semester.findAll();
        } catch(err){
            return next(err);
        }

        allSemesters = allSemesters.map((sem) => {
            return {
                uuid: sem.uuid,
                sem_session: sem.sem_session,
                sem_type: sem.sem_type,
                sem_no: sem.sem_no
            };
        })
        return res.json(allSemesters);
    }, 

    createSemester: async (req, res, next) => {
        let createdSemester;

        try{
            createdSemester =  await Semester.create(req.body);
        } catch(err){
            return next(err);
        }
        
        return res.json({
            uuid: createdSemester.uuid,
            sem_session: createdSemester.sem_session,
            sem_type: createdSemester.sem_type,
            sem_no: createdSemester.sem_no
        });
    },

    getSemester: async (req, res, next) => {
        let fetchedSemester;

        try{
            fetchedSemester =  await Semester.findOne({
                where:{
                    uuid: req.params.id
                }
            });
        } catch(err){
            return next(err);
        }
        
        if(!fetchedSemester){
            return res.status(404).send({msg: 'semester not found'});
        }
       
        return res.json({
            uuid: fetchedSemester.uuid,
            sem_session: fetchedSemester.sem_session,
            sem_type: fetchedSemester.sem_type,
            sem_no: fetchedSemester.sem_no
        });
    },

    updateSemester: async (req, res, next) => {
        let updatedSemester;

        if(req.body.id || req.body.uuid){
            return res.status(400).send({'msg': 'cannot update id'});
        }

        try{
            updatedSemester = await Semester.update(req.body, {
                where: {
                    uuid: req.params.id
                }
            });
        } catch(err){
            return next(err);
        }

        return res.json(updatedSemester);
    },

    removeSemester: async (req, res, next) => {
        let removedSemester;

        try{
            removedSemester = await Semester.destroy({
                where: {
                    uuid: req.params.id
                }
            });
        } catch(err){
            return next(err);
        }
        
        return res.json(removedSemester);
    },

    createStudentSubjectRegistrations: async (req, res, next) => {
        let createdStudentSubjectRegistrations;

        try {
            createdStudentSubjectRegistrations = await StudentSubjectRegistration.bulkCreate(req.body.semesters, { returning: true });
        } catch(err){
            return next(err);
        }

        createdStudentSubjectRegistrations = createdStudentSubjectRegistrations.map((studSubReg) => {
            return {
                uuid: studSubReg.uuid,
                marks: studSubReg.marks,
                status: studSubReg.status,
                studentId: studSubReg.studendId,
                subOfferingId: studSubReg.subOfferingId
            };
        });
        return res.json(createdStudentSubjectRegistrations);
    },

    getStudentSubjectRegistrations: async (req, res, next) => {
        let allStudentSubjectRegistrations;

        try {
            allStudentSubjectRegistrations = await StudentSubjectRegistration.findAll();
        } catch(err){
            return next(err);
        }

        allStudentSubjectRegistrations = allStudentSubjectRegistrations.map((studSubReg) => {
            return {
                uuid: studSubReg.uuid,
                marks: studSubReg.marks,
                status: studSubReg.status,
                studentId: studSubReg.studendId,
                subOfferingId: studSubReg.subOfferingId
            };
        })
        return res.json(allStudentSubjectRegistrations);
    }, 

    createStudentSubjectRegistration: async (req, res, next) => {
        let createdStudentSubjectRegistration;

        try{
            createdStudentSubjectRegistration =  await StudentSubjectRegistration.create(req.body);
        } catch(err){
            return next(err);
        }
        
        return res.json({
            uuid: createdStudentSubjectRegistration.uuid,
            marks: createdStudentSubjectRegistration.marks,
            status: createdStudentSubjectRegistration.status,
            studentId: createdStudentSubjectRegistration.studendId,
            subOfferingId: createdStudentSubjectRegistration.subOfferingId
        });
    },

    getStudentSubjectRegistration: async (req, res, next) => {
        let fetchedStudentSubjectRegistration;

        try{
            fetchedStudentSubjectRegistration =  await StudentSubjectRegistration.findOne({
                where:{
                    uuid: req.params.id
                }
            });
        } catch(err){
            return next(err);
        }
        
        if(!fetchedStudentSubjectRegistration){
            return res.status(404).send({msg: 'studentSubjectRegistration not found'});
        }
       
        return res.json({
            uuid: fetchedStudentSubjectRegistration.uuid,
            marks: fetchedStudentSubjectRegistration.marks,
            status: fetchedStudentSubjectRegistration.status,
            studentId: fetchedStudentSubjectRegistration.studendId,
            subOfferingId: fetchedStudentSubjectRegistration.subOfferingId
        });
    },

    updateStudentSubjectRegistration: async (req, res, next) => {
        let updatedStudentSubjectRegistration;

        if(req.body.id || req.body.uuid){
            return res.status(400).send({'msg': 'cannot update id'});
        }

        try{
            updatedStudentSubjectRegistration = await StudentSubjectRegistration.update(req.body, {
                where: {
                    uuid: req.params.id
                }
            });
        } catch(err){
            return next(err);
        }

        return res.json(updatedStudentSubjectRegistration);
    },

    removeStudentSubjectRegistration: async (req, res, next) => {
        let removedStudentSubjectRegistration;

        try{
            removedStudentSubjectRegistration = await StudentSubjectRegistration.destroy({
                where: {
                    uuid: req.params.id
                }
            });
        } catch(err){
            return next(err);
        }
        
        return res.json(removedStudentSubjectRegistration);
    }
}

// {
//     "students": [
//         {
//             "adm_no": "20ME0001",
//             "s_name": "Anil Pandey",
//             "year_of_adm": 2020,
//             "courseId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMDkxfQ.KEFgP-_XbSUDAaqRZLxu_jjBuZoLTwWRRJhj4YSgBTg",
//             "gender": "male",
//             "major1": "CSE",
//             "major2": null,
//             "departmentId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMjgxfQ.NwpedWBwVMV7MQDYrc5OScC88nlEBi1ZdInynSJga7I"
//         },
//         {
//             "adm_no": "20ME0002",
//             "s_name": "Sudhanshu Singh",
//             "year_of_adm": 2020,
//             "courseId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMDkxfQ.KEFgP-_XbSUDAaqRZLxu_jjBuZoLTwWRRJhj4YSgBTg",
//             "gender": "male",
//             "major1": "CSE",
//             "major2": null,
//             "departmentId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMjgxfQ.NwpedWBwVMV7MQDYrc5OScC88nlEBi1ZdInynSJga7I"
//         },
//         {
//             "adm_no": "20ME0003",
//             "s_name": "Sourav Sarkar",
//             "year_of_adm": 2020,
//             "courseId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMDkxfQ.KEFgP-_XbSUDAaqRZLxu_jjBuZoLTwWRRJhj4YSgBTg",
//             "gender": "male",
//             "major1": "CSE",
//             "major2": null,
//             "departmentId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMjgxfQ.NwpedWBwVMV7MQDYrc5OScC88nlEBi1ZdInynSJga7I"
//         },
//         {
//             "adm_no": "20ME0004",
//             "s_name": "Jasmine Anand",
//             "year_of_adm": 2020,
//             "courseId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMDkxfQ.KEFgP-_XbSUDAaqRZLxu_jjBuZoLTwWRRJhj4YSgBTg",
//             "gender": "female",
//             "major1": "CSE",
//             "major2": null,
//             "departmentId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMjgxfQ.NwpedWBwVMV7MQDYrc5OScC88nlEBi1ZdInynSJga7I"
//         },
//         {
//             "adm_no": "20ME0005",
//             "s_name": "Saransh Soni",
//             "year_of_adm": 2020,
//             "courseId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMDkxfQ.KEFgP-_XbSUDAaqRZLxu_jjBuZoLTwWRRJhj4YSgBTg",
//             "gender": "male",
//             "major1": "EE",
//             "major2": null,
//             "departmentId":"eyJpZCI6MiwiaWF0IjoxNjkyMTcwMjgxfQ.t88Z-7oL6dTq6EFzKDWFRF0DjW_dNOkEy0Juqv9wDBs"
//         },
//         {
//             "adm_no": "20ME0006",
//             "s_name": "Leela Tiwari",
//             "year_of_adm": 2020,
//             "courseId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMDkxfQ.KEFgP-_XbSUDAaqRZLxu_jjBuZoLTwWRRJhj4YSgBTg",
//             "gender": "female",
//             "major1": "EE",
//             "major2": null,
//             "departmentId":"eyJpZCI6MiwiaWF0IjoxNjkyMTcwMjgxfQ.t88Z-7oL6dTq6EFzKDWFRF0DjW_dNOkEy0Juqv9wDBs"
//         },
//         {
//             "adm_no": "20ME0007",
//             "s_name": "Badal Rai",
//             "year_of_adm": 2020,
//             "courseId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMDkxfQ.KEFgP-_XbSUDAaqRZLxu_jjBuZoLTwWRRJhj4YSgBTg",
//             "gender": "male",
//             "major1": "EE",
//             "major2": null,
//             "departmentId":"eyJpZCI6MiwiaWF0IjoxNjkyMTcwMjgxfQ.t88Z-7oL6dTq6EFzKDWFRF0DjW_dNOkEy0Juqv9wDBs"
//         },
//         {
//             "adm_no": "20ME0008",
//             "s_name": "Deepak Kumar",
//             "year_of_adm": 2020,
//             "courseId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMDkxfQ.KEFgP-_XbSUDAaqRZLxu_jjBuZoLTwWRRJhj4YSgBTg",
//             "gender": "male",
//             "major1": "EE",
//             "major2": null,
//             "departmentId":"eyJpZCI6MiwiaWF0IjoxNjkyMTcwMjgxfQ.t88Z-7oL6dTq6EFzKDWFRF0DjW_dNOkEy0Juqv9wDBs"
//         },
//         {
//             "adm_no": "20ME0009",
//             "s_name": "Tushar Rai",
//             "year_of_adm": 2020,
//             "courseId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMDkxfQ.KEFgP-_XbSUDAaqRZLxu_jjBuZoLTwWRRJhj4YSgBTg",
//             "gender": "male",
//             "major1": "ECE",
//             "major2": null,
//             "departmentId":"eyJpZCI6MywiaWF0IjoxNjkyMTcwMjgxfQ.FET-AcHPpl7o5QWSAeLWU6Py_AjQ7B7MqRpwEXPcWWY"
//         },
//         {
//             "adm_no": "20ME0010",
//             "s_name": "Vamika Agarwal",
//             "year_of_adm": 2020,
//             "courseId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMDkxfQ.KEFgP-_XbSUDAaqRZLxu_jjBuZoLTwWRRJhj4YSgBTg",
//             "gender": "female",
//             "major1": "ECE",
//             "major2": null,
//             "departmentId":"eyJpZCI6MywiaWF0IjoxNjkyMTcwMjgxfQ.FET-AcHPpl7o5QWSAeLWU6Py_AjQ7B7MqRpwEXPcWWY"
//         },
//         {
//             "adm_no": "20ME0011",
//             "s_name": "Lalit Sarkar",
//             "year_of_adm": 2020,
//             "courseId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMDkxfQ.KEFgP-_XbSUDAaqRZLxu_jjBuZoLTwWRRJhj4YSgBTg",
//             "gender": "male",
//             "major1": "ECE",
//             "major2": null,
//             "departmentId":"eyJpZCI6MywiaWF0IjoxNjkyMTcwMjgxfQ.FET-AcHPpl7o5QWSAeLWU6Py_AjQ7B7MqRpwEXPcWWY"
//         },
//         {
//             "adm_no": "20ME0012",
//             "s_name": "Jasmine Verma",
//             "year_of_adm": 2020,
//             "courseId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMDkxfQ.KEFgP-_XbSUDAaqRZLxu_jjBuZoLTwWRRJhj4YSgBTg",
//             "gender": "female",
//             "major1": "ECE",
//             "major2": null,
//             "departmentId":"eyJpZCI6MywiaWF0IjoxNjkyMTcwMjgxfQ.FET-AcHPpl7o5QWSAeLWU6Py_AjQ7B7MqRpwEXPcWWY"
//         },
//         {
//             "adm_no": "21ME0001",
//             "s_name": "Preeti Bharti",
//             "year_of_adm": 2021,
//             "courseId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMDkxfQ.KEFgP-_XbSUDAaqRZLxu_jjBuZoLTwWRRJhj4YSgBTg",
//             "gender": "female",
//             "major1": "CSE",
//             "major2": null,
//             "departmentId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMjgxfQ.NwpedWBwVMV7MQDYrc5OScC88nlEBi1ZdInynSJga7I"
//         },
//         {
//             "adm_no": "21ME0002",
//             "s_name": "Bhumika Agarwal",
//             "year_of_adm": 2021,
//             "courseId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMDkxfQ.KEFgP-_XbSUDAaqRZLxu_jjBuZoLTwWRRJhj4YSgBTg",
//             "gender": "female",
//             "major1": "CSE",
//             "major2": null,
//             "departmentId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMjgxfQ.NwpedWBwVMV7MQDYrc5OScC88nlEBi1ZdInynSJga7I"
//         },
//         {
//             "adm_no": "21ME0003",
//             "s_name": "Saransh Singh",
//             "year_of_adm": 2021,
//             "courseId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMDkxfQ.KEFgP-_XbSUDAaqRZLxu_jjBuZoLTwWRRJhj4YSgBTg",
//             "gender": "male",
//             "major1": "CSE",
//             "major2": null,
//             "departmentId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMjgxfQ.NwpedWBwVMV7MQDYrc5OScC88nlEBi1ZdInynSJga7I"
//         },
//         {
//             "adm_no": "21ME0004",
//             "s_name": "Kunal Rai",
//             "year_of_adm": 2021,
//             "courseId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMDkxfQ.KEFgP-_XbSUDAaqRZLxu_jjBuZoLTwWRRJhj4YSgBTg",
//             "gender": "male",
//             "major1": "CSE",
//             "major2": null,
//             "departmentId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMjgxfQ.NwpedWBwVMV7MQDYrc5OScC88nlEBi1ZdInynSJga7I"
//         },
//         {
//             "adm_no": "21ME0005",
//             "s_name": "Punit Rai",
//             "year_of_adm": 2021,
//             "courseId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMDkxfQ.KEFgP-_XbSUDAaqRZLxu_jjBuZoLTwWRRJhj4YSgBTg",
//             "gender": "male",
//             "major1": "EE",
//             "major2": null,
//             "departmentId":"eyJpZCI6MiwiaWF0IjoxNjkyMTcwMjgxfQ.t88Z-7oL6dTq6EFzKDWFRF0DjW_dNOkEy0Juqv9wDBs"
//         },
//         {
//             "adm_no": "21ME0006",
//             "s_name": "Mohan Yadav",
//             "year_of_adm": 2021,
//             "courseId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMDkxfQ.KEFgP-_XbSUDAaqRZLxu_jjBuZoLTwWRRJhj4YSgBTg",
//             "gender": "male",
//             "major1": "EE",
//             "major2": null,
//             "departmentId":"eyJpZCI6MiwiaWF0IjoxNjkyMTcwMjgxfQ.t88Z-7oL6dTq6EFzKDWFRF0DjW_dNOkEy0Juqv9wDBs"
//         },
//         {
//             "adm_no": "21ME0007",
//             "s_name": "Roshani Kumari",
//             "year_of_adm": 2021,
//             "courseId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMDkxfQ.KEFgP-_XbSUDAaqRZLxu_jjBuZoLTwWRRJhj4YSgBTg",
//             "gender": "female",
//             "major1": "EE",
//             "major2": null,
//             "departmentId":"eyJpZCI6MiwiaWF0IjoxNjkyMTcwMjgxfQ.t88Z-7oL6dTq6EFzKDWFRF0DjW_dNOkEy0Juqv9wDBs"
//         },
//         {
//             "adm_no": "21ME0008",
//             "s_name": "Rishi Gupta",
//             "year_of_adm": 2021,
//             "courseId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMDkxfQ.KEFgP-_XbSUDAaqRZLxu_jjBuZoLTwWRRJhj4YSgBTg",
//             "gender": "male",
//             "major1": "EE",
//             "major2": null,
//             "departmentId":"eyJpZCI6MiwiaWF0IjoxNjkyMTcwMjgxfQ.t88Z-7oL6dTq6EFzKDWFRF0DjW_dNOkEy0Juqv9wDBs"
//         },
//         {
//             "adm_no": "21ME0009",
//             "s_name": "Haricharan Rai",
//             "year_of_adm": 2021,
//             "courseId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMDkxfQ.KEFgP-_XbSUDAaqRZLxu_jjBuZoLTwWRRJhj4YSgBTg",
//             "gender": "male",
//             "major1": "ECE",
//             "major2": null,
//             "departmentId":"eyJpZCI6MywiaWF0IjoxNjkyMTcwMjgxfQ.FET-AcHPpl7o5QWSAeLWU6Py_AjQ7B7MqRpwEXPcWWY"
//         },
//         {
//             "adm_no": "21ME0010",
//             "s_name": "Parimal Raj",
//             "year_of_adm": 2021,
//             "courseId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMDkxfQ.KEFgP-_XbSUDAaqRZLxu_jjBuZoLTwWRRJhj4YSgBTg",
//             "gender": "male",
//             "major1": "ECE",
//             "major2": null,
//             "departmentId":"eyJpZCI6MywiaWF0IjoxNjkyMTcwMjgxfQ.FET-AcHPpl7o5QWSAeLWU6Py_AjQ7B7MqRpwEXPcWWY"
//         },
//         {
//             "adm_no": "21ME0011",
//             "s_name": "Leela Anand",
//             "year_of_adm": 2021,
//             "courseId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMDkxfQ.KEFgP-_XbSUDAaqRZLxu_jjBuZoLTwWRRJhj4YSgBTg",
//             "gender": "female",
//             "major1": "ECE",
//             "major2": null,
//             "departmentId":"eyJpZCI6MywiaWF0IjoxNjkyMTcwMjgxfQ.FET-AcHPpl7o5QWSAeLWU6Py_AjQ7B7MqRpwEXPcWWY"
//         },
//         {
//             "adm_no": "21ME0012",
//             "s_name": "Kirti Bharti",
//             "year_of_adm": 2021,
//             "courseId":"eyJpZCI6MSwiaWF0IjoxNjkyMTcwMDkxfQ.KEFgP-_XbSUDAaqRZLxu_jjBuZoLTwWRRJhj4YSgBTg",
//             "gender": "female",
//             "major1": "ECE",
//             "major2": null,
//             "departmentId":"eyJpZCI6MywiaWF0IjoxNjkyMTcwMjgxfQ.FET-AcHPpl7o5QWSAeLWU6Py_AjQ7B7MqRpwEXPcWWY"
//         }
//     ]
// }