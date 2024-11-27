import { createContext, useContext, useState, useEffect } from "react";
import useAuth from "./authContext";
import toast from "react-hot-toast";
import api from "../utils/api";
import useLoading from "./loadingContext";

const userContext = createContext()

export const UserProvider = ({ children }) => {
    const { loading, setLoading }= useLoading()
    const { isAuthenticated, user, isAdmin } = useAuth()
    const [users, setUsers] = useState(null)

    // function to fetch all the users data for admin dashboard
    const fetchAllUsers = async () => {
        if (!isAdmin) return;
        try {
            const response = await api.get(`/admin/get-all-users`)
            setUsers(response.data.data)
        } catch (error) {
            const message = error.response?.data.message || "failed to load users"
            toast.error(message)
        }
    }

    useEffect(() => {
        fetchAllUsers()
    }, [isAuthenticated, isAdmin])

    // --------------------------------------------------------------------------------
    // function to delete a user from admin dashboard
    const deleteUser = async (id) => {
        setLoading(true)
        try {
            const response = await api.post(`/admin/delete-user/${id}`)
            if (response.data) {
                await fetchAllUsers();
                return { success: true, message: response.data.message || 'User deleted successfully' }
            }
        } catch (error) {
            return { success: false, message: error.response?.data.message || 'Failed to delete user' }
        } finally {
            setLoading(false)
        }
    }

// |||||||||||||||||||||||||||||||||||||||||| Normal Users

const editUserDetails = async (email, name) => {
    setLoading(true);
    try {
        const response = await api.put("/user/edit-details", { email, name });
        if (response.data) {
            return {
                success: true,
                message: response.data.message || "User details updated successfully."
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error.response?.data.message || "An error occurred while updating the details. Please try again."
        };
    } finally {
        setLoading(false);
    }
};




    return (
        <userContext.Provider value={{ users, setUsers, loading, deleteUser, editUserDetails }}>
            {children}
        </userContext.Provider>
    )
}

const useUser = () => {
    return useContext(userContext)
}

export default useUser;