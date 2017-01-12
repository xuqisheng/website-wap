{{#if name}}
    <article class="viewport">
        <main>
            <div class="user-address-item">
                <div class="user-name">{{name}}</div>
                <div class="user-phone">{{tel}}</div>
                <div class="user-address">{{province}}{{city}}{{address}}</div>
                <a class="change-address j-addAddress" href="javascript:;" data-ajax="false">
                    <i class="iconfont icon-edit j-addAddress"></i>
                </a>
            </div>
        </main>
    </article>
{{else}}
    <article class="viewport">
        <main class="ui-load-state no-date">
            <p class="describe-con">还没添加地址哦</p>
        </main>
    </article>
    <footer class="footer-bar">
        <a class="j-addAddress ui-btn red" href="javascript:;"  data-ajax="false">添加地址</a>
    </footer>
{{/if}}