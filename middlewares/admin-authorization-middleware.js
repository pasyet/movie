function adminAuthorizationMiddleware(req, res, next)  {
    // console.log(req.user);
    if(req.user.role !== 'admin'){
        next({name: 'forbidden'})
    } else {
        next();
    }
}

module.exports = adminAuthorizationMiddleware;