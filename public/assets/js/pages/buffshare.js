$(document).ready(function () {
    getInfoMe();

    $(".checkbox input").click(function () {
        if ($(this).is(':checked')) {
            $(this).parent().find("i").show()
        } else {
            $(this).parent().find("i").hide()
        }
    })

    $("#buffshare").click(function () {
        $(this).buttonLoad();
        var postid = $("#postid").val();
        if (postid == "") {
            swal("Lỗi", "Vui lòng nhập link hoặc id bài viết cần tăng", "error");
            return;
        }
        var post = {
            object_id: postid,
            number: $("#number-share").val(),
            minspeed: 1,
            maxspeed: 3,
            mindelay: 1,
            maxdelay: 5,
            user_id: 20,
        }
        console.log(post);
        http.postApi(API_URL + "/share", post, function (data, status) {
            console.log(data);
            if (status) {
                swal("Thành công", "Tăng share thành công, share sẽ tăng trong giây lát", "success");
                getInfoMe();
                $("#buffshare").buttonStop();
            } else {
                swal("Lỗi", data.responseJSON.message, "error");
                $("#buffshare").buttonStop();
            }
        });
    })

    $(".buyshare").click(function () {
        $(this).buttonLoad();
        var data = $(this).attr("data");
        console.log(data);
        if (confirm("Bạn có chắc chắn mua thêm " + init.number_format(data) + " lượt shares?")) {
            http.postApi(API_URL + "/share/buy", {
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

    //trans share
    $("#trans-share").click(function () {
        $(this).buttonLoad();
        var username = $("#username-trans").val();
        var number = $("#number-share-trans").val();
        if (!confirm("Bạn có chắc chuyển " + init.number_format(number) + " lượt shares cho tài khoản: " + username + "?")) {
            return;
        }
        http.postApi(API_URL + "/share/transaction", {
            quantity: number,
            to_user: username
        }, function (result, status) {
            console.log(result);
            if (status) {
                swal("Thành công", "Chuyển thành công " + init.number_format(number) + " lượt shares cho người dùng " + username, "success");
                getInfoMe();
                $("#trans-share").buttonStop();
            } else {
                swal("Lỗi", "Số share trong tài khoản của bạn không đủ", "error");
                $("#trans-share").buttonStop();
            }
        })
    })
});

var logs = {
    get: function (tblLogs) {
        http.getApi(API_URL + "/logs?page=1&limit=200&fb_id=&object_id=&type=share", function (data) {
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
        console.log(data.data.shares.total_share);
        $(".data-user-shares").html(init.number_format(data.data.shares.total_share));
        $(".data-user-coin").html(init.number_format(data.data.coin));
    });
}