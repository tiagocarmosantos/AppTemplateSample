const fs = require('fs')
const path = require('path')
const gulp = require('gulp')
const replace = require('gulp-replace')
let appConfig = JSON.parse(fs.readFileSync('app/appconfig.json', 'utf8'))

function getFolders(dir) {
	return fs.readdirSync(dir)
	  .filter(function(file) {
		return fs.statSync(path.join(dir, file)).isDirectory();
	});
}

function getFiles(dir) {
	return fs.readdirSync(dir)
	  .filter(function(file) {
		return fs.statSync(path.join(dir, file)).isFile();
	});
}

gulp.task('config', () => {
	let appModules = getFolders('app/modules').map(item => { return { name: item, path: `#!/${item}/${item}`, index: `#!/${item}/index` } })
	appConfig.appModules = appModules

	return gulp.src([
		'public/shared/behaviors/app.min.js'
	], { base: './' })
	.pipe(replace("{ appConfigDynamic: appConfigDynamic }", JSON.stringify(appConfig)))
	.pipe(gulp.dest('./', { overwrite: true }))

})

module.exports = {
	getFolders,
	getFiles,
	appConfig
}