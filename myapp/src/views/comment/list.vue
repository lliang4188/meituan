<template>
    <div class="list-box">
        <ul class="content">
            <li v-for="item in list" :key="item.id" class="list">
                <div class="img-box">
                    <img :src="item.portrait" :alt="item.id">
                </div>
                <div class="info-box">
                    <div class="basic">
                        <span class="name">{{item.name}}</span>
                        <span class="date">{{item.time}}</span>
                    </div>
                    <div class="time">{{item.duration}}分钟</div>
                    <div class="desc">{{item.content}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
      props:['list']
  }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .list-box{
        @include border-top-1px(#e4e4e4);
        .content{
            padding: 0 0.3rem;
            .list{
                display: flex;
                padding: 0.3rem 0 0.2rem;
                .img-box{
                    width: 0.8rem;
                    flex:0 0 0.8rem;
                    margin-right: 0.2rem;
                    img{
                        width: 100%;
                        border-radius: 100%;
                    }
                }
                .info-box{
                    flex: 1;
                    min-width: 0;
                    .basic{
                        display: flex;
                        justify-content: space-between;
                        color: #2f2f2f;
                        font-size: 0.32rem;
                        .date{
                            color: #898989;
                            font-size: 0.24rem;
                        }
                    }
                    .time{
                        font-size: 0.24rem;
                        line-height: 0.36rem;
                        color: #999;
                    }
                    .desc{
                        line-height: 0.4rem;
                        color: #2f2f2f;
                        padding:0.16rem 0;
                    }
                }
            }

        }
    }
</style>
