import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { getMe } from "../Services/Users.services";

const PrivateRoute = ({ children, requiredRoles }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user);
  //const token = useSelector(state => state.authentification.userToken)
  const token = localStorage.getItem("auth_token");
  useEffect(() => {
    if (!token) {
      console.log("Token not found");
      navigate("/");
    } else {
      const jwt_Token_decoded = jwtDecode(token);
      if (jwt_Token_decoded.exp * 1000 < Date.now()) {
        localStorage.clear();
        console.log("Token expired");
        navigate("/");
      }
      // to test role so fetch user by id
      getMe(jwt_Token_decoded.id).then((result) => {
        const user = result.user;
        if (user) {
          console.log("test : ", user);
          if (!requiredRoles.includes(user.role)) {
            console.log("Role not authorized");
            navigate("/404");
          }
        }
      });
    }
  }, [navigate, token, user, requiredRoles]);
  return children;
};

export default PrivateRoute;
