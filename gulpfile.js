var gulp        = require('gulp');
var browserSync  = require('browser-sync');  // або так browserSync  = require('browser-sync').create()
  
gulp.task('css',function(){
	return gulp.src('app/css/*.css')
	.pipe(gulp.dest('work/css'))
	.pipe(browserSync.reload({stream:true}))
})
gulp.task('js',function(){
	return gulp.src('app/js/*.js')
	.pipe(gulp.dest('work/js'))
	.pipe(browserSync.reload({stream:true}))
})
gulp.task('html',function(){
	return gulp.src('app/*.html')
	.pipe(gulp.dest('work'))
	.pipe(browserSync.reload({stream:true}))
})



gulp.task('browser-sync',
                          
                                          function() {
		browserSync({    
				server: {
						baseDir: "./work"
				},
        host: 'localhost',
        port: 3000,
				
        notify: false
				
		});
});
gulp.task('watch',['browser-sync','css','js','html'],function(){
	gulp.watch('app/css',['css','js','html'])
})
gulp.task('default', ['watch']);