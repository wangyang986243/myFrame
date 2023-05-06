<!--
 * @Description: 嵌套表格
 * @Author: wangyang
 * @Date: 2023-05-04 15:45:09
 * @LastEditors: wangyang
 * @LastEditTime: 2023-05-06 10:04:54
-->
<template>
  <div>
    <div class="header" ref="header">
      <div>长列表渲染-树状table-多选-父子不强关联</div>
    </div>
    <ux-grid
      :tree-config="{
        children: 'children',
        hasChildren: 'hasChildren',
      }"
      :data="tableData"
      ref="plxTree"
      :height="height"
      :row-height="rowHeight"
      :checkbox-config="{
        highlight: true,
        showHeader: false,
        checkStrictly: true,
      }"
      @selection-change="handleSelectionChange"
      :big-data-checkbox="true"
    >
      <ux-table-column
        type="checkbox"
        width="100"
        fixed="left"
        tree-node
      ></ux-table-column>
      <ux-table-column field="id" title="id" width="180"> </ux-table-column>
      <ux-table-column field="date" title="日期" width="180"> </ux-table-column>
      <ux-table-column field="name" title="姓名" width="180"> </ux-table-column>
      <ux-table-column field="address" title="地址" width="200">
      </ux-table-column>
      <ux-table-column field="address" title="地址" width="200">
      </ux-table-column>
      <ux-table-column field="address" title="地址" width="200">
      </ux-table-column>
    </ux-grid>
    <div class="footer" ref="footer">
      选中项（父子不关联）： {{ multipleSelection }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      multipleSelection: [],
      rowHeight: 50,
      height: 0,
      tableData: [
        //     {
        //       id: 1,
        //       date: "2016-05-01",
        //       name: "王小虎",
        //       address: "上海市普陀区金沙江路 1519 弄",
        //       children: [
        //         {
        //           id: 11,
        //           date: "",
        //           name: "王小虎",
        //           address: "上海市普陀区金沙江路 1519 弄",
        //         },
        //         {
        //           id: 12,
        //           date: "",
        //           name: "王小虎",
        //           address: "上海市普陀区金沙江路 1519 弄",
        //         },
        //       ],
        //     },
        //     {
        //       id: 2,
        //       date: "2016-05-02",
        //       name: "王小虎",
        //       address: "上海市普陀区金沙江路 1518 弄",
        //     },
        //     {
        //       id: 3,
        //       date: "2016-05-03",
        //       name: "王小虎",
        //       address: "上海市普陀区金沙江路 1516 弄",
        //     },
        //     {
        //       id: 4,
        //       date: "2016-05-04",
        //       name: "王小虎",
        //       address: "上海市普陀区金沙江路 1517 弄",
        //     },
      ],
    };
  },
  created() {
    //将tableData 生成长度为10000的数组 用于测试大数据
    this.tableData = Array.from({ length: 200 }, (v, k) => {
      return {
        id: k,
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1519 弄",
      };
    });
    //将tableData中id为偶数的项添加children属性 用于测试树形数据
    this.tableData.forEach((item) => {
      if (item.id % 2 === 0) {
        //给item添加长度为2000的children
        item.children = Array.from({ length: 500 }, (v, k) => {
          return {
            id: item.id + 10000 + k,
            date: "",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          };
        });
      }
    });
  },
  mounted() {
    //获取plxTree占满一屏剩下的高度   用于计算plxTree的高度 使其占满一屏
    this.height =
      document.documentElement.clientHeight -
      this.$refs.header.offsetHeight -
      this.$refs.footer.offsetHeight -
      100;
  },
  methods: {
    //选中某一条
    handleSelectionChange(val) {
      //点击选中会存入multipleSelection，在SelectAll时会触发该方法
      this.multipleSelection = val.map((item) => item.id);
      console.log("this.multipleSelection", this.multipleSelection);
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  height: 100px;
  background-color: pink;
  font-size: 20px;
  color: 000;
}
.footer {
  height: 100px;
  background-color: pink;
  font-size: 20px;
  color: 000;
}
::v-deep .el-table .DisableSelection .cell .el-checkbox__inner {
  display: none;
}
</style>