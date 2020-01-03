var noti = {
    main: function () {
        toastr.options = {
            closeButton: true,
            debug: false,
            progressBar: true,
            positionClass: 'toast-bottom-right',
            onclick: null,
            showDuration: '400',
            hideDuration: '1000',
            timeOut: '8000',
            extendedTimeOut: '1500',
            showEasing: 'swing',
            hideEasing: 'linear',
            showMethod: 'fadeIn',
            hideMethod: 'fadeOut'
        }
    },
    clear: function () {
        toastr.clear()
    },
    success: function (c) {
        return this.clear(), toastr.success(c)
    },
    info: function (c) {
        return this.clear(), toastr.info(c)
    },
    warning: function (c) {
        return this.clear(), toastr.warning(c)
    },
    error: function (c) {
        return this.clear(), toastr.error(c)
    }
};

var init = {
    getBW: function (c, a, f) {
        var q = c.split(a);
        return q[1] ? (q = q[1].split(f), q[0]) : 0
    },
    addZero: function (c) {
        return 10 > c && (c = '0' + c), c
    },
    replace_JSON: function (c) {
        return JSON.parse(c.toString())
    },
    validate_RegEx: function (c) {
        return c.replace(/(\\|\.|\[|\]|\{|\}|\(|\)|\*|\+|\?|\^|\$|\|)/g, '\\$1')
    },
    randomString: function (c) {
        for (var a = 'abcdefghijklmnoprstuvyzxABCDEFGHIJKLMNOPRSTUVYZX0123456789', f = '', q = 0; c > q; q++) {
            f += a[init.randomInt(a.length)]
        };
        return f
    },
    randomNumber: function (c) {
        for (var a = '0123456789', f = '', q = 0; c > q; q++) {
            f += a[init.randomInt(a.length)]
        };
        return f
    },
    randomText: function (c) {
        for (var a = 'abcdefghijklmnoprstuvyzxABCDEFGHIJKLMNOPRSTUVYZX', f = '', q = 0; c > q; q++) {
            f += a[init.randomInt(a.length)]
        };
        return f
    },
    spinText: function (c) {
        var a = c.match(/{([^{}]*)}/g);
        if (!a) {
            return c
        };
        for (i in a) {
            spin = a[i], ori_spin = spin, spin = spin.replace('{', '').replace('}', ''), spin_strs = spin.split('|'), c = c.replace(ori_spin, spin_strs[init.randomInt(spin_strs.length)])
        };
        return init.spinText(c)
    },
    number_format: function (c, a, f, q) {
        c = (c + '').replace(/[^0-9+\-Ee.]/g, '');
        var g = isFinite(+c) ? +c : 0,
            j = isFinite(+a) ? Math.abs(a) : 0,
            l = 'undefined' == typeof q ? ',' : q,
            h = 'undefined' == typeof f ? '.' : f,
            b = '',
            m = function (c, a) {
                var f = Math.pow(10, a);
                return '' + (Math.round(c * f) / f).toFixed(a)
            };
        return b = (j ? m(g, j) : '' + Math.round(g)).split('.'), b[0].length > 3 && (b[0] = b[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, l)), (b[1] || '').length < j && (b[1] = b[1] || '', b[1] += new Array(j - b[1].length + 1).join('0')), b.join(h)
    },
    toJSON: function (c) {
        var a = new Object;
        return a.gid = c.gid, a.gname = c.gname, a.members = c.members, a
    },
    randomInt: function (c) {
        return Math.floor(Math.random() * c)
    },
    timeNow: function () {
        var c = new Date,
            a = init.addZero(c.getDate()),
            f = init.addZero(c.getMonth() + 1),
            q = init.addZero(c.getFullYear()),
            g = init.addZero(c.getHours()),
            j = init.addZero(c.getMinutes()),
            l = init.addZero(c.getSeconds());
        return a + '/' + f + '/' + q + ' - ' + g + ':' + j + ':' + l
    },
    formatTime: function (c) {
        var a = new Date(1e3 * c),
            f = Math.floor((a - new Date(0)) / 864e5),
            q = a.getUTCHours() + 24 * f,
            g = a.getUTCMinutes(),
            j = a.getSeconds();
        return 10 > q && (q = '0' + q), 10 > g && (g = '0' + g), 10 > j && (j = '0' + j), q + ':' + g + ':' + j
    },
    page: function (page, callback) {
        $(".dungqb").load("pages/" + page + ".html", function (response, status, request) {
            console.log("load page success: " + page + ".html");
            callback();
        });
    },
    dataTables: function () {
        $('.editable').dataTable({
            responsive: !0,
            dom: 'T<\"clear\">lfrtip',
            bLengthChange: !1,
            bInfo: !1,
            bPaginate: !1,
            language: {
                sSearch: 'Từ kh༺: ',
                sZeroRecords: 'Không có kết quả phù hợp'
            },
            tableTools: {
                sSwfPath: '/files/swf/dataTables.swf'
            }
        })
    },
};

