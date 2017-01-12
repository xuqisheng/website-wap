<ul>
    {{#each list}}
        <li{{#andFalse overdueFlag useFlag}} class="on"{{/andFalse}}>
            {{#equal redpacketType 0 }}
                 <div class='ticket move {{#or overdueFlag useFlag }}pash-one{{else}}on-cash{{/or}}'>
                     <p class='whole'>{{redpacketName}}</p>
                     <p class='service'><span>{{useCondition}}</span></p>
                     <p class='cost'><span class="symbol">¥</span><span class="money">{{redPacketAmount}}</span></p>
                     <div class="line"><p></p></div>
                     <div class="data-one">有效期至{{dateFormat  validDate 'yyyy-MM-dd'}}</div>
                     {{#if useFlag }}<div class="triangle"><span>已用</span></div>{{else}}{{#if overdueFlag }}<div class="triangle"><span>过期</span></div>{{else}}{{/if}}{{/if}}
                 </div>
            {{else}}
                <div class='ticket move {{#or overdueFlag useFlag }}pash-one{{else}}discount-one{{/or}}'>
                    <p class='whole'>{{redpacketName}}</p>
                    <p class='service'><span>{{useCondition}}</span></p>
                    <p class='cost'><span class="symbol">¥</span><span class="money">{{redPacketAmount}}</span></p>
                    <div class="line"><p></p></div>
                    <div class="data-one">有效期至{{dateFormat  validDate 'yyyy-MM-dd'}}</div>
                    {{#if useFlag }}<div class="triangle"><span>已用</span></div>{{else}}{{#if overdueFlag }}<div class="triangle"><span>过期</span></div>{{else}}{{/if}}{{/if}}
                </div>
            {{/equal}}
        </li>
    {{/each}}
</ul>
