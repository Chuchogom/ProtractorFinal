
exports.getIndex = function (typeIndex) {

    var date = new Date();

    var day = date.getDate();

    var month = date.getMonth() + 1;

    var year = date.getFullYear();

    var hour = date.getHours();

    var minute = date.getMinutes();

    var second = date.getSeconds();

    var millisecond = date.getMilliseconds();

    var index;

    if (day < 10) {

        day = '0' + day;

    }
    if (month < 10) {

        month = '0' + month;

    }

    if (hour < 10) {

        hour = '0' + hour;

    }

    if (minute < 10) {

        minute = '0' + minute;

    }

    if (second < 10) {

        second = '0' + second;

    }

    if (millisecond < 10) { millisecond = '000' + millisecond }

    if (millisecond >= 10 && millisecond < 100) { millisecond = '00' + millisecond }

    if (millisecond >= 100) { millisecond = '0' + millisecond }


    if (typeIndex == 0)

        index = day + "-" + month + "-" + year + "-" + hour + "-" + minute + "-" + second + "-" + millisecond;

    else

        index = day + "/" + month + "/" + year + "   " + hour + ":" + minute + ":" + second;

    return index;

}
