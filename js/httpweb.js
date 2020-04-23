
class Http {
    constructor() {
    }
    Get(data, url, successFunc, errorFunc) {
        console.log(url);
        $.ajax({
            url: url,
            type: "get",
            data: data,
            success: successFunc,
            error: function (e) {
                alert("访问出现问题了");
                errorFunc(e);
            }
        });
    }

    Post(data, url, successFunc, errorFunc) {
        console.log(url);
        $.ajax({
            url: url,
            type: "post",
            data: data,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: successFunc,
            error: function (e) {
                alert("访问出现问题了");
                errorFunc(e);
            }
        });
    }

    GetTest(item, header, url, successFunc, errorFunc) {
        console.log(url);
        var parametes = ""
        item.parametes.forEach((element, index) => {
            if (element.isCheck) {
                parametes += element.key + "=" + element.exampleValue
                if (index < item.parametes.length - 1) {
                    parametes += "&"
                }
            }
        });

        $.ajax({
            url: url + item.url,
            type: "get",
            data: parametes,
            headers: header,
            success: successFunc,
            error: function (e) {
                errorFunc(e);
            }
        });
    }

    PostTest(item, header, url, successFunc, errorFunc) {

        var parametes = {}
        item.parametes.forEach(element => {
            if (element.isCheck) {
                parametes[element.key] = element.exampleValue
            }
        });

        var requestUrl = url + item.url
        console.log(requestUrl);
        $.ajax({
            url: requestUrl,
            type: "post",
            data: JSON.stringify(parametes),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            headers: header,
            success: successFunc,
            error: function (e) {
                errorFunc(e);
            }
        });
    }

    url() {
        return {
            LIST_JSON: "listConfig.json"
        };
    }
}