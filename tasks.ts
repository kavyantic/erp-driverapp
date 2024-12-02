import * as TaskManager from 'expo-task-manager';
import { socket } from './socket';
import { LOCATION_TASK_NAME } from './constants';



TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
    if (error) {
        alert("error")
        // Error occurred - check `error.message` for more details.
        return;
    }
    if (data) {
        socket.emit("ping", data)
        // const { locations } = data;
        // do something with the locations captured in the background
    }
});