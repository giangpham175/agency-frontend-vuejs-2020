const menus = [
    // {
    //     class: "nav-small-cap",
    //     caption: "------ Menu Chính"
    // },
    {
        icon: "fa fa-cogs",
        text: "Quản Lý Chung",
        childs: [
            {
                to: "/profile",
                text: "Tài Khoản",
                icon: "fa fa-user-circle-o",
                show_coin: true
            },
            {
                to: "/payment",
                text: "Thanh Toán",
                icon: "fa fa-usd"
            },
            {
                to: "/api-manager",
                text: "API Tích Hợp",
                name: "Api Manager",
                icon: "fa fa-key"
            },
            {
                to: "/report",
                text: "Báo Cáo",
                icon: "fa fa-bar-chart-o"
            },
            {
                to: "/refund-logs",
                text: "Lịch Sử Hoàn Tiền",
                icon: "fas fa-donate"
            }
        ]
    },
    // SEEDING
    {
        icon: "fab fa-facebook-square",
        text: "Facebook Buff",
        tool_alias: "Seeding By Workers",
        childs: [
            {
                to: "/buff-seeding-order",
                text: "Buff Like, Comment, Share Post",
                name: "Seeding By Workers",
                badge: false,
                icon: "fas fa-star-half-alt",
                tool_alias: "seeding_by_workers_like",
                type: "like"
            },
            {
                to: "/buff-seeding-sub-order",
                text: "Buff Sub (Tăng Theo Dõi) Profile",
                name: "Seeding By Workers",
                badge: false,
                icon: "fa fa-user-circle-o",
                tool_alias: "seeding_by_workers_follow",
                type: "follow"
            },
            {
                to: "/buff-seeding-share-group",
                text: "Buff Share Group (Tăng Chia Sẻ Nhóm)",
                name: "Seeding By Workers",
                badge: false,
                icon: "fa fa-user-circle-o",
                tool_alias: "seeding_by_workers_share_group",
                type: "share",
                admin: true
            },
            {
                to: "/buff-seeding-like-fanpage-order",
                text: "Buff Like Fanpage Order",
                name: "Seeding By Workers",
                badge: false,
                icon: "far fa-thumbs-up",
                tool_alias: "seeding_by_workers_like_page",
                type: "like"
            },
            // {
            //     to: '/buff-like-fanpage',
            //     text: 'Mời Bạn Bè Like FanPage',
            //     name: 'Mời Bạn Bè Like FanPage',
            //     badge: false,
            //     icon: 'fa fa-hand-o-up',
            //     tool_alias: 'buff_like_fan_page',
            //     type: 'like'
            // },
            {
                to: "/buff-view-pro",
                text: "Buff View Video v2",
                name: "Buff View Video v2",
                icon: "fa fa-eye",
                badge: true,
                tool_alias: "buff_view_sv_v2",
                type: "view"
            },
            {
                to: "/buff-eye-pro",
                text: "Buff Mắt Live Stream v2",
                name: "Buff Mắt Live Stream v2",
                icon: "fa fa-eye",
                badge: true,
                tool_alias: "buff_eyes_sv_v2",
                type: "mắt"
            },
            // {
            //     to: '/buff-view-kg',
            //     text: 'Buff View Video v1',
            //     name: 'Buff View Video v1',
            //     icon: 'fa fa-eye',
            //     badge: true,
            //     tool_alias: 'buff_view_sv_kg',
            //     type: 'view'
            // },
            {
                to: "/buff-eye-kg",
                text: "Buff Mắt Live Stream v1",
                name: "Buff Mắt Live Stream v1",
                icon: "fa fa-eye",
                badge: true,
                tool_alias: "buff_eyes_sv_kg",
                type: "mắt"
            }
        ]
    },
    {
        icon: "fab fa-facebook-square",
        text: "Facebook VIP",
        tool_alias: "Vip Seeding",
        childs: [
            {
                to: "/vip-like-clone",
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
                text: "Vip Like Bài Viết Tháng",
                name: "Vip Seeding",
                badge: false,
                icon: "fa fa-coffee",
                tool_alias: "vip_seeding_like",
                type: "like"
            },
            {
                to: "/vip-seeding-order-sl",
                text: "Vip Like Bài Viết Theo Số Lượng",
                name: "Vip Seeding",
                badge: false,
                icon: "fab fa-staylinked",
                tool_alias: "vip_seeding_like_sl",
                type: "like"
            },
            {
                to: "/vip-reaction-seeding-order",
                text: "Vip Cảm Xúc Bài Viết Tháng",
                name: "Vip Reaction Seeding",
                badge: false,
                icon: "far fa-heart",
                tool_alias: "seeding_by_workers_like",
                type: "like"
            },
            {
                to: "/vip-comment-seeding-order",
                text: "Vip Bình Luận Bài Viết Tháng",
                name: "Vip Seeding",
                badge: false,
                icon: "fas fa-comment-dots",
                tool_alias: "vip_seeding_comment",
                type: "bình luận"
            },
            {
                to: "/vip-live-stream-pro",
                text: "Vip Tăng Mắt LiveStream Tháng v2",
                name: "Vip Mắt LiveStream",
                icon: "fa fa-eye",
                badge: true,
                tool_alias: "vip_eyes_live_stream_v2",
                type: "mắt"
            },
            {
                to: "/vip-live-stream-kg",
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
        icon: "fas fa-user-astronaut",
        text: "Facebook Bot",
        childs: [
            {
                icon: "icon-phone",
                to: "/care-pro",
                text: "Bot Tự Động Tương Tác",
                name: "Bot Tự Động Tương Tác",
                tool_alias: "care_pro",
                type: "ngày"
            }
        ]
    },
    {
        icon: "fab fa-instagram",
        text: "Instagram Buff",
        tool_alias: "Instagram Seeding",
        childs: [
            {
                to: "/buff-seeding-like-instagram-order",
                text: "Buff Like Instagram",
                name: "Instagram Seeding",
                badge: false,
                icon: "far fa-thumbs-up",
                tool_alias: "instagram_like",
                type: "like"
            },
            {
                to: "/buff-seeding-sub-instagram-order",
                text: "Buff Sub Instagram",
                name: "Instagram Seeding",
                badge: false,
                icon: "fas fa-user-plus",
                tool_alias: "instagram_follow",
                type: "follow"
            },
            {
                to: "/buff-seeding-comment-instagram-order",
                text: "Buff Comment Instagram",
                name: "Instagram Seeding",
                badge: false,
                icon: "far fa-comment-dots",
                tool_alias: "instagram_comment",
                type: "comment"
            },
            {
                to: "/vip-instagram-order",
                text: "Instagram Vip Seeding",
                name: "Instagram Vip Seeding",
                badge: false,
                icon: "fa fa-coffee",
                tool_alias: "instagram_vip_like",
                type: "like"
            }
        ]
    },
    {
        icon: "fab fa-youtube",
        text: "Youtube Buff",
        tool_alias: "Youtube Seeding",
        childs: [
            {
                to: "/buff-seeding-youtube-view",
                text: "Buff View Video",
                name: "Youtube Seeding",
                badge: false,
                icon: "fas fa-eye",
                admin: false,
                tool_alias: "seeding_by_workers_view_youtube",
                type: "view"
            },
            {
                to: "/buff-seeding-youtube-comment",
                text: "Buff Comment Video",
                name: "Youtube Seeding",
                badge: false,
                icon: "fas fa-comments",
                tool_alias: "seeding_by_workers_comment_youtube",
                type: "comment"
            },
            {
                to: "/buff-seeding-youtube-sub",
                text: "Buff Sub Channel",
                name: "Youtube Seeding",
                badge: false,
                icon: "fas fa-user-check",
                admin: false,
                tool_alias: "seeding_by_workers_subscribe_youtube",
                type: "sub"
            }
        ]
    },
    // Group
    // {
    //     icon: 'fas fa-layer-group',
    //     text: 'Quản Lý Nhóm',
    //     childs: [
    //         {
    //             icon: 'fa fa-users',
    //             to: '/group-manager',
    //             text: 'Quản Lý Nhóm',
    //             name: 'Group Manager'
    //         },
    //         {
    //             icon: 'fa fa-search',
    //             to: '/scan-group',
    //             text: 'Quét Nhóm',
    //             name: 'Scan Group'
    //         }
    //     ]
    // },
    {
        icon: "fa fa-search",
        text: "Quét UID - SĐT",
        childs: [
            {
                icon: "icon-phone",
                to: "/uid-to-phone",
                text: "Tìm SĐT bằng Facebook",
                name: "Convert Uid To Phone",
                tool_alias: "convert_uid_to_phone",
                type: "SĐT"
            },
            {
                icon: "icon-social-facebook",
                to: "/phone-to-uid",
                name: "Convert SĐT To Uid",
                text: "Tìm Facebook bằng SĐT",
                tool_alias: "convert_uid_to_phone",
                type: "Uid"
            }
            // {
            //     icon: 'icon-note',
            //     to: '/scan-uid-from-post',
            //     text: 'Quét UID từ bài viết',
            //     free: true
            // },
            // {
            //     icon: 'icon-magic-wand',
            //     to: '/scan-post-facebook',
            //     text: 'Quét ID bài viết của Profile, Page, Group',
            //     free: true
            // }
        ]
    },
    {
        icon: "fab fa-jedi-order",
        text: "Dịch vụ khác",
        childs: [
            {
                icon: "icon-social-facebook",
                to: "/spam-sms",
                name: "Auto Spam SMS",
                text: "Auto Spam SMS",
                tool_alias: "spam_sms",
                type: "SMS"
            }
        ]
    }
];
export default menus;
