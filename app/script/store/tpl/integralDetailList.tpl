<ul class="ui-list-double">
    {{#each list}}
        <li>
            <div class="column-left">
                <div class="tits">{{remark}}</div>
                <div class="conts">{{dateFormat addTime 'yyyy-MM-dd HH:mm'}}</div>
            </div>
            <div class="column-right">
                {{#equal inOut 1}}
                    <div class="tits">+{{number}}</div>
                {{else}}
                    <div class="tits">-{{number}}</div>
                {{/equal}}
                <div class="conts">{{typeName}}</div>
            </div>
        </li>
    {{/each}}
</ul>