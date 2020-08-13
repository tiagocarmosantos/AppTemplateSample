const gulp = require('gulp')
const uglify = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')
//const rename = require('gulp-rename')

gulp.task('deps', ['deps.js', 'deps.css', 'deps.fonts', 'deps.persist'])

gulp.task('deps.js', () => {
	return gulp.src([
		 'node_modules/angular/angular.min.js',
		 'node_modules/angular-sanitize/angular-sanitize.min.js',
		 'node_modules/angular-route/angular-route.min.js',
		 'node_modules/angular-messages/angular-messages.min.js',
		 'node_modules/angular-aria/angular-aria.min.js',
		 'node_modules/angular-animate/angular-animate.min.js',
		 'node_modules/angularangular-locale-pt-br/angular-locale_pt-br.min.js',
		 'node_modules/jquery/dist/jquery.min.js',
		 'node_modules/material-design-lite/material.min.js',
		 'node_modules/footable/js/footable.js',
		 'node_modules/footable/js/footable.filter.js',
		 'node_modules/footable/js/footable.sort.js',
		 'node_modules/@tensorflow/tfjs/dist/tf.min.js',
		 'node_modules/@tensorflow-models/mobilenet/dist/mobilenet.min.js',
		 'node_modules/angular-animate/angular-animate.min.js',
		 'node_modules/angular-toastr/dist/angular-toastr.min.js',
		 'node_modules/angular-toastr/dist/angular-toastr.tpls.min.js',
		 'node_modules/client-compress/dist/index.js',
		 'node_modules/qrcode/build/qrcode.min.js',
		 'packages/ngComponents/ngComponents.js',
		 'packages/ngComponents/ngSerialGenerator-mobile/mobileNgSerialGenerator.js',
		 'packages/ngComponents/ngRepeat-mobile/mobileNgRepeat.js',
		 'packages/ngComponents/ngAcordion-mobile/mobileNgAcordion.js',
		 'packages/ngComponents/ngTable-mobile/mobileNgTable.js',
		 'packages/ngComponents/ngInputFile-mobile/ngInputFile.js',
		 'packages/ngComponents/ngImageGenerator-mobile/mobileNgImageGenerator.js',
		 'packages/ngComponents/ngIAGenerator-mobile/mobileNgIAGenerator.js',
		 'packages/ngComponents/ngMsg-mobile/ngMsg.js',
		 'packages/ngComponents/ngCaptilize-mobile/ngCaptilize.js',
		 'packages/ngComponents/ngAlert-mobile/ngAlert.js',
		 'packages/ngComponents/ngEllipsis-mobile/ngEllipsis.js',
		 'packages/ngComponents/ngDate-mobile/ngDate.js',
		 'packages/ngComponents/ngInclude-mobile/includeReplace.js',
		 'packages/ngComponents/ngExcel-mobile/Excel.js',
		 'packages/ngComponents/ngExcel-mobile/jszip.js',
		 'packages/ngComponents/ngExcel-mobile/xlsx.js',
		 'packages/ngComponents/ngExcel-mobile/lodash.min.js',
		 'packages/ngComponents/ngDownload-mobile/ngDownload.js',
		 'packages/ngComponents/ngMath-mobile/ngMath.js',
	])
	//	.pipe(uglify())
	.pipe(concat('deps.min.js'))
	.pipe(gulp.dest('public/shared/behaviors'))
})

gulp.task('deps.css', () => {
	return gulp.src([
		 'node_modules/bootstrap/dist/css/bootstrap.min.css',
		 'node_modules/material-design-lite/material.min.css',
		 'node_modules/w3-css/w3.css',
		 'node_modules/angular-toastr/dist/angular-toastr.min.css',
		 'node_modules/footable/css/*.css',
		 'packages/ngComponents/**/*.css'
	])
	.pipe(uglifycss({ "uglyComments": true }))
	.pipe(concat('deps.min.css'))
	.pipe(gulp.dest('public/shared/styles'))
})

gulp.task('deps.fonts', () => {
	return gulp.src([
		 'node_modules/material-design-icons/iconfont/*.*',
		 'node_modules/footable/css/fonts/*.*'
	])
	.pipe(gulp.dest('public/shared/styles/fonts'))
})

gulp.task('deps.persist', () => {
	return gulp.src([
		 'packages/ngComponents/ngPersist-mobile/ngPersist-indexedDB.js',
		 'packages/ngComponents/ngPersist-mobile/ngPersist-cache.js',
		 'packages/ngComponents/ngPersist-mobile/ngPersist-offline.js',
		 'packages/ngComponents/ngPersist-mobile/ngPersist-strategies.js'
	])
	.pipe(concat('deps.persist.js'))
	.pipe(gulp.dest('public/shared/behaviors'))
})
