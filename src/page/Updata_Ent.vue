<!--  -->
<template>
  <div class="bigbox">
    <van-sticky :offset-top="0.0001" class="headerTitile">
      <van-nav-bar title="企业信息">
        <template #left>
          <van-icon name="arrow-left" size="30" @click="goto()" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <el-form :label-position="labelPosition" label-width="10px">
      <el-form-item label="企业名称">
        <el-input v-model="ent.entName" placeholder="请填写"></el-input>
      </el-form-item>
      <el-form-item label="公司标签">
        <el-input v-model="ent.enterpriseLabel" placeholder="请填写"></el-input>
      </el-form-item>
      <el-form-item label="公司人数">
        <el-select v-model="ent.employeesNum" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="公司地址">
        <el-input v-model="ent.address" placeholder="请填写"></el-input>
      </el-form-item>
      <el-form-item label="公司简介">
        <el-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 7 }"
          placeholder="请输入内容"
          v-model="ent.companyIntroduction"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div class="footer">
      <el-button type="primary" @click="addInfo()" :disabled="btnDisabled"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: ["entInfo"],
  data() {
    // 这里存放数据
    return {
      btnDisabled: true,
      ent: {
        eid: this.$route.params.entInfo.eid,
        entName: this.$route.params.entInfo.entName,
        companyIntroduction: this.$route.params.entInfo.companyIntroduction,
        employeesNum: this.$route.params.entInfo.employeesNum,
        enterpriseLabel: this.$route.params.entInfo.enterpriseLabel,
        address: this.$route.params.entInfo.address,
        entImg: this.$route.params.entInfo.entImg,
      },
      labelPosition: "top",
      options: [
        {
          value: "少于15人",
          label: "少于15人",
        },
        {
          value: "15-50人",
          label: "15-50人",
        },
        {
          value: "50-150人",
          label: "50-150人",
        },
        {
          value: "150-500人",
          label: "150-500人",
        },
        {
          value: "500-2000人",
          label: "500-2000人",
        },
        {
          value: "2000人以上",
          label: "2000人以上",
        },
      ],
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    ent: {
      handler(newValue, oldValue) {
        if (
          this.ent.entName!==this.$route.params.entInfo.entName ||
            this.ent.companyIntroduction !== this.$route.params.entInfo.companyIntroduction ||
        this.ent.employeesNum !== this.$route.params.entInfo.employeesNum ||
        this.ent.enterpriseLabel !== this.$route.params.entInfo.enterpriseLabel ||
        this.ent.address  !== this.$route.params.entInfo.address ||
        this.ent.entImg  !==  this.$route.params.entInfo.entImg
        ) {
          this.btnDisabled = false;
        }  else {
          this.btnDisabled = true;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
    goto() {
      this.$router.push({ path: "/myInfo" });
    },
    addInfo() {
      this.axios
        .post("/api/user/updataEntInfo", this.qs.stringify(this.ent))
        .then((res) => {
          if (res.data.code === "000000") {
            this.$notify({ type: "success", message: "保存成功" });
            this.$router.push({ path: "/myInfo" });
          } else if (res.data.code === "111111") {
            this.$notify({ type: "warning", message: res.data.message });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
button[disabled] {
  color: white !important;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  line-height: var(--footer-height);
  text-align: center;
}
.bigbox {
  background: white;
  width: 100%;
  height: 100vh;
  text-align: left;
}
/deep/.van-nav-bar__title {
  font-size: 1.5rem;
  color: rgb(95, 94, 94);
}
/deep/.el-form-item {
  width: 75%;
  margin-left: 2rem;
}
/deep/ .el-form-item__label {
  height: 2.5rem;
}
/deep/ .el-input {
  height: 3rem;
  font-size: 1.4rem;
}
/deep/ .el-form-item__content {
  padding-left: -10rem;
}

/deep/ .el-input__inner {
  padding: 0px;
  border: 0px;
  border-bottom: 1px solid grey;
  border-radius: 0px;
}
/deep/ .el-date-editor {
  position: relative;
  .el-input__prefix {
    display: none;
  }
}
/deep/ .el-button {
  width: 80%;
  margin-bottom: 1rem;
}
</style>
