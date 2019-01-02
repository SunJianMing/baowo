## 初始化工程

```

# 第一步：下载源代码
git clone https://xxx/xxx/xxx.git

# 第二步：安装扩展（使用淘宝镜像）
npm install --registry=https://registry.npm.taobao.org

# 第三步：本地调试，启动本地web服务
npm run dev

# 生成最终文件
npm run build

# 生成报告
npm run build --report
```

## 常见问题

### 选择框不能默认选中值

搜索框的model字段类型需要和后台bean的类型一致，如：前台需要是string类型,如果后台传到前台的字段类型是integer会导致选不中。

### 表单校验

表单校验控件见：https://github.com/yiminghe/async-validator

### 表格列超长后显示...

增加show-overflow-tooltip标签

```
<el-table-column label='查询关键词' show-overflow-tooltip>
    <template slot-scope="scope">
        {{scope.row.search_content}}
    </template>
</el-table-column>
```

### 表格列枚举值、全局变量转换

修改`/src/utils/filters.js`，增加filter

```
<el-table-column label='状态'  >
    <template slot-scope="scope">
      <span :class="scope.row.isPublish | FILTER_IsPublish_Class">{{scope.row.isPublish | FILTER_IsPublish}}</span>
    </template>
</el-table-column>
```

### 表格行显示时间图标

增加`<i class="el-icon-time"></i>`

```
 <el-table-column label='更新时间'   prop="updateTime" sortable="custom" >
    <template slot-scope="scope">
        <i class="el-icon-time"></i>
        {{scope.row.updateTime}}
    </template>
</el-table-column>
```

### 表格行增加序号

增加

```
<el-table-column
        type="index"
        :index="index">
      </el-table-column>
```

## 如何添加菜单

在src/router/allRoutes.js中添加定义的码值和对应的前提组件实现，然后通过后台配置数据库，将菜单配置给用户

在测试的情况下，可以修改@/router/staticRoutes.js，添加菜单结构。