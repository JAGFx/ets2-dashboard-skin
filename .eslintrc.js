module.exports = {
	root:          true,
	env:           {
		node: true
	},
	'extends':     [
		'plugin:vue/essential',
		'eslint:recommended'
	],
	parserOptions: {
		parser: 'babel-eslint'
	},
	rules:         {
		'no-unused-vars':           1,
		'no-console':               process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger':              process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-mixed-spaces-and-tabs': [ 2, 'smart-tabs' ]
	}
};
