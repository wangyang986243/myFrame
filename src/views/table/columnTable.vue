<template>
  <div class="element-main">
    <div class="title">纵向垂直表头-table表格</div>
    <div class="introduce">参考地址:https://www.jianshu.com/p/1f38eaffd070</div>

    <el-button @click="click">全部</el-button>
    <el-button @click="clickOver">超标</el-button>
    <el-table
      style="width: 100%"
      :data="flag ? getValues : getValuesOver"
      :show-header="false"
      :cell-style="cellStyle"
    >
      <el-table-column
        v-for="(item, index) in getHeaders"
        :key="index"
        :prop="item"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: true, //判断table表格的数据是用哪个  true：getValues（全部）  false： getValuesOver（超标）
      //超标后的数据 默认是全空
      getValuesOver: [
        { title: "日期", value0: "", value1: "", value2: "" },
        { title: "姓名", value0: "", value1: "", value2: "" },
        { title: "地址", value0: "", value1: "", value2: "" },
        { title: "test", value0: "", value1: "", value2: "" },
        { title: "测试", value0: "", value1: "", value2: "" },
      ],
      // 需要比较超标的数据
      overIndexList: [
        { index: 3, props: "test" },
        { index: 4, props: "ceshi" },
      ],
      headers: [
        {
          prop: "date",
          label: "日期",
        },
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "address",
          label: "地址",
        },
        {
          prop: "test",
          label: "test",
        },
        {
          prop: "ceshi",
          label: "测试",
        },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "张三",
          address: "上海市普陀区金沙江路 1518 弄",
          test: "1/2",
          ceshi: "1/1",
        },
        {
          date: "2016-05-04",
          name: "李四",
          address: "上海市普陀区金沙江路 1517 弄",
          test: "2/2",
          ceshi: "2/1",
        },
        {
          date: "2016-05-01",
          name: "王二",
          address: "上海市普陀区金沙江路 1519 弄",
          test: "3/2",
          ceshi: "3/4",
        },
      ],
    };
  },
  computed: {
    getHeaders() {
      return this.tableData.reduce(
        (pre, cur, index) => pre.concat(`value${index}`),
        ["title"]
      );
    },
    getValues() {
      return this.headers.map((item) => {
        return this.tableData.reduce(
          (pre, cur, index) =>
            Object.assign(pre, { ["value" + index]: cur[item.prop] }),
          { title: item.label }
        );
      });
    },
  },
  methods: {
    clickOver() {
      //点击超标 flag 置为false 表示要用超标数据
      this.flag = false;
      // this.getData(3, "test");
      // this.getData(4, "测试");
      this.overIndexList.forEach((item) => {
        let arr = this.getData(item["index"], item.props);
        this.addGetValuesOver(arr);
      });
    },
    //
    getData(overIndex, props) {
      //先将获取的数据深拷贝一份，防止全部数据被污染
      let arr = JSON.parse(JSON.stringify(this.getValues));
      let keys = Object.keys(arr[overIndex]); // 获取需要对比超标不超标的键 （数组）
      let values = Object.values(arr[overIndex]); //获取需要对比超标不超标的值 （数组）

      let indexArr = []; // 放超标的数据在数组的序号
      let keyArr = []; //放超标的数据在数组的键
      values.forEach((item, index) => {
        if (item != props) {
          //对数据进行拆分，获取两个数据
          let first = item.split("/")[0];
          let second = item.split("/")[1];
          // console.log(first,second)
          //比较数据
          if (first < second) {
            // 对超标的数据 把序号 push到indexArr 中
            indexArr.push(index);
          }
        }
      });

      keys.forEach((wrapperItem, wrapperIndex) => {
        indexArr.forEach((innerItem) => {
          if (wrapperIndex == innerItem) {
            keyArr.push(wrapperItem);
          }
        });
      });
      // console.log("5=keyArr=>", keyArr);

      keyArr = keys.filter((items) => {
        if (!keyArr.includes(items)) return items;
      });

      keyArr = keyArr.filter((item) => item != "title");
      // console.log("keyArr6", keyArr);
      arr.forEach((wrapperItem) => {
        keyArr.forEach((innerItem) => {
          wrapperItem[innerItem] = "";
        });
      });
      // console.log("1111111", arr);
      return arr;
    },
    addGetValuesOver(arr) {
      arr.forEach((item, index) => {
        for (let key in item) {
          if (item[key]) {
            this.getValuesOver[index][key] = item[key];
          }
        }
      });
    },

    //点击全部
    click() {
      this.flag = true;
    },
    //对超标单元格设置
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex > 0) {
        // console.log(column.property);
        // console.log(row[column.property]);
        let first = row[column.property].split("/")[0];
        let second = row[column.property].split("/")[1];
        if (first < second && !this.flag) {
          return "color:red";
        }
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.title {
  color: 000000;
  font-size: 30px;
}
.introduce {
  height: 40px;
  line-height: 40px;
  font-size: 18px;
}
</style>