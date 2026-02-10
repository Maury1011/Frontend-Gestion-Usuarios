import { useEffect, useState } from 'react';
import { api } from '../api/api';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import { useNavigate } from 'react-router-dom';

const Tasks = ({ setIsAuth }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false); // ✅ nuevo
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const loadTasks = async (showActionLoading = false) => {
        if (showActionLoading) setActionLoading(true);
        try {
            const res = await api.get('/tasks');

    //eliminar este bloque cuando el backend esté listo para evitar retrasos innecesarios en producción
  //  if (import.meta.env.DEV) {await new Promise(resolve => setTimeout(resolve, 1500));}

            setTasks(res.data);
        } catch (err) {
            console.error('Error cargando tareas:', err);
            setError('Error al cargar tareas');
        } finally {
            setLoading(false);
            setActionLoading(false);
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

                <TaskForm onTaskCreated={() => loadTasks(true)} />

                {/* ✅ Mensaje de cargando al añadir/eliminar */}
                {actionLoading && (
                    <p className="my-2 text-center text-sm text-blue-500 animate-pulse">
                        Actualizando tareas…
                    </p>
                )}

                <div className="mt-4 space-y-2">
                    {tasks.length === 0 && !actionLoading && (
                        <p className="text-center text-slate-500">No hay tareas todavía</p>
                    )}
                    {tasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onChange={() => loadTasks(true)} // ✅ activa el loading al eliminar
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tasks;