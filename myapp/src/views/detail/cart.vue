<template>
  <div>
    <div class="cart-container">
      <div class="cart-box" @click="isShow= !isShow">
        <div class="cart-icon" :class="{'active':total}">
          <span class="iconfont icon-gouwuche11"></span>
          <span class="num" v-if="total">{{ total }}</span>
        </div>
        <div class="cart-price" :class="{'active':total}">
          <div class="price">&yen;{{ totalPrice }}</div>
          <div class="deliver">另需配送费&yen;{{ seller.fee }}</div>
        </div>
        <div class="cart-buy" :class="{'active':totalPrice > seller.price}">{{ buyDesc }}</div>
      </div>
      <div class="ball-box">
        <div v-for="(ball,index) in ballList" :key="index">
          <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ball.show">
              <div class="inner"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fade">
        <div class="cart-list-box" v-if="isShow && total">
          <div class="title">
            <span @click="clearCart()">清空购物车</span>
          </div>
          <ul class="list-box">
            <li class="list" v-for="prod in selectList" :key="prod.id">
              <span class="name">{{ prod.name }}</span>
              <span class="price">&yen;{{ prod.price }}</span>
              <add-cart :type="prod.type" :index="prod.index"></add-cart>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <div class="mask" v-if="isShow && total" @click="isShow= !isShow">
    </div>
  </div>

</template>
<script>
  import {mapGetters, mapState} from 'vuex'
  import addCart from '../../components/add-cart'
  export default {
    data(){
      return {
        isShow: false
      }
    },
    components:{
      addCart
    },
    computed: {
      ...mapGetters('product', ['totalPrice', 'total', 'selectList']),
      ...mapState('ball', ['ballList']),
      buyDesc() {
        if (this.totalPrice == 0) {
          return `¥${this.seller.price}元起送`
        } else if (this.totalPrice < this.seller.price) {
          return `还差¥${this.seller.price - this.totalPrice}元起送`
        } else {
          return '去结算'
        }

      }
    },
    props: ['seller'],
    methods: {

        beforeEnter(el){
            for(let i=0; i< this.ballList.length; i++) {
                let ball = this.ballList[i];
                if(ball.show){
                  let pos = ball.el.getBoundingClientRect();
                  let y = window.innerHeight - pos.top -23;
                  let x = pos.left - 30;
                  el.display = '';
                  el.style.transform = `translate3d(0,${-y}px,0)`;
                  let inner = el.getElementsByClassName('inner')[0];
                  inner.style.transform = `translate3d(${x}px,0,0)`;

                }
            }
        },
        enter(el,done){
            el.offsetWidth;
            this.$nextTick(()=>{
                el.style.transform = `translate3d(0,0,0)`;
                let inner = el.getElementsByClassName('inner')[0];
                inner.style.transform = `translate3d(0,0,0)`;
                el.addEventListener('transitionend', done)
            })

        },
        afterEnter(el){
            el.style.display= 'none';
            // 释放
            this.$store.commit('ball/removeBall')
        },
        clearCart(){
          this.$store.commit('product/clearList')
        }

    }
  }
</script>

<style lang="scss" scoped>
  .cart-container {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 50px;
    width: 100%;
    background-color: #3b3b3c;
    z-index: 99;

    .cart-box {
      display: flex;
      background-color: #3b3b3c;
      .cart-icon {
        width: 50px;
        height: 50px;
        border-radius: 50px;
        position: absolute;
        left: 10px;
        top: -10px;
        background-color: #656565;
        text-align: center;
        line-height: 50px;

        .num {
          position: absolute;
          right: 0;
          top: 0;
          width: 30px;
          height: 30px;
          border-radius: 100%;
          line-height: 30px;
          text-align: center;
          color: #fff;
          background-color: #fb4e44;
          transform: scale(0.5) translate(50%, -50%);
        }

        .icon-gouwuche11 {
          font-size: 28px;
          color: #c4c4c4;
        }

        &.active {
          background-color: #f8c74e;

          .icon-gouwuche11 {
            color: #3b3b3c;
          }
        }
      }

      .cart-price {
        padding-left: 70px;
        flex: 1;
        background-color: #3b3b3c;
        color: #999;

        .price {
          display: none;
        }

        .deliver {
          line-height: 50px;
          font-size: 14px;
        }

        &.active {
          .price {
            display: block;
            font-size: 24px;
            color: #fff;
            line-height: 32px;
          }

          .deliver {
            font-size: 12px;
            line-height: 16px;
          }

        }
      }

      .cart-buy {
        width: 108px;
        line-height: 50px;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        color: #999;

        &.active {
          background-color: #f8c74e;
          font-size: 18px;
          color: #3b3b3c;
          font-weight: normal;
        }
      }
    }

    .ball {
      position: fixed;
      left: 30px;
      bottom: 23px;
      transition: all 0.4s cubic-bezier(0.48,-0.28,0.73, 0.42);
      .inner {
        width: 16px;
        height: 16px;
        border-radius: 100%;
        background-color: #00a0dc;
        transition: all 0.4s linear;
      }
    }

    .cart-list-box{
      position: absolute;
      left: 0;
      bottom: 50px;
      background-color: #fff;
      z-index: -1;
      width: 100%;
      border-top:1px solid #e4e4e4;
      .title{
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        text-align: right;
        font-size: 12px;
        background-color: #f4f4f4;
        color: #2c3e50;
      }
      .list-box{
        padding: 0 10px;
      }
      .list{
        padding: 14px 0;
        border-bottom: 1px solid #f4f4f4;
        display: flex;
        .name{
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .price{
          color: #fb4e44;
          padding: 0 25px;
        }
      }
    }
    .fade-enter{
      opacity: 0;
      transform: translateY(100%);
    }
    .fade-enter-active{
      transition: all 200ms ease;
    }
    .fade-enter-to{
      opacity: 1;
      transform: translateY(0);
    }

  }
  .mask{
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(7, 17, 27, 0.6);
    backdrop-filter: blur(10px);
    z-index: 50;
  }
</style>
