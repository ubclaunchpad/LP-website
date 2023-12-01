module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'spellcheck'],
	rules: {
		"spellcheck/spell-checker": [1,
				{
						"comments": true,
						"strings": true,
						"identifiers": true,
						"templates": true,
						"lang": "en_US",
						"skipWords": [
								
						],
						"skipIfMatch": [
								"http://[^s]*",
								"^[-\\w]+\/[-\\w\\.]+$"
						],
						"skipWordIfMatch": [
								"^foobar.*$"
						],
						"minLength": 2
				 }
		 ]
 },
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	]
};