$.fn.extend({
    disabled: function () {
        return this.attr('disabled', 'disabled').addClass('disabled')
    },
    undisabled: function () {
        return this.removeAttr('disabled').removeClass('disabled')
    },
    buttonLoad: function () {
        return this.addClass('m-progress').disabled()
    },
    buttonStop: function () {
        return this.removeClass('m-progress').undisabled()
    },
    validate: function () {
        return '' == $.trim(this.val()) ? (noti.error('Vui lòng điền đầy đủ nội dung !'), !1) : $.trim(this.val())
    },
    isNumber: function () {
        return $.isNumeric(this.validate()) ? parseInt($.trim(this.validate())) : (noti.error('Vui lòng nhập đúng định dạng dữ liệu !'), !1)
    },
    thisSelect: function () {
        return this.click(function () {
            this.select()
        })
    },
    onEnter: function (c) {
        this.keypress(function (a) {
            13 == a.which && c()
        })
    }
});

function setup() { 
    noti.main();
    //check login
    if (!localStorage.getItem("token") && location.href.indexOf("login.html") < 0) {
        location.replace("pages/login.html");
    }
    //set avatar & name
    if (localStorage.getItem("user")) {
        USER = JSON.parse(localStorage.getItem("user"));
        $(".data-user-name").text(USER.name);
        $(".data-user-username").text(USER.username);
        $(".username-text").val(USER.username);
        $(".data-user-email").text(USER.email)
        $(".data-user-phone").text(USER.phone ? USER.phone : "0123456789");
        $(".data-user-coin").text(USER.coin);
        $(".img-avatar").attr("src", "https://graph.facebook.com/" + USER.username + "/picture?width=150&height=150");
    }
}

$(document).ready(function () {
    //logout
    $(".logout").click(function () { 
        localStorage.clear();
        location.replace("pages/login.html");
    });
    //open page from sidebar
    $(".open-page").click(function () {
        var page = $(this).attr("page");
        init.page(page, function () { 
            setup();
            console.log(USER);
        });
    });
});

// GLOBAL VAR
var SITE_URL = "http://thanhdungqb.com/metech/bSocial-Frontend";
var API_URL = "http://dev.dungqb.net/api";
var API = {
    login: API_URL + "/users/register-with-fb",
}
var USER = {};
var http = {
    getApi: function (url, callback) { 
        $.ajax({
            type: "GET",
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
            },
            url: url,
            processData: false,
            success: function (result) {
                callback(result, true);
            },
            error : function (err) { 
                callback(err, false);
            }
        });
    },
    postApi : function (url, data, callback) {
        $.ajax({
            type: "POST",
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
            },
            url: url,
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json',
            processData: false,
            success: function (result) {
                callback(result, true);
            },
            error: function (err) {
                callback(err, false);
            }
        });
    },
    putApi: function (url, data, callback) {
        $.ajax({
            type: "PUT",
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
            },
            url: url,
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json',
            processData: false,
            success: function (result) {
                callback(result, true);
            },
            error: function (err) {
                callback(err, false);
            }
        });
    }
}

init.page("home", function () {  });
// setup();