"use client"
import { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Register() {
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
            await axios.post('/api/register', { email, password });
            router.push('/login');
        } catch (error) {
            setError('Registration failed. Please try again.');
            console.error('Registration failed', error);
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
                        minLength="6" // Assure que le mot de passe a au moins 6 caractères
                    />
                </div>
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? 'Enregistrement...' : "S'inscrire"}
                </button>
                {error && <p className="error">{error}</p>}
            </form>
        </>
    );
}
