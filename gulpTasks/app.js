const gulp = require('gulp')
const replace = require('gulp-replace')
const babel = require('gulp-babel')
const htmlmin = require('gulp-htmlmin')
const uglify = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')
const appConfig = require('./config').appConfig

gulp.task('app', ['app.html', 'app.css', 'app.js', 'app.images', 'app.manifest'])

gulp.task('app.html', () => {
	return gulp.src([
		'app/**/*.html'
	])
	.pipe(htmlmin({ collapseWhitespace: true }))
	.pipe(gulp.dest('public'))
})

gulp.task('app.css', () => {
	return gulp.src([
		'app/**/*.css'
	])
	.pipe(uglifycss({ uglyComments: true }))
	.pipe(concat('app.min.css'))
	.pipe(gulp.dest('public/shared/styles'))
})

gulp.task('app.js', () => {
	return gulp.src([
		'app/**/*.js',
		'!app/service-worker.js'
	])
	.pipe(babel({ presets: ['env'] }))
	//.pipe(uglify())
	.pipe(concat('app.min.js'))
	.pipe(gulp.dest('public/shared/behaviors'))
})

gulp.task('app.images', () => {
	return gulp.src([
		'app/shared/styles/images/**/*.*'
	])
	.pipe(gulp.dest('public/shared/styles/images'))
})

gulp.task('app.manifest', () => {
	let versionAssets = new Date().getTime().toString()
	
	return gulp.src([
		'app/*.json',
		'app/*.appcache',
		'app/*.ico',
		'app/service-worker.js'
	])
	.pipe(replace(/# [0-9]{13}/gs, `# ${versionAssets}`))
	.pipe(replace(/\/\/ [0-9]{13}/gs, `// ${versionAssets}`))
	.pipe(replace('appDataNameDynamic', `appData_${appConfig.appName}`))
	.pipe(gulp.dest('public'))
})



