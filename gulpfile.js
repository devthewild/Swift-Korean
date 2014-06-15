var gulp = require('gulp')
	, marked = require('gulp-marked')
	, deploy = require('gulp-gh-pages')
	, rename = require('gulp-rename')
	, concat = require('gulp-concat')
	, rimraf = require('rimraf');

gulp.task('clean', function(cb){
	rimraf('html/', cb);
});

gulp.task('parse', function(){
	gulp.src(['About.txt', 
			'chapter?.txt', 'chapter1?.txt',
			'chapter2?.txt', 'chapter3?.txt',
			'contributor.txt'])
		.pipe(marked())
		.pipe(concat('contents.html'))
		.pipe(gulp.dest('./html/'))
});

gulp.task('resource', function(){
	gulp.src(['css/*', 'js/*', 'fonts/*', 'images/*'], {base: '.'})
		.pipe(gulp.dest('html/'))
});

gulp.task('concat', ['parse'], function(){
	gulp.src(['head.html', 'html/contents.html', 'foot.html'])
		.pipe(concat('index.html'))
		.pipe(gulp.dest('html/'))
});

gulp.task('deploy', ['resource', 'concat'], function(){
	gulp.src('./html/**/*')
		.pipe(deploy({
			cacheDir: '../.swift',
			branch: 'gh-pages'
		}));
});

gulp.task('default', ['clean', 'deploy']);
