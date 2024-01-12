const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));

const webp = require('gulp-webp');
const avif = require('gulp-avif')
const imagemin = require('gulp-imagemin');

function css(){
    return src('src/scss/app.scss')
        .pipe(sass())
        .pipe(dest('build/css'));
}

function compilar(){
    watch('src/scss/**/*.scss', css);
}

function imagenes(){
    return src('src/img/**.*{png,jpg}')
        .pipe(imagemin({optimizationLevel:3}))
        .pipe(dest('build/img'))
}

function versionWebp(){

    const opciones = {
        quality: 50
    }

    return src('src/img/**/*.{png,jpg}')
        .pipe(webp (opciones))
        .pipe(dest ('build/img'))
}

function versionAvif(){

    const opciones = {
        quality: 50
    }

    return src('src/img/**/*.{png,jpg}')
        .pipe(avif (opciones))
        .pipe(dest ('build/img'))
}

exports.css = css;
exports.compilar = compilar;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.imagenes = imagenes;
exports.default = series(css, versionWebp, versionAvif, compilar);