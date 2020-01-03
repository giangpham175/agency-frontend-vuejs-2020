$(document).ready(function () {
    getInfoMe();

    $(".checkbox input").click(function () {
        if ($(this).is(':checked')) {
            $(this).parent().find("i").show()
        }else{
            $(this).parent().find("i").hide()
        }
    })

    $("#bufflike").click(function () {
        $(this).buttonLoad();
        var postid = $("#postid").val();
        if (postid == "") {
            swal("Lỗi", "Vui lòng nhập link hoặc id bài viết cần tăng", "error");
            return;
        }
        var list_reaction = "";
        $(".checkbox input").each(function () {
            if ($(this).is(':checked')) {
                console.log(this.value)
                list_reaction += this.value + ",";
            }
        });
        if (list_reaction == "") {
            noti.error("Vui lòng chọn cảm xúc cần buff");
            return;
        }
        var post = {
            object_id: postid,
            number: $("#number-like").val(),
            reaction: list_reaction,
            minspeed: 1,
            maxspeed: 3,
            mindelay: 1,
            maxdelay: 5,
            user_id: 20,
        }
        console.log(post);
        http.postApi(API_URL + "/like", post, function (data, status) { 
            console.log(data);
            if (status) {
                swal("Thành công", "Tăng like thành công, like sẽ tăng trong giây lát", "success");
                getInfoMe();
                $("#bufflike").buttonStop();
            }else{
                swal("Lỗi", data.responseJSON.message, "error");
                $("#bufflike").buttonStop();
            }
        });
    })

    $(".buylike").click(function () { 
        $(this).buttonLoad();
        var data = $(this).attr("data");
        console.log(data);
        if (confirm("Bạn có chắc chắn mua thêm " + init.number_format(data * 1000) + " lượt likes?")) {
            http.postApi(API_URL + "/like/buy", {
                quantity: data * 1000
            }, function (result, status) { 
                console.log(result);
                if (status) {
                    swal("Thành công", "Mua thành công " + init.number_format(data * 1000) + " lượt tăng likes", "success");
                    getInfoMe();
                    $(".buylike").buttonStop();
                }else{
                    swal("Lỗi", result.responseJSON.message, "error");
                    $(".buylike").buttonStop();
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

    //trans like
    $("#trans-like").click(function () { 
        $(this).buttonLoad();
        var username = $("#username-trans").val();
        var number = $("#number-like-trans").val();
        if (!confirm("Bạn có chắc chuyển " + init.number_format(number) + " lượt likes cho tài khoản: " + username + "?")) {
            return;
        }
        http.postApi(API_URL + "/like/transaction", {
            quantity: number,
            to_user: username
        },function (result, status) { 
            console.log(result);
            if (status) {
                swal("Thành công", "Chuyển thành công " + init.number_format(number) + " lượt likes cho người dùng " + username, "success");
                getInfoMe();
                $("#trans-like").buttonStop();
            } else {
                swal("Lỗi", "Số like trong tài khoản của bạn không đủ", "error");
                $("#trans-like").buttonStop();
            }
        })
    })
});

var logs = {
    get: function (tblLogs) {
        http.getApi(API_URL + "/logs?page=1&limit=200&fb_id=&object_id=&type=like", function (data) { 
            if (data.status != 200) {
                noti.error("Không tìm được nhật ký bài viết");
                return;
            }
            tblLogs.clear();
            data.data.forEach(function (log, index) {
                    tblLogs.row.add([
                        index+1,
                        log.object_id,
                        log.fb_id,
                        log.number,
                        log.reactions,
                        log.start_like,
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
        console.log(data.data.likes.total_like);
        $(".data-user-likes").html(init.number_format(data.data.likes.total_like));
        $(".data-user-coin").html(init.number_format(data.data.coin));
    });
}