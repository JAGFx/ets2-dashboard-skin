const nodeExternals = require( 'webpack-node-externals' );
const isProduction = process.env.NODE_ENV == 'production';
const config = {
	target:           'node',
	entry:            './src/index.js',
	output:           {
		filename: 'index.js'
	},
	externalsPresets: { node: true },
	externals:        [
		nodeExternals( {
			allowlist: [ /^ets2-dashboard-lib\// ]
		} ),
		'bufferutil',
		'utf-8-validate'
	]
};

module.exports = () => {
	if ( isProduction ) {
		config.mode = 'production';
	} else {
		config.mode = 'development';
	}
	return config;
};
