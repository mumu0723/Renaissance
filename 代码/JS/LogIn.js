var logIn = document.getElementById('logInBtn');
var username = document.getElementById('userName');
var password = document.getElementById('passWord');
var notLogIn = document.getElementById('notLogIn');
var isLogInMood = document.getElementById('isLogInMood');
logIn.onclick = function () {
    if (password.value == '123456') {
        isLogIn = true;
        notLogIn.style.display = 'none';
        isLogInMood.innerHTML = username.value + ', 欢迎你！';
        isLogInMood.style.display = 'block';
    } else if (username.value == '') {
        alert('请输入正确的用户名！');
    } else if(username.value != '' && password == '') {
        alert('请输入密码！');
    } else {
        alert('您的用户名或密码错误，请重新输入！');
        password.value = '';
    }
}