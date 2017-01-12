
<div class='packetboom-cen'>
    <div class="usable">
    {{#each available}}
        <div class='ticket move    on-cash'>
            <p class='whole'>{{redpacketName}}</p>
            <p class='service'><span>{{useCondition}}</span></p>
            <p class='cost'><span class="symbol">¥</span><span class="money">{{redPacketAmount}}</span></p>
            <div class="line"><p></p></div>
            <div class="data-one">有效期至{{dateFormat validDate 'yyyy-MM-dd'}}</div>
            <div class="triangle"><span><img src="../../../image/master/pro-list-banner/icon_white.png"></span></div>
            <div class="Interestdays">{{leastTenderDays}}</div>
            <div class="investmenttype">{{productTypeLimit}}</div>
            <div class="hbids">{{redpacketId}}</div>
        </div>
    {{/each}}
    </div>
    {{#if notavailable.length}}
    <div class="unavailable"><span>不可使用红包</span></div>
    <div class="nousable">
    {{#each notavailable}}
        <div class='ticket move   pash-one'>
            <p class='whole'>{{redpacketName}}</p>
            <p class='service'><span>{{useCondition}}</span></p>
            <p class='cost'><span class="symbol">¥</span><span class="money">{{redPacketAmount}}</span></p>
            <div class="line"><p></p></div>
            <div class="data-one">有效期至{{dateFormat validDate 'yyyy-MM-dd'}}</div>
            <div class="triangle"><span><img src="../../../image/master/pro-list-banner/icon_white.png"></span></div>
            <div class="Interestdays">{{leastTenderDays}}</div>
            <div class="investmenttype">{{productTypeLimit}}</div>
        </div>
    {{/each}}
    </div>
    {{/if}}
</div>