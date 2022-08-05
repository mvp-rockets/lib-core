module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true
	},
	extends: 'airbnb-base',
	parserOptions: {
		ecmaVersion: 'latest'
	},
	rules: {
		'no-unused-expressions': 0,
		'chai-friendly/no-unused-expressions': 'off',
		'class-methods-use-this': 'off',
		'no-multi-str': 'off',
		'no-underscore-dangle': 'off',
		'import/no-unresolved': 'off',
		indent: [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		quotes: [
			'error',
			'single'
		],
		semi: [
			'error',
			'always'
		],
		'comma-dangle': [
			'error',
			'never'
		],
		'no-tabs': 0,
		'max-len': [
			2,
			150,
			4,
			{
				ignoreComments: true,
				ignoreUrls: true,
				ignorePattern: '^\\s*var\\s.+=\\s*require\\s*\\('
			}
		]
	}
};
