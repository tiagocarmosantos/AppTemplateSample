const gulp = require('gulp')
const util = require('gulp-util')
const sequence = require('run-sequence')

require('./gulpTasks/deps')
require('./gulpTasks/app')
require('./gulpTasks/config')
require('./gulpTasks/server')

gulp.task('default', () => {
	if (util.env.build) {
		sequence('deps', 'app', 'config')
	}

	if (util.env.dev) {
		sequence('deps', 'app', 'config', 'devServer')
	}

	if (util.env.quality) {
		sequence('deps', 'app', 'config', 'qaServer')
	}

	if (util.env.production) {
		sequence('deps', 'app', 'config', 'prodServer')
	}
})