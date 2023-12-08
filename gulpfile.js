const {src, dest, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function css(){
    return src('src/scss/app.scss')
        .pipe(sass())
        .pipe(dest('build/css'));
}

function compilar(){
    watch('src/scss/**/*.scss', css);
}

exports.css = css;
exports.compilar = compilar;