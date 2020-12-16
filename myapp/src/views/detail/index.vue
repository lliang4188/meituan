<template>
  <div class="scrollBox">
    <div>
      <seller-header :seller="seller"></seller-header>
      <van-tabs v-model="active" type="line" sticky animated border color="#ffda41">
        <van-tab title="菜单">
          <order></order>
        </van-tab>
        <van-tab title="评价">内容 2</van-tab>
        <van-tab title="商家">内容 3</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  import {getStoreById} from '../../../api/detail'
  import sellerHeader from './seller-header'
  import order from './order'
  import BScroll from 'better-scroll'
  export default {
    data(){
      return {
        active: 0,
        seller:[],
        scrollBox: null
      }
    },
    components:{
      sellerHeader,
      order
    },
    methods:{
      getStoreMsg(){
        // 请求id this.$route.query.id
        getStoreById({id:this.$route.query.id}).then(res => {
          this.seller = res.data
        })
      }
    },
    mounted() {
      setTimeout(()=>{
        this.scrollBox = new BScroll('.scrollBox',{
          bounce:false,
          click:true
        },20)
      })

    },
    created() {
      this.getStoreMsg()
    }

  }
</script>

<style lang="scss" scoped>
  .scrollBox{
    height: 100vh;
  }
</style>
