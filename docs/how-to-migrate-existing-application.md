## Introduction

Follow below steps to migrate your existing napses applications.

#### steps

- install @napses/namma-lib by running (npm i @napses/namma-lib).
- create lib.js in the root directory of the project & copy code from here ""
  - delete functional folder from inside lib folder.
  - delete index.js, logger.js,run-query.js from inside lib folder.
  - Replace imports require('lib/functional/logger') to require('lib') in all the places (apis,queries,test cases etc)
  - Replace imports "const ApiError = require('lib/functional/api-error')" to const {ApiError} = require('lib')
  - const ApiError = require('lib/functional/api-error');
- create validation.js in the root directory of the project & copy code from here ""
  - In validation.js if you are having custom validation which is not present in @napses/namma-lib export it as well as.
  - In your project replace imports require('lib/validations/validation') to require('validation') in all the places
  - delete validation folder from inside lib folder.
  - delete validation-error, validation from inside lib folder.

## Breaking changes.

After doing above changes your application might not start because of the breaking changes.Below are the changes you need to do.

- validation-error.js (ValidationError class is deprecated & has been removed from the source code) instead use below code

  ```
  const { HTTP_CONSTANT } = require('@napses/namma-lib');
  const { ApiError } = require('lib');

  instead of new ValidationError()
  use
  new ApiError(error,"Your Error Message",HTTP_CONSTANT.BAD_REQUEST);

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
