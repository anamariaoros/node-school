exports.notFound = ( req, res ) => {
    res.notFound( );
};

exports.errorLogger = ( err, req, res, next ) => {
    console.log( err.stack );
    next( err );
};

// Don't remove next !!!!
exports.errorHandler = ( err, req, res, next ) => {
    res.status( 503 ).json( {
        success: false,
        error: "server_error",
    } );
};
