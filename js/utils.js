class Utils {
    constructor() {

    }

    getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }

    // 格式方法
    // 公共方法
    transitionJsonToString(jsonObj) {
        // 转换后的jsonObj受体对象
        var _jsonObj = null;
        // 判断传入的jsonObj对象是不是字符串，如果是字符串需要先转换为对象，再转换为字符串，这样做是为了保证转换后的字符串为双引号
        if (Object.prototype.toString.call(jsonObj) !== "[object String]") {
            _jsonObj = JSON.stringify(jsonObj);
        } else {
            jsonObj = jsonObj.replace(/(\')/g, '\"');
            _jsonObj = JSON.stringify(JSON.parse(jsonObj));
        }
        return _jsonObj;
    }
    // callback为数据格式化错误的时候处理函数
    formatJson(jsonObj) {
        // 正则表达式匹配规则变量
        var reg = null;
        // 转换后的字符串变量
        var formatted = '';
        // 换行缩进位数
        var pad = 0;
        // 一个tab对应空格位数
        var PADDING = '    ';
        // json对象转换为字符串变量
        var jsonString = this.transitionJsonToString(jsonObj);
        if (!jsonString) {
            return jsonString;
        }
        // 存储需要特殊处理的字符串段
        var _index = [];
        // 存储需要特殊处理的“再数组中的开始位置变量索引
        var _indexStart = null;
        // 存储需要特殊处理的“再数组中的结束位置变量索引
        var _indexEnd = null;
        // 将jsonString字符串内容通过\r\n符分割成数组
        var jsonArray = [];
        // 正则匹配到{,}符号则在两边添加回车换行
        jsonString = jsonString.replace(/([\{\}])/g, '\r\n$1\r\n');
        // 正则匹配到[,]符号则在两边添加回车换行
        jsonString = jsonString.replace(/([\[\]])/g, '\r\n$1\r\n');
        // 正则匹配到,符号则在两边添加回车换行
        jsonString = jsonString.replace(/(\,)/g, '$1\r\n');
        // 正则匹配到要超过一行的换行需要改为一行
        jsonString = jsonString.replace(/(\r\n\r\n)/g, '\r\n');
        // 正则匹配到单独处于一行的,符号时需要去掉换行，将,置于同行
        jsonString = jsonString.replace(/\r\n\,/g, ',');
        // 特殊处理双引号中的内容
        jsonArray = jsonString.split('\r\n');
        jsonArray.forEach(function (node, index) {
            // 获取当前字符串段中"的数量
            var num = node.match(/\"/g) ? node.match(/\"/g).length : 0;
            // 判断num是否为奇数来确定是否需要特殊处理
            if (num % 2 && !_indexStart) {
                _indexStart = index
            }
            if (num % 2 && _indexStart && _indexStart != index) {
                _indexEnd = index
            }
            // 将需要特殊处理的字符串段的其实位置和结束位置信息存入，并对应重置开始时和结束变量
            if (_indexStart && _indexEnd) {
                _index.push({
                    start: _indexStart,
                    end: _indexEnd
                })
                _indexStart = null
                _indexEnd = null
            }
        })
        // 开始处理双引号中的内容，将多余的"去除
        _index.reverse().forEach(function (item, index) {
            var newArray = jsonArray.slice(item.start, item.end + 1)
            jsonArray.splice(item.start, item.end + 1 - item.start, newArray.join(''))
        })
        // 奖处理后的数组通过\r\n连接符重组为字符串
        jsonString = jsonArray.join('\r\n');
        // 将匹配到:后为回车换行加大括号替换为冒号加大括号
        jsonString = jsonString.replace(/\:\r\n\{/g, ':{');
        // 将匹配到:后为回车换行加中括号替换为冒号加中括号
        jsonString = jsonString.replace(/\:\r\n\[/g, ':[');
        // 将上述转换后的字符串再次以\r\n分割成数组
        jsonArray = jsonString.split('\r\n');
        // 将转换完成的字符串根据PADDING值来组合成最终的形态
        jsonArray.forEach(function (item, index) {
            var i = 0;
            // 表示缩进的位数，以tab作为计数单位
            var indent = 0;
            // 表示缩进的位数，以空格作为计数单位
            var padding = '';
            if (item.match(/\{$/) || item.match(/\[$/)) {
                // 匹配到以{和[结尾的时候indent加1
                indent += 1
            } else if (item.match(/\}$/) || item.match(/\]$/) || item.match(/\},$/) || item.match(/\],$/)) {
                // 匹配到以}和]结尾的时候indent减1
                if (pad !== 0) {
                    pad -= 1
                }
            } else {
                indent = 0
            }
            for (i = 0; i < pad; i++) {
                padding += PADDING
            }
            // if ((item == "{" || item == "}" || item == "[" || item == "]") && item.length == 1) {
            //     item = "<b>" + item + "</b>"
            // } else if (item.length > 0) {
            //     console.log(item)
            // }
            formatted += padding + item + '\n\r'
            pad += indent
        })
        // 返回的数据需要去除两边的空格
        return formatted.trim();
    }

    formatJson2(json, options) {
        var reg = null,
            formatted = '',
            pad = 0,
            PADDING = '    ';
        options = options || {};
        options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
        options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;
        if (typeof json !== 'string') {
            json = JSON.stringify(json);
        } else {
            json = JSON.parse(json);
            json = JSON.stringify(json);
        }
        reg = /([\{\}])/g;
        json = json.replace(reg, '\r\n$1\r\n');
        reg = /([\[\]])/g;
        json = json.replace(reg, '\r\n$1\r\n');
        reg = /(\,)/g;
        json = json.replace(reg, '$1\r\n');
        reg = /(\r\n\r\n)/g;
        json = json.replace(reg, '\r\n');
        reg = /\r\n\,/g;
        json = json.replace(reg, ',');
        if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
            reg = /\:\r\n\{/g;
            json = json.replace(reg, ':{');
            reg = /\:\r\n\[/g;
            json = json.replace(reg, ':[');
        }
        if (options.spaceAfterColon) {
            reg = /\:/g;
            json = json.replace(reg, ':');
        }
        (json.split('\r\n')).forEach(function (node, index) {
            //console.log(node);
            var i = 0,
                indent = 0,
                padding = '';

            if (node.match(/\{$/) || node.match(/\[$/)) {
                indent = 1;
            } else if (node.match(/\}/) || node.match(/\]/)) {
                if (pad !== 0) {
                    pad -= 1;
                }
            } else {
                indent = 0;
            }

            for (i = 0; i < pad; i++) {
                padding += PADDING;
            }

            formatted += padding + node + '\r\n';
            pad += indent;
        });
        return formatted;
    };
    //引用示例部分
    //(1)创建json格式或者从后台拿到对应的json格式
    //var originalJson = {"name": "binginsist", "sex": "男", "age": "25"};
    //下面用一个真实的json数据做测试
    //var originalJson = {
    //    "_errmsg":"ok",
    //    "result":[
    //    ],
    //    "stat":"wechat",
    //    "_token":"",
    //    "weixinId":"900504",
    //    "_errcode":"0",
    //    "regionId":"00000000"
    //}
    //
    //(2)调用formatJson函数,将json格式进行格式化
    //var resultJson = formatJson(originalJson);
    ////(3)将格式化好后的json写入页面中
    //document.getElementById("writePlace").innerHTML = '<pre>' +resultJson + '<pre/>';

    //着色
    IsArray(obj) {
        return obj &&
            typeof obj === 'object' && typeof obj.length === 'number' && !(obj.propertyIsEnumerable('length'));
    }

    ProcessObject(obj, indent, addComma, isArray, isPropertyContent) {
        var html = "";
        var comma = (addComma) ? "<span class='Comma'>,</span> " : "";
        var type = typeof obj;
        if (this.IsArray(obj)) {
            if (obj.length == 0) {
                html += this.GetRow(indent, "<span class='ArrayBrace'>[ ]</span>" + comma, isPropertyContent);
            } else {
                html += this.GetRow(indent, "<span class='ArrayBrace'>[</span>", isPropertyContent);
                for (var i = 0; i < obj.length; i++) {
                    html += this.ProcessObject(obj[i], indent + 1, i < (obj.length - 1), true, false);
                }
                html += this.GetRow(indent, "<span class='ArrayBrace'>]</span>" + comma);
            }
        } else {
            if (type == "object" && obj == null) {
                html += this.FormatLiteral("null", "", comma, indent, isArray, "Null");
            } else {
                if (type == "object") {
                    var numProps = 0;
                    for (var prop in obj) {
                        numProps++;
                    }
                    if (numProps == 0) {
                        html += this.GetRow(indent, "<span class='ObjectBrace'>{ }</span>" + comma, isPropertyContent)
                    } else {
                        html += this.GetRow(indent, "<span class='ObjectBrace'>{</span>", isPropertyContent);
                        var j = 0;
                        for (var prop in obj) {
                            html += this.GetRow(indent + 1, '<span class="PropertyName">"' + prop + '"</span>: ' + this.ProcessObject(obj[prop], indent + 1, ++j < numProps, false, true))
                        }
                        html += this.GetRow(indent, "<span class='ObjectBrace'>}</span>" + comma);
                    }
                } else {
                    if (type == "number") {
                        html += this.FormatLiteral(obj, "", comma, indent, isArray, "Number");
                    } else {
                        if (type == "boolean") {
                            html += this.FormatLiteral(obj, "", comma, indent, isArray, "Boolean");
                        } else {
                            if (type == "function") {
                                obj = this.FormatFunction(indent, obj);
                                html += this.FormatLiteral(obj, "", comma, indent, isArray, "Function");
                            } else {
                                if (type == "undefined") {
                                    html += this.FormatLiteral("undefined", "", comma, indent, isArray, "Null");
                                } else {
                                    html += this.FormatLiteral(obj, '"', comma, indent, isArray, "String");
                                }
                            }
                        }
                    }
                }
            }
        }
        return html;
    };

    FormatLiteral(literal, quote, comma, indent, isArray, style) {
        if (typeof literal == "string") {
            literal = literal.split("<").join("&lt;").split(">").join("&gt;");
        }
        var str = "<span class='" + style + "'>" + quote + literal + quote + comma + "</span>";
        if (isArray) {
            str = this.GetRow(indent, str);
        }
        return str;
    }
    FormatFunction(indent, obj) {
        var tabs = "";
        for (var i = 0; i < indent; i++) {
            tabs += "    ";
        }
        var funcStrArray = obj.toString().split("\n");
        var str = "";
        for (var i = 0; i < funcStrArray.length; i++) {
            str += ((i == 0) ? "" : tabs) + funcStrArray[i] + "\n";
        }
        return str;
    }
    GetRow(indent, data, isPropertyContent) {
        var tabs = "";
        for (var i = 0; i < indent && !isPropertyContent; i++) {
            tabs += "    ";
        }
        if (data != null && data.length > 0 && data.charAt(data.length - 1) != "\n") {
            data = data + "\n";
        }
        return tabs + data;
    };


    cloneObj(obj) {
        var newObj = {};
        if (obj instanceof Array) {
            newObj = [];
        }
        for (var key in obj) {
            var val = obj[key];
            //newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; //arguments.callee 在哪一个函数中运行，它就代表哪个函数, 一般用在匿名函数中。  
            newObj[key] = typeof val === 'object' ? this.cloneObj(val) : val;
        }
        return newObj;
    };

}