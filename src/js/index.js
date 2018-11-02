$(function() {
    var mySwiper = new Swiper('.container', {
        pagination: {
            el: ".swiper-pagination"
        }
    });
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
                $('.cont-list').html(str);
            }
        }
    })
})