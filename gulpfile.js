'use strict';

const gulp = require('gulp');
const rigger = require('gulp-rigger');
const stylus = require('gulp-stylus');
const cleanCSS = require('gulp-clean-css');
const urlAdjuster = require('gulp-css-url-adjuster');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const debug = require('gulp-debug');
const gulpIf = require('gulp-if');
const filter = require('gulp-filter');
const del = require('del');
const newer = require('gulp-newer');
const browserSync = require('browser-sync').create();
const notify = require('gulp-notify');
const combiner = require('stream-combiner2').obj;
const pug = require('gulp-pug');
const path = require('path');
const rename = require("gulp-rename");
const map = require('map-stream');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegoptim = require('imagemin-jpegoptim');
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const htmlparser = require("htmlparser2");
const posthtml = require('gulp-posthtml');
const autoprefixer = require('autoprefixer-stylus');
const emitty = require('emitty').setup('markup', 'pug');
const realFavicon = require('gulp-real-favicon');
const fs = require('fs');
const cache  = require('gulp-memory-cache');
const zip = require('gulp-zip');
const merge = require('merge-stream');

global.isDevelopment = process.env.NODE_ENV !== 'production';
global.depsObj = {};
global.depsArr = [];

const pkgData = 'package.json';
const depsData = 'deps.json';
const FAVICON_DATA_FILE = 'markup/static/favicon/faviconData.json';

