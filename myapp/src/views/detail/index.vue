<template>
  <div class="scrollBox">
    <div>
      <seller-header :seller="seller"></seller-header>
      <van-tabs v-model="active" type="line" sticky animated border color="#ffda41">
        <van-tab title="菜单">
          <order></order>
        </van-tab>
        <van-tab title="评价">
          <comment></comment>
        </van-tab>
        <van-tab title="商家">
          <seller :seller="seller"></seller>
        </van-tab>
      </van-tabs>
    </div>
    <cart :seller="seller" v-if="active == 0"></cart>
  </div>
</template>

<script>
  import {getStoreById} from '../../../api/detail'
  import sellerHeader from './seller-header'
  import order from './order'
  import cart from "./cart";
  import seller from '../seller/index'
  import comment from '../comment/index'
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
      order,
      cart,
      comment,
      seller
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
          click: true
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
    overflow: hidden;
  }
</style>
