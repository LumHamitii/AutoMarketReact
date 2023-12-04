// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const LoginPage = () => {
//   const [loginData, setLoginData] = useState({
//     username: '',
//     password: '',
//   });
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('https://localhost:7136/api/auth/login', loginData, {
//   withCredentials: true,
// });


//       // Assuming the API response contains information about the user or a token
//       const userData = response.data;

//       console.log('Logged in as:', userData.username);

//       // Redirect to the admin page upon successful login
//       navigate('/admin');
//     } catch (error) {
//       console.error('Login failed:', error);

//       // Set an error message for display
//       setError('Incorrect username or password');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="bg-gray-100 p-8 rounded-lg shadow-lg bg-white border-2 border-gray-200">
//         <div className="p-4 rounded-md shadow-md bg-white inset-shadow">
//           <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Welcome!</h2>
//         </div>
//         <form className="space-y-4" onSubmit={handleLogin}>
//           <div className="mb-6">
//             <label htmlFor="username" className="block text-sm font-medium text-gray-600">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={loginData.username}
//               onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
//               className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
//               placeholder="Enter your username"
//             />
//           </div>

//           <div className="mb-6">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-600">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={loginData.password}
//               onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
//               className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
//               placeholder="Enter your password"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-gray-400 text-gray-800 p-2 rounded-md hover:bg-gray-500 focus:outline-none focus:ring focus:border-blue-500"
//           >
//             Log In
//           </button>
//         </form>

//         {error && (
//           <div className="mt-4 text-center text-red-600">
//             <p>{error}</p>
//           </div>
//         )}

//         <div className="mt-4 text-center text-gray-600">
//           <p className="mb-2">Don't have an account?</p>
//           <Link to="/register" className="text-gray-800 hover:underline font-semibold">
//             Register now!
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from 'react';

const LoginPage = () => {
  // State for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // State for access token
  const [yourAccessToken, setYourAccessToken] = useState('');

  // Login function
  const login = async () => {
    try {
      // Perform authentication logic, e.g., call an authentication API
      const response = await fetch('https://your-auth-api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      // Assuming the API returns an access token
      const { accessToken } = await response.json();

      // Set the access token in the state
      setYourAccessToken(accessToken);

      // Now you can fetch user data using the access token
      fetchUserData();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Fetch user data function
  const fetchUserData = async () => {
    try {
      const response = await fetch('https://your-mvc-app-url/api/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${yourAccessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      console.log('User data:', data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={login}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
