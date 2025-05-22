import { getMe, login, register, updateUser, deleteUser } from '../../Services/Users.services';
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const SET_USER = 'SET_USER';

// export const loginUser = (email, password) => async (dispatch) => {
//     try {
//         const userData = await login(email, password);
//         dispatch({
//             type: LOGIN_SUCCESS,
//             payload: userData,
//         });
//     } catch (error) {
//         dispatch({
//             type: LOGIN_FAILURE,
//             payload: error.message,
//         });
             
//         const errorMessage = error?.message || "Login failed.";

//         // // Toast en cas d'erreur
//         toast.error(errorMessage);
//     }
// };
export const loginUser = (email, password) => async (dispatch) => {
    // dispatch({ type: SIGN_IN });

    try {
        const result = await login(email, password);
        if (result && ["Admin", "Client"].includes(result.role)) {
            localStorage.setItem("auth_token", result.token);
            const decoded = jwtDecode(result.token);
            const res = await getMe(decoded.userId);
            const user = res?.user
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user, token: result.token }
            });
            return result;
        } else {
            dispatch({ type: LOGIN_FAILURE, payload: "Role non autorisé" });
            return false;
        }
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: "Erreur de connexion" });
        return false;
    }
};
export const registerUser = (userData) => async (dispatch) => {
    try {
        const newUser = await register(userData);

        dispatch({
            type: SET_USER,
            payload: newUser,
        });

        // Toast en cas de succès
        toast.success("Registration successful!");
    } catch (error) {
       
        const errorMessage = error?.message || "Registration failed. Please try again.";

        // // Toast en cas d'erreur
        toast.error(errorMessage);
       
    }
};
export const fetchUserDetails = () => async (dispatch) => {
    try {
        const userDetails = await getMe();
        dispatch({
            type: SET_USER,
            payload: userDetails,
        });
    } catch (error) {
        toast.error("Error fetching user details");
    }
};

export const updateUserDetails = (userData) => async (dispatch) => {
    try {
        const updatedUser = await updateUser(userData);
        dispatch({
            type: SET_USER,
            payload: updatedUser,
        });
        toast.success("User details updated successfully");
    } catch (error) {
        toast.error("Error updating user details");
    }
};

export const deleteUserAccount = () => async (dispatch) => {
    try {
        await deleteUser();
        dispatch({
            type: LOGOUT,
        });
        toast.success("User deleted successfully");
    } catch (error) {
        toast.error("Error deleting user");
    }
};

export const logoutUser = () => {
    return {
        type: LOGOUT,
    };
};
