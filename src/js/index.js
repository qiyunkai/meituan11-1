$(function() {
    var mySwiper = new Swiper('.container', {
        pagination: {
            el: ".swiper-pagination"
        }
    });
    var page = 1;
    var Bscroll = new BScroll('.scroll', {
            probeType: 2
        })
        //监听事件滚动
    Bscroll.on('scroll', function() {

        if (this.y < this.maxScrollY - 50) {
            if (page >= 3) {
                $('.pullUp').html('---我是有底线的---')

            } else {
                $('.pullUp').html('释放加载更多...').addClass('filp')

            }
        } else if (this.y < this.maxScrollY - 10) {
            $('.pullUp').html('上拉加载').removeClass('filp')
        } else if (this.y > 50) {
            $('.pullDown').html('释放刷新').addClass('filp')
        } else if (this.y > 10) {
            $('.pullDown').html('下拉刷新').removeClass('filp')
        }
    })
    Bscroll.on('scrollEnd', function() {
        //判断 上拉 下拉
        if ($('.pullDown').hasClass('filp')) {
            $('.pullDown').html('下拉刷新').removeClass('filp')
            pullDown()
        } else if ($('.pullUp').hasClass('filp')) {
            if (page <= 3) {
                page++;
                $('.pullUp').html('上拉加载').removeClass('filp')
                pullUp()
            } else {
                $('.pullUp').html('---我是有底线的---')
            }
        }
    })
    random()

    function pullDown() {
        Bscroll.refresh();
    }

    function pullUp() {
        random()
    }

    function random() {
        $.ajax({
            url: "/api/list",
            dataType: "json",
            success: function(data) {
                var str = '';
                if (data.code === 0) {
                    data.data.forEach(file => {
                        str += `
                    <li>
                    <dl>
                        <dt><img src="${file.img}" alt=""></dt>
                        <dd>
                            <p>${file.name}</p>
                            <p>${file.title}</p>
                            <div class="pric">
                                <div class="pric-1">
                                    <span>${file.strong}</span>
                                    <span>元</span>
                                    <span>${file.strongS}</span>

                                </div>
                                <div class="del">
                                    <span>${file.line}</span>
                                </div>
                            </div>
                        </dd>
                    </dl>
                </li>
                   `
                    });
                    $('.cont-list').append(str);
                }
            }
        })
    }


    var search = document.querySelector('#search');
    var cont = document.querySelector('.cont-list');
    search.oninput = function() {
        var val = this.value;
        if (val) {
            $.ajax({
                url: '/api/search',
                data: {
                    key: val
                },
                success: function(data) {
                    var str = ``;
                    var data = JSON.parse(data);
                    data.data.forEach(file => {
                        str += `
                        <li>
                        <dl>
                            <dt><img src="${file.img}" alt=""></dt>
                            <dd>
                                <p>${file.name}</p>
                                <p>${file.title}</p>
                                <div class="pric">
                                    <div class="pric-1">
                                        <span>${file.strong}</span>
                                        <span>元</span>
                                        <span>${file.strongS}</span>
    
                                    </div>
                                    <div class="del">
                                        <span>${file.line}</span>
                                    </div>
                                </div>
                            </dd>
                        </dl>
                    </li>
                        `
                    });
                    cont.innerHTML = str;
                }
            })
        }
    }
})