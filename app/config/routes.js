const usersController = require( "../controllers/usersController" );
const productController = require( "../controllers/productController" );

// add other controllers that are used

const validateToken = require( "../middlewares/validateToken" );
const authorize = require( "../middlewares/authorize" );
// add other middlewares that are used

const express = require( "express" );

const router = express.Router( );

// Add routes below
// Example: router.post/get/put/ ..../delete ( path ), middlewares ( if any ), controllerFunction );

// use apiDoc to generate documentation for API routes
// Details on how to use on: http://apidocjs.com/

/**
*    @apiGroup User
*    @api {post} /users/registration Adding an user to the db.
*    @apiParam {String} id  User ID required.
*    @apiParam {String} name  Mandatory name.
*    @apiParam {Number} age  Mandatory age. Minimum 18.
*    @apiParam {String} gender  Mandatory gender.
*    @apiExample {response} Example response:
*       {
*         "user": {
*            "id": 123456789,
*            "username": "user123"
*            "password": "pass123"
*            "name": "Ana",
*            "gender": "female",
*            "age": 30
*           }
*      }
*/
router.post( "/users/registration", usersController.register );

/**
*    @apiGroup User
*    @api {post} /users/login User login route.
*    @apiParam {String} id  User ID required.
*    @apiParam {String} username  User username required.
*    @apiParam {String} password  User password required.
*    @apiExample {response} Example response:
*       {
*         "user": {
*            "token": dahljkhajfhajku32974eq9kjh
*           }
*      }
*/
router.post( "/users/login", authorize, usersController.login );

/**
*    @apiGroup User
*    @api {put} /users/edit Edit the profile and filtering options.
*    @apiDescription Useful to change profile information
*    @apiParam {String} id  User ID required.
*    @apiParam {String} name  Mandatory name.
*    @apiParam {Number} age  Mandatory age. Minimum 18.
*    @apiParam {String} gender  Mandatory gender.
*/
router.put( "/users/edit", authorize, validateToken, usersController.edit );

/**
*    @apiGroup User
*    @api {delete} /users/delete Delete an user.
*    @apiParam {String} id  User ID required.
*    @apiHeaderExample Example header
*       {
*           id:123456789
*       }
*/
router.delete( "/users/delete", authorize, validateToken, usersController.delete );

router.post( "/products/create", authorize, productController.create );
// ... add crud for products

// ... add crud for cart

router.get( "/test", ( req, res ) => {
    res.json( { success: true } );
} );

module.exports = ( app ) => {
    app.use( "/", router );
};
