$(document).ready(function () {
    initPage.me();

    $(".checkbox input").click(function () {
        if ($(this).is(':checked')) {
            $(this).parent().find("i").show()
        } else {
            $(this).parent().find("i").hide()
        }
    })

    $("#create-vip").click(function () {
        var fbid = $("#fbid").validate();
        var numberLike = $("#number-like").validate();
        var speedLike = $("#speed-like").val();
        var vipMonth = $("#vip-month").val();
        var package_name = $("#package").val();
        var minLike = $("#min-like").val();
        var maxLike = $("#max-like").val();
        var list_reaction = "";
        $(".reaction-checkbox input").each(function () {
            if ($(this).is(':checked')) {
                console.log(this.value)
                list_reaction += this.value + ",";
            }
        });
        if (list_reaction == "") {
            noti.error("Vui lòng chọn cảm xúc cần buff");
            return;
        }
        if (!fbid || !numberLike || !speedLike || !vipMonth || !package_name || !minLike || !maxLike) {
            return;
        }
        if (speedLike == "sec") {
            speedLike = 1;
        } else if (speedLike == "minute") {
            speedLike = 60;
        } else if (speedLike == "hour") {
            speedLike = 60 * 60;
        }else{
            alert("Không lấy được thông số tốc độ like");
            return;
        }
        $(this).buttonLoad();
        var post = {
            fbid: fbid,
            vipMonth: vipMonth,
            package_name: package_name,
            reactions: list_reaction,
            minspeed: numberLike,
            maxspeed: Number(numberLike) + 1,
            mindelay: speedLike,
            maxdelay: speedLike+1,
            minlike: minLike,
            maxlike: maxLike
        }
        console.log(post);
        http.postApi(API_URL + "/vip-likes/buy", post, function (data, status) {
            console.log(data);
            if (status) {
                swal("Thành công", "Tạo mới gói vip like thành công, hệ thống sẽ xử lý sau vài phút", "success");
                initPage.me();
                $("#bufflike").buttonStop();
            } else {
                if (data.responseJSON.error) {
                    for (const key in data.responseJSON.error) {
                        if (data.responseJSON.error[key] == "The fbid has already been taken.") {
                            swal("Lỗi", "Người dùng này đã được tạo Vip, vui lòng sửa trong danh sách", "error");
                        }else{
                            swal("Lỗi", data.responseJSON.error[key], "error");
                        }
                    }
                }
                if (data.responseJSON.message != "") {
                    swal("Lỗi", data.responseJSON.message, "error");
                }
                $("#bufflike").buttonStop();
            }
        });
    });

    $("#saveEditVip").click(function () { 
        var fbid = $("#fbid-edit").validate();
        var numberLike = $("#number-like-edit").validate();
        var speedLike = $("#speed-like-edit").val();
        var minLike = $("#min-like-edit").val();
        var maxLike = $("#max-like-edit").val();
        var list_reaction = "";
        $(".reaction-checkbox-edit input").each(function () {
            if ($(this).is(':checked')) {
                console.log(this.value)
                list_reaction += this.value + ",";
            }
        });
        if (list_reaction == "") {
            noti.error("Vui lòng chọn cảm xúc cần buff");
            return;
        }
        if (!fbid || !numberLike || !speedLike || !minLike || !maxLike) {
            console.log("error value");
            return;
        }
        if (speedLike == "sec") {
            speedLike = 1;
        } else if (speedLike == "minute") {
            speedLike = 60;
        } else if (speedLike == "hour") {
            speedLike = 60 * 60;
        } else {
            alert("Không lấy được thông số tốc độ like");
            return;
        }
        $(this).buttonLoad();
        var post = {
            fbid: fbid,
            reactions: list_reaction,
            minspeed: numberLike,
            maxspeed: Number(numberLike) + 1,
            mindelay: speedLike,
            maxdelay: speedLike + 1,
            minlike: minLike,
            maxlike: maxLike
        }
        console.log(post);
        http.putApi(API_URL + "/vip-likes/" + fbid, post, function (data, status) {
            console.log(data);
            if (status) {
                swal("Thành công", "Cập nhật thành công", "success");
                initPage.me();
                initPage.listVips(tblVips);
                $("#saveEditVip").buttonStop();
            } else {
                if (data.responseJSON.error) {
                    for (const key in data.responseJSON.error) {
                        if (data.responseJSON.error[key] == "The fbid has already been taken.") {
                            swal("Lỗi", "Người dùng này đã được tạo Vip, vui lòng sửa trong danh sách", "error");
                        } else {
                            swal("Lỗi", data.responseJSON.error[key], "error");
                        }
                    }
                }
                if (data.responseJSON.message != "") {
                    swal("Lỗi", data.responseJSON.message, "error");
                }
                $("#saveEditVip").buttonStop();
            }
        });
    })

    // logs
    var tblLogs = $('#table-logs').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        "iDisplayLength": 50
    });
    // list vip
    var tblVips = $('#table-list-vips').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        "iDisplayLength": 50
    });
    $("#getLogs").click(function () {
        initPage.logs(tblLogs);
    });
    $("#getVips").click(function () {
        initPage.listVips(tblVips);
    });
    
    $(document).on('click', '.editVip', function (event) {
        var fbid = $(this).attr("fbid");
        $("#fbid-edit").val(fbid);
        console.log(fbid);
    });
});

