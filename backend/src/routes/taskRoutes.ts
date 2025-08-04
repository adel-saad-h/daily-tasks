import express from "express";
import { addTask, getNextTask, getRangedTasks, unfinishedTasksForToday, changeStatus } from "../services/taskServices";

const router = express.Router();
router.post("/addTask", async (request, response) => {
    const { title, body, date, time, place, status } = request.body;
    const { statusCode, data } = await addTask({ title, body, date, time, place, status });
    response.status(statusCode).send(data);
})

router.get("/nextTasks", async (request, response) => {
    const { date, time } = request.body;
    const { statusCode, data } = await getNextTask({ date, time });
    response.status(statusCode).send(data);
})
router.get("/rangedTasks", async (request, response) => {
    const { firstDate, lastDate } = request.body;
    const { statusCode, data } = await getRangedTasks({ firstDate, lastDate });
    response.status(statusCode).send(data);
})
router.get("/unfinishedTasks", async (request, response) => {
    const { date } = request.body;
    const { statusCode, data } = await unfinishedTasksForToday({ date });
    response.status(statusCode).send(data);
})
router.put("/changeStatus", async (request, response) => {
    const { _id,status } = request.body;
    const { statusCode, data } = await changeStatus({ _id,status });
    response.status(statusCode).send(data);
})
export default router;