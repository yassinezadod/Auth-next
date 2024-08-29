"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            axios.post('/api/verify-token', { token })
                .then(response => {
                    setUser(response.data.user);
                })
                .catch(error => {
                    console.error('Invalid token or error verifying token', error);
                    localStorage.removeItem('token');
                    router.push('/login');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            router.push('/login');
        }
    }, [router]);

    const handleLogout = async () => {
        try {
            await axios.post('/api/logout');
        } catch (error) {
            console.error('Error logging out', error);
        } finally {
            localStorage.removeItem('token');
            router.push('/login');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!user) return <div>Unauthorized</div>;

    return (
        <div>
            <div>Welcome, {user.email}</div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
