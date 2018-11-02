$(function() {
    $.ajax({
        url: "/api/list",
        dataType: "json",
        success: function(data) {
            var str = '';
            if (data.code === 0) {
                data.data.forEach(file => {
                    str += `
                        <li>${file.name}</li>
                   `
                });
                $('.list').html(str);
            }
        }
    })
})