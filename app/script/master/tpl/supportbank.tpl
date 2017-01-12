<ul>
{{#each resultData}}
    <li>
        <div class="supcen">
            <div class="supleft"><div class="imgs qui_bank_ico {{logoCss}}"></div><p class="supleft-p">{{bankName}}</p></div>
            <div class="supright">单笔<span>{{format perDealLimit}}</span>万，日累计<em>{{format perDayLimit}}</em>万</div>
        </div>
    </li>
   {{/each}}
</ul>