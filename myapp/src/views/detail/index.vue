<template>
  <div>商家详情页</div>
</template>

<script>
  import {getStoreById} from '../../../api/detail'
  export default {
    methods:{
      getStoreMsg(){
        // 请求id this.$route.query.id
        getStoreById({id:this.$route.query.id}).then(res => {
          console.log(res)
        })
      }
    },
    created() {
      this.getStoreMsg()
    }

  }
</script>

<style lang="scss" scoped>

</style>
