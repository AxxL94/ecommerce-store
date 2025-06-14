import React, { useState } from 'react';

const API_URL = "localhost:3000";

function App() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [result, setResult] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const res = await fetch(`http://${API_URL}/api/v1/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setResult(data);
  };

  const handleLogin = async () => {
    const res = await fetch(`http://${API_URL}/api/v1/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, password: form.password }),
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1>Hello Azure</h1>

      <h1 className="text-2xl font-bold mb-4">💳 Fullstack eCommerce Auth</h1>

      <div className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full" />
        <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full" />

        <div className="flex gap-4">
          <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
          <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2 rounded">Login</button>
        </div>
      </div>

      {result && (
        <pre className="mt-6 text-sm bg-gray-200 p-4 rounded max-w-md w-full overflow-x-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;


