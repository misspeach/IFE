/**
 * Created by shizhan on 16/12/2.
 */
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);//生成对应日期的空气质量值
        dat.setDate(dat.getDate() + 1);//返回日期月份中的天数1-31，如果传入的值超过了该月中应有的天数，增加月份
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    var topOffSetPercent=180/500;//等比例显示
    var histogram = document.getElementsByClassName("aqi-chart-wrap")[0];
    histogram.innerHTML = "";//重新选择会出现重叠
    histogram.style.height = "500px";
    histogram.style.border="1px solid black";
    var city = pageState.nowSelectCity;//标号
    if (city === -1)
        city = "北京";
    var time = pageState.nowGraTime;
    for (var c in chartData) {
        if (c === city) {
            for (var gt in chartData[c]) {//the data of this city
                if (gt === time) {
                    var count = 0;
                    for (var td in chartData[c][gt]) {
                        var newDiv = document.createElement("div");
                        if (gt === "day")
                        {
                            newDiv.style.width = "6px";
                            newDiv.setAttribute("title",td+"空气质量："+chartData[c][gt][td]);
                        }
                        else if (gt === "week")
                        {
                            newDiv.style.width = "20px";
                            newDiv.setAttribute("title","周"+"空气质量平均值："+chartData[c][gt][td]);
                        }
                        else if (gt === "month")
                        {
                            newDiv.style.width = "30px";
                            newDiv.setAttribute("title","月"+"空气质量平均值："+chartData[c][gt][td]);
                        }
                        newDiv.style.height = (topOffSetPercent*chartData[c][gt][td]).toFixed(2) + "px";
                        newDiv.style.backgroundColor = "red";
                        newDiv.style.position = "absolute";
                        newDiv.style.left = count * (parseInt(newDiv.style.width) + 5)+40+"px";
                        newDiv.style.top = 500 - (topOffSetPercent*chartData[c][gt][td]).toFixed(2) + "px";
                        newDiv.style.border = "2px solid black";
                        newDiv.style.display="block";
                        histogram.appendChild(newDiv);
                        count++;
                    }
                }
            }
        }
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(e) {
    // 确定是否选项发生了变化
    var radio = e.target;
    if (radio && radio.nodeName.toLowerCase() === "input")
        if (radio.value !== pageState.nowGraTime) {
            pageState.nowGraTime = radio.value;
            renderChart();
        }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(e) {
    // 确定是否选项发生了变化
    //alert(this.value);//这样可以直接获取当前选中的城市，学习了
    var selectBox = e.target;
    if (selectBox && selectBox.nodeName.toLowerCase() === "select") {
        var selectedCity = selectBox.options[selectBox.selectedIndex].value;
        if (selectedCity !== pageState.nowSelectCity) {// 设置对应数据
            pageState.nowSelectCity = selectedCity;
            // 调用图表渲染函数
            renderChart();
        }
    }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var fgt = document.getElementById("form-gra-time");
    fgt.addEventListener("click", graTimeChange, false);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var select = document.getElementById("city-select");
    for (var city in aqiSourceData) {
        var newOption = new Option(city);
        select.add(newOption, undefined);
    }
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    select.addEventListener("change", citySelectChange, false);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    var days_in_month = [31, 29, 31];
    for (var city in aqiSourceData) {
        var cityData = {};
        cityData["day"] = aqiSourceData[city];//得到当前城市的原始数据
        //得到当前城市的周\月数据
        var count = 0;
        var wd = 0;//一个周的空气质量之和
        var week = {};
        var month = {};
        var k = 1;//周的总数
        var m_c = 1;//第几个月
        for (var time in aqiSourceData[city]) {
            wd += aqiSourceData[city][time];
            count++;
            if (count % 7 === 0) {
                week[k++] = (wd / 7).toFixed(2);
                //console.log(city + m_c + "月第" + (k - 1) + "周平均空气质量:" + week[k - 1]);
                wd = 0;
            }
            else if (count === days_in_month[m_c - 1]) {//到达月末
                if (count !== 28) {
                    week[k++] = (wd / (days_in_month[m_c - 1] % 7)).toFixed(2);
                    //console.log(city + m_c + "月第" + (k - 1) + "周平均空气质量:" + week[k - 1]);
                }
                var tmp = 0;
                for (var i = k - 1; i >= k - 5; i--)
                    tmp += parseInt(week[i]);//对象不能与普通数据类型直接进行运算
                month[m_c] = (tmp / 5).toFixed(2);
                //console.log(city + m_c + "月平均空气质量:" + month[m_c]);
                m_c++;
                wd = 0;
                count = 0;
            }
        }
        cityData["week"] = week;
        cityData["month"] = month;
        chartData[city] = cityData;
    }
    renderChart();
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

init();
