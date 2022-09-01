## Introduction

Namma lib simplify four things in our application.

1. Control flow (composeResult,whenResult,respond, apiError)
2. Validations (validate,isBoolean ...etc)
3. Token (generate,decode)
4. Logger (AWS)

## Migrating Existing Napses application.

Before you start, First you need to install @napses/namma-lib by running

```
npm i @napses/namma-lib
```

#### Migrating Control flow

1. Create lib.js in the root directory of the project & copy code from here ""
2. Delete functional folder from inside lib folder.
3. Delete index.js,run-query.js from inside lib folder.
4. Replace imports require('lib/functional/logger') to require('lib') in all the places (apis,queries,test cases etc)
5. Replace imports "const ApiError = require('lib/functional/api-error')" to "const {ApiError} = require('lib')"

#### Migrating Validations

1. Create validation.js in the root directory of the project & copy code from here ""
2. if you are having custom validation which is not present in @napses/namma-lib export it as well as in newly created validation.js.
3. In your project replace imports require('lib/validations/validation') to require('validation') in all the places
4. delete validation folder from inside lib folder.
5. delete validation-error.js from inside lib folder.

###### Breaking changes.

After doing above changes your application might not start because of the breaking changes.
Below are the changes you need to do.

- validation-error.js (ValidationError class is deprecated & has been removed from the source code) instead use below code

  ```
  const { HTTP_CONSTANT } = require('@napses/namma-lib');
  const { ApiError } = require('lib');

  instead of new ValidationError()
  use
  new ApiError(error, "Your Error Message", HTTP_CONSTANT.BAD_REQUEST);

  ```

- changes in index.js (ref: )

  ```
  <!-- old code -->
  app.use((req, res, next) => {
  const err = new ApiError(404, 'Not Found', 'Resource Not Found!');
  next(err);
  });

  <!-- new code -->
   const { HTTP_CONSTANT } = require('@napses/namma-lib');
   const { ApiError } = require('lib');

   app.use((req, res, next) => {
  	const err = new ApiError('Not Found', 'Resource Not Found!', HTTP_CONSTANT.BAD_REQUEST);
  	next(err);
  });

  <!-- old code -->
  app.use((error, request, response, next) => {
  if (error.constructor === ApiError) {
    logError('Failed to execute the operation', { error });
    if (error.code) { response.status(error.code); }

    response.send({
      status: false,
      errorType: 'api',
      message: error.errorMessage
    });
  } else if (error.constructor === ValidationError) {
    logInfo('Validation error', error.errorMessage);
    response.send({
      status: false,
      errorType: 'validation',
      message: error.errorMessage
    });
  } else {
    response.status(501);
    logError('Failed to execute the operation', error);
    response.send({
      status: false,
      errorType: 'unhandled',
      message: 'Something went wrong!'
    });
  }
  });

  <!-- new code -->
  app.use((error, request, response, next) => {
  	if (error.constructor === ApiError) {
  		logError('Failed to execute the operation', {
  			error: {
  				value: error.error, stack: error.error ? error.error.stack : []
  			}
  		});
  		if (error.code) { response.status(error.code); }

  		response.send({
  			status: false,
  			message: error.errorMessage
  		});
  	} else {
  		response.status(501);
  		logError('Failed to execute the operation', { value: error, stack: error.stack });
  		response.send({
  			status: false,
  			errorType: 'unhandled',
  			message: 'Something went wrong!'
  		});
  	}
  });

  ```

#### Migrating token

1. In your index.js add below line

   ```
   const { token } = require('@napses/namma-lib');
   token.initialize(config.jwtSecretKey); // config.jwtSecretKey is your jwtSecretKey from the config.
   ```

2. changes in route.js

   ```
   <!-- Old code -->
   function security(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.jwt_secret, (err, decoded) => {
            if (err) {
                next(new ApiError(401, 'unauthorized', 'Failed to authenticate token.'));
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        logger.logError('No Token provided', +req.originalUrl);
        next(new ApiError(403, 'Forbidden', 'No token provided.'));
    }
   }

   <!-- new code -->
   async function security(req, res, next) {
   	const clientToken = req.body.token || req.query.token || req.headers['x-access-token'];
   	if (clientToken) {
   		const decodedTokenResult = await token.decode(clientToken);
   		whenResult(
   			(decoded) => {
   				req.decoded = decoded;
   				next();
   			},
   			(error) => {
   				logError('token verification failed', error);
   				next(new ApiError('unauthorized', 'Failed to authenticate token.', HTTP_CONSTANT.UNAUTHORIZED));
   			}
   		)(decodedTokenResult);
   	} else {
   		logError('No Token provided', +req.originalUrl);
   		next(new ApiError('Forbidden', 'No token provided.', HTTP_CONSTANT.FORBIDDEN));
   	}
   }

   ```

3. Delete token file from inside the lib folder.
   
#### Migrating logger

1. In your index.js add below line
   ```
   
   ```
