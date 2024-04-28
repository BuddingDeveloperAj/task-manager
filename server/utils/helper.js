const authorize = ({ MODULE_TYPE, MODULE_ACTION }) => {
    return (req, res, next) => {
        let result = req?.user?.role?.permissions?.findIndex((permission) => {
            return (
                permission.type === MODULE_TYPE &&
                permission.action === MODULE_ACTION
            );
        });
        if (result > -1) {
            next(); // User is authorized, proceed to the next middleware or route handler
        } else {
            // User is not authorized, return a 403 Forbidden response
            return res.status(403).json({
                status: 'error',
                message: 'You are not authorized to perform this action',
            });
        }
    };
};

module.exports = {
    authorize,
};
