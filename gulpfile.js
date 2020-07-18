const gulp = require('gulp')
const util = require('gulp-util')
const sequence = require('run-sequence')

require('./gulpTasks/app')
require('./gulpTasks/deps')
require('./gulpTasks/server')

gulp.task('default', () => {
	if (util.env.build) {
		sequence('deps', 'app')
	}

	if (util.env.dev) {
		sequence('deps', 'app', 'devServer')
	}

	if (util.env.quality) {
		sequence('deps', 'app', 'qaServer')
	}

	if (util.env.production) {
		sequence('deps', 'app','prodServer')
	}
})