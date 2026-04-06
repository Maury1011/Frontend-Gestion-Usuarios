import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import Layout from '../components/Layout';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await api.post('/auth/register', { email, password });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'No se pudo crear la cuenta');
        } finally {
            setLoading(false);
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
                    type="email"
                    required
                    disabled={loading}
                    className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                    placeholder="Correo"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    required
                    disabled={loading}
                    className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-green-600 py-2 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {loading ? (
                        <>
                            <svg
                                className="h-4 w-4 animate-spin"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12" cy="12" r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                />
                            </svg>
                            Creando cuenta...
                        </>
                    ) : (
                        'Registrarse'
                    )}
                </button>
            </form>
        </Layout>
    );
}