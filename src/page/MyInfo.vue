<template>
  <div class="mybody">
    <span class="mytitle">企业信息</span>
    <div class="content">
      <div class="person">
        <div class="imgdiv">
          <van-uploader :after-read="afterRead" >
          <el-avatar
            :size="60"
            :src="userObject.entImg"
          ></el-avatar>
          </van-uploader>
        </div>
        <div class="namecss">{{ userObject.entName }}</div>
      </div>
      <div class="qiuzhi">
        <van-divider />
        <div class="qicon1" @click="goToEnt">
          <van-icon name="manager-o" size="2.5rem"  />
          <div class="text">企业信息</div>
        </div>
        <van-divider />
        <div class="qicon2" @click="goToShowJob">
          <van-icon name="bag-o" size="2.5rem" />
          <div class="text">职位查看</div>
        </div>
        <van-divider />
        <div class="qicon2" @click="goToPassHr">
          <van-icon name="label-o" size="2.5rem" />
          <div class="text">HR审核</div>
        </div>
        <van-divider />
            <div class="qicon2" @click="goToMyHr">
          <van-icon name="friends-o" size="2.5rem" />
          <div class="text">HR管理</div>
        </div>
        <van-divider />
        <div class="qicon2" @click="goToUpdataPass">
          <van-icon name="setting-o" size="2.5rem" />
          <div class="text">修改密码</div>
        </div>
        <van-divider />
        <div class="qicon2" @click="logout">
          <van-icon name="cross" size="2.5rem" />
          <div class="text">退出登陆</div>
        </div>
        <van-divider />
      </div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用

  data() {
      // 这里存放数据
     const afterRead = (file) => {
      // 此时可以自行将文件上传至服务器
      const params = new FormData();

      params.append("files",file.file)
      params.append("hrImg",this.userObject.hrImg)
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };
      this.axios
        .post("/api/upload/img",params,config)
        .then((res) => {
          if (res.data.code === "000000") {
          this.$notify({ type: 'success', message: '上传成功' })
           setTimeout(() => {
                  this.$router.go(0)
          }, 50);

          }else if (res.data.code === "111111"){
          this.$notify({ type: 'warning', message: res.data.message })
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    return {
      userObject: {},
      age: "",
      education: "",
      sex: "",
      edList: [],
      afterRead
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    setTimeout(() => {
      this.entInfo();
    }, 50);
  },
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
    logout() {
      this.axios
        .get("/api/user/logout")
        .then((res) => {
          if (res.data.code === "000000") {
            this.$notify({ type: "success", message: "退出成功" });
            this.$router.push("/");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    entInfo() {
      this.axios
        .get("/api/user/getEntInfo")
        .then((res) => {
          if (res.data.code === "000000") {
            this.userObject = res.data.data;
              localStorage.setItem('eid',this.userObject.eid)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    goToMyHr(){
      this.$router.push({ name: "myHr" });
    },
    goToEnt(){
   this.$router.push({ name: "updataEnt",params:{entInfo:this.userObject}});
    },
    goToPassHr() {
      this.$router.push({ name: "passHr" });
    },
    goToUpdataPass(){
            this.$router.push({ name: "updataPass" });
    },
    goToShowJob() {
      this.$router.push({ name: "showJob" ,params:{eid: this.userObject.eid}});
    },  logout () {
      this.axios
        .get('/api/user/logout')
        .then((res) => {
          if (res.data.code === '000000') {
            this.$notify({ type: 'success', message: '退出成功' })
            this.$router.push('/user/login')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
  },
};
</script>
<style lang="less" scoped>
.logout {
  height: 3rem;
  width: 40%;
  font-size: 1.5rem;
}
.qtitle {
  font-size: 1.2rem;
  margin-left: 1.4rem;
  margin-top: 0.5rem;
  color: black;
  font-weight: bold;
}
.namecss {
  font-size: 1.4rem;
  width: 15rem;
  height: 2rem;
  float: left;
  margin-left: 0.8rem;
  margin-top: 2rem;
}
.namecss2 {
  font-size: 1rem;
  width: 10rem;
  height: 2rem;
  float: left;
  margin-left: 0.8rem;
  margin-top: 0.4rem;
}
.imgdiv {
  margin-left: 0.8rem;
  margin-top: 0.8rem;
  width: 5rem;
  height: 5rem;
  float: left;
}
.mytitle {
  font-size: 1.4rem;
  color: white;
  padding-top: 1rem;
  display: block;
}
.mybody {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
}
.content {
  display: flex;
  justify-content: space-evenly;
  /*交叉轴上对齐方式为居中*/
  align-items: center;
  flex-direction: column;
}
.person {
  background: white;
  height: 7rem;
  width: 96%;
  border-radius: 0.4rem;
  margin-top: 1.8rem;
  text-align: left;
}

.qiuzhi {
  display: flex;
  flex-direction: column;
  height: 40rem;
  width: 100%;
  margin-top: 1rem;
  border-radius: 0.4rem;
  text-align: left;
}
.qicon1 {
  background: white;

  margin-top: 1rem;
  display: flex;
  align-self: flex-start;
  margin-left: 1rem;
}
.qicon2 {
  margin-top: 1rem;
  display: flex;
  align-self: flex-start;
  margin-left: 1rem;
}
.text {
  margin-left: 1rem;
  font-size: 1.4rem;
}
</style>
