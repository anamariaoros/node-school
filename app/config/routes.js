const errorsController = require( "../controllers/errorsController" );
const usersController  = require( "../controllers/usersController" );
//add other controllers that are used

const authorize = require( "../middlewares/authorize" );
const setUser   = require( "../middlewares/setUser" );
//add other middlewares that are used

const express = require( "express" );
const router  = express.Router( );

// Add routes below
// Example: router.post/get/put/ ..../delete ( path ), middlewares ( if any ), controllerFunction );

//use apiDoc to generate documentation for API routes
//Details on how to use on: http://apidocjs.com/

/**
*    @apiGroup User
*    @api {post} /users/registration Adding an user to the db.
*    @apiParam {String} id  User ID required.
*    @apiParam {String} name  Mandatory name.
*    @apiParam {Number} age  Mandatory age. Minimum 18.
*    @apiParam {String} sex  Mandatory sex.
*    @apiExample {response} Example response:
*       {
*         "user": {
*            "id": 123456789,
*            "name": "Ana",
*          	 "sex": "female",
* 	         "age": 30
*           }
*      }
*/
router.post( "/users/registration", setUser, usersController.register );

/**
*    @apiGroup User
*    @api {put} /users/edit Edit the profile and filtering options.
*    @apiDescription Useful to change profile information
*    @apiParam {String} id  User ID required.
*/
router.put( "/users/edit", authorize, usersController.edit );

/**
*    @apiGroup User
*    @api {delete} /users/delete Delete an user.
*    @apiParam {String} id  User ID required.
*    @apiHeaderExample Example header
*       {
*           id:123456789
*       }
*/
router.delete( "/users/delete", authorize, usersController.delete );

router.get( "/test", function( req, res ) {
    res.json( { success: true } );
} );

router.use( errorsController.notFound );

module.exports = function( app ) {
    app.use( "/", router );
    app.use( errorsController.errorLogger );
    app.use( errorsController.errorHandler );
};
