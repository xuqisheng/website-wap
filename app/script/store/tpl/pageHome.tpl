<main class="viewport">
    <input id="slideImgList" type="hidden" value="{{stringify mallBanner}}">
    <header class="slide-con" id="homeSlide">
    </header>
    <div class="integral-hd clearfix">
        <div class="amount f_l">
            <a href="integralDetail.html">
                <i class="icon icon-coins"></i>
                <span id="integralTotal">0</span>
            </a>
        </div>
        <div class='sign signold'><div class='sign-in'><a href="sign.html">签到</a></div></div>
        <div class='sign signtwo'><div class='sign-in'><a href="sign.html">今日<br>已签到</a></div></div>
        <div class="operation f_r">
            <a href="myOrder.html">
                <i class="icon icon-record"></i>
                <span>我的订单</span>
            </a>
        </div>
    </div>
    <div class="plate-con">
        <div class="plate-conin">
            <div class="guessing">
                {{!--<a href="luckyDraw.html?code=1"><img src="../../../image/store/banner/lottery-banner.png"></a>--}}
                <div class="route">
                    <!--<a href="grab.html?id=1"><img src="../../../image/store/home-plate-icon/grab.jpg"></a>-->
                    <a href="grab.html?id=1"><img src="../../../image/store/rooster/grab.png"></a>
                </div>
                <div class="everyday">
                    <!--<a href="guess.html?id=2"><img src="../../../image/store/home-plate-icon/guessing.jpg"></a>-->
                    <a href="guess.html?id=2"><img src="../../../image/store/rooster/guessing.png"></a>
                    <!--<a href="luckyDraw.html?code=1"><img src="../../../image/store/home-plate-icon/rotate.jpg"></a>-->
                    <a href="luckyDraw.html?code=1"><img src="../../../image/store/rooster/rotate.png"></a>
                </div>
            </div>
            <!--<ul>-->
                <!--<li>-->
                    <!--<a href="luckyDraw.html">-->
                        <!--<i class="icon lucky-draw"></i>-->
                        <!--<span>抽奖</span>-->
                    <!--</a>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<a href="goodsList.html?type=3" data-hybrid-title="红包">-->
                        <!--<i class="icon red-packet"></i>-->
                        <!--<span>红包</span>-->
                    <!--</a>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<a href="goodsList.html?type=2" data-hybrid-title="实物礼品">-->
                        <!--<i class="icon gift"></i>-->
                        <!--<span>实物礼品</span>-->
                    <!--</a>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<a href="myOrder.html" data-hybrid-title="我的订单">-->
                        <!--<i class="icon order"></i>-->
                        <!--<span>我的订单</span>-->
                    <!--</a>-->
                <!--</li>-->
            <!--</ul>-->
        </div>
        <div class="plate-conin">
            <ul>
                <li>
                    <a href="goodsList.html?classes=1">
                        <i class="icon product"></i>
                        <span>今日新品</span>
                    </a>
                </li>
                <li>
                    <a href="goodsList.html?classes=2">
                        <i class="icon emporium"></i>
                        <span>电子商城</span>
                    </a>
                </li>
                <li>
                    <a href="goodsList.html?classes=3">
                        <i class="icon beaut"></i>
                        <span>生活丽人</span>
                    </a>
                </li>
                <li>
                    <a href="goodsList.html?classes=4">
                        <i class="icon foodie"></i>
                        <span>吃货达人</span>
                    </a>
                </li>
                <li>
                    <a href="goodsList.html?classes=5">
                        <i class="icon entertainment"></i>
                        <span>休闲娱乐</span>
                    </a>
                </li>
                <li>
                    <a href="goodsList.html?classes=6">
                        <i class="icon freemail"></i>
                        <span>免邮专区</span>
                    </a>
                </li>
                <li>
                    <a href="goodsList.html?classes=7">
                        <i class="icon welfare"></i>
                        <span>钱庄福利</span>
                    </a>
                </li>
                <li>
                    <a href="goodsList.html?classes=8">
                        <i class="icon virtual"></i>
                        <span>虚拟物品</span>
                    </a>
                </li>
            </ul>
        </div>

    </div>
    <div id="goodsList"></div>
    <footer class="footer">
        {{helper-ftText}}
    </footer>
</main>