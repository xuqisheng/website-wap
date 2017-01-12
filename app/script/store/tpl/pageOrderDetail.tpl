<main class="viewport">
    <div class="goods-con">
        <a data-hybrid-prevent="true" href="goodsDetailed.html?type={{type}}&id={{goodsId}}">
            <dl>
                <dt class="tit">{{name}}</dt>
                <dd class="describe">
                    {{#equal type 3}}
                        有效期至{{dateFormat validTime 'yyyy年MM月dd日'}}
                    {{else}}
                        {{nameRemark}}
                    {{/equal}}
                </dd>
                <dd class="amountin"><i class="icon icon-coinsin"></i>如何使用</dd>
                <dd class="amount"><i class="">实付款：</i>{{realPay}}</dd>
                <dd class="pic"><img src="{{picUrl}}" alt="{{name}}"/></dd>
            </dl>
        </a>
    </div>
    {{#equal type 4}}
    <div class="cdkey" id="cdkey">
        <p class="cdkey-on">兑换码<span>（长按可复制）</span>：</p>
        <p class="cdkey-in" id="cdkey-in">{{cdkey}}</p>
    </div>
    {{/equal}}
    <div class="order-con">
        <div class="state">
            {{#equal status 1}}
                <i class="icon icon-tick-solid"></i>交易成功
            {{/equal}}
        </div>
        <div class="detail">

            <p>订单号：{{orderNo}}</p>

            <p>成交时间：{{dateFormat addTime 'yyyy-MM-dd HH:mm'}}</p>
            {{#equal type 2}}
                <p>收货姓名：{{receiverName}}</p>

                <p>手机号码：{{receiverPhone}}</p>

                <p class="address">收货地址：{{address}}</p>

                {{#if expressInfo}}<p>物流信息：{{expressInfo}}</p>{{/if}}
            {{/equal}}
        </div>
    </div>
    <div class="footer">如有疑问请致电钱庄客服400-0455-360</div>
</main>