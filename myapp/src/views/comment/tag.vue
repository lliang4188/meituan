<template>
    <div class="tag-box">
        <span class="tag-item active">全部（10）</span>
        <span class="tag-item">全部（10）</span>
        <span class="tag-item">全部（10）</span>
    </div>
</template>

<script>
  export default {
  }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .tag-box{
        padding: 0.3rem 0.28rem 0.1rem;
        .tag-item{
            padding: 0 0.24rem;
            display: inline-block;
            height: 0.52rem;
            border-radius: 0.52rem;
            line-height: 0.52rem;
            font-size: 0.26rem;
            color: #666;
            margin: 0  0.2rem 0.2rem 0;
            @include border-fix(#bbb, 0.52rem);
            &.active{
                @include border-fix(#f8c74e, 0.52rem);
                background-color: lighten(#f8c74e, 35%);
                color: #f8c74e;
            }
        }
    }
</style>