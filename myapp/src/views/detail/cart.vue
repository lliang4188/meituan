<template>
    <div class="cart-container">
       <div class="cart-box">
           <div class="cart-icon" :class="{'active':total}">
               <span class="iconfont icon-gouwuche11"></span>
               <span class="num" v-if="total" >{{ total }}</span>
           </div>
           <div class="cart-price" :class="{'active':total}">
               <div class="price">&yen;{{ totalPrice }}</div>
               <div class="deliver">另需配送费&yen;{{ seller.fee }}</div>
           </div>
           <div class="cart-buy" :class="{'active':totalPrice > seller.price}">{{ buyDesc }}</div>
       </div>
    </div>
</template>
<script>
    import { mapGetters} from 'vuex'
  export default {
      computed: {
        ...mapGetters('product',['totalPrice','total']),
        buyDesc(){
          if(this.totalPrice == 0){
            return `¥${this.seller.price}元起送`
          } else if (this.totalPrice < this.seller.price){
            return `还差¥${this.seller.price-this.totalPrice}元起送`
          }else {
            return '去结算'
          }

        }
      },
     props: ['seller']
  }
</script>

<style lang="scss" scoped>
    .cart-container{
        position: fixed;
        left: 0;
        bottom: 0;
        height: 50px;
        width: 100%;
        background-color: #3b3b3c;
        .cart-box{
            display: flex;
            .cart-icon{
                width: 50px;
                height: 50px;
                border-radius: 50px;
                position: absolute;
                left: 10px;
                top:-10px;
                background-color: #656565;
                text-align: center;
                line-height: 50px;
                .num{
                    position: absolute;
                    right: 0;
                    top:0;
                    width: 30px;
                    height: 30px;
                    border-radius: 100%;
                    line-height: 30px;
                    text-align: center;
                    color: #fff;
                    background-color: #fb4e44;
                    transform: scale(0.5) translate(50%, -50%);
                }
                .icon-gouwuche11{
                    font-size: 28px;
                    color: #c4c4c4;
                }
                &.active{
                    background-color: #f8c74e;
                    .icon-gouwuche11{
                        color: #3b3b3c;
                    }
                }
            }
            .cart-price{
                padding-left: 70px;
                flex: 1;
                color: #999;
                .price{
                    display: none;
                }
                .deliver{
                    line-height: 50px;
                    font-size: 14px;
                }
                &.active{
                    .price{
                        display: block;
                        font-size: 24px;
                        color: #fff;
                        line-height: 32px;
                    }
                    .deliver{
                        font-size: 12px;
                        line-height: 16px;
                    }

                }
            }
            .cart-buy{
                width: 108px;
                line-height: 50px;
                font-size: 14px;
                font-weight: bold;
                text-align: center;
                color: #999;
                &.active{
                    background-color: #f8c74e;
                    font-size: 18px;
                    color: #3b3b3c;
                    font-weight: normal;
                }
            }
        }
    }
</style>