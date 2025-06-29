'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { baseUrl } from '@/app/const'; // ✅ Ensure baseUrl is properly exported
import './Signup.css';

export default function SignUpCard() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSignup = async (e) => {
  e.preventDefault();

  try {
    const payload = { firstName, lastName, email, password };
    console.log("Sending:", payload);

    const res = await fetch(`${baseUrl}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("Response:", data);

    if (res.ok) {
      router.push('/login');
    } else {
      setError(data.message || 'Signup failed');
    }
  } catch (err) {
    console.error("Signup error:", err);
    setError('Something went wrong. Please try again.');
  }
};


  return (
    <main className="login-wrapper">
      <article className="login-card">
        <h2 className="login-title">SignUp</h2>

        <form className="login-form" onSubmit={handleSignup}>
          <label htmlFor="firstName" className="login-label">
            First Name <span>*</span>
          </label>
          <input
            id="firstName"
            type="text"
            className="login-input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <label htmlFor="lastName" className="login-label">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            className="login-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label htmlFor="email" className="login-label">
            Email Address <span>*</span>
          </label>
          <input
            id="email"
            type="email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@gmail.com"
            required
          />

          <label htmlFor="password" className="login-label">
            Password <span>*</span>
          </label>
          <div className="password-field">
            <input
              id="password"
              type={showPwd ? 'text' : 'password'}
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPwd((prev) => !prev)}
              aria-label="Toggle password visibility"
            >
              {showPwd ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-btn">
            Sign Up
          </button>

          <Link href="/login" className="forgot-link">
            Already have an account? Login
          </Link>
        </form>
      </article>
    </main>
  );
}
