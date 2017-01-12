<div class="confirm" id="confirmPop">
    <div class="hd">
        <a class="close" href="javascript:;"><i class="icon icon-close"></i></a>
    </div>
    {{#equal type 2}}
        <div class="row address" id="addressBtn">
            <a href="javascript:;">
                <div class="tit">
                    <span>{{name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{tel}}</span>
                </div>
                <div class="cont">
                    <p>{{province}}{{city}}{{address}}</p>
                </div>
                <i class="icon icon-arrow-right"></i>
            </a>
        </div>
    {{/equal}}
    <div class="row amount">
        <div class="tit">需支付</div>
        <div class="cont">
            <i class="icon icon-coins"></i>{{goodsScore}}
        </div>
    </div>
    <div class="operate">
        <a id="confirmPayBtn" class="ui-btn red" href="javascript:;">确认支付</a>
    </div>
</div>
<div class="confirm-mask" id="confirmMask"></div>