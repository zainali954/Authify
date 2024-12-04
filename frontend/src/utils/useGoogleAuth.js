import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuth from '../contexts/authContext';
import useLoading from '../contexts/loadingContext';

const useGoogleAuth = () => {
    const { loading, setLoading } = useLoading();
    const { setUser, setIsAuthenticated, setIsAdmin } = useAuth();
    const navigate = useNavigate();

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            try {
                setLoading(true);
                const response = await axios.post(
                    'http://localhost:3000/api/v1/auth/google-login',
                    { code: codeResponse.code }, // Authorization code
                    { withCredentials: true }    // Send cookies with request
                );

                const data = response.data;

                if (data.success) {
                    const user = data.data.data;
                    setUser(user);
                    setIsAuthenticated(true);
                    setIsAdmin(user.role.toLowerCase() === 'admin');
                    localStorage.setItem('user', JSON.stringify(user));

                    toast.success(data.message || 'Authenticated successfully');

                    // Redirect based on role
                    const role = user.role.toLowerCase();
                    if (role === 'admin') {
                        navigate('/admin/dashboard');
                    } else if (role === 'user') {
                        navigate('/user/dashboard');
                    } else {
                        toast.error("Unexpected role detected. Contact support.");
                    }
                } else {
                    toast.error('Login failed. Please try again later.');
                }
            } catch (error) {
                console.error(error);

                // Handle different error types
                if (error.response) {
                    const status = error.response.status;
                    const message = error.response.data?.message;

                    if (status === 400) {
                        toast.error('Invalid Google login attempt. Please try again.');
                    } else if (status === 401) {
                        toast.error('Your session has expired. Please log in again.');
                    } else if (status === 500) {
                        toast.error('Server error occurred. Please try later.');
                    } else {
                        toast.error(message || 'An unexpected error occurred.');
                    }
                } else if (error.request) {
                    // Network issues
                    toast.error('Network error. Please check your internet connection.');
                } else {
                    // Other unexpected errors
                    toast.error('Something went wrong. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        },
        flow: 'auth-code',
    });

    return { loginWithGoogle };
};

export default useGoogleAuth;
