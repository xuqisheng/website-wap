<article class="viewport">
    <div class="box invest-box">
        {{!--<div class="tit">可投资金额 <span>{{parseInt lowestAccount}} ~ {{mostAccount}}</span> 元</div>--}}
        <div class="tit">
            <p class='invest-mold'>{{borrowName}}</p>
            {{#less lowestAccount mostAccount}}
                可投资金额 <span class="investment">{{parseInt lowestAccount}}</span> ~ <span>{{parseInt mostAccount}}</span> 元
            {{else}}
                可投资金额 <span>{{parseInt mostAccount}}</span> 元(需一次性投资完)
            {{/less}}
        </div>
        <div class="cont">
            <div class="tits">我要投资</div>
            <div class="conts">
                {{#less lowestAccount mostAccount}}
                    <input id="investAmount" type="text" pattern="[0-9]*" placeholder="输入您的投资金额" data-activate-check="true"/>
                {{else}}
                    <input id="investAmount" type="text" pattern="[0-9]*" placeholder="输入您的投资金额" data-activate-check="true" value="{{parseInt mostAccount}}" readonly="true"/>
                {{/less}}
                <span class="unit">元</span>
            </div>
        </div>
        <div class="info">预估收益 <span id="earnings">0.00</span> 元</div>
    </div>
    <div class="box info-box">
        <div class="tit"><span></span><i>支付信息</i></div>
        <div class="cont">
            {{#if redPacketTotal}}
            <div class="row gift on-flow" id="envelopeBtn">
                <div class="tits" id="redPacketLimit">现金红包</div>
                <div class="conts">
                    <span class="font-color-gray-neutral "></span>
                    <span class="iconf icon-arrow-right font-color-gray-neutral"></span>
                </div>
                <input id="redPacketLimit" type="hidden" value=""/>
            {{else}}
            <div class="row btn-cash">
                <div class="tits font-color-gray-neutral">现金红包(无)</div>
            {{/if}}
        </div>
         {{#if redPacketTotal}}
             <div class="row gift on-dis">
                  <div class="tits clsbtn" id="redPacketLimit">抵扣红包</div>
                  <div class="conts">
                     <span class="font-color-gray-neutral"></span>
                     <span class="iconf icon-arrow-right font-color-gray-neutral"></span>
                  </div>
                   {{else}}
                   <div class="row btn-deduction">
                       <div class="tits font-color-gray-neutral">抵扣红包(无)</div>
                   {{/if}}
             </div>

            <div class="row">
                <div class="tits">余额(<span id="balance">{{balance}}</span>元)</div>
                <div class="conts"><span id="buyAmount">0.00</span>元</div>
            </div>
                {{#if bankCard}}
                <div class="row limitreturn">
                    <div class="tits">{{bankCard.bankShortName}}(尾号<span id="hiddenCardNo">{{bankCard.hiddenCardNo}}</span>)</div>
                    <div class="conts"><span id="bankBuy">0.00</span>元</div>
                    <div class="limit">本次支付金额上限<span>{{mostAccount}}</span> 元</div>
                </div>
                {{else}}
                <div class="row">
                    <div class="tits">银行卡</div>
                    <div class="conts">
                        <select name="bindBank" id="bindBank" class="needsclick">
                            <option value="">请选择</option>
                            {{#each allBankCardList}}
                                <option value="{{bankCode}}">{{bankShortName}}</option>
                            {{/each}}
                        </select>
                    </div>
                </div>
                {{/if}}

            <div class="row import-bankcard js_hide" id="bankCard">
                <input id="bankCardNo" type="text" placeholder="请输入与实名信息一致的银行卡号" pattern="[0-9]*" maxlength="20" data-activate-check="true" value="{{bankCard.cardNo}}"/>
            </div>
        </div>
        </div>
    </div>
    <div class="operation-box">
        <a href="javascript:;" class="js-submit ui-btn red disabled" data-activate-submit="true">确定去支付</a>
        <p class="info">到期本金收益自动归还至账户余额</p>
    </div>
    </div>
</article>
<div class='packetboom'>
    <!--<div class='packetboom-cen'>-->
        <!--&lt;!&ndash;<a href="packet.html"  class='instructions'>红包使用说明</a>&ndash;&gt;-->
        <!--<div class="usable">-->
            <!--&lt;!&ndash;<div class='ticket move   discount-one'>&ndash;&gt;-->
                <!--&lt;!&ndash;<p class='whole'>抵扣红包</p>&ndash;&gt;-->
                <!--&lt;!&ndash;<p class='service'>投资满500元使用</p>&ndash;&gt;-->
                <!--&lt;!&ndash;<p class='cost'><span class="symbol">¥</span><span class="money">10</span></p>&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="line"><p></p></div>&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="data-one">有效期至2016-03-31</div>&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="triangle"><span><img src="/image/pro-list-banner/icon_white.png"></span></div>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--&lt;!&ndash;<div class='ticket move  on-cash'>&ndash;&gt;-->
                <!--&lt;!&ndash;<p class='whole'>抵扣红包</p>&ndash;&gt;-->
                <!--&lt;!&ndash;<p class='service'>投资满500元使用</p>&ndash;&gt;-->
                <!--&lt;!&ndash;<p class='cost'><span class="symbol">¥</span><span class="money">4</span></p>&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="line"><p></p></div>&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="data-one">有效期至2016-03-31</div>&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="triangle"><span><img src="/image/pro-list-banner/icon_white.png"></span></div>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->


        <!--</div>-->
        <!--<div class="unavailable"><span>不可使用红包</span></div>-->
        <!--<div class="nousable">-->
            <!--&lt;!&ndash;<div class='ticket move  easily-one'>&ndash;&gt;-->
                <!--&lt;!&ndash;<p class='whole'>抵扣红包</p>&ndash;&gt;-->
                <!--&lt;!&ndash;<p class='service'>投资满500元使用</p>&ndash;&gt;-->
                <!--&lt;!&ndash;<p class='cost'><span class="symbol">¥</span><span class="money">2</span></p>&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="line"><p></p></div>&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="data-one">有效期至2016-03-31</div>&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="triangle noclick"><span>已用</span></div>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--&lt;!&ndash;<div class='ticket move  pash-one'>&ndash;&gt;-->
                <!--&lt;!&ndash;<p class='whole'>抵扣红包</p>&ndash;&gt;-->
                <!--&lt;!&ndash;<p class='service'>投资满500元使用</p>&ndash;&gt;-->
                <!--&lt;!&ndash;<p class='cost'><span class="symbol">¥</span><span class="money">1</span></p>&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="line"><p></p></div>&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="data-one">有效期至2016-03-31</div>&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="triangle noclick"><span>过期</span></div>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--</div>-->
    <!--</div>-->
</div>
<div class="packetboom">

</div>
<div class="popsub">
    <div class="shade"></div>
    <div class="bonus">选择红包<div class="shadeone"></div></div>
</div>
<div class="address">
    <p class="us-moeney">本次可用<span></span>元</p>
    <p class="elect">已选择<span>0</span>元</p>
    <a class="ensure">确定</a>
</div>
<input id="userPhone" type="hidden" value=""/>
<input id="lowestAccount" type="hidden" value="{{lowestAccount}}"/>
<input id="mostAccount" type="hidden" value="{{mostAccount}}"/>
<input id="normalApr" type="hidden" value="{{normalApr}}"/>
<input id="extraAwardApr" type="hidden" value="{{extraAwardApr}}"/>
<input id="tenderDay" type="hidden" value="{{tenderDay}}"/>
<input id="leastInterestDays" type="hidden" value="{{leastInterestDays}}"/>
<input id="isNew" type="hidden" value="{{isNew}}"/>
<input id="redPacketUsage" type="hidden" value="{{redPacketUsage}}"/>
<input id="redPacketTotal" type="hidden" value="{{redPacketTotal}}"/>
<input id="interestDays"  type="hidden" value="{{interestDays}}" />
<input id="repaymentStyle" type="hidden" value="{{style}}">
<input id="period" type="hidden" value="{{period}}">
<input id="publishDate" type="hidden" value="{{publishDate}}">