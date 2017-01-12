
<ul class="goods-list">
    {{#each list}}
        <li {{#lessEqual quantity 0}}class="sold-out"{{/lessEqual}}>
            <a href="goodsDetailed.html?type={{type}}&id={{goodsId}}">
                {{#if cornerMark}}<div class='Angle'><span>{{cornerMark}}</span></div>{{/if}}
                <div class="pic"><img src="{{picUrl}}" alt=""/></div>
                <div>
                    <p class="tit">{{name}}</p>
                    <p class="describe">{{nameRemark}}</p>
                    <p class="amount"><i class="icon icon-coins"></i>{{score}}</p>
                    {{!--<dd class="operation">兑换</dd>--}}
                </div>
                {{!--@360h_324w.png--}}
            </a>
        </li>
    {{/each}}
</ul>
