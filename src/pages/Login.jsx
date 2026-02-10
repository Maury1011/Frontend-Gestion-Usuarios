import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api/api';
import Layout from '../components/Layout';

export default function Login({ setIsAuth }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');

        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            setIsAuth(true);
            navigate('/tasks');
        } catch (err) {
            setError(err.response?.data?.message || 'Email o contraseña incorrectos');
        }
    };

    return (
        <Layout>
            <h1 className="mb-6 text-center text-2xl font-semibold">
                Iniciar sesión
            </h1>

            {error && (
                <div className="mb-4 rounded-md bg-red-100 px-3 py-2 text-sm text-red-700">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    required
                    className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Correo"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    required
                    className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700">
                    Entrar
                </button>
            </form>

            <p className="mt-4 text-center text-sm">
                ¿No tienes cuenta?{' '}
                <Link to="/register" className="text-blue-600 hover:underline">
                    Regístrate
                </Link>
            </p>
        </Layout>
    );
}