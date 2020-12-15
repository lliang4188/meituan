<template>
    <div>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getData"
        >
        <ul class="list-container">
            <li class="shop-list" v-for="item in list" :key="item.id" @click="goDetail(item.id)">
                <div class="img-box">
                    <img :src="item.img" :alt="item.name">
                </div>
                <div class="info-box">
                    <h4 class="title">{{item.name}}</h4>
                    <div class="rate-box">
                        <div>
                            <star :score="item.packing_score"></star>
                            <span class="rate">{{item.packing_score}}分</span>
                            <span>月销{{item.num}}</span>
                        </div>
                        <div>
                            <span>{{ item.minute }}分钟</span>
                            <span class="left-line">{{ item.distance }}</span>
                        </div>
                    </div>
                    <div class="distribution-box">
                        <span>起送{{item.per_capita}}</span>
                        <span class="left-line">配送{{ item.free }}</span>
                        <span class="left-line">人均{{item.price}}</span>
                    </div>
                </div>
            </li>
        </ul>
        </van-list>
    </div>
</template>

<script>
  import star from '../../components/star/index'
  import {getStore} from "../../../api/home"
  export default {
    components:{
      star
    },
    data(){
      return {
        current:0,
        size: 10,
        list: [],
        loading: false,
        finished: false,
        total: 0
      }

    },

    methods: {
      //获取商家列表
      getData(){
        getStore({
          current: this.current,
          size: this.size
        }).then(res => {

          // this.list= res.data.list
          this.list = this.list.concat(res.data.list)
          this.loading = false
          this.current++
          this.total = res.data.total
          if(this.list.length >= this.total){
            this.finished = true
          }
        })
      },
      goDetail(id){
          this.$router.push({path:'/detail', query:{id}})
      }

    }
    // created() {
    //   this.getData();
    // }
  }
</script>

<style lang="scss" scoped>
    .list-container{
        padding: 0 0.2rem;
        .shop-list{
            margin: 0.2rem 0 0.5rem;
            display: flex;
            .img-box{
                width: 1.52rem;
                height: 1.14rem;
                background-color: #ccc;
                margin-right: 0.16rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .info-box{
                flex: 1;
                .title{
                    font-size: 0.32rem;
                    color: #333;
                    line-height: 1.4;
                    font-weight: 600;
                }
                .rate-box, .distribution-box{
                    display: flex;
                    font-size: 12px;
                    line-height: 1.4;
                    color: #666;
                    .rate{
                        margin-right: 0.2rem;
                    }
                    .left-line{
                       &:before{
                           content: '';
                           width: 1px;
                           height: 6px;
                           display: inline-block;
                           background-color: #ccc;
                           vertical-align: middle;
                           vertical-align: middle;
                           margin: 0 0.1rem;
                       }
                    }

                }

                .rate-box{
                    justify-content: space-between;
                }
            }
        }
    }
</style>
