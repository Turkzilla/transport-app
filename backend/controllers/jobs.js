const Job = require('../models/jobs');
const Driver = require('../models/drivers');

async function getUnassignedJobs(req, res) {

    const arrayOfJobs = await Job.getUnassignedJobs();

    res.send(arrayOfJobs);

}

async function getJobById(req, res) {

    const aJob = await Job.getJobById(req.params.id);

    res.send(aJob);

}

async function assignJob(req, res) {
    console.log('I am running');
    console.log(req.params);

    await Driver.assignJobToDriver(req.params.driverID, req.params.jobID);
    await Job.markAssigned(req.params.jobID);

    res.send(`Job #${req.params.jobID} has been assigned to driver ${req.params.driverID}`);

}

async function markComplete(req, res) {

    await Job.markComplete(parseInt(req.body.message.assigned_job))
    await Driver.unAssignJob(parseInt(req.body.message.id))

    res.send('Job completed');

}

module.exports = {getUnassignedJobs, getJobById, assignJob, markComplete};