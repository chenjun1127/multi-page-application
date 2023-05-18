var filename = location.pathname.split('/').pop();
var str = filename.replace(/.html/g, '');
document.querySelector('body').append(str.toLocaleUpperCase());