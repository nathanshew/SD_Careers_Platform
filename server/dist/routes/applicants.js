"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let applicants = [];
// Add your CRUD API implementation here
router.get('/', (req, res) => {
    res.json(applicants);
});
router.get('/:id', (req, res) => {
    const applicant = applicants.find((t) => t.id === parseInt(req.params.id));
    if (!applicant) {
        res.status(404).send('Applicant not found');
    }
    else {
        res.json(applicant);
    }
});
router.post('/', (req, res) => {
    const applicant = {
        id: applicants.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false,
    };
    applicants.push(applicant);
    res.status(201).json(applicant);
});
router.put('/:id', (req, res) => {
    const applicant = applicants.find((t) => t.id === parseInt(req.params.id));
    if (!applicant) {
        res.status(404).send('Applicant not found');
    }
    else {
        applicant.title = req.body.title || applicant.title;
        applicant.description = req.body.description || applicant.description;
        applicant.completed = req.body.completed || applicant.completed;
        res.json(applicant);
    }
});
router.delete('/:id', (req, res) => {
    const index = applicants.findIndex((t) => t.id === parseInt(req.params.id));
    if (index === -1) {
        res.status(404).send('Applicant not found');
    }
    else {
        applicants.splice(index, 1);
        res.status(204).send();
    }
});
exports.default = router;
