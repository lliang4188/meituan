<template>
  <div>
   <!-- header-->
    <van-sticky :offset-top="0">
      <div class="header">
        <input type="text" class="search" placeholder="请输入商家或商品名称">
      </div>
    </van-sticky>
    <category></category>
    <h2 class="list-title">附近商家</h2>
    <list></list>
  </div>
</template>

<script>
  import category from './category'
  import list from "./list";
  export default {
    components:{
      category,
      list
    }
  }
</script>

<style lang="scss" scoped>
  .header{
    background-color: #1c1b20;
    padding: 0.2rem;

      .search{
        width: 100%;
        border: none;
        height: 0.6rem;
        line-height: 0.6rem;
        padding: 0 0.2rem;
        border-radius: 0.3rem;
        box-sizing: border-box;
        display: block;
      }
  }
  .list-title{
      font-size: 0.34rem;
      font-weight: 800;
      line-height: 0.46rem;
      text-align: center;
      margin: 0.3rem 0 0.1rem;
      color: #333;
      &:before,&:after{
          content: '';
          height: 1px;
          transform: scaleY(0.5);
          width: 0.5rem;
          display: inline-block;
          vertical-align: middle;
          background-color: #999;
      }
  }
</style>
