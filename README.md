# MIApi
Spring项目文档网页
该项目需配合另外一个**java**项目使用（含使用规则）：**https://**

##左侧列表介绍

####文件介绍
首先需要通过**java**项目工具来生成多个
**.json**文件夹,文件包含项目所需的一些数据，其中
**listConfig.json**是项目目录配置文件，且文件名不肯更改，其他以.json结尾文件则是保存文档数据的，名称可在生成文档java代码中配置。
####目录介绍
目录是用来区分不同功能接口的，比如用户端接口，商家端接口，后台管理系统接口等等，可在java生成文档时配置。

####文档列表介绍
文档列表分2层，第1层是接口分组列表，用来归类相同分组的接口，第2层是接口列表，点击后可查看该接口的详细用法。

####分组列表、Api列表标识说明
新：该分组下的接口或该接口是近期更新的。

小黄点：该分组下的接口或该接口近期被更改过。

####搜索框
输入接口标题或接口url可搜索到相关的接口数据


##右侧展示区介绍
####快捷功能
在没有选中任何文字的时候按下**Ctrl+V**可直接复制该接口的**url**路径。

点击**Header、Body**可直接复制里面的参数名称。

点击单个参数名可直接复制该参数名。

####模拟请求
点击模拟请求会自动根据接口列表请求**url**，
**Hearder、Body**里面的参数会自动作为参数提交，如果不需要提交，去除最前面
**√**即可。请求完毕后结果将在
**请求结果**展示。

##设置功能介绍
####请求设置
请求设置里面的所设置的**Header、Body**将会全局跟随模拟请求提交，如果暂时不想使用该参数可删除或设置为不启用状态即可。

####用户功能
用户功能类似请求设置，每个用户的**Header、Body**将会全局跟随模拟请求提交，如果暂时不想使用该参数可删除或设置为不启用状态即可，如果不想使用该用户的信息，可切换用户或者勾选不选择用户即可。