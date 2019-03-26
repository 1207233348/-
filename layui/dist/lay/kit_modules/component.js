/** kitadmin-v2.1.0 MIT License By http://kit.zhengjinfan.cn Author Van Zheng */
("use strict");
layui.define(["layer"], function(i) {
    layui.layer;
    var n = layui.jquery,
        e = "component",
        t = { NAV: ".kit-nav", ITEM: ".kit-item", SHOW: "layui-show", THIS: "layui-this" },
        a = function() {
            this.version = "1.0.0";
        };
    (a.prototype.render = function(i, n) {
        if (void 0 === i) l.renderNav(n);
        else
            switch (i) {
                case "nav":
                    l.renderNav(n);
            }
        return this;
    }),
        (a.prototype.init = function() {
            return this.render(), this;
        }),
        (a.prototype.on = function(i, n) {
            return layui.onevent.call(this, e, i, n);
        });
    var l = {
            renderNav: function(i) {
                n(void 0 === i ? t.NAV : ".kit-nav[lay-filter=" + i + "]")
                    .find(t.ITEM)
                    .each(function() {
                        var i = n(this),
                            a = i.find("ul.kit-nav-child"),
                            l = a.length > 0;
                        l && (i.children("a").addClass("child"), a.addClass("layui-anim").addClass("layui-anim-upbit")),
                            i.off("click").on("click", function(a) {
                                if ((layui.stope(a), l))
                                    i.addClass(t.SHOW),
                                        n(document).on("click", function() {
                                            i.removeClass(t.SHOW), n(this).off("click");
                                        });
                                else {
                                    i
                                        .parents(t.NAV)
                                        .find(t.ITEM)
                                        .removeClass("layui-this"),
                                        i.addClass(t.THIS),
                                        i
                                            .parent(".kit-nav-child")
                                            .parent(".layui-show")
                                            .removeClass(t.SHOW);
                                    var r = i.parents(t.NAV).attr("lay-filter");
                                    layui.event.call(this, e, "nav(" + r + ")", { elem: i });
                                }
                            });
                    });
            }
        },
        r = new a();
    r.init(), i("component", r);
});
//# sourceMappingURL=component.js.map
