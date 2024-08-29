"use client"
import { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('/api/login', { email, password });
            localStorage.setItem('token', response.data.token); // Considère utiliser un context ou une autre méthode de gestion d'état
            router.push('/dashboard');
        } catch (error) {
            setError('Login failed. Please check your email and password.');
            console.error('Login failed', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                </div>
                <br />
                <div>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? 'Connecting...' : 'Connexion'}
                </button>
                {error && <p className="error">{error}</p>}
            </form>
        </>
    );
}
