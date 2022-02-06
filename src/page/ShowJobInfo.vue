<!--  -->
<template>
  <div class="bigbox" v-cloak>
    <van-sticky :offset-top="0.0001" class="headerTitile">
      <van-nav-bar title="职位详细">
        <template #left>
          <van-icon name="arrow-left" color="black" size="24" @click="goto()" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="content">
      <div class="jobInfo">
        <div class="rpName">{{ this.$route.params.itemObj.rpName }}</div>
        <div class="rpInfo">
          <span style="color: #ff9912">{{ salaryList[0] }}K-{{ salaryList[1] }}K</span>/{{
            this.$route.params.itemObj.workAddress
          }}/{{ this.$route.params.itemObj.experience }}/{{
            this.$route.params.itemObj.education
          }}
        </div>
      </div>

      <div class="jobDescri">
        <div class="jobDescriName">职位描述</div>
        <div style="margin-top: 0.7rem">
          <p class="jobDlength">
            {{ this.$route.params.itemObj.jobResponsibilities }}
          </p>
        </div>
      </div>
      <div class="hr">
        <div class="hrTitle">职位发布者</div>
        <div class="hrContent">
          <div>
            <van-image
              round
              width="4rem"
              height="4rem"
              :src="this.hr.hrImg"
            />
          </div>
          <div class="hrInfo">
            <div style="font-weight: bold; font-size: 1.1rem">{{ this.hr.hrName }}</div>
            <div style="margin-top: 0.4rem; color: grey">
              最近活跃:&nbsp;&nbsp;{{ this.time }}
            </div>
          </div>
        </div>
      </div>
      <div class="workAddress">
        <div class="workAddressName">工作地址</div>
        <div class="trueAddress">
          {{ this.$route.params.itemObj.workAddress }}
        </div>
      </div>
    </div>
      <div class="footer">
         <el-button type="danger" @click="delPostion()" >删除</el-button>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'show-job',
  props: ['itemObj', 'buttonjug'],
  components: {},
  data () {
    // 这里存放数据
    return {
      salaryList: this.$route.params.itemObj.salary.split('-'),
      hr: {},
      time: '',
      rpForm: {
        eid: this.$route.params.itemObj.eid,
        hrid: this.$route.params.itemObj.hrid,
        rpid: this.$route.params.itemObj.rpid,
        rpName: this.$route.params.itemObj.rpName,
        workAddress: this.$route.params.itemObj.workAddress,
        education: this.$route.params.itemObj.education,
        salary: this.$route.params.itemObj.salary,
        experience: this.$route.params.itemObj.experience,
        entName: this.$route.params.itemObj.entName,
        entImg: ''

      }
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate () {
  },
  created () {
    setTimeout(() => {
      this.selectHr()
      // this.getState()
    }, 11)
  },
  // 方法集合
  methods: {
    delPostion () {
        const params = new URLSearchParams()
      params.append('rpid', this.rpForm.rpid)
      this.$dialog.confirm({
        message: '是否删除'
      })
        .then(() => {
           this.axios
        .post('/api/position/delPostion',params
        )
        .then((res) => {
          if (res.data.code === '000000') {
          this.$notify({ type: 'success', message: '删除成功' })
           this.$router.replace({path:'/showJob'})
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
    goto () {
      this.$router.go(-1)
    },
    selectHr () {
      this.axios
        .get('/api/hr/selectHrInfoByHrId', {
          params: { hrid: this.$route.params.itemObj.hrid }
        })
        .then((res) => {
          if (res.data.code === '000000') {
            this.hr = res.data.data
            this.getTime()
          } else if (res.data.code === '111111') {
            this.$notify({ type: 'warning', message: res.data.message })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getTime () {
      var date1 = new Date()
      var date = new Date(this.hr.lastLogin)
      var date2 = date1.getTime() - date.getTime()
      var days = Math.floor(date2 / (24 * 3600 * 1000))
      if (days < 1) {
        var leave1 = date2 % (24 * 3600 * 1000)
        var hours = Math.floor(leave1 / (3600 * 1000))
        this.time = hours + '小时之前'
      } else {
        this.time = days + '天之前'
      }
    },

  }
}
</script>
<style lang="less" scoped>
/deep/ .el-button{
  width: 80%;
  margin-bottom: 1rem;
}
.footer{
  position: fixed;
  bottom: 0;
  width: 100%;
  line-height: var(--footer-height);
  text-align: center;
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
/** HR信息 */
.hrInfo {
  margin-top: 0.2rem;
  margin-left: 1rem;
}
.hrContent {
  display: flex;
  flex-direction: flex-start;
  margin-top: 1rem;
}
.hr {
  margin-left: 1.2rem;
  text-align: left;
  margin-top: 2rem;
}
.hrTitle {
  font-size: 1.4rem;
  font-weight: bold;
  color: black;
}
/**职位描述 */
.jobDlength {
  width: 20rem;
  font-size: 1.07rem;
}
.jobDescri {
  margin-left: 1.2rem;
  text-align: left;
  margin-top: 2rem;
}
.jobDescriName {
  font-size: 1.4rem;
  font-weight: bold;
  color: black;
}
/*职业信息 */
.jobInfo {
  margin-left: 1.2rem;
  text-align: left;
}
.rpInfo {
  margin-top: 0.1rem;
  font-size: 1.12rem;
}
.rpName {
  font-size: 2rem;
  font-weight: bold;
  color: black;
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
  margin-top: 2rem;
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
}
.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1rem;
}
</style>
