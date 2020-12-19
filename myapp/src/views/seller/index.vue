<template>
    <div class="seller-box">
        <div>
            <ul class="list-box">
                <li class="list">
                    <span class="iconfont icon-weizhi"></span>
                    <span class="text">{{seller.address}}</span>
                </li>
            </ul>
            <ul class="list-box">
                <li class="list">
                    <span class="iconfont icon-peisong1"></span>
                    <span class="text">配送服务：{{ seller.server }}</span>
                </li>
                <li class="list">
                    <span class="iconfont icon-shijian_huaban"></span>
                    <span class="text">配送时间：{{seller.delivery_time }}</span>
                </li>
            </ul>
            <ul class="list-box">
                <li class="list">
                    <span class="iconfont icon-jian2"></span>
                    <span class="text">{{ seller.full }}</span>
                </li>
                <li class="list">
                    <span class="iconfont icon-shouci"></span>
                    <span class="text">{{ salesArray[1] }}</span>
                </li>
                <li class="list">
                    <span class="iconfont icon-xin"></span>
                    <span class="text">{{ salesArray[0] }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
  export default {
    props:['seller'],
    computed:{
      salesArray(){
        return this.seller.sales.split(',')
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .seller-box{
        /*height: calc(100vh - 44px);*/
        padding: 0 0.3rem;
        overflow: hidden;
        .list-box{
            padding-top: 0.36rem;
            @include border-bottom-1px(#ebedf0);
            .list{
                padding-bottom: 0.36rem;
                color: #333;
                display: flex;
                .iconfont{
                    color: #c3c3c3;
                    margin-right: 0.28rem;
                }
                .text{
                    flex: 1;
                    min-width: 0;
                    line-height: 1.2;
                }
                .icon-jian2{
                    color: #fb4d41;
                }
                .icon-xin,.icon-shouci{
                   color: #e95200;
                }

            }
        }
    }
</style>