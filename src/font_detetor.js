/*********************************************
* JavaScript 浏览器字体支持检测font_detetor.js
* Copyright (C) 2010-2020 LiuNing
*
* @author LiuNing <749416752@qq.com>
* @site http://www.usejs.com/
* @version 1.1
*********************************************/

var FontDetetor = function () {

    // 设置以下三个字体将会调用浏览器默认的 
    // monospace  ->  默认的[等宽字体]: 每个字的占位宽度相同
    // sans-serif ->  默认的[无衬线字体]: 沒有这些额外的装饰
    // serif      ->  默认的[衬线字体]: 在字的笔画开始及結束的地方有额外的装饰，而且笔画的粗细会因直橫的不同而有不同。
    // 系统字体基本分为monospace, sans-serif, serif以上这三大类
    // 
    // 如果只用单个字体或系统默认字体比较，会存在有些字体渲染后的宽度和高度和宽度碰巧吻合的情况，那准确率会有一定的问题
    // 所以使用三种不同类型的字体于要比较的字体进行比对，可以更精确
    var baseFonts = ['monospace', 'sans-serif', 'serif'],
        // 使用英语的M字符因为M字符在渲染之后的宽度最大
        // 使用“lli”不同字符，在相检测中可以更加提高准确性
        testString = "mmmmmmmmmmlli",
        // 使用72号字体，字体越大比较的准确度越高
        testSize = '72px',
        oBody = document.getElementsByTagName("body")[0],
        // 创建比对的容器span
        oTextSpan = document.createElement("span"),
        // 默认字体的宽度和高度的集合
        defaultWidth = {}, defaultHeight = {};

    oTextSpan.style.fontSize = testSize;
    oTextSpan.innerHTML = testString;

    for (var i = 0, baseFont = ''; baseFont = baseFonts[i]; i++) {
        // 获取三种默认字体的宽高，以备比较
        oTextSpan.style.fontFamily = baseFont;
        oBody.appendChild(oTextSpan);
        defaultWidth[baseFont] = oTextSpan.offsetWidth;
        defaultHeight[baseFont] = oTextSpan.offsetHeight; 
        oBody.removeChild(oTextSpan);
    }

    var detect = function (font) {
        var detected = false;

        for (var i = 0, baseFont = ''; baseFont = baseFonts[i]; i++) {
            // 设置需要检测的字体，如果不存在此字体将会走后面的默认字体
            oTextSpan.style.fontFamily = font + ',' + baseFont;
            oBody.appendChild(oTextSpan);

            var matched = (oTextSpan.offsetWidth !== defaultWidth[baseFont] || oTextSpan.offsetHeight !== defaultHeight[baseFont]);

            oBody.removeChild(oTextSpan);

            if (matched) return true;
        }

        return detected;
    }

    this.detect = detect;
};