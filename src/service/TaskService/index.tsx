import {ACTION_TYPE} from "../../constants/ActionType";
import TaskList from "../../models/TaskList";
import Task from "../../models/Task";
import defaultTaskList from "../../default/defaultTaskList.json"

export default class TaskService {

    private readonly taskStrategyMap;

    constructor() {
        this.taskStrategyMap = {
            [ACTION_TYPE.DEFAULT]: this.getTaskList,
            [ACTION_TYPE.ADD_TASK]: this.addNewTask,
            [ACTION_TYPE.DELETE_TASK]: this.deleteTask,
            [ACTION_TYPE.SWITCH_TASK_STATE]: this.switchTaskState,
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private getTaskList = (preTaskList: TaskList, input: Task): TaskList => {
        return defaultTaskList;
    }

    private addNewTask = (preTaskList: TaskList, input: Task): TaskList => {
        // Todo: Generate Unique ID in Back-End
        preTaskList.taskList.push({...input, id: new Date().getTime(), isCompleted: false});
        return {...preTaskList};
    };

    private deleteTask = (preTaskList: TaskList, input: Task): TaskList => {
        const updatedTodoList = preTaskList.taskList.filter((task: Task) => task.id !== input.id);
        return {taskList: updatedTodoList};
    };

    private switchTaskState = (preTaskList: TaskList, input: Task): TaskList => {
        const preTaskState = input.isCompleted;
        const updatedTaskList = preTaskList.taskList.filter((task: Task) => task.id !== input.id)
            .concat({...input, isCompleted: !preTaskState});
        return {taskList: updatedTaskList} as TaskList;
    };

    executeStrategy = (actionType: ACTION_TYPE, preTaskList: TaskList | undefined, input: Task): TaskList => {
        actionType = actionType ?? ACTION_TYPE.DEFAULT;
        return this.taskStrategyMap[actionType](preTaskList ?? {} as TaskList, input);
    }
}