gulp.task('generate-favicon', function(done) {
    realFavicon.generateFavicon({
        masterPicture: 'markup/static/favicon/favicon.png',
        dest: 'build/',
        iconsPath: '/',
        design: {
            ios: {
                pictureAspect: 'backgroundAndMargin',
                backgroundColor: '#ffffff',
                margin: '14%',
                assets: {
                    ios6AndPriorIcons: false,
                    ios7AndLaterIcons: false,
                    precomposedIcons: false,
                    declareOnlyDefaultIcon: true
                }
            },
            desktopBrowser: {},
            windows: {
                pictureAspect: 'whiteSilhouette',
                backgroundColor: '#6f9d39',
                onConflict: 'override',
                assets: {
                    windows80Ie10Tile: false,
                    windows10Ie11EdgeTiles: {
                        small: false,
                        medium: true,
                        big: false,
                        rectangle: false
                    }
                }
            },
            androidChrome: {
                pictureAspect: 'shadow',
                themeColor: '#ffffff',
                manifest: {
                    name: 'Хобби-таемый остров',
                    display: 'standalone',
                    orientation: 'notSet',
                    onConflict: 'override',
                    declared: true
                },
                assets: {
                    legacyIcon: false,
                    lowResolutionIcons: false
                }
            },
            safariPinnedTab: {
                pictureAspect: 'silhouette',
                themeColor: '#6f9d39'
            }
        },
        settings: {
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: false
        },
        markupFile: FAVICON_DATA_FILE
    }, function() {
        done();
    });
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function() {
    return gulp.src([ 'TODO: List of the HTML files where to inject favicon markups' ])
        .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
        .pipe(gulp.dest('TODO: Path to the directory where to store the HTML files'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
    var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
    realFavicon.checkForUpdates(currentVersion, function(err) {
        if (err) {
            throw err;
        }
    });
});

function getDepsObj(file) {
    Array.isArray(depsObj[file.stem]) ? depsObj[file.stem].splice(0, depsObj[file.stem].length) : depsObj[file.stem] = [];
    var parser = new htmlparser.Parser({
        onopentag: function(name, attribs){
            if(attribs.class){
                attribs.class.split(' ').forEach(function(className) {
                    (depsObj[file.stem].indexOf(className) === -1) && (className.indexOf('__') === -1) && (className.indexOf('_') === -1) && depsObj[file.stem].push(className);
                });
            }
        }
    }, {decodeEntities: true});
    parser.write(file.contents.toString());
    parser.end();

    return file;
}

gulp.task('html', gulp.series(
    function getHTML(){
        return gulp.src(['markup/pages/*.pug'])
            .pipe(gulpIf(global.isWatch, emitty.stream(global.emittyChangedFile)))
            .pipe(pug({
                pretty: true,
                locals: {
                    isDevelopment: global.isDevelopment,
                    pkg: JSON.parse(fs.readFileSync(pkgData)),
                    faviconCode: JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code
                }
            }))
            .on('error', notify.onError(function(err) {
                return {
                    title: 'HTML',
                    message: err.message
                }
            }))
            .pipe(posthtml([
                require('posthtml-bem-sugar')({
                    blockPrefix: '-',
                    elemPrefix: '__',
                    modPrefix: '_',
                    modDlmtr: '_'
                }),
                require('posthtml-bem')()
            ]))
            .pipe(map(function (file, cb) {cb(null, getDepsObj(file));}))
            .pipe(debug({title: 'HTML'}))
            .pipe(gulp.dest('build/'));
    },
    function getDepsArr(done) {
        depsArr.splice(0, depsArr.length);
        for (var prop in depsObj) if (depsObj.hasOwnProperty(prop)){
            depsObj[prop].forEach(function (className) {
                (depsArr.indexOf('markup/components/' + className) === -1) && depsArr.push('markup/components/' + className);
            });
        }
        console.log(depsObj);
        console.log(depsArr);
        done();
    }
));

gulp.task('css', gulp.series(
    function () {
        var deps = JSON.parse(fs.readFileSync(depsData));
        const fStyl = filter('**/*.styl', {restore: true});
        return combiner(
            gulp.src(deps.css_src.concat(depsArr.map(function (dep) {return path.join(dep, '*.styl');}))),
            gulpIf(isDevelopment, sourcemaps.init()),
            fStyl,
            concat({path: 'main.styl'}),
            stylus({
                'include css': true,
                use: [autoprefixer({
                    browsers: ['last 2 versions', 'ie >= 10'],
                    cascade: false
                })]
            }),
            fStyl.restore,
            concat({path: 'main.css'}),
            gulpIf(isDevelopment, sourcemaps.write()),
            debug({title: 'CSS'}),
            gulp.dest('build/static/css/')
        ).on('error', notify.onError(function(err) {
            return {
                title: 'CSS',
                message: err.message
            }
        }));
    },
    function (done) {
        if (!isDevelopment) {
            return combiner(
                gulp.src('build/static/css/main.css'),
                cleanCSS(),
                rename({suffix: '.min'}),
                debug({title: 'CSS:min'}),
                gulp.dest('build/static/css/')
            ).on('error', notify.onError(function(err) {
                return {
                    title: 'CSS:min',
                    message: err.message
                }
            }));
        }
        else {
            done();
        }
    }
));

gulp.task('js', gulp.series(
    function () {
        var deps = JSON.parse(fs.readFileSync(depsData));
        return combiner(
            gulp.src(deps.js_src.concat(depsArr.map(function (dep) {return path.join(dep, '*.js');}))),
            gulpIf(isDevelopment, sourcemaps.init()),
            concat({path: 'main.js'}),
            gulpIf(isDevelopment, sourcemaps.write()),
            debug({title: 'JS'}),
            gulp.dest('build/static/js/')
        ).on('error', notify.onError(function(err) {
            return {
                title: 'JS',
                message: err.message
            }
        }));
    },
    function (done) {
        if (!isDevelopment) {
            return combiner(
                gulp.src('build/static/js/main.js'),
                uglify(),
                rename({suffix: '.min'}),
                debug({title: 'JS:min'}),
                gulp.dest('build/static/js/')
            ).on('error', notify.onError(function(err) {
                return {
                    title: 'JS:min',
                    message: err.message
                }
            }));
        }
        else {
            done();
        }
    }
));

gulp.task('img', function() {
    return combiner(
        gulp.src(['markup/static/img/content/**/*.{png,jp*g,gif,svg}'].concat(depsArr.map(function (dep) {return path.join(dep, '*.{png,jp*g,gif,svg}');}))),
        newer('build/static/img/content/'),
        newer('build/static/img/general/'),
        imagemin([
            imagemin.gifsicle({interlaced: true}),
            imageminJpegoptim({progressive: true, max: 80}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({plugins: [{removeViewBox: false}]})
        ]),
        debug({title: 'IMG'}),
        gulp.dest(function (file) {
            return file.base.indexOf(path.resolve('markup/static/img/content/')) !== -1 ? 'build/static/img/content/' : 'build/static/img/general/';
        })
    ).on('error', notify.onError(function(err) {
        return {
            title: 'IMG',
            message: err.message
        }
    }));
});

gulp.task('fonts', function() {
    var deps = JSON.parse(fs.readFileSync(depsData));
    return combiner(
        gulp.src(deps.fonts_src.map(function (dep) {return path.join(dep, '*.{woff*,ttf,eot,svg}');}), {base: path.resolve("markup/static/fonts/")}),
        debug({title: 'FONTS'}),
        gulp.dest('build/static/fonts/')
    ).on('error', notify.onError(function(err) {
        return {
            title: 'FONTS',
            message: err.message
        }
    }));
});

gulp.task('fontawesome', gulp.parallel(
    function() {
        return combiner(
            gulp.src(['./node_modules/fa-stylus/fonts/*.{woff*,ttf,eot,svg}']),
            debug({title: 'FONTAWESOME'}),
            gulp.dest('build/static/fonts/font-awesome/')
        ).on('error', notify.onError(function(err) {
            return {
                title: 'FONTAWESOME',
                message: err.message
            }
        }));
    },
    function() {
        return combiner(
            gulp.src(['markup/static/fonts/font-awesome/font-awesome.styl']),
            stylus({
                use: [require('fa-stylus')()]
            }),
            debug({title: 'FONTAWESOME'}),
            gulp.dest('markup/static/fonts/font-awesome/')
        ).on('error', notify.onError(function(err) {
            return {
                title: 'FONTAWESOME',
                message: err.message
            }
        }));
    }
));

gulp.task('glyphicons', function(){
    return combiner(
        gulp.src(['markup/static/fonts/glyphicons/icons/*.svg']),
        iconfontCss({
            fontName: 'glyphicons',
            targetPath: '../../../../markup/static/fonts/glyphicons/glyphicons.css',
            fontPath: '../fonts/glyphicons/',
            cssClass: 'gly',
            path: 'markup/static/fonts/glyphicons/.css_tmp'
        }),
        iconfont({
            fontName: 'glyphicons',
            prependUnicode: true,
            formats: ['woff2', 'woff', 'ttf', 'eot', 'svg'],
            fontHeight: 600, //creating the icons larger allows for better rendering at sizes greater than 100px
            normalize: true
        }),
        debug({title: 'GLYPHICONS'}),
        gulp.dest('build/static/fonts/glyphicons/')
    ).on('error', notify.onError(function(err) {
        return {
            title: 'GLYPHICONS',
            message: err.message
        }
    }));
});

gulp.task('misc', function() {
    return combiner(
        gulp.src(['markup/static/misc/**/*.*']),
        newer('build/'),
        debug({title: 'MISC'}),
        gulp.dest('build/')
    ).on('error', notify.onError(function(err) {
        return {
            title: 'MISC',
            message: err.message
        }
    }));
});

gulp.task('clean', function() {
    return del(['build/']);
});

gulp.task('build', gulp.series('clean', gulp.parallel('generate-favicon', 'fonts', 'fontawesome', 'glyphicons', 'misc'),
    'html', 'img', gulp.parallel('css', 'js')));

gulp.task('watch', function() {
    global.isWatch = true;

    gulp.watch('markup/**/*.pug', gulp.series('html', 'img', gulp.parallel('css', 'js')))
        .on('all', function(event, filepath) {
            global.emittyChangedFile = filepath;
        });
    gulp.watch([pkgData, depsData], gulp.series('html', gulp.parallel('css', 'js', 'fonts')));
    gulp.watch(['markup/**/*.{css,styl}', 'app_components/**/*.{css,styl}'], gulp.series('css'));
    gulp.watch(['markup/**/*.js', 'app_components/**/*.js'], gulp.series('js'));
    gulp.watch(['markup/**/*.{png,jp*g,gif,svg}'], gulp.series('img'));
    gulp.watch(['markup/static/fonts/glyphicons/icons/*.svg'], gulp.series('glyphicons'));
    gulp.watch(['markup/static/misc/**/*.*'], gulp.series('misc'));
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: 'build/'
        },
        tunnel: true,
        host: 'localhost',
        port: 3000,
        logPrefix: 'AlSKra'
    });

    browserSync.watch('build/**/*.*').on('change', browserSync.reload);
});

gulp.task('zip', function () {
    var pkg = JSON.parse(fs.readFileSync(pkgData));
    return gulp.src('build/**/*.*')
        .pipe(zip(pkg.name.toLowerCase() + '-' + pkg.version + '.zip'))
        .pipe(gulp.dest('build/'));
});

gulp.task('dev',
    gulp.series('build', gulp.parallel('watch', 'serve'))
);

gulp.task('prod', gulp.series(
    function (done) {
        global.isDevelopment = false;
        done();
    },
    gulp.series('build', gulp.parallel('serve', 'zip'))
));

