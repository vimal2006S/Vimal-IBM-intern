const express = require('express');
const router = express.Router();

// 1. Initial In-memory Student Data
let students = [
    { id: 1, name: "Vimal", dept: "CSE", age: 19 },
    { id: 2, name: "Shriram", dept: "CSE", age: 20 }
];

// 2. READ - Get all students
router.get('/', (req, res) => {
    res.json(students);
});

// 3. CREATE - Single or Multiple students (POST)
router.post('/', (req, res) => {
    const newEntry = req.body;

    if (Array.isArray(newEntry)) {
        // Logic for Multiple Entries
        students.push(...newEntry);
    } else {
        // Logic for Single Entry
        students.push(newEntry);
    }

    res.status(201).json({
        message: 'Students added successfully',
        students
    });
});

// 4. UPDATE - Single or Multiple students (PUT)
router.put('/', (req, res) => {
    const updates = req.body;

    if (Array.isArray(updates)) {
        // Logic for Multiple Updates
        updates.forEach(update => {
            students = students.map(student =>
                student.id === update.id
                    ? { 
                        ...student, 
                        name: update.name || student.name, 
                        dept: update.dept || student.dept, 
                        age: update.age || student.age 
                      }
                    : student
            );
        });
    } else {
        // Logic for Single Update
        students = students.map(student =>
            student.id === updates.id
                ? { 
                    ...student, 
                    name: updates.name || student.name, 
                    dept: updates.dept || student.dept, 
                    age: updates.age || student.age 
                  }
                : student
        );
    }

    res.json({
        message: "Students updated successfully",
        students
    });
});

// 5. DELETE - Delete multiple students by ID (DELETE)
router.delete('/', (req, res) => {
    const idsToDelete = req.body; // Expects an array of IDs, e.g., [1, 2]

    if (Array.isArray(idsToDelete)) {
        students = students.filter(student => !idsToDelete.includes(student.id));
    }

    res.json({
        message: "Students deleted successfully",
        students
    });
});

// DELETE - Delete a single student via URL path
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id); // Get ID from URL
    students = students.filter(student => student.id !== id);
    
    res.json({
        message: `Student with ID ${id} deleted successfully`,
        students
    });
});

module.exports = router;