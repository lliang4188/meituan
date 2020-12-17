<template>
    <div class="add-cart">
        <span class="iconfont icon-jian1" v-if="product.count" @touchstart="start($event)" @touchend.stop.prevent="reduceStop($event)"></span>
        <span class="num"  v-if="product.count">{{ product.count }}</span>
        <span class="iconfont icon-jiahao" @touchstart="start($event)" @touchend.stop.prevent="addStop($event)" ></span>
    </div>
</template>

<script>
  export default {
    props:['type', 'index'],
    computed:{
      product(){
        return this.$store.state.product.productList[this.type].content[this.index]
      }
    },
    methods:{
      addCart(){
        this.$store.commit('product/addCart',{type:this.type, index:this.index})
      },
      reduceCart(){
        this.$store.commit('product/reduceCart',{type:this.type, index:this.index})
      },
      start ($event) {
        this.startY = $event.touches[0].pageY
      },

      addStop ($event) {
        const moving = Math.abs($event.changedTouches[0].pageY - this.startY)
        if (moving > 20) return
        this.startY = 0
        this.addCart()
      },
      reduceStop ($event) {
        const moving = Math.abs($event.changedTouches[0].pageY - this.startY)
        if (moving > 20) return
        this.startY = 0
        this.reduceCart()
      }
    }
  }
</script>

<style lang="scss" scoped>
    .add-cart{
        .iconfont{
            font-size: 0.48rem;
            padding: 0.18rem;
            vertical-align: middle;
        }
        .icon-jian1{
            color: #e2e3e5;
        }
        .icon-jiahao{
            color: #f8c74e;
            margin-right:-0.18rem;
        }
        .num{
            vertical-align: middle;
        }
    }
</style>