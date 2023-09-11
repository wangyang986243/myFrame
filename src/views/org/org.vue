<!--
 * @Description: 组织架构
 * @Author: wangyang
 * @Date: 2023-08-21 16:58:10
 * @LastEditors: wangyang
 * @LastEditTime: 2023-08-21 18:30:12
-->
<template>
  <div>
    <div class="levels">
      <div class="level">一级集团</div>
      <div class="level">二级集团</div>
      <div class="level">三级集团</div>
      <div class="level">四级集团</div>
    </div>
    <vue2-org-tree
      :data="orgTreeData"
      :horizontal="true"
      :labelWidth="200"
      :render-content="renderContent"
      collapsable
      @on-expand="onExpand"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 定义数据
      orgTreeData: {
        label: "瀚蓝环境股票有限公司",
        value: "A",
        children: [
          {
            value: "B",
            label: "瀚蓝（厦门）固废处理有限公司",
            children: [
              {
                label: "瀚蓝（孝感）固废处理有限公司",
                value: "C",
                children: [],
              },
            ],
          },
          {
            value: "F",
            label: "佛山市南海瀚蓝固废处理投资有限公司",
            children: [
              {
                label: "瀚蓝生态资源科技有限公司",
                status: "意向",
                value: "G",
              },
              {
                label: "瀚蓝生物环保科技有限公司",
                value: "H",
              },
              {
                label: "瀚蓝智慧环卫有限公司",
                value: "J",
                children: [
                  {
                    label: "瀚蓝（惠安）智慧环卫服务有限公司",
                    status: "意向",
                    value: "K",
                  },
                ],
              },
            ],
          },
          {
            label: "",
            value: "A1",
            children: [
              {
                label: "",
                value: "C1",
                children: [{ label: "abc", value: "C2" }],
              },
            ],
          },
        ],
      },
    };
  },
  created() {
    this.toggleExpand(this.orgTreeData, true);
  },
  methods: {
    toggleExpand(data, val) {
      if (Array.isArray(data)) {
        data.forEach((item) => {
          this.$set(item, "expand", val);
          if (item.children) {
            this.toggleExpand(item.children, val);
          }
        });
      } else {
        this.$set(data, "expand", val);
        if (data.children) {
          this.toggleExpand(data.children, val);
        }
      }
    },
    // 展开
    onExpand(e, data) {
      if ("expand" in data) {
        data.expand = !data.expand;
        if (!data.expand && data.children) {
          this.collapse(data.children);
        }
      } else {
        this.$set(data, "expand", true);
      }
    },
    //收起
    collapse(list) {
      list.forEach((child) => {
        if (child.expand) {
          child.expand = false;
        }
        child.children && this.collapse(child.children);
      });
    },
    renderContent(h, data) {
      return (
        <div>
          {data.label ? (
            <span>
              {`${data.label}${data.status == "意向" ? "(意向)" : ""}`}
            </span>
          ) : (
            <span>{"暂未入驻"}</span>
          )}
        </div>
      );
    },
  },
};
</script>
<style scoped lang='scss'>
.levels {
  width: 100%;
  display: flex;
  .level {
    width: 250px;
    text-align: center;
  }
}
.org-tree-container {
  width: 100%;
}
</style>