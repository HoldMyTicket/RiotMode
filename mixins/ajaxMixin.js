var ajaxMixin = {
    ajaxGet: function (url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', encodeURI(url));
        xhr.onload = function () {
            cb(xhr.responseText);
        };
        xhr.send();
    }
}    