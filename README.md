- [1. Introduction](#1-introduction)
    - [A lib to help us the ease of functional programming (based on ramda (https://ramdajs.com/) & folktale(https://www.npmjs.com/package/folktale))](#a-lib-to-help-us-the-ease-of-functional-programming-based-on-ramda-httpsramdajscom--folktalehttpswwwnpmjscompackagefolktale)
- [3. Installation](#3-installation)
- [4. How to imports.](#4-how-to-imports)
- [5. How to use token](#5-how-to-use-token)
- [6. How to use logger.](#6-how-to-use-logger)
- [3. Video walkthrough Tutorials](#3-video-walkthrough-tutorials)

## 1. Introduction

#### A lib to help us the ease of functional programming (based on ramda (https://ramdajs.com/) & folktale(https://www.npmjs.com/package/folktale))

```
└── lib
    ├── logger.js
    ├── token.js
    ├── utilities
    │   ├── api-error.js
    │   ├── args.js
    │   ├── compose-result.js
    │   ├── doNothing.js
    │   ├── http-constant.js
    │   ├── ifElse.js
    │   ├── logger.js
    │   ├── respond.js
    │   ├── transform-to-result.js
    │   ├── uuid.js
    │   ├── whenResult.js
    │   └── with-args.js
    └── validations
        ├── check-given-values.js
        ├── has-length-of.js
        ├── is-boolean.js
        ├── is-email.js
        ├── is-mobile-number.js
        ├── is-string-numeric.js
        ├── is-timestamp.js
        ├── is-undefined.js
        ├── max-value.js
        ├── min-value.js
        ├── not-empty.js
        ├── numeric.js
        ├── should-be-uuid.js
        ├── validate-given-pattern.js
        └── validate.js

```

## 3. Installation

```
    npm install @mvp-rockets/namma-lib
```

## 4. How to imports.

- All the function from @mvp-rockets/namma-lib

```
    const {
        utilities:{
                logInfo,
                logError,
                ....
                ....
                all the utilities function here
         },
         validations:{
            isBoolean,
	        hasLengthOf,
            ....
            ....
            all the validations function here
         },
         HTTP_CONSTANT,
         token
        } = require('@mvp-rockets/namma-lib')
```

- Only the utilities

```
const {
        logInfo,
        logError,
        ....
        ....
        all the utilities function here
        } = require('@mvp-rockets/namma-lib/utilities')
```

- Only the validations

```
const {
        logInfo,
        logError,
        ....
        ....
        all the utilities function here
        } = require('@mvp-rockets/namma-lib/validations')
```

- Only the token

```
const {
         token
        } = require('@mvp-rockets/namma-lib')
```

- Only the HTTP_CONSTANT

  ```
  const {
  HTTP_CONSTANT
  } = require('@mvp-rockets/namma-lib')
  ```

## 5. How to use token

```
<!-- initialize token in your index.js -->
const {
         token
        } = require('@mvp-rockets/namma-lib');

token.initialize("Your Jwt secret key");

<!-- Generate Token  -->
const tokenResult =  await token.generate("Your object")

console.log(tokenResult); // Result.Ok("Your generated token")

<!-- decode token -->
const decodedTokenResult =  await token.decode("Your token")

console.log(decodedTokenResult); // Result.Ok("Your decoded object")

if case of invalid or expired token
console.log(decodedTokenResult); // Result.Error("Invalid token")

```

## 6. How to use logger.

```
<!-- initialize logger in your index.js -->
const { Logger } = require('@mvp-rockets/namma-lib');

Logger.initialize({
	isEnable: true, // for dev,qa use false
	type: 'aws',
	environment: "<env name>",
	clsNameSpace: <"cls name for trace Id">,
	configurations: {
		region: <"aws region">,
		accessKeyId: <"aws access Key Id">,
		secretKey: <"aws secret Key">,
		logGroupName: <"log group name">,
		logStreamName: <"log stream name">
	}
});

<!-- add below code for unique traceId for each request -->
const { logInfo } = require('@mvp-rockets/namma-lib/utilitiesut');
app.use((req, res, next) => {
	const namespace = cls.getNamespace("<cls name for trace Id>");
	const platform = req.headers['x-platform'] || 'unknown-platform';
	namespace.run(() => {
		namespace.set('traceId', uuid.v4());
		logInfo(`${req.method} ${req.originalUrl}`, { ...req.body, platform });
		next();
	});
});
```

## 3. Video walkthrough Tutorials

[Youtube Tutorials](https://www.youtube.com/playlist?list=PLBOupoLEhXiJtLvJtCG_WvC6P0kWzC4Jo)
