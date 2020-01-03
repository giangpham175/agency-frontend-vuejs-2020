$(document).ready(function () {
    getInfoMe();

    $("#buff-comment").click(function () {
        var listComment = $("#list-comment").validate();
        var postid = $("#postid").validate();
        var location = $("#locations").val();
        var gender = $("#gender").val();
        var minDelay = $("#min-delay").validate();
        var maxDelay = $("#max-delay").validate();
        var minAge = $("#min-age").validate();
        var maxAge = $("#max-age").validate();
        if (!listComment || !postid || !location || !gender || !minDelay || !maxDelay || !minAge || !maxAge) {
            return;
        }
        $(this).buttonLoad();
        var post = {
            object_id: postid,
            minspeed: 1,
            maxspeed: 1,
            mindelay: minDelay,
            maxdelay: maxDelay,
            "data.age_start": minAge,
            "data.age_end": maxAge,
            "data.gender": gender == "all" ? null : gender,
            locations: location == "all" ? null : location,
            mess: listComment.split("\n")
        };
        console.log(post);
        http.postApi(API_URL + "/comment", post, function (data, status) { 
            console.log(data);
            if (status) {
                swal("Thành công", "Tăng comment thành công, comment sẽ tăng trong giây lát", "success");
                getInfoMe();
                $("#buffcomment").buttonStop();
            }else{
                swal("Lỗi", data.responseJSON.message, "error");
                $("#buff-comment").buttonStop();
            }
        });
    })

    $(".buycomment").click(function () { 
        $(this).buttonLoad();
        var data = $(this).attr("data");
        console.log(data);
        if (confirm("Bạn có chắc chắn mua thêm " + init.number_format(data) + " lượt comments?")) {
            http.postApi(API_URL + "/comment/buy", {
                quantity: data
            }, function (result, status) { 
                console.log(result);
                if (status) {
                    swal("Thành công", "Mua thành công " + init.number_format(data) + " lượt tăng comments", "success");
                    getInfoMe();
                    $(".buycomment").buttonStop();
                }else{
                    swal("Lỗi", result.responseJSON.message, "error");
                    $(".buycomment").buttonStop();
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
    });


    //trans comment
    $("#trans-comment").click(function () {
        $(this).buttonLoad();
        var username = $("#username-trans").val();
        var number = $("#number-comment-trans").val();
        if (!confirm("Bạn có chắc chuyển " + init.number_format(number) + " lượt comments cho tài khoản: " + username + "?")) {
            return;
        }
        http.postApi(API_URL + "/comment/transaction", {
            quantity: number,
            to_user: username
        }, function (result, status) {
            console.log(result);
            if (status) {
                swal("Thành công", "Chuyển thành công " + init.number_format(number) + " lượt comments cho người dùng " + username, "success");
                getInfoMe();
                $("#trans-comment").buttonStop();
            } else {
                swal("Lỗi", "Số comment trong tài khoản của bạn không đủ", "error");
                $("#trans-comment").buttonStop();
            }
        })
    })
});


var comment = {
    getLocations : function () {
        http.getApi(API_URL + "/list/location", function (data) { 
            
            if (data.status != 200) {
                alert("Không tìm được danh sách nơi ở của người comment, vui lòng thử lại");
                return;
            }
            var list = '<option value="all">Tất cả</option>';
            data.data.forEach(function (location) { 
                list += '<option value="' + location.name + '">' + location.name + '</option>';
            });
            $("#locations").html(list);
            $("#locations").select2();
        })
    }
}
comment.getLocations();
moment.locale("vi");

var logs = {
    get: function (tblLogs) {
        http.getApi("http://dev.dungqb.net/api/logs?page=1&limit=200&fb_id=&object_id=&type=comment", function (data) { 
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
                    log.mess.length,
                    log.mess.toString(),
                    log.status == 1 ? "<span class='badge badge-pill badge-success'>Thành công</span>" : "<span class='badge badge-pill badge-danger'>Thất bại</span>",
                    moment(log.updatedAt).fromNow()
                ]).draw();
            });
        });
    }
}
function getInfoMe() { 
    http.getApi(API_URL + "/me", function (data) { 
        console.log(data.data);
        console.log(data.data.comments.total_comment);
        $(".data-user-comments").html(init.number_format(data.data.comments.total_comment));
        $(".data-user-coin").html(init.number_format(data.data.coin));
    });
}