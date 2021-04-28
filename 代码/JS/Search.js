let searchBox = document.getElementById("searchBox"); // 获取搜索框元素
let searchBtn = document.getElementById("searchBtn"); // 获取搜索按钮元素
let audio = document.getElementById("audio"); // 获取音频元素
// const defaultUrlHeader = "https://autumnfish.cn/";  // 默认URL头部1
const defaultUrlHeader = "http://musicapi.leanapp.cn"; // 默认URL头部2
const songsUrlHeader = "http://music.163.com"; // 音乐URL头部

// AJAX请求函数
function AjaxRequest(url, operationFun) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            operationFun(JSON.parse(xhttp.responseText));
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

// 根据关键字点击搜索
searchBtn.onclick = function() {
    let searchKeywords = searchBox.value;
    if (searchKeywords == "") {
        searchKeywords = searchBox.placeholder;
    }
    let keywordsUrl =
        defaultUrlHeader + "/search/suggest?keywords=" + searchKeywords;
    AjaxRequest(keywordsUrl, renderTheFirstSong);
};

// 点击搜索后，显示结果，更换音频URL，默认播放第一条结果
function renderTheFirstSong(responseText) {
    appearResult(responseText);
    audio.src =
        songsUrlHeader +
        "/song/media/outer/url?id=" +
        responseText.result.songs[0].id +
        ".mp3";
}
//点击歌曲的播放键后，更换播放
function changeSong(responseText) {

}

//显示搜索列表
function appearResult(responseText) {
    console.log(responseText);
    var appearbox = document.getElementsByClassName('appearbox')[0];
    appearbox.innerHTML = '';
    var songslist = responseText.result.songs;
    for (var i = 0; i < songslist.length; i++) {
        var div_song = document.createElement('div');
        div_song.className = 'everysong';
        // var button = document.createElement('input');
        // button.type = 'checkbox';
        var songName = document.createElement('span');
        songName.className = 'songName';
        var func = document.createElement('span');
        func.className = 'songfunc'; //播放添加歌单
        var a_img1 = document.createElement('a');
        var a_img2 = document.createElement('a');
        // a_img1[i].setAttribute('index', i);
        // a_img2[i].setAttribute('index', i);
        var img1 = document.createElement('img');
        var img2 = document.createElement('img');
        img1.className = 'img_start';
        img2.className = 'img_add';
        img1.src = '../../素材/播放.png';
        img2.src = '../../素材/添加.png';
        var singerName = document.createElement('span');
        singerName.className = 'singerName';
        var albumName = document.createElement('span');
        albumName.className = 'albumName';
        var songTime = document.createElement('span');
        songTime.className = 'songTime';
        var duration = responseText.result.songs[i].duration;
        duration = songTimeTra(duration);
        div_song.innerHTML = i + 1;
        songName.innerHTML = responseText.result.songs[i].name;
        singerName.innerHTML = responseText.result.songs[i].artists[0].name;
        albumName.innerHTML = responseText.result.songs[i].album.name;
        songTime.innerHTML = duration;
        appearbox.appendChild(div_song);
        // div_song.appendChild(button);
        div_song.appendChild(songName);
        div_song.appendChild(func);
        func.appendChild(a_img1);
        func.appendChild(a_img2);
        a_img1.appendChild(img1);
        a_img2.appendChild(img2);
        div_song.appendChild(singerName);
        div_song.appendChild(albumName);
        div_song.appendChild(songTime);
    }
    var everysong = document.getElementsByClassName('everysong');
    console.dir(everysong[0]);
    // var songfunc = document.getElementsByClassName('songfunc');
    for (var i = 0; i < everysong.length; i++) {
        everysong[i].onclick = function() {
                alert('点击' + this.everysong);
            }
            // console.dir(songfunc);
            // everysong[i].onmouseover = function() {
            //     songfunc.style.visibility = 'visible';
            // }
            // everysong[i].onmouseout = function() {
            //     songfunc.style.visibility = 'hidden';
            // }
    }
}

//歌曲时长转换函数封装
function songTimeTra(duration) {
    var songTime = Math.floor(duration / 1000); //总秒数
    var songTimeMin = Math.floor(songTime / 60); //分钟数
    var songTimeSec = Math.floor(songTime % 60); //秒数
    if (songTimeSec <= 9) {
        return songTimeMin + ':0' + songTimeSec;
    } else {
        return songTimeMin + ':' + songTimeSec;
    }
}