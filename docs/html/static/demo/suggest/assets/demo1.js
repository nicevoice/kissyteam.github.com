KISSY.use("node,suggest", function(S, Node, Suggest) {
    // 如果是 1.1.6, Node 和 Suggest 都是直接在 KISSY 上的
    Node = S.Node;
    Suggest = S.Suggest;

    // 初始化一个Suggest 对象, 给定所提示input的元素节点, 数据源, 及配置项
    var _suggest = new Suggest('#qstab', 'http://suggest.taobao.com/sug?code=utf-8&extras=1', {
            resultFormat: '约%result%个宝贝',
            dataType: 1
        }),
        // 切换 tab, 当切换到不同 tab 时, 数据源和显示格式有所差异
        tab = S.one('.tb-srch-may-tab'),
        tabList = tab.all('li'),
        switchToTab = function(n) {
            // 动态设置数据源和结果格式
            _suggest.config.resultFormat = '约%result%个宝贝';
            if (n == 1) {
                _suggest.dataSource = 'http://suggest.taobao.com/sug?area=b2c&code=utf-8&extras=1&callback=KISSY.Suggest.callback';
                _suggest.config.resultFormat = '约%result%个商品';
            } else {
                _suggest.dataSource = 'http://suggest.taobao.com/sug?code=utf-8&extras=1&callback=KISSY.Suggest.callback';
            }
            S.each(tabList, function(tab, i) {
                tab = new Node(tab);

                tab[(i == n) ? "addClass" : "removeClass"]('current');
            });
        };

    // 绑定 tab 切换
    S.each(tabList, function(tab, i) {
        tab = new Node(tab);
        tab.on("click", function(ev) {
            ev.halt();
            switchToTab(i);
        });
    });
});

