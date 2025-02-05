const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const payload = req.body;
    const students = await getAllStudents(payload);
    res.json(students);
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const student = await addNewStudent(req.body);
    res.json(student);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const { id: userId } = req.params;
    const payload = req.body;

    const student = await updateStudent({ userId,...payload});
    res.json(student);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const student = await getStudentDetail(id);
    res.json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const { id: userId } = req.params;
    const { status } = req.body;
    const { id: reviewerId } = req.user;
    const message = await setStudentStatus({userId, reviewerId, status});
    res.json(message);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
