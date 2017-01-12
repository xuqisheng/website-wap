<ul class="ui-list-double">
    {{#each list}}
        <li>
            <div class="column-left">
                <div class="tits">{{name}}</div>
                <div class="conts">{{helper-target}}</div>
            </div>
            <div class="column-right">
                <div class="tits tison">{{dateFormat addTime 'yyyy-MM-dd HH:mm'}}&nbsp;</div>
                <div class="conts"></div>
            </div>
        </li>
    {{/each}}
</ul>