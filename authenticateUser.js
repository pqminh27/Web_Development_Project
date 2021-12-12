const ROLE = {
    ADMIN: "admin",
    BASIC: "basic",
};

function authUser(req, res, next) {
    if (req.user == null) {
        res.status(403);
        return res.send("You need to sign in first");
    }
    next();
}

function authRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            res.status(401);
            return res.status("Not allowed");
        }
        next();
    };
}

module.exports = { ROLE, authUser, authRole };