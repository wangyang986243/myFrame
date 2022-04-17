# 1. router文件夹

1. 关于项目路由的文件夹

2. 该文件夹包含动态路由和静态路由两个路由文件 
   - 如果项目使用静态路由 ------则将对应的静态路由文件更名为index
   - 如果项目使用动态路由------则将对应的动态路由文件更名为index
3. 在更改相应的路由文件之后还需要在/src/components/layout/components/Sidebar/index.vue 修改相应的路由文件信息

#改颜色

# 2. 自定义的class

###vertically-divided
页面左右两部分组成，中间有一条右边框。
###infoPage / infoPage_2
展示详情信息的表单页面，里面的字有两种颜色，重的颜色class叫：darkText，浅的颜色class叫：lightText

这两种页面的不同只在一个用的el-card做大盒子，另一个用el-main做的大盒子。
##ElementUI样式
能用到的基本都在颜色样式css里面定义过了。

没定义过的就从element的样式中找到改。

如果element定义的样式跟页面需要冲突，再去根据页面在颜色样式css里面写筛选。
##其它
如果要给不是Element的元素加颜色相关的样式。

可以去每个颜色样式css里面定义不同的颜色变量，然后再页面配置颜色样式的时候引用变量。eg.communityApplet页面class为“form”的边框。