var config = {
	//url: "http://123.56.221.46:8080/FriendHome/"
	url: "http://192.168.3.4:8080/FriendHome/"
}
var config2 = {
	//url: "http://123.56.221.46:8080/"
	url: "http://192.168.3.4:8080/"
}
//var config2 = {
//	url: "http://60.205.151.97:8080/"
//}
//var config = {
//	url: "http://192.168.0.145:8080/FriendHome/"
//}
var this_banben = 105;

function getNewVerInfo() {
	$.ajax({
		type: "post",
		url: config.url + "verInfo/getNewVerInfo",
		async: true,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function(data) {
			if(data.msg == "成功") {
				var this_length = data.t.content.split(".");
				this_length = this_length[0] + this_length[1] + this_length[2];
				if(this_length > this_banben) {
					var btnArray = ['否', '是'];
					mui.confirm('发现最新版本!是否更新？', '提示', btnArray, function(e) {
						if(e.index == 1) {
							location.href = "http://123.56.221.46:8080/uploadFile/news.apk";
						}
					})
					return;
				} else {
					alert("当前已是最新版本！");
					return;
				}
			}
		}
	});
}

function login_aaaa() {
	mui.plusReady(function() {
		if(plus.storage.getItem("account") == null || plus.storage.getItem("pwd") == null) {
			if(location.href.split("_youke")[1].split(".")[0] == 1) {
				$.ajax({
					type: "post",
					url: config.url + "Account/login",
					async: true,
					data: {
						"account": "woshiyouke",
						"pwd": "123456"
					},
					xhrFields: {
						withCredentials: true
					},
					crossDomain: true,
					success: function(data) {
						if(data.msg == "成功") {
							location.href = "index.html";
						} else {
							mui.alert(data.msg);
						}
					}
				});
			}
		} else {
			if(location.href.split("_youke")[1].split(".")[0] == 1) {
				$.ajax({
					type: "post",
					url: config.url + "Account/login",
					async: true,
					data: {
						"account": plus.storage.getItem("account"),
						"pwd": plus.storage.getItem("pwd"),
					},
					xhrFields: {
						withCredentials: true
					},
					crossDomain: true,
					success: function(data) {
						if(data.msg == "成功") {
							location.href = "index.html";
						} else {
							mui.alert(data.msg);
						}
					}
				});
			}
		}
	})
}

function passworld_lv_aaa() {
	mui.plusReady(function() {
		if(plus.storage.getItem("account") == null || plus.storage.getItem("pwd") == null) {
			var btnArray = ['确认'];
			mui.confirm('您还没有登录，不能进行以下操作是否登录？', '提示', btnArray, function(e) {
				location.href = "login.html";
			})
		}
	})
}

$(document).ready(function() {
	//智齿客服
	$("iframe").height($(window).height())
	//底部nav跳转
	$(document).on("tap", ".mui-tab-item", function() {
		location.href = $(this).attr("href");
	});
	//首页新闻模块跳转
	$(document).on("tap", ".mui-grid-view.mui-grid-9 .mui-table-view-cell>a:not(.mui-btn)[href_lv],.mui-table-view-cell>a:not(.mui-btn)[href_lv]", function() {
		if($(".mui-content").attr("href_type") == 1) {
			if($(this).parent("li").index() == 2){
				location.href = $(this).attr("href_lv") + "?" + $(this).children(".mui-media-body").text() + "&" + 10;
			}else{
				location.href = $(this).attr("href_lv") + "?" + $(this).children(".mui-media-body").text() + "&" + $(this).parent("li").index()
			}
		} else {
			location.href = $(this).attr("href_lv")
		}
	});

	$(document).on("tap", ".content_lv ul li", function() {
		if($("#header").attr("byida") != "a") {
			location.href = "news_mode_content2.html?" + $(this).attr("news_id_lv");
		}
	});
});