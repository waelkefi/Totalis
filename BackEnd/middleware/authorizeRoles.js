export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
      if (!req.userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
  
      if (!allowedRoles.includes(req.userRole)) {
        return res.status(403).json({ success: false, message: "Access denied" });
      }
  
      next();
    };
  };
  