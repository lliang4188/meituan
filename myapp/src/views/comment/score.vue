<template>
    <div class="score-box">
        <div class="seller-score">
            <p class="num">{{ score }}</p>
            <p class="desc">商家评分</p>
        </div>
        <div class="pack-score">
            <div class="item">
                <span>口味</span>
                <star :score="flavor"></star>
                <span>{{ flavor }}</span>
            </div>
            <div class="item">
                <span>包装</span>
                <star :score="packing"></star>
                <span>{{packing}}</span>
            </div>
        </div>
        <div class="deliver-score">
            <p class="num">{{ delivery }}</p>
            <p class="desc">配送评分</p>
        </div>
    </div>
</template>

<script>
    import star from '../../components/star'
  export default {
      props:['delivery','score','flavor', 'packing'],
      components:{
        star
      }
  }
</script>

<style lang="scss" scoped>
    .score-box{
        display: flex;
        background-color: #fff;
        padding: 0.3rem;

        .seller-score,.deliver-score{
            border-left: 1px solid #ccc;
            width: 1.86rem;
            flex: 0 0 1.86rem;
            text-align: center;
            .num{
                font-size: 0.54rem;
                height: 0.6rem;
                line-height: 0.6rem;
                font-weight: 600;
                color: #999;
            }
            .desc{
                font-size: 0.24rem;
                color: #999;
            }
        }
        .seller-score{
            border:none;
            .num{
                color: #f8c74e;
            }
        }
        .pack-score{
            flex: 1;
            font-size: 0.26rem;
            color: #666;
            .item{
                margin: 0.06rem 0;
            }
        }

    }

</style>
