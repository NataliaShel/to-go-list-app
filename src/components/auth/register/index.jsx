import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';
import { useAuth } from '../../../contexts/authContexts/index.jsx';

const Register = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (userLoggedIn) {
            navigate('/dashboard', { replace: true });
        }
    }, [userLoggedIn, navigate]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (password !== confirmPassword) {
            setErrorMessage('Паролі не співпадають.');
            return;
        }

        if (!isRegistering) {
            setIsRegistering(true);
            try {
                await doCreateUserWithEmailAndPassword(email, password);
            } catch (error) {
                setIsRegistering(false);
                setErrorMessage(error.message);
                console.error("Помилка реєстрації:", error);
            }
        }
    };

    return (
        <div>
            <main className="flex justify-center items-center min-h-screen p-4">
                <div className="w-full max-w-md p-8 shadow-2xl border border-green-700 rounded-2xl bg-[#f0faf5] text-[#2f4d3c] sm:p-10">
                    <div className="text-center">
                        <div className="mb-8">
                            <h3 className="text-[#3b5e4c] text-3xl font-bold mb-4">Create a New Account</h3>
                        </div>
                    </div>
                    <form
                        onSubmit={onSubmit}
                        className="space-y-6"
                    >
                        <div>
                            <label className="block text-lg font-semibold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                                className="w-full px-5 py-3 text-[#2f4d3c] bg-white outline-none border border-[#3a9a5c] focus:border-[#2e603f] shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                autoComplete='new-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className="w-full px-5 py-3 text-[#2f4d3c] bg-white outline-none border border-[#3a9a5c] focus:border-[#2e603f] shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                autoComplete='off'
                                required
                                value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }}
                                className="w-full px-5 py-3 text-[#2f4d3c] bg-white outline-none border border-[#3a9a5c] focus:border-[#2e603f] shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        {errorMessage && (
                            <span className='text-red-600 font-bold text-sm block mt-4 text-left'>{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`w-full px-6 py-3 text-white font-bold rounded-lg text-lg ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#2e603f] hover:bg-[#88c9a1] hover:shadow-lg transition duration-300'}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>
                    <p className="text-center text-md mt-6">Already have an account? <Link to={'/login'} className="text-[#2e603f] hover:underline font-bold">Sign in</Link></p>
                </div>
            </main>
        </div>
    );
};

export default Register;