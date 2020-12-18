<template>
    <div>
        <score></score>
        <div class="tag-container">
            <tag></tag>
        </div>
        <list></list>
    </div>
</template>

<script>
  import score from "./score";
  import tag from "./tag";
  import list from "./list";
  export default {
    components:{
      score,
      tag,
      list
    }
  }
</script>

<style lang="scss" scoped>
    .tag-container{
        border-top: 0.2rem solid #f4f4f4;
    }
</style>