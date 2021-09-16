module.exports = {
	chainWebpack: config => {
		config.module
			  .rule('yaml')
			  .test(/\.ya?ml$/)
			  .type('json')
			  .use('yaml-loader')
			  .loader('yaml-loader')
			  .end()
	}
}