var initPage = {
    logs: function (tblLogs) {
        http.getApi(API_URL + "/logs?page=1&limit=200&fb_id=&object_id=&type=like&buff_by=vips_likes", function (data) {
            if (data.status != 200) {
                noti.error("Không tìm được nhật ký bài viết");
                return;
            }
            tblLogs.clear();
            data.data.forEach(function (log, index) {
                var status = "";
                switch (log.status) {
                    case 0:
                        status = "<span class='badge badge-pill badge-info'>Đang chạy</span>"
                        break;
                    case 1:
                        status = "<span class='badge badge-pill badge-success'>Hoàn thành</span>"
                        break;
                    case -1:
                        status = "<span class='badge badge-pill badge-danger'>Lỗi</span>"
                        break;
                    case -2:
                        status = "<span class='badge badge-pill badge-danger'>Bị Xóa</span>"
                        break;
                    case -3:
                        status = "<span class='badge badge-pill badge-error'>Không đủ tài nguyên</span>"
                        break;
                    default:
                        break;
                }
                tblLogs.row.add([
                    index + 1,
                    log.object_id,
                    log.fb_id,
                    log.number,
                    log.reactions,
                    log.start_like,
                    status,
                    moment(log.updatedAt).fromNow()
                ]).draw();
            });
        });
    },
    package : function (callback) { 
        http.getApi(API_URL + "/tools", function (data) { 
            if (data.status != 200) {
                alert("Không tìm được danh sách gói, vui lòng thử lại");
                return;
            }
            var vipLikes = data.data.find(function (tool) { 
                return tool.name == "Vips Like"
            });
            console.log(vipLikes);
            var package_result = [];
            var discount = vipLikes.levelTool[0].discount / 100;
            vipLikes.prices.forEach(function (price) {
                var pricePackage = (price.price - price.price * discount) * 1000;
                package_result.push({
                    package_name: price.package_name,
                    max_like: price.max_like,
                    price_text: init.number_format(pricePackage),
                })
                // $("#package").append('<option value="' + price.package_name + '">Tối đa ' + price.max_like + ' Like / Mỗi bài viết - ' + init.number_format(pricePackage) + ' đ / Tháng</option>');
            });
            callback(package_result);
        });
    },
    listVips: async function (tblVips) {
        tblVips.clear();
        http.getApi(API_URL + "/vip-likes/list", function (data) {
            if (data.status != 200) {
                alert("Không tìm được danh sách tài khoản vip đã đăng ký, vui lòng thử lại");
                return;
            }
            console.log(data.data);
            data.data.forEach(function (vip, index) {
                tblVips.row.add([
                    index + 1,
                    '<a href="https://fb.com/' + vip.fbid + '" target="_blank">' + vip.fbname + '</a>',
                    vip.fbid,
                    vip.minspeed + " Likes/" + vip.mindelay + " Giây",
                    vip.minlike,
                    vip.maxlike,
                    vip.time_end,
                    '<button type="button" class="btn btn-xs btn-warning m-r-5 editVip" fbid="' + vip.fbid + '" data-toggle="modal" href="#modal-edit-vips">Sửa</button><button type="button" class="btn btn-xs btn-danger">Xóa</button>'
                ]).draw();
            })
        });
    },
    me : function () { 
        http.getApi(API_URL + "/me", function (data) {
            console.log(data.data);
            console.log(data.data.likes.total_like);
            $(".data-user-likes").html(init.number_format(data.data.likes.total_like));
            $(".data-user-coin").html(init.number_format(data.data.coin));
        });
    },
    run : function () { 
        moment.locale("vi");
        this.package(function (package_result) {
            package_result.forEach(function (price) {
                $("#package").append('<option value="' + price.package_name + '">Tối đa ' + price.max_like + ' Like / Mỗi bài viết - ' + price.price_text + ' đ / Tháng</option>');
            })
        });
    }
}
initPage.run();