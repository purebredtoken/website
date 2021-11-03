//Global Decalaration
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-cssmin'),
    minify = require('gulp-minify'),
    beautify = require('gulp-beautify'),
    postcss = require('gulp-postcss'),
    atImport = require("postcss-import"),
    autoprefixer = require('autoprefixer'),
    clean = require('gulp-clean'),
    browserSync = require('browser-sync').create();


    var plugins = [
        atImport,
        autoprefixer({
            "browsers": ["> 1%", "Last 1 versions", "iOS 8"],
            cascade: false
        }),
    ];

    // Compile css from scss
    gulp.task('scss', function () {
        return gulp.src('sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        // Beatify css
        .pipe(concat('style.css'))
        .pipe(beautify.css({ indent_size: 4}))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({stream: true}))
        // Minify css
        .pipe(minifyCSS())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('css'));
        // .pipe(browserSync.reload({stream: true}));
    });

    /*-- clean js file task --*/
    gulp.task('clean', function() {
        return gulp.src(['js/plugins.js', 'js/plugins-min.js','js/custom-min.js'], { read: false })
            .pipe(clean());
    });


    var jsFiles = [
        'js/bootstrap.min.js',
        'js/popper.min.js',
        'js/jquery.appear.js',
        'js/parallaxie.min.js',
        'js/jquery.waypoints.min.js',
        'js/jquery.counterup.min.js',
        'js/three.r119.min.js',
        'js/vanta.globe.min.js',
        'js/jquery.datetimepicker.min.js',
        'js/owl.carousel.min.js',
        'js/slick.min.js',
        'js/slick-animation.min.js',
        'js/swiper.min.js',
        'js/jquery.easing.1.3.js',
        'js/audioplayer.js',
        'js/EasyPieChart.js',
        'js/amcharts-core.min.js',
        'js/amcharts.min.js',
        'js/TimeCircles.js',
        'js/countdown.js',
        'js/footer-reveal.min.js',
        'js/headroom.js',
        'js/imagesloaded.pkgd.min.js',
        'js/jquery.fancybox.min.js',
        'js/jquery.magnific-popup.js',
        'js/isotope.pkgd.min.js',
        'js/masonry.pkgd.js',
        'js/jquery.justifiedGallery.min.js',     
        'js/anime.min.js',
        'js/morphext.min.js',
        'js/wow.min.js',
        'js/jquery.nice-select.min.js',
        'js/scrollreveal.min.js',
        'js/TweenMax.min.js',
        'js/custom-smooth-scroll.js',
        'js/jquery-ui.min.js',
        'js/jquery.parallax-scroll.js',
        'js/parallax.min.js',
        'js/ResizeSensor.min.js',
        'js/theia-sticky-sidebar.min.js',
        'js/nodecursor-tween.min.js',
        'js/typed.min.js',
        'js/gmap3.min.js',
        'js/maplace.min.js',
        

        '!js/particles.min.js',
        '!js/particles-mouse-line.js',
        '!js/custom.js',
        '!js/jquery.min.js',
        '!js/plugins.js',
        '!js/plugins-min.js'
    ];

    gulp.task('scripts',['clean'], function() {
    return gulp.src(jsFiles)
        .pipe(concat('plugins.js'))
        .pipe(minify())
        .pipe(gulp.dest('js'));
    });

    gulp.task('CustomScripts', function() {
    return gulp.src('js/custom.js')
        .pipe(concat('custom.js'))
        .pipe(minify())
        .pipe(gulp.dest('js'));
    });

    // Watch
    gulp.task('watch', function () {
        // gulp.task('watch', ['serve'], function () {
        gulp.watch(['sass/**/*.scss'], function () {gulp.run('scss');});
        gulp.watch(jsFiles, function () {gulp.run('scripts');});
        gulp.watch("sass/*.scss", ['scss']);
        // gulp.watch(['*.html','**/**/*.html']).on('change', browserSync.reload);
        // gulp.watch(['js/plugins-min.js','js/plugins.js','js/custom.js']).on('change', browserSync.reload);
    });

    gulp.task('default', ['scss','scripts','CustomScripts','watch']);