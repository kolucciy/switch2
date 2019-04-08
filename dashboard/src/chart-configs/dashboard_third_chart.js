import moment from 'moment';

// month chart
//var monthDetail = moment().format('MMMM YYYY');
var monthLen = moment().daysInMonth();
// eslint-disable-next-line
var currentDay = moment().format('D');

var monthCatArr = [];
// eslint-disable-next-line
for (var i = 0; i < monthLen; i++) {
    // eslint-disable-next-line
    if (i != currentDay) {
        // eslint-disable-next-line
        if (i % 7 != 0) {
            monthCatArr.push({ "label": moment().date(i + 1).format('MMM D'), "showLabel": "1" });
        } else {
            monthCatArr.push({ "label": moment().date(i + 1).format('MMM D'), "showLabel": "1" });
        }
    } else {
        monthCatArr.push({ "vline": "true", "color": "#707C92", "dashed": "1", "linePosition": "0", "labelPosition": "0" });
        monthCatArr.push({ "label": moment().date(i + 1).format('MMM D') });
    }
}

var third_chart_month = {
  chart: {
    showBorder: "0",
    showCanvasBorder: "0",
    showAlternateHGridColor: "0",
    bgColor: "#1D1B41",
    bgAlpha: "0",
    canvasBgAlpha: "0",
    baseFontSize: "13",
    baseFont: "Nunito Sans Light",
    baseFontColor: "#FDFDFD",
    divLineThickness: "2",
    showValues: "0",
    showLegend: "0",
    toolTipBgcolor: "#484E69",
    toolTipPadding: "7",
    toolTipBorderRadius: "3",
    toolTipBorderAlpha: "30",
    tooltipBorderThickness: "0.7",
    toolTipColor: "#FDFDFD",
    paletteColors: "#FA394E, #4B53FF",
    usePlotGradientColor: "0",
    yAxisMinValue: "0",
    yAxisMaxValue: "500",
    plotFillAlpha: "100",
    drawAnchors: "1",
    anchorBgColor: "#FA394E",
    anchorBorderColor: "#FDFDFD",
    anchorRadius: "5",
    anchorBorderThickness: "1.9",
    showPlotBorder: "0",
    showToolTip: "1",
    canvasTopMargin: "75",
    canvasBottomMargin: "75",
    canvasLeftMargin: "30",
    canvasRightMargin: "30",
    labelDisplay: "ROTATE",
    yAxisName: "kWh",
    transposeAnimation: "1",
    labelStep: "7"
  },

  annotations: {
    groups: [
      {
        items: [
          {
            id: "2",
            type: "text",
            text: "Till Now:",
            align: "left",
            font: "Nunito Sans",
            bold: "0",
            fontSize: "12.5",
            color: "#FDFDFD",
            x: "$canvasStartX - 20",
            y: "$canvasStartY - 35"
          },
          {
            id: "3",
            type: "text",
            text: "n/a kWh",
            align: "left",
            font: "Nunito Sans",
            bold: "1",
            fontSize: "13",
            color: "#FDFDFD",
            x: "$canvasStartX + 30",
            y: "$canvasStartY - 35"
          },
          {
            id: "4",
            type: "text",
            text: "Predicted:",
            align: "left",
            font: "Nunito Sans",
            bold: "0",
            fontSize: "12.5",
            color: "#FDFDFD",
            x: "$canvasEndX - 116",
            y: "$canvasStartY - 35"
          },
          {
            id: "5",
            type: "text",
            text: "n/a kWh",
            align: "left",
            font: "Nunito Sans",
            bold: "1",
            fontSize: "13",
            color: "#FDFDFD",
            x: "$canvasEndX - 60",
            y: "$canvasStartY - 35"
          }
        ]
      }
    ]
  },

  categories: [
    {
      category: monthCatArr
    }
  ],

  dataset: [
    {
      seriesname: null,
      data: []
    },
    {
      seriesname: null,
      alpha: "20",
      data: []
    }
  ]
};


// year chart
//var yearDetail = moment().format('YYYY');
var yearLen = 12;
// eslint-disable-next-line
var currentMonth = parseInt(moment().format('M')) - 1;

var yearCatArr = [];
// eslint-disable-next-line
for (var i = 0; i < yearLen; i++) {
    // eslint-disable-next-line
    if (i != currentMonth) {
        // eslint-disable-next-line
        if (i % 3 != 0) {
            yearCatArr.push({ "label": moment().month(i).format('MMM'), "showLabel": "0" });
        } else {
            yearCatArr.push({ "label": moment().month(i).format('MMM') });
        }

    } else {
        yearCatArr.push({ "label": moment().month(i).format('MMM') });
        yearCatArr.push({ "vline": "true", "color": "#707C92", "dashed": "1", "linePosition": "0", "labelPosition": "0" });
    }
}


var third_chart_year = {
  chart: {
    showBorder: "0",
    showCanvasBorder: "0",
    showAlternateHGridColor: "0",
    bgColor: "#1D1B41",
    bgAlpha: "0",
    canvasBgAlpha: "0",
    baseFontSize: "13",
    baseFont: "Nunito Sans",
    baseFontColor: "#FDFDFD",
    divLineThickness: "2",
    showValues: "0",
    showLegend: "0",
    toolTipBgcolor: "#484E69",
    toolTipPadding: "7",
    toolTipBorderRadius: "3",
    toolTipBorderAlpha: "30",
    tooltipBorderThickness: "0.7",
    toolTipColor: "#FDFDFD",
    paletteColors: "#FA394E, #4B53FF",
    usePlotGradientColor: "0",
    yAxisMinValue: "0",
    yAxisMaxValue: "500",
    plotFillAlpha: "100",
    drawAnchors: "1",
    anchorBgColor: "#FA394E",
    anchorBorderColor: "#FDFDFD",
    anchorRadius: "5",
    anchorBorderThickness: "1.9",
    showPlotBorder: "0",
    showToolTip: "1",
    canvasTopMargin: "75",
    canvasBottomMargin: "75",
    canvasLeftMargin: "30",
    canvasRightMargin: "30",
    labelDisplay: "ROTATE",
    yAxisName: "kWh",
    transposeAnimation: "1"
  },

  annotations: {
    groups: [
      {
        items: [
          {
            id: "2",
            type: "text",
            text: "Till Now:",
            align: "left",
            font: "Nunito Sans",
            bold: "0",
            fontSize: "12.5",
            color: "#FDFDFD",
            x: "$canvasStartX - 20",
            y: "$canvasStartY - 35"
          },
          {
            id: "3",
            type: "text",
            text: "n/a kWh",
            align: "left",
            font: "Nunito Sans",
            bold: "1",
            fontSize: "13",
            color: "#FDFDFD",
            x: "$canvasStartX + 30",
            y: "$canvasStartY - 35"
          },
          {
            id: "4",
            type: "text",
            text: "Predicted:",
            align: "left",
            font: "Nunito Sans",
            bold: "0",
            fontSize: "12.5",
            color: "#FDFDFD",
            x: "$canvasEndX - 116",
            y: "$canvasStartY - 35"
          },
          {
            id: "5",
            type: "text",
            text: "n/a kWh",
            align: "left",
            font: "Nunito Sans",
            bold: "1",
            fontSize: "13",
            color: "#FDFDFD",
            x: "$canvasEndX - 60",
            y: "$canvasStartY - 35"
          }
        ]
      }
    ]
  },

  categories: [
    {
      category: yearCatArr
    }
  ],

  dataset: [
    {
      seriesname: null,
      data: []
    },
    {
      seriesname: null,
      alpha: "20",
      data: []
    }
  ]
};


var chartConfigs3 = {
    type: "msarea",
    className: "fc-mssplinearea",
    id: "mychart3",
    dataFormat: "JSON",
    width: "100%",
    height: "300",
    dataSource: third_chart_month
};

export default chartConfigs3;
export { third_chart_month };
export { third_chart_year };