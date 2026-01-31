import { useState } from 'react';
import { api } from '../api/api';

const TaskForm = ({ onTaskCreated }) => {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
        setLoading(true);
        await api.post('/tasks', { title });
        setTitle('');
        onTaskCreated();
        } catch (err) {
        console.error('Error creando tarea', err);
        } finally {
        setLoading(false);
        }
    };

    return (
        <form
        onSubmit={handleSubmit}
        className="flex gap-2"
        >
        <input
            className="flex-1 rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nueva tarea"
            value={title}
            onChange={e => setTitle(e.target.value)}
        />

        <button
            disabled={loading}
            className="rounded-md bg-blue-600 px-4 text-white hover:bg-blue-700 disabled:opacity-50"
        >
            {loading ? '...' : 'Añadir'}
        </button>
        </form>
    );
};

export default TaskForm;
