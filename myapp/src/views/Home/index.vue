<template>
  <div>
   <!-- header-->
    <van-sticky :offset-top="0">
      <div class="header">
        <input type="text" class="search" placeholder="请输入商家或商品名称">
      </div>
    </van-sticky>
    <div style="height: 1000px"></div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="scss" scoped>
  .header{
    background-color: #1c1b20;
    padding: 0.2rem;
    height: 0.6rem;
      .search{
        width: 100%;
        border: none;
        height: 0.6rem;
        line-height: 0.6rem;
        padding: 0 0.2rem;
        border-radius: 0.3rem;
        box-sizing: border-box;
        vertical-align: top;
      }
  }
</style>
