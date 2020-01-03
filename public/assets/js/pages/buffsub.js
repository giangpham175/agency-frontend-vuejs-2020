$(document).ready(function () {
    getInfoMe();

    $(".checkbox input").click(function () {
        if ($(this).is(':checked')) {
            $(this).parent().find("i").show()
        } else {
            $(this).parent().find("i").hide()
        }
    })

    $("#buffsub").click(function () {
        $(this).buttonLoad();
        var postid = $("#postid").val();
        if (postid == "") {
            swal("Lỗi", "Vui lòng nhập link hoặc id bài viết cần tăng", "error");
            return;
        }
        var post = {
            object_id: postid,
            number: $("#number-sub").val(),
        }
        console.log(post);
        http.postApi(API_URL + "/follow", post, function (data, status) {
            console.log(data);
            if (status) {
                swal("Thành công", "Tăng sub thành công, sub sẽ tăng trong giây lát", "success");
                getInfoMe();
                $("#buffsub").buttonStop();
            } else {
                swal("Lỗi", data.responseJSON.message.error, "error");
                $("#buffsub").buttonStop();
            }
        });
    })

    $(".buyshare").click(function () {
        $(this).buttonLoad();
        var data = $(this).attr("data");
        console.log(data);
        if (confirm("Bạn có chắc chắn mua thêm " + init.number_format(data) + " lượt shares?")) {
            http.postApi(API_URL + "/follow/buy", {
                quantity: data
            }, function (result, status) {
                console.log(result);
                if (status) {
                    swal("Thành công", "Mua thành công " + init.number_format(data) + " lượt tăng shares", "success");
                    getInfoMe();
                    $(".buyshare").buttonStop();
                } else {
                    swal("Lỗi", result.responseJSON.message, "error");
                    $(".buyshare").buttonStop();
                }
            })
        }
    });

    // logs
    var tblLogs = $('#table-logs').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        "iDisplayLength": 50
    });
    $("#getLogs").click(function () {
        logs.get(tblLogs);
    })

    //trans sub
    $("#trans-sub").click(function () {
        $(this).buttonLoad();
        var username = $("#username-trans").val();
        var number = $("#number-sub-trans").val();
        if (!confirm("Bạn có chắc chuyển " + init.number_format(number) + " lượt shares cho tài khoản: " + username + "?")) {
            return;
        }
        http.postApi(API_URL + "/follow/transaction", {
            quantity: number,
            to_user: username
        }, function (result, status) {
            console.log(result);
            if (status) {
                swal("Thành công", "Chuyển thành công " + init.number_format(number) + " lượt shares cho người dùng " + username, "success");
                getInfoMe();
                $("#trans-sub").buttonStop();
            } else {
                swal("Lỗi", "Số sub trong tài khoản của bạn không đủ", "error");
                $("#trans-sub").buttonStop();
            }
        })
    })
});

var logs = {
    get: function (tblLogs) {
        http.getApi(API_URL + "/logs?page=1&limit=200&fb_id=&object_id=&type=sub", function (data) {
            if (data.status != 200) {
                noti.error("Không tìm được nhật ký bài viết");
                return;
            }
            tblLogs.clear();
            data.data.forEach(function (log, index) {
                tblLogs.row.add([
                    index + 1,
                    log.object_id,
                    log.fb_id,
                    log.number,
                    log.reactions,
                    log.start_share,
                    log.status == 1 ? "<span class='badge badge-pill badge-success'>Thành công</span>" : "<span class='badge badge-pill badge-danger'>Thất bại</span>",
                    moment(log.updatedAt).fromNow()
                ]).draw();
            });
        });
    }
}

moment.locale("vi");

function getInfoMe() {
    http.getApi(API_URL + "/me", function (data) {
        console.log(data.data);
        console.log(data.data.follows.total_follows);
        $(".data-user-sub").html(init.number_format(data.data.follows.total_follows));
        $(".data-user-coin").html(init.number_format(data.data.coin));
    });
}