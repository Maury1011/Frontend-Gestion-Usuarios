import { api } from '../api/api';

const TaskItem = ({ task, onChange }) => {
    const toggleCompleted = async () => {
        await api.put(`/tasks/${task.id}`, {
        completed: !task.completed
        });
        onChange();
    };

    const deleteTask = async () => {
        await api.delete(`/tasks/${task.id}`);
        onChange();
    };

    return (
        <div className="flex items-center justify-between rounded-md border px-3 py-2">
        <div
            className={`cursor-pointer ${
            task.completed
                ? 'line-through text-slate-400'
                : ''
            }`}
            onClick={toggleCompleted}
        >
            {task.title}
        </div>

        <button
            onClick={deleteTask}
            className="text-sm text-red-500 hover:underline"
        >
            Eliminar
        </button>
        </div>
    );
};

export default TaskItem;
