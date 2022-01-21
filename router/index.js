const router = require('express').Router()
const movieController = require('../controller/movie');
const registerController = require('../controller/register');
const signinController = require('../controller/signin');
const authenticationMiddleware = require('../middlewares/authentication-middlewares');
const adminAuthorizationMiddleware = require('../middlewares/admin-authorization-middleware')
const errorHandlerMiddleware = require ('../middlewares/error-handler-middleware');


// router.get('/', (req, res) => {
//     res.status(200).json({
//         message:"server up"
//     })
// })

router.post('/register',registerController.register);
router.post('/login',signinController.signIn);

router.use(authenticationMiddleware);

router.get('/movies', movieController.getMovies);
router.get('/movies/populer', movieController.getMoviePopuler);
router.post('/movies', movieController.createMovies);
router.get('/movies/:id', movieController.getMoviesById);

router.use(adminAuthorizationMiddleware);

router.put('/movies/:id', movieController.editMovies);
router.delete('/movies/:id', movieController.deleteMovies);

router.use(errorHandlerMiddleware);




module.exports = router