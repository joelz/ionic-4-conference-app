# Ionic Angular Conference Application (Ionic 4)

## nav, ion-nav

1. 普通页面：list进detail，detail返回list，list页面的状态（比如滚动条的位置不变）。
2. 普通页面：list进detail，detail返回list时如何传值回到list（场景：list进detail，detail里面改了东西，返回list页时要反映刚做的修改）
3. 普通页面：页面在tab A中，切换tab B，再切换回tab A，页面的nav状态还在
4. modal页面：使用ion-nav时如何传值回list页的问题也在。解决方法：list页面通过navParams传递callback，detail在ngOnDestroy时调用callback。