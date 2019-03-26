# -
下拉多选
基于layui的下拉多选，可搜索，兼容IE
使用方法：静态页面
<div>
<label for="" class="xiala">下拉多选</label>
<div class="lay-select">
    <div class="insert-select">
        <ul class="select1"></ul>
    </div>
    <i class="down"></i>
    <div class="down-li">
        <ul>
            <li>
                <input type="text" placeholder="搜索" class="search-or-new" />
            </li>
        </ul>
    </div>

</div>
</div>

js

layui.use(['select', 'jquery'], function (select, $) {
   //data为要渲染的下拉数据，select1为要渲染的元素
    select.init(data, 'select1');
    
    //getSelectData获取选中的数据
    select.getSelectData('select1');
});
#
