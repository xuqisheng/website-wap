<article class="viewport">
    <div class="slide-con" id="homeSlide"></div>
    <input id="slideImgList" type="hidden" value="{{stringify bannerList}}" />
    {{#with product}}
        <div class="product-con" id="homeProduct">
            <a href="product.html?borrowId={{borrowId}}" data-ajax="false">
            <div class="tit">{{name}}</div>
            <div class="cont">
                <div class="main" style="background-image: url('image/home-progressbar/{{helper-progressbar}}.png')">
                    <div class="tits">预期年化</div>
                    <div class="conts">
                        {{normalApr}}<small>%</small>
                    </div>
                    {{#if extraAwardApr}}
                        <div class="reward">+<span>{{extraAwardApr}}</span>%</div>
                    {{/if}}
                    {{#equal brType 3}}
                        <div class="time">随存随取</div>
                    {{else}}
                        {{#equal advanceRepayFlag 8}}
                            <div class="time">期限 {{previousBorrowDay}} 天</div>
                        {{else}}
                            {{#if isday}}
                                <div class="time">期限 {{timeLimitDay}} 天</div>
                            {{else}}
                                <div class="time">期限 {{timeLimit}} 月</div>
                            {{/if}}
                        {{/equal}}
                    {{/equal}}
                </div>
                <ul class="info">
                    <li>{{tenderTimes}}笔已投</li>
                    <li>{{lowestAccount}}元起投</li>
                </ul>
            </div>
            <div class="operation"><span class="ui-btn red">立即投资</span></div>
            <div class="tips"><i class="icon icon-security"></i>资金账户专款专用资金绝对安全</div>
            <div class="mark">{{helper-proMark}}</div>
            </a>
        </div>
    {{/with}}
</article>