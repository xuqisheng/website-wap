<main class="viewport">
    <div class="hd-con">
        <div class="main">
            <div class="amount">
                当前钱币:<span id="integralTotal">0</span>
            </div>
            <div class="info" data-spend="{{spend}}">
                <p>每一次抽奖消耗<span>{{spend}}</span>钱币</p>
            </div>
        </div>
        {{!--<div class="lotternumber">您今天还有<span class="degree">{{remainPlayTimes}}</span>次机会,<span class="chaarge">{{remainFreeTimes}}</span>次免费机会</div>--}}
        <div class="lotternumber">{{drawtiem playTimesType freeTimesType remainPlayTimes remainFreeTimes}}</div>
        <div class="countadd"></div>
    </div>
    <div class="raffle-con" id="raffleCon">
        <ul>
            {{#each awardsList}}
            {{!--1=没中，2=50积分，3=80积分，4=100积分，5=200积分，6=1元红包，7=2元红包，8=3元红包--}}
            {{#equal @index 4}}
            <li class="start-btn"><a href="javascript:;" id="raffleStartBtn">抽奖</a></li>
            <li data-id="{{position}}" data-name="{{awardsName}}" ><div class="raffle-img"><img src="http://file.qian360.com/{{url}}"> </div><div class="pricetitle">{{awardsName}}</div></li>
            {{else}}
                <li data-id="{{position}}" data-name="{{awardsName}}" ><div class="raffle-img"><img src="http://file.qian360.com/{{url}}"> </div><div class="pricetitle">{{awardsName}}</div></li>
            {{/equal}}
            {{!--<li data-id="2" data-name="50钱币"><div class="raffle-img"><img src="../../../image/store/raffle/coin50.png" alt="50钱币"/></div><div class="pricetitle">50钱币</div></li>--}}
            {{!--<li data-id="8" data-name="5元红包"><div class="raffle-img"><img src="../../../image/store/raffle/gift5.png" alt="5元红包"/></div><div class="pricetitle">50钱币</div></li>--}}
            {{!--<li data-id="9" data-name="5钱币"><div class="raffle-img"><img src="../../../image/store/raffle/coin5.png" alt="5钱币"/></div><div class="pricetitle">50钱币</div>></li>--}}
            {{!--<li data-id="4" data-name="100钱币"><div class="raffle-img"><img src="../../../image/store/raffle/coin100.png" alt="100钱币"/></div><div class="pricetitle">50钱币</div></li>--}}
            {{!--<li class="start-btn"><a href="javascript:;" id="raffleStartBtn">抽奖</a></li>--}}
            {{!--<li data-id="7" data-name="2元红包"><div class="raffle-img"><img src="../../../image/store/raffle/gift2.png" alt="2元红包"/></div><div class="pricetitle">50钱币</div></li>--}}
            {{!--<li data-id="3" data-name="80钱币"><div class="raffle-img"><img src="../../../image/store/raffle/coin80.png" alt="80钱币"/></div><div class="pricetitle">50钱币</div></li>--}}
            {{!--<li data-id="6" data-name="1元红包"><div class="raffle-img"><img src="../../../image/store/raffle/gift1.png" alt="1元红包"/></div><div class="pricetitle">50钱币</div></li>--}}
            {{!--<li data-id="5" data-name="200钱币"><div class="raffle-img"><img src="../../../image/store/raffle/coin200.png" alt="200钱币"/></div><div class="pricetitle">50钱币</div></li>--}}
            {{/each}}
        </ul>
    </div>
    <div class="operate-con">
        <a href="prizeRecord.html?activityCode={{activityCode}}">查看中奖记录</a>
    </div>
    {{#if isIosApp}}
    <p class="declaration">此活动与设备生产商Apple Inc.无关</p>
    {{/if}}
</main>