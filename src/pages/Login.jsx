import { useState } from 'react';
import { api } from '../api/api';
import Layout from '../components/Layout';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');

        try {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        location.href = '/tasks';
        } catch {
        setError('Email o contraseña incorrectos');
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
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Correo"
            value={email}
            onChange={e => setEmail(e.target.value)}
            />

            <input
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
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
            <a href="/register" className="text-blue-600 hover:underline">
            Regístrate
            </a>
        </p>
        </Layout>
    );
}
