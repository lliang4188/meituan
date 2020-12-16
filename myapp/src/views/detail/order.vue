<template>
    <div>
        <div class="order-box">
            <div class="menu-box">
                <ul>
                    <li class="menu-list" v-for="(item,index) in productList" :key="index">{{item.name}}</li>

                </ul>
            </div>
            <div class="prod-box">
                <ul>
                    <li class="cate-list" v-for="(item,index) in productList" :key="index">
                        <div class="cate-title">{{ item.name }}</div>
                        <ul>
                            <li class="prod-list"  v-for="prod in item.content" :key="prod.id">
                                <div class="prod-img-box">
                                    <img :src="prod.img" :alt="prod.name">
                                </div>
                                <div class="prod-info">
                                    <h4 class="name">{{ prod.name }}</h4>
                                    <div class="sale"><span class="num">销量{{prod.num}}</span><span>赞{{prod.up}}</span></div>
                                    <div class="price">&yen;{{prod.price}}</div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  export default {
    data(){
      return{
        menuScroll: null,
        prodScroll: null
      }
    },
    methods:{
      initScroll(){
        this.menuScroll = new BScroll('.menu-box',{
          bounce: false,
          click: true
        });
        this.prodScroll = new BScroll('.prod-box',{
          bounce:false,
          click: true
        });
      }
    },
    computed:{
      ...mapState('product',['productList'])
    },
    created() {
      this.$store.dispatch('product/getProdList',this.$route.query.id).then(() =>{
        // 初始化 betterScrollr
        this.$nextTick(()=>{
                 this.initScroll()
        })
      })
    }
  }
</script>

<style lang="scss" scoped>
    .order-box{
        display: flex;
        height: calc(100vh - 44px);
        .menu-box{
            width: 1.6rem;
            background-color: #f5f5f5;
            flex: 0 0 1.6rem;
            height: calc(100vh - 94px);
            overflow: hidden;
            .menu-list{
                color: #2c3e50;
                font-size: 0.26rem;
                padding: 0.2rem 0.24rem 0.3rem;
                line-height: 0.36rem;
                &.active{
                    color: #f00;
                    background-color: #fff;
                }
            }
        }
        .prod-box{
            flex: 1;
            min-width: 0;
            background-color: #fff;
            height: calc(100vh - 94px);
            overflow: hidden;
            .cate-list{
                padding: 0 0.2rem;
                .cate-title{
                    height: 0.72rem;
                    line-height: 0.72rem;
                    font-size: 0.28rem;
                    color:#666;
                }
                .prod-list{
                    display: flex;
                    margin-bottom: 0.4rem;
                    .prod-img-box{
                        width: 1.5rem;
                        flex:0 0 1.5rem;
                        margin-right: 0.15rem;
                        img{
                            width: 100%;
                        }
                    }
                    .prod-info{
                        flex:1;
                        min-width: 0;
                        .name{
                            font-size: 0.32rem;
                            color: #333;
                            font-weight: bold;
                            height: 0.45rem;
                            line-height: 0.45rem;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        .sale{
                            color: #666;
                            font-size: 12px;
                            margin-bottom: 0.06rem;
                            .num{
                                margin-right: 0.2rem;
                            }
                        }
                        .price{
                            font-size: 0.36rem;
                            color:#fb4e44;
                        }
                    }
                }
            }

        }
    }
</style>