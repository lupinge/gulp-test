function getNum(){
    var a = 1,b = 2;
    console.log(a+b);
}
getNum();


if (navigator.vibrate) {
    navigator.vibrate(2000);
} else if (navigator.webkitVibrate) {
    navigator.webkitVibrate(2000);
}