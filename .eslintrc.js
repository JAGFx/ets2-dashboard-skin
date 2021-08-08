module.exports = {
	env:           {
		node: true
	},
	extends:     [
		'eslint:recommended',
		'plugin:vue/essential',
		"plugin:vue/strongly-recommended",
		"plugin:vue/recommended",
	],
	rules:         {
		'no-console':               2,
		'no-debugger':              2,
		'no-mixed-spaces-and-tabs': [ 2, 'smart-tabs' ],
		'vue/no-v-html': 'off'
	}
};
