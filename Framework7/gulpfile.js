var gulp = require('gulp'),
    runSequence = require('gulp-sequence'),
    copy = require('gulp-copy'),
    zip = require('gulp-zip'),
    clean = require('gulp-clean'),
    cleanCss = require('gulp-clean-css'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    cached = require('gulp-cached'),
    uglify = require('gulp-uglify'),
    remember = require('gulp-remember'),
    sourcemaps = require('gulp-sourcemaps'),
    cheerio = require('gulp-cheerio'),
    minimist = require('minimist'),
    gulpif = require('gulp-if'),
    replace = require('gulp-replace');
// 开发目录
var paths = {
    www: '*',
    index: 'html/index.html',
    sass: ['./scss/**/*.scss'],
    javascript: 'js/',
    controllers: this.javascript + 'controllers/',
    directives: this.javascript + 'directives/',
    build: 'build/',
    zip: 'zip/'
};
// 生成目录
var buildPaths = {
    www: 'build/',
    css: 'build/css/',
    html: 'build/html/',
    index: 'build/html/index.html',
    javascript: 'build/js/',
    controllers: 'build/js/controllers/',
    gulpfile: 'build/gulpfile.js',
    package: 'build/package.json'
};
// 定义环境的接口地址
var URL = {
    dev: 'http://10.6.0.46:8085/',
    stg: 'http://otcstg.tasly.com/',
    prd: 'http://mt.dajiankang.com/'
};
var SSO = {
    dev:'http://10.6.0.46:8100/',
    stg:'http://otcstg.tasly.com/',
    prd:'http://mtsso.dajiankang.com/'
}
var knownOptions = {
    string: 'env',
    default: {env: process.env.NODE_ENV || 'dev'}// 默认dev环境，目前只区别是否为prd
};
// 定义部署的环境
var options = minimist(process.argv.slice(2), knownOptions);
// 控制台提示信息
var echoLogs = function () {
    console.log('---------------------------------');
    console.log('|           任务进行中          |');
    console.log('|           请耐心等待          |');
    console.log('|                               |');
    console.log('|          当前部署环境         |');
    console.log('|     ' + URL[options.env] + '    |');
    console.log('---------------------------------');
};
gulp.task('default', function (cb) {
    echoLogs()
});