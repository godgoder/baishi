function ajax(options) {
    //->init parameters
    var _default = {
        url: null,
        type: 'GET',
        dataType: 'JSON',
        async: true,
        cache: true,
        data: null,
        success: null
    };
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            _default[key] = options[key];
        }
    }

    //->SEND AJAX
    var xhr = new XMLHttpRequest;
    if (_default.type.toUpperCase() === 'GET' && _default.cache === false) {
        _default.url.indexOf('?') > -1 ? _default.url += '&' : _default.url += '?';
        _default.url += "_=" + Math.random();
    }
    xhr.open(_default.type, _default.url, _default.async);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
            var dataType = _default.dataType.toUpperCase(),
                value = xhr.responseText;
            switch (dataType) {
                case 'JSON':
                    value = 'JSON' in  window ? JSON.parse(value) : eval('(' + value + ')');
                    break;
                case 'TXT':
                    break;
                case 'XML':
                    value = xhr.responseXML;
                    break;
            }
            _default.success && _default.success.call(xhr, value);
        }
    };
    xhr.send(_default.data);
}