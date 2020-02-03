const menus = [
    // Menu Chính
    {
        icon: "fas fa-home",
        text: "Trang chủ",
        color: "blue",
        childs: []
    },
    // SEEDING
    {
        icon: "fab fa-facebook-square",
        text: "Dịch vụ Facebook",
        name: "DỊCH VỤ FACEBOOK",
        color: "blue",
        tool_alias: "Seeding By Workers",
        childs: [
            {
                // to: "/buff-seeding-order",
                to: "/report",
                img: "fb/upLike.png",
                // text: "Buff Like, Share, Comment",
                text: "Tăng like, share, comment post",
                name: "Seeding By Workers",
                badge: false,
                icon: "fas fa-star-half-alt",
                tool_alias: "seeding_by_workers_like",
                type: "like"
            },
            {
                // to: "/buff-seeding-sub-order",
                to: "/home1",
                img: "fb/upFollow.png",
                // text: "Buff Sub Profile",
                text: "Tăng theo dõi tài khoản",
                name: "Seeding By Workers",
                badge: false,
                icon: "fa fa-user-circle-o",
                tool_alias: "seeding_by_workers_follow",
                type: "follow"
            },
            {
                to: "/buff-seeding-like-fanpage-order",
                img: "fb/upLikepage.png",
                // text: "Buff Like Fanpage order",
                text: "Tăng LIKE Fanpage",
                name: "Seeding By Workers",
                badge: false,
                icon: "far fa-thumbs-up",
                tool_alias: "seeding_by_workers_like_page",
                type: "like"
            },
            {
                to: "/buff-view-kg",
                img: "fb/upView.png",
                // text: 'Buff View Video v1',
                text: "Tăng lượt xem video trên Fb v1",
                name: "Buff View Video v1",
                icon: "fa fa-eye",
                badge: true,
                tool_alias: "buff_view_sv_kg",
                type: "view"
            },
            {
                to: "/buff-view-pro",
                img: "fb/upView2.png",
                // text: "Buff View Video v2",
                text: "Tăng lượt xem video trên Fb v2",
                name: "Buff View Video v2",
                icon: "fa fa-eye",
                badge: true,
                tool_alias: "buff_view_sv_v2",
                type: "view"
            },
            {
                to: "/buff-eye-kg",
                img: "fb/upEye.png",
                // text: "Buff Mắt Live Stream v1",
                text: "Tăng mắt livestream v1",
                name: "Buff Mắt Live Stream v1",
                icon: "fa fa-eye",
                badge: true,
                tool_alias: "buff_eyes_sv_kg",
                type: "mắt"
            },
            {
                to: "/buff-eye-pro",
                img: "fb/upEye2.png",
                // text: "Buff Mắt Live Stream v2",
                text: "Tăng mắt livestream v2",
                name: "Buff Mắt Live Stream v2",
                icon: "fa fa-eye",
                badge: true,
                tool_alias: "buff_eyes_sv_v2",
                type: "mắt"
            }
        ]
    },
    {
        icon: "fab fa-facebook-square",
        text: "Dịch vụ Facebook VIP",
        name: "DỊCH VỤ FACEBOOK VIP",
        color: "blue",
        tool_alias: "Vip Seeding",
        childs: [
            {
                to: "/vip-like-clone",
                img: "fb-vip/likeClone.png",
                text: "Vip Like Clone Giá Rẻ",
                name: "Vip Like Clone Giá Rẻ",
                badge: false,
                icon: "far fa-hand-point-up",
                tool_alias: "vip_seeding_like_clone",
                type: "like/ tháng",
                admin: false
            },
            {
                to: "/vip-seeding-order",
                img: "fb-vip/share.png",
                text: "Vip Like Bài Viết Tháng",
                name: "Vip Seeding",
                badge: false,
                icon: "fa fa-coffee",
                tool_alias: "vip_seeding_like",
                type: "like"
            },
            {
                to: "/vip-seeding-order-sl",
                img: "fb-vip/likePost.png",
                text: "Vip Like Bài Viết Theo Số Lượng",
                name: "Vip Seeding",
                badge: false,
                icon: "fab fa-staylinked",
                tool_alias: "vip_seeding_like_sl",
                type: "like"
            },
            {
                to: "/vip-reaction-seeding-order",
                img: "fb-vip/react.png",
                text: "Vip Cảm Xúc Bài Viết Tháng",
                name: "Vip Reaction Seeding",
                badge: false,
                icon: "far fa-heart",
                tool_alias: "seeding_by_workers_like",
                type: "like"
            },
            {
                to: "/vip-comment-seeding-order",
                img: "fb-vip/cmtPost.png",
                text: "Vip Bình Luận Bài Viết Tháng",
                name: "Vip Seeding",
                badge: false,
                icon: "fas fa-comment-dots",
                tool_alias: "vip_seeding_comment",
                type: "bình luận"
            },
            {
                to: "/vip-live-stream-pro",
                img: "fb-vip/eye.png",
                text: "Vip Tăng Mắt LiveStream Tháng v2",
                name: "Vip Mắt LiveStream",
                icon: "fa fa-eye",
                badge: true,
                tool_alias: "vip_eyes_live_stream_v2",
                type: "mắt"
            },
            {
                to: "/vip-live-stream-kg",
                img: "fb-vip/eye2.png",
                text: "Vip Tăng Mắt LiveStream Tháng v1",
                name: "Vip Mắt LiveStream",
                icon: "fa fa-eye",
                badge: true,
                tool_alias: "vip_eyes_live_stream",
                type: "mắt"
            }
        ]
    },
    {
        icon: "fab fa-instagram",
        text: "Dịch vụ Instagram",
        name: "DỊCH VỤ INSTAGRAM",
        color: "ins",
        tool_alias: "Instagram Seeding",
        childs: [
            {
                to: "/buff-seeding-like-instagram-order",
                img: "ins/upLike.png",
                // text: "Buff Like Instagram",
                text: "Tăng like bài viết",
                name: "Instagram Seeding",
                badge: false,
                icon: "far fa-thumbs-up",
                tool_alias: "instagram_like",
                type: "like"
            },
            {
                to: "/buff-seeding-sub-instagram-order",
                img: "ins/upFollow.png",
                // text: "Buff Sub Instagram",
                text: "Tăng theo dõi tài khoản",
                name: "Instagram Seeding",
                badge: false,
                icon: "fas fa-user-plus",
                tool_alias: "instagram_follow",
                type: "follow"
            },
            {
                to: "/buff-seeding-comment-instagram-order",
                img: "ins/upCmt.png",
                // text: "Buff Comment Instagram",
                text: "Tăng comment bài viết",
                name: "Instagram Seeding",
                badge: false,
                icon: "far fa-comment-dots",
                tool_alias: "instagram_comment",
                type: "comment"
            }
        ]
    },
    {
        icon: "fab fa-youtube",
        text: "Dịch vụ Youtube",
        name: "DỊCH VỤ YOUTUBE",
        color: "utube",
        tool_alias: "Youtube Seeding",
        childs: [
            {
                to: "/buff-seeding-youtube-view",
                img: "utube/upView.png",
                // text: "Buff View Video",
                text: "Tăng lượt xem trên youtube",
                name: "Youtube Seeding",
                badge: false,
                icon: "fas fa-eye",
                admin: false,
                tool_alias: "seeding_by_workers_view_youtube",
                type: "view"
            },
            {
                to: "/buff-seeding-youtube-comment",
                img: "utube/upCmt.png",
                // text: "Buff Comment Video",
                text: "Tăng comment youtube",
                name: "Youtube Seeding",
                badge: false,
                icon: "fas fa-comments",
                tool_alias: "seeding_by_workers_comment_youtube",
                type: "comment"
            },
            {
                to: "/buff-seeding-youtube-sub",
                img: "utube/upFollow.png",
                // text: "Buff Sub Channel",
                text: "Tăng lượt theo dõi kênh",
                name: "Youtube Seeding",
                badge: false,
                icon: "fas fa-user-check",
                admin: false,
                tool_alias: "seeding_by_workers_subscribe_youtube",
                type: "sub"
            }
        ]
    },
    {
        icon: "fab fa-jedi-order",
        text: "Dịch vụ khác",
        name: "DỊCH VỤ KHÁC",
        color: "orther",
        childs: [
            {
                icon: "icon-social-facebook",
                to: "/spam-sms",
                img: "other/spam.png",
                name: "Auto Spam SMS",
                text: "Auto Spam SMS",
                tool_alias: "spam_sms",
                type: "SMS"
            },
            {
                icon: "icon-phone",
                to: "/uid-to-phone",
                img: "other/scan-uid.png",
                text: "Quét UID bằng Số điện thoại",
                name: "Convert Uid To Phone",
                tool_alias: "convert_uid_to_phone",
                type: "SĐT"
            },
            {
                icon: "icon-social-facebook",
                to: "/phone-to-uid",
                img: "other/scan-phone.png",
                name: "Convert SĐT To Uid",
                text: "Quét Số điện thoại bằng UID",
                tool_alias: "convert_uid_to_phone",
                type: "Uid"
            }
        ]
    }
];
export default menus;
