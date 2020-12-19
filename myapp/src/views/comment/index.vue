<template>
    <div class="commentBox" ref="commentBox">
        <div>
            <score :delivery="comment.delivery" :flavor="comment.flavor" :score="comment.score" :packing="comment.packing" ></score>
            <div class="tag-container">
                <tag :tag="comment.label" :currentType="type" @change="change"></tag>
            </div>
            <list :list="comment.rate"></list>
        </div>

    </div>
</template>

<script>
  import score from "./score";
  import tag from "./tag";
  import list from "./list";
  import {getComment} from "../../../api/comment";
  import BScroll from 'better-scroll';
  export default {
    data(){
      return{
          type: 1, // 全部
          comment:{},
        commentScroll: null

      }
    },
    components:{
      score,
      tag,
      list
    },
    methods:{
        getData(){
           return  new Promise(resolve => {
              getComment({
                id:this.$route.query.id,
                type:this.type
              }).then(res=>{
                // console.log(res.data)
                this.comment = res.data;
                resolve();
              })

            })

        },
      initScroll(){
        this.commentScroll = new BScroll(this.$refs.commentBox,{
          bounce: false
        })
      },
      change(id){
          // console.log(id)
        this.type = id;
        this.getData().then(()=>{
          this.$nextTick(()=>{
            this.initScroll();
          })
        });
      }


    },
    created() {
        this.getData().then(()=>{
          this.$nextTick(()=>{
            this.initScroll();
          })

        });
    }
  }
</script>

<style lang="scss" scoped>
    .tag-container{
        border-top: 0.2rem solid #f4f4f4;
    }
    .commentBox{
        height: calc(100vh - 44px);

    }
</style>
