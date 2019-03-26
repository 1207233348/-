/** y-v1.2.1 SEE LICENSE IN <filename> License By http://www.layui.com/admin/ */
layui.define(["jquery"], function(e) {
    var t = {},
        a = {};
    ($ = layui.jquery),
        e("select", {
            init: function(e, t) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
                (a[t] = i),
                    $(".insert-select>ul")
                        .off()
                        .on("click", function(e) {
                            $(e.target)
                                .parent()
                                .siblings(".down-li")
                                .hasClass("active")
                                ? $(".down-li").removeClass("active")
                                : ($(".down-li").removeClass("active"),
                                  $(e.target)
                                      .parent()
                                      .siblings(".down-li")
                                      .addClass("active"));
                        }),
                    this.renderSelect(e, t);
            },
            clickHide: function() {
                $("body").on("click", function(e) {
                    $(e.target).closest(".down-li,.insert-select>ul").length || $(".down-li").removeClass("active");
                });
            },
            renderSelect: function(e, t) {
                var a = this;
                e.forEach(function(e) {
                    $("." + t)
                        .parent()
                        .siblings(".down-li")
                        .find("ul")
                        .append("<li value=" + e.value + " id=" + e.id + ">" + e.value + "</li>");
                }),
                    a.selectData(t),
                    a.searchLabel(t),
                    a.clickHide();
            },
            getSelectData: function() {
                return (t = a);
            },
            removeLabel: function(e) {
                $(".remove")
                    .off("click")
                    .on("click", function(e) {
                        e.stopPropagation();
                        var t = $(e.target)
                                .parent()
                                .attr("id"),
                            i = $(e.target)
                                .parent("li")
                                .index(),
                            n = $(e.target)
                                .parent()
                                .parent()
                                .attr("class");
                        $("." + n)
                            .parent()
                            .siblings(".down-li")
                            .find("ul li[id=" + t + "]")
                            .removeClass("thisActive"),
                            $(e.target)
                                .parent("li")
                                .remove(),
                            a[n].splice(i, 1);
                    });
            },
            selectData: function(e) {
                var t = this;
                $("." + e)
                    .parent()
                    .siblings(".down-li")
                    .off()
                    .on("click", "ul>li", function(i) {
                        var n = $(i.target).text(),
                            l = $(i.target).attr("id");
                        if (0 !== $(i.target).index())
                            if ($(i.target).hasClass("thisActive")) {
                                var r = $("." + e).find("li[id=" + l + "]");
                                a[e].splice(r.index(), 1), r.remove(), $(i.target).removeClass("thisActive");
                            } else
                                $(i.target).addClass("thisActive"),
                                    $("." + e).append(
                                        "<li value=" +
                                            n +
                                            " id=" +
                                            l +
                                            "><span>" +
                                            n +
                                            "</span><span class=remove>X</span></li>"
                                    ),
                                    a[e].push({ value: n, id: l }),
                                    t.removeLabel(e);
                    });
            },
            searchLabel: function(e) {
                $(".search-or-new").on("input", function(e) {
                    var t = $(e.target).val(),
                        a = [];
                    data.forEach(function(i) {
                        i.value.indexOf(t) > -1 &&
                            ($(e.target)
                                .parent()
                                .parent()
                                .find("li")
                                .not($(e.target).parent())
                                .remove(),
                            a.push(i));
                    }),
                        0 != a.length
                            ? (a.forEach(function(e) {
                                  $(".down-li>ul").append(
                                      "<li value=" + e.value + " id=" + e.id + ">" + e.value + "</li>"
                                  );
                              }),
                              (a = []))
                            : ($(e.target)
                                  .parent()
                                  .parent()
                                  .find("li")
                                  .not($(e.target).parent())
                                  .remove(),
                              $(e.target)
                                  .parent()
                                  .parent()
                                  .append('<li class="notData" style="text-align:center;">暂无数据</li>'));
                });
            }
        });
});
