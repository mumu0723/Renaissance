var tab_list = document.querySelector('.tab_list');
var lis = tab_list.querySelectorAll('li');
var moods = document.querySelectorAll('.mood');
var isLogIn = false;
for (var i = 0; i < lis.length; i++) {
    lis[i].setAttribute('index', i);
    lis[i].onclick = function() {
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = '';
        }
        this.className = 'currert';
        var index = this.getAttribute('index');
        for (var i = 0; i < moods.length; i++) {
            moods[i].style.display = 'none';
        }
        moods[index].style.display = 'block';
    }
}

//歌曲搜索函数封装
function getSongInf(responseText) {

}