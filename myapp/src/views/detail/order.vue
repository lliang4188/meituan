<template>
    <div>
        <div class="order-box">
            <div class="menu-box" ref="menuBox">
                <ul>
                    <li class="menu-list"
                        :class="{'active': currentIndex == index}"
                        v-for="(item,index) in productList"
                        :key="index"
                        @click="changeMenu(index)">{{item.name}}</li>

                </ul>
            </div>
            <div class="prod-box" ref="proBox">
                <ul>
                    <li class="cate-list" v-for="(item,typeIndex) in productList" :key="typeIndex">
                        <div class="cate-title">{{ item.name }}</div>
                        <ul>
                            <li class="prod-list"  v-for="(prod, index) in item.content" :key="prod.id">
                                <div class="prod-img-box">
                                    <img :src="prod.img" :alt="prod.name">
                                </div>
                                <div class="prod-info">
                                    <h4 class="name">{{ prod.name }}</h4>
                                    <div class="sale"><span class="num">销量{{prod.num}}</span><span>赞{{prod.up}}</span></div>
                                    <div class="price">&yen;{{prod.price}}</div>
                                </div>
                                <div class="add-cart-container">
                                    <add-cart :type="typeIndex" :index="index"></add-cart>
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
  import addCart from '../../components/add-cart'
  export default {
    components:{
      addCart
    },
    data(){
      return{
        menuScroll: null,
        prodScroll: null,
        currentIndex: 0,
        posY: [],
        menuList: [],
        scrollY: 0
      }
    },
    methods:{
      initScroll(){
        this.menuScroll = new BScroll('.menu-box',{
          bounce: false
        });
        this.prodScroll = new BScroll('.prod-box',{
          bounce:false,
          probeType: 3
        });
        // 获取右侧每个分类的垂直方方向的位置
        this.getPosY();
        // 获取左侧列表
        this.menuList = this.$refs.menuBox.getElementsByClassName('menu-box');

        this.prodScroll.on('scroll', e => {
          this.scrollY = Math.abs(Math.round(e.y));
        })
      },
      changeMenu(index){
           let prodList = this.$refs.proBox.getElementsByClassName('cate-list');
           let el = prodList[index];
           this.prodScroll.scrollToElement(el, 300)
        this.currentIndex = index
      },
      getPosY(){
        let prodList = this.$refs.proBox.getElementsByClassName('cate-list');
        let y = 0;
        for (let  i=0; i<prodList.length; i++) {
          if(i==0){
            this.posY.push(y);
          } else {
            let prevEle = prodList[i-1];
            y += prevEle.offsetHeight;
            this.posY.push(y);
          }
        }
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
    },
    watch:{
      scrollY(val){

        for(let i=0; i< this.posY.length; i++){
          // console.log(val);
          let pos1 = this.posY[i];
          let pos2 = this.posY[i+1];
          if(pos1 <= val && pos2 > val) {
            let el = this.menuList;
            this.menuScroll.scrollToElement(el, 300, 0, -100);
            this.currentIndex = i;
            break;
          }

        }
      }
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
                    position: relative;
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
                    .add-cart-container{
                        position: absolute;
                        right:0;
                        bottom: 0;
                    }
                }
            }

        }
    }
</style>