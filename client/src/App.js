// client/src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [registerData, setRegisterData] = useState({
        username: '',
        password: '',
        token: '',
        qrCode: '',
        secret: ''
    });

    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
        token: ''
    });

    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const qrResponse = await axios.post('http://localhost:5000/api/qrcode', {
                username: registerData.username
            });
            setRegisterData({
                ...registerData,
                qrCode: qrResponse.data.qrCode,
                secret: qrResponse.data.secret
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/register', {
                username: registerData.username,
                password: registerData.password,
                token: registerData.token,
                secret: registerData.secret
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', loginData);
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>MFA Registration</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={registerData.username}
                    onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    required
                />
                <br />
                <button type="submit">Generate QR Code</button>
            </form>
            {registerData.qrCode && (
                <div>
                    <h3>Scan QR Code with Authenticator App</h3>
                    <img src={registerData.qrCode} alt="QR Code" />
                    <form onSubmit={handleRegisterSubmit}>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={registerData.token}
                            onChange={(e) => setRegisterData({ ...registerData, token: e.target.value })}
                            required
                        />
                        <br />
                        <button type="submit">Register</button>
                    </form>
                </div>
            )}

            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={loginData.username}
                    onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                />
                <br />
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={loginData.token}
                    onChange={(e) => setLoginData({ ...loginData, token: e.target.value })}
                    required
                />
                <br />
                <button type="submit">Login</button>
            </form>

            {message && <h3>{message}</h3>}
        </div>
    );
}

export default App;
