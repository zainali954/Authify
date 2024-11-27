import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";
import useLoading from "./loadingContext";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { loading, setLoading } = useLoading();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);

  // Register function 
  const Register = async (name, email, password) => {
    setLoading(true)
    try {
      const response = await api.post(`/auth/register`, { name, email, password })
      if (response.data?.data) {
        const responseData = response.data.data;
        setUser(responseData.userData)
        setIsAuthenticated(true)
        setIsAdmin(responseData.userData.role.toLowerCase() === "admin")
        localStorage.setItem("user", JSON.stringify(responseData.userData));

        return { success: true, message: response.data.message || "Register successful." };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false)
    }
  }
  // Login function
  const Login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post(`/auth/login`, { email, password });
      if (response.data?.data) {
        const responseData = response.data.data;
        setUser(responseData.userData);
        setIsAuthenticated(true);
        setIsAdmin(responseData.userData.role.toLowerCase() === "admin");
        localStorage.setItem("user", JSON.stringify(responseData.userData));

        return { 
          success: true, 
          message: response.data.message || "Login successful.",
          role: responseData.userData.role // Return the role here
      };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };


  // Verify- Email function
  const verifyEmail = async (code)=>{
    setLoading(true)
    try {
      const response = await api.post(`/auth/verify-email`, {email: user.email, verificationCode:code})
      if(response.data){
        setUser(response.data.data.user)
        localStorage.setItem("user", JSON.stringify(response.data.data.user))
        return {success: true, message: response.data.message || "Email verified Successfully"}
      }
    } catch (error) {
      const message = error.response?.data.message ||"something went Wrong while verifying the email, please try again later."
      return {success:false, message}
    }finally{
      setLoading(false)
    }
  }

  // resend verification email function
  const resendVerificationEmail = async ()=>{
    setLoading(true)
    try {
      const response = await api.post(`/auth/resend-verification-email`)
      if(response.data){
        return { success: true, message:response.data.message || "Email send successfuly"}
      }
    } catch (error) {
      const message = error.response?.data.message ||"Something went wrong while sending the verifcation code"
      return { success: false, message}
    }finally{
      setLoading(false)
    }
  }

  // forgot password function
  const ForgotPassword  =async(email) =>{
      setLoading(true)
      try {
        const response = await api.post(`/auth/forgot-password`, { email })
        if(response.data){
          return {success: true, message:response.data.message || "A link has been sent to your email addresss"}
        }
        
      } catch (error) {
        const message = error.response?.data.message || "Error while forgot password"
        return {success: false, message}
      } finally{
        setLoading(false)
      }
  }

  // Reset password function
  const ResetPassword = async (token, password)=>{
    setLoading(true)
    try {
      const response = await api.post(`/auth//reset-password/${token}`, { password })

      if(response.data){
        return { success:true, message:response.data.message || "reset done"}
      }
    } catch (error) {
      const message = error.response?.data.message || "Error while reseting password"
      return { success: true, message}
      
    }finally{
      setLoading(false)
    }
  }
  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      const response = await api.post(`/auth/logout`);
      if (response?.data) {
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
        setError(null);
        localStorage.removeItem("user");
        return { success: true, message: "User logged out successfully." };
      }
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || "Something went wrong while logging out.";
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Initialize authentication state
  useEffect(() => {
    const initializeAuth = () => {
      setLoading(true);
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
          setIsAdmin(parsedUser.role === "admin");
        } catch (err) {
          console.error("Error parsing stored user data:", err);
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);


  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, error, Register, Login, logout, verifyEmail, resendVerificationEmail, ForgotPassword, ResetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
