<ul class="goods-list">
    {{#each list}}
        <li {{#lessEqual quantity 0}}class="sold-out"{{/lessEqual}}>
            {{#equal hasAddress 0  }}
                {{#equal type 2}}
                <a class="btn">请填写收货地址</a>
                {{/equal}}
            {{/equal}}
            <a href="{{checkAddress hasAddress type}}{{orderNo}}" data-id="{{orderNo}}">
                <dl>
                    <dt class="tit">{{name}}</dt>
                    {{#equal type 3}}
                        <dd class="describe">有效期至{{dateFormat validTime 'yyyy年MM月dd日'}}</dd>
                    {{else}}
                        <dd class="describe">{{nameRemark}}</dd>
                    {{/equal}}
                    {{!--<dd class="amount"><i class="icon icon-coins"></i>{{score}}</dd>--}}
                    {{!--<dd class="clinch">成交时间: {{dateFormat addTime 'yyyy-MM-dd HH:mm'}}</dd>--}}

                    <dd class="clinch"><i>实付款：</i>{{realPay}}</dd>
                </dl>
                <div class="pic"><img src="{{picUrl}}" alt=""/></div>
            </a>
        </li>
    {{/each}}
</ul>
