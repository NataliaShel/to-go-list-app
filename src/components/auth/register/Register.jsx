import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom'; 
import { useAuth } from '../../../contexts/authContexts'; 
import { db } from '../../../firebase/firebase'; 
import { doc, setDoc } from 'firebase/firestore'; 

export const Register = () => {
    const { userLoggedIn, doCreateUserWithEmailAndPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    if (userLoggedIn) {
        return <Navigate to={'/home'} replace={true} />; 
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); 
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match!');
            return;
        }

        if (!isRegistering) {
            setIsRegistering(true);
            try {
                const userCredential = await doCreateUserWithEmailAndPassword(email, password);
                const user = userCredential.user;

                await setDoc(doc(db, 'user', user.uid), {
                    email: user.email,
                    role: 'user', 
                    createdAt: new Date()
                });

               
            } catch (error) {
                setIsRegistering(false); 
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        setErrorMessage('This email is already in use.');
                        break;
                    case 'auth/invalid-email':
                        setErrorMessage('Invalid email format.');
                        break;
                    case 'auth/weak-password':
                        setErrorMessage('Password must be at least 6 characters.');
                        break;
                    default:
                        setErrorMessage(`Registration error: ${error.message}`);
                        break;
                }
                console.error("Registration error:", error);
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Register</h2>
                <form onSubmit={onSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Minimum 6 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <button
                        type="submit"
                        disabled={isRegistering}
                        className="auth-btn"
                    >
                        {isRegistering ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <p className="auth-link">
                    Already have an account? <Link to="/login">Log In</Link>
                </p>
            </div>
        </div>
    );
};