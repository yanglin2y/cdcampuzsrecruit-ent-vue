<!--  -->
<template>
  <div class="bigbox" v-cloak>
    <van-sticky :offset-top="0.0001" class="headerTitile">
      <van-nav-bar title="管理HR">
        <template #left>
          <van-icon name="arrow-left" color="black" size="24" @click="goto()" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="content">
      <div v-if="this.hrList.length === 0" class="noshowbox">企业还没HR</div>
      <div class="bigcontext" v-if="this.hrList.length !== 0">
        <div class="box">
          <div class="context" v-for="(n, inx) in hrList" :key="inx">
            <div style="margin-left:1rem">
              <el-avatar :size="40" :src="n.hrImg"></el-avatar>
            </div>
            <div class="mincontext">
              <div class="namebox">{{ n.hrName }}</div>
              <div class="namebox">{{ n.department }}</div>
            </div>
            <div class="buttonbox">
                 <el-button type="danger" @click="delHr(n.hrid)">删除</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用
  props: ["eid"],
  components: {},
  data() {
    // 这里存放数据
    return {
      // salaryList: this.entList.salary.split('-'),
      hrList: [],
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {},
  created() {
    setTimeout(() => {
      this.selectHrInfoByEid();
      // this.getState()
    }, 11);
  },
  // 方法集合
  methods: {
       delHr(n){
        const params = new URLSearchParams()
      params.append('hrid', n)
      this.$dialog.confirm({
        message: '确认拒绝通过'
      })
        .then(() => {
           this.axios
        .post('/api/hr/delHr',params
        )
        .then((res) => {
          if (res.data.code === '000000') {
          this.$notify({ type: 'success', message: res.data.message  })
        this.$router.go(0)
          } else if (res.data.code === '111111') {
            this.$notify({ type: 'warning', message: res.data.message })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
        })
        .catch(() => {
          // on cancel
        })
    },
    goto() {
      this.$router.go(-1);
      // this.$router.back()
    },
    selectHrInfoByEid() {
      this.axios
        .get("/api/hr/selectHrInfoByEidList")
        .then((res) => {
          if (res.data.code === "000000") {
            this.hrList = res.data.data;
          } else if (res.data.code === "111111") {
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
button[disabled] {
  color: white !important;
}
/deep/ .el-button{

  width: 5rem;
  margin-bottom: .6rem;
  height: 3rem;

}
.buttonbox{
  display: flex;
  align-self: flex-end;
  flex:auto;
  margin-right: 1.5rem;
  flex-direction: row-reverse;
}
.mincontext{
  display: flex;
  flex-flow: row;
}
.context {
  height: 3.5rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  text-align: left;
  border-bottom: 1px solid rgb(192, 186, 186);
  margin-top: 1rem;

}
.noshowbox {
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 1rem;
  margin-left: 9rem;
  font-size: 1.3rem;
  color: grey;
}
.box {
  height: 90vh;
  overflow-y: auto;
}
.bigcontext {
  width: 100%;
  height: 50vh;
}
.salary {
  flex: auto;
  text-align: right;
  margin-right: 2rem;
}
.namebox {
  font-size: 1.3rem;
  margin-left:.7rem ;
  margin-top: .4rem;
}
.trueAddress2 {
  margin-top: 0.5rem;
  font-size: 1.2rem;
}
.trueAddress {
  margin-top: 0.5rem;
  font-size: 1.2rem;
}
.workAddressName {
  margin-top: 2rem;
  font-size: 1.4rem;
  font-weight: bold;
  color: black;
}
.workAddress {
  margin-left: 1.2rem;
  text-align: left;
}
/* 企业信息*/
.entContainer {
  display: flex;
  flex-direction: column;
}
.entMessage {
  margin-left: 1.2rem;
  margin-top: 0.2rem;
  font-size: 1.1rem;
  color: grey;
}
.entName {
  margin-left: 1.2rem;
  font-weight: bold;
  font-size: 1.4rem;
  color: black;
}
.entInfo {
  margin-top: 0.4rem;
  text-align: left;
  display: flex;
  align-items: flex-start;
  width: 100%;
}
.img {
  text-align: right;
  flex: auto;
  margin-right: 1rem;
}
/*大容器*/
.bigbox {
  background: white;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1rem;
}
</style>
