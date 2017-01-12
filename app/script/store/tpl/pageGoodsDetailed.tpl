<main class="viewport">
    <div class="slide-con" id="goodsSlide"></div>
    <div class="pro-tit">
        <div class="row">
            <div class="column-left">{{name}}</div>
            <div class="column-right"><i class="icon icon-coins"></i>{{score}}</div>
        </div>
        <div class="row">
            <div class="column-left">{{nameRemark}}</div>
            <div class="column-right">{{#if showRealPrice}}¥{{realPrice}}{{/if}}</div>
        </div>
    </div>
    <div class="pro-cont">
        {{{goodsRemark}}}
    </div>
</main>
<footer class="operate-con">
    {{helper-buyBtn}}
</footer>
<input id="slideImgList" type="hidden" value="{{stringify picUrls}}">