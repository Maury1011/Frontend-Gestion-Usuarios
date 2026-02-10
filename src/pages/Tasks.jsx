import { useEffect, useState } from 'react';
import { api } from '../api/api';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import { useNavigate } from 'react-router-dom';

const Tasks = ({ setIsAuth }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const loadTasks = async () => {
        try {
            const res = await api.get('/tasks');
            setTasks(res.data);
        } catch (err) {
            console.error('Error cargando tareas:', err);
            setError('Error al cargar tareas');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    if (loading)
        return <p className="text-center mt-10 text-slate-500">Cargando tareas…</p>;

    if (error)
        return <p className="text-center mt-10 text-red-600">{error}</p>;

    return (
        <div className="min-h-dvh bg-slate-100 p-6">
            <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Mis tareas</h1>
                    <button
                        className="text-sm text-red-500 hover:underline"
                        onClick={() => {
                            localStorage.removeItem('token');
                            setIsAuth(false);
                            navigate('/login');
                        }}
                    >
                        Cerrar sesión
                    </button>
                </div>

                <TaskForm onTaskCreated={loadTasks} />

                <div className="mt-4 space-y-2">
                    {tasks.length === 0 && (
                        <p className="text-center text-slate-500">No hay tareas todavía</p>
                    )}
                    {tasks.map(task => (
                        <TaskItem key={task.id} task={task} onChange={loadTasks} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tasks;