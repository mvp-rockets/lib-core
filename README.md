- [1. Introduction](#1-introduction)
    - [A lib to help us the ease of functional programming (based on ramda (https://ramdajs.com/) & folktale(https://www.npmjs.com/package/folktale))](#a-lib-to-help-us-the-ease-of-functional-programming-based-on-ramda-httpsramdajscom--folktalehttpswwwnpmjscompackagefolktale)
- [3. Installation](#3-installation)
- [4. How to imports.](#4-how-to-imports)
- [3. Video walkthrough Tutorials](#3-video-walkthrough-tutorials)

## 1. Introduction

#### A lib to help us the ease of functional programming (based on ramda (https://ramdajs.com/) & folktale(https://www.npmjs.com/package/folktale))

```
.
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
        └── validate.js

```

## 3. Installation

```
    npm install @napses/namma-lib
```

## 4. How to imports.

- All the function from @napses/namma-lib

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
        } = require('@napses/namma-lib')
```

- Only the utilities

```
const {
        logInfo,
        logError,
        ....
        ....
        all the utilities function here
        } = require('@napses/namma-lib/utilities')
```

- Only the validations

```
const {
        logInfo,
        logError,
        ....
        ....
        all the utilities function here
        } = require('@napses/namma-lib/validations')
```

- Only the token

```
const {
         token
        } = require('@napses/namma-lib')
```

- Only the HTTP_CONSTANT

  ```
  const {
  HTTP_CONSTANT
  } = require('@napses/namma-lib')
  ```

## 3. Video walkthrough Tutorials

[Youtube Tutorials](https://www.youtube.com/playlist?list=PLBOupoLEhXiJtLvJtCG_WvC6P0kWzC4Jo)
