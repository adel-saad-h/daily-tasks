import { taskModel } from "../models/taskModel";

interface AddTaskParams {
    title: string;
    body: string;
    date: string;
    time: string;
    place: string;
    status: boolean;
}

export const addTask = async ({ title, body, date, time, place, status }: AddTaskParams) => {
    try {
        const findTask = await taskModel.findOne({ title, date, time });
        if (findTask) {
            return { data: "Task already exist", statusCode: 400 }
        }
        const newTask = new taskModel({ title, body, date, time, place, status });
        await newTask.save();
        return { data: newTask, statusCode: 200 }
    } catch (error) {
        throw error;
    }

}

interface GetNextTask {
    date: string;
    time: string;
}
export const getNextTask = async ({ date, time }: GetNextTask) => {
    try {
        const findTask = await taskModel.find();
        if (!findTask) { return { data: "No Tasks exist", statusCode: 404 } }

        //Get all and sort them with date and time
        const sortedTasks: AddTaskParams[] = findTask;
        sortedTasks.sort((a, b) => {
            const dateA = new Date(`${a.date} ${a.time}`);
            const dateB = new Date(`${b.date} ${b.time}`);
            return dateA.getTime() - dateB.getTime();
        });

        //Compare the date and time then get the first next match result 
        let nextDate: string | undefined;
        let nextTime: string | undefined;
        const currentDateTime = new Date(`${date} ${time}`);
        for (let i = 0; i < sortedTasks.length; i++) {
            const taskDateTime = new Date(`${sortedTasks[i].date} ${sortedTasks[i].time}`);

            if (taskDateTime > currentDateTime) {
                nextDate = sortedTasks[i].date;
                nextTime = sortedTasks[i].time;
                break; // If sortedTask is sorted by date/time, we can stop at the first match
            }
        }
        const findNextTask = await taskModel.findOne({ date: nextDate, time: nextTime });
        return { data: findNextTask, statusCode: 200 }
    } catch (error) {
        throw error;
    }
}


//Function for all tasks in date range (today , form 3/3 to 3/4,.......)
interface GetRangedTasks {
    firstDate: string;
    lastDate: string;
}
export const getRangedTasks = async ({ firstDate, lastDate }: GetRangedTasks) => {

    try {
        const findTask = await taskModel.find();
        if (!findTask) { return { data: "No Tasks exist", statusCode: 404 } }
        //Get all and sort them with date and time
        const sortedTasks: AddTaskParams[] = findTask;
        sortedTasks.sort((a, b) => {
            const dateA = new Date(`${a.date} ${a.time}`);
            const dateB = new Date(`${b.date} ${b.time}`);
            return dateA.getTime() - dateB.getTime();
        });

        let findRangedTasks: AddTaskParams[] = [];
        const fDate = new Date(`${firstDate} 00:00`);
        const lDate = new Date(`${lastDate} 24:00`);
        for (let i = 0; i < sortedTasks.length; i++) {
            const taskDate = new Date(`${sortedTasks[i].date}`);
            if (taskDate >= fDate && taskDate < lDate) {
                findRangedTasks.push(sortedTasks[i])
            }
        }
        return { data: findRangedTasks, statusCode: 200 }
    } catch (error) {
        throw error;
    }
}

//To-Do function for all upcoming tasks for today
interface UnfinishedTasksForToday {
    date: string;
}

export const unfinishedTasksForToday = async ({ date }: UnfinishedTasksForToday) => {
    try {
        const findTask = await taskModel.find();
        if (!findTask) { return { data: "No Tasks exist", statusCode: 404 } }
        //Get all and sort them with date and time
        const sortedTasks: AddTaskParams[] = findTask;
        sortedTasks.sort((a, b) => {
            const dateA = new Date(`${a.date} ${a.time}`);
            const dateB = new Date(`${b.date} ${b.time}`);
            return dateA.getTime() - dateB.getTime();
        });

        let findUnfinishedTasks: AddTaskParams[] = [];
        const fDate = new Date(`${date} 00:00`);
        const lDate = new Date(`${date} 24:00`);
        for (let i = 0; i < sortedTasks.length; i++) {
            const taskDate = new Date(`${sortedTasks[i].date}`);
            if (taskDate >= fDate && taskDate < lDate && sortedTasks[i].status === false) {
                findUnfinishedTasks.push(sortedTasks[i])
            }
        }
        return { data: findUnfinishedTasks, statusCode: 200 }

    } catch (error) {
        throw error;
    }
}

//To-Do function to change the status of the task
interface ChangeStatus {
    _id: any;
    status: boolean;
}
export const changeStatus = async ({ _id, status }: ChangeStatus) => {
    try {
        const findTask = await taskModel.findById({ _id });
        if (!findTask) {
            return { data: "No Tasks exist", statusCode: 404 }
        }
        findTask.status = status;
        findTask.save();
        return { data: findTask, statusCode: 200 }
    } catch (error) {
        throw error
    }
}


//To-Do functions filtering directly using MongoDB query

