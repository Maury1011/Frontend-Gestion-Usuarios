import { useState } from 'react';
import { api } from '../api/api';
import Layout from '../components/Layout';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');

        try {
        await api.post('/register', { email, password });
        location.href = '/login';
        } catch {
        setError('No se pudo crear la cuenta');
        }
    };

    return (
        <Layout>
        <h1 className="mb-6 text-center text-2xl font-semibold">
            Crear cuenta
        </h1>

        {error && (
            <div className="mb-4 rounded-md bg-red-100 px-3 py-2 text-sm text-red-700">
            {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
            <input
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Correo"
            value={email}
            onChange={e => setEmail(e.target.value)}
            />

            <input
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />

            <button className="w-full rounded-md bg-green-600 py-2 text-white hover:bg-green-700">
            Registrarse
            </button>
        </form>
        </Layout>
    );
}
