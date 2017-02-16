/**
 * Created by shizhan on 16/11/17.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var list = document.getElementById("aqi-table");

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById("aqi-city-input").value.trim();
    var value = document.getElementById("aqi-value-input").value.trim();
    var cityPattern = /^[\u4e00-\u9fa5a-zA-Z\s]+$/gi;//能够匹配Los angels这种带空格的城市
    var valPattern = /^[0-9]+$/gi;
    var cN = false,
        vN = false;
    var cP = cityPattern.test(city),//如果匹配 test方法只能在奇数次时返回true
        vP = valPattern.test(value);
    if (city === "") {
        alert("城市名为空！");
        cN = true;
    }
    if (!cN && !cP) {//城市不为空且不匹配正则
        alert("城市名只能输入中文或英文！");
    }
    if (value === "") {
        alert("空气质量为空！");
        vN = true;
    }
    if (!vN && !vP)
        alert("空气质量只能输入整数！");

    if (cP && vP) {
        aqiData[city] = value;
    }

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

    var item = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for (var city in aqiData) {
        item += "<tr><td>" + city + "</td><td>" + aqiData[city] + "</td><td><button>删除</button></td></tr>";
    }
    if (city) {
        list.innerHTML = item;
    } else
        list.innerHTML = "";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
    // do sth.
    if (e.target && e.target.nodeName.toLowerCase() == "button") {
        var curBtnPar = e.target.parentNode;
        var city = curBtnPar.previousSibling.previousSibling.firstChild.nodeValue;
        delete aqiData[city];
    }
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var addBtn = document.getElementById("add-btn");
    addBtn.onclick = addBtnHandle;
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    list.addEventListener("click", delBtnHandle, false);

}

init();