'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { add, set } from 'date-fns';
import { addUser } from '../actions';

export default function SignUpForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Contraseñas no coinciden');
            return;
        }
        setError('');
    
        await addUser({ name, email, password });
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="flex flex-col items-center align-items">
            <form onSubmit={handleSubmit} className="border flex flex-col items-center w-fit shadow-2xl mt-10 p-20 rounded-3xl">
                <label className="text-center text-3xl font-bold">Registrarse</label>
                <label className="grid grid-cols-1 p-2 font-medium">
                    Nombre:
                    <input
                        className="border border-gray-500 p-2 mt-5 font-normal w-max rounded-md"
                        type="text"
                        placeholder="Nombre..."
                        name="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label className="grid grid-cols-1 p-2 font-medium">
                    Email:
                    <input
                        className="border border-gray-500 p-2 mt-5 font-normal w-max rounded-md"
                        type="email"
                        placeholder="Email..."
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label className="grid grid-cols-1 p-2 font-medium">
                    Contraseña:
                    <input
                        className="border border-gray-500 p-2 mt-5 font-normal w-max rounded-md"
                        type="password"
                        placeholder="Contraseña..."
                        name="password"
                        required
                        value={password}
                        minLength={8}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <label className="grid grid-cols-1 p-2 font-medium">
                    Repetir contraseña:
                    <input
                        className="border border-gray-500 p-2 mt-5 font-normal w-max rounded-md"
                        type="password"
                        placeholder="Contraseña..."
                        name="confirmPassword"
                        required
                        value={confirmPassword}
                        minLength={8}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>
                {
                    (password !== confirmPassword) &&
                    <label className="text-red-500">{error}</label>
                }
                <button
                    type="submit"
                    className="bg-slate-700 text-white rounded-md p-2 hover:bg-slate-900 mt-5"
                >
                    Registrarse
                </button>
                <Link
                    href="/login"
                > 
                    <span className="hidden md:block hover:font-bold mt-10">Ya tienes cuenta? Inicia sesión</span>
                </Link>
            </form>
        </div>
    );
}