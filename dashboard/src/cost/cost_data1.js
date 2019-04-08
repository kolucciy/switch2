import moment from 'moment';

// Cost THIS MONTH Data
var catArr = [];
// eslint-disable-next-line
for (var i = 1; i <= moment().daysInMonth(); i++) {
  catArr.push({ "label": moment().format('MMM') + " " + i });
}
var cost_this_month = {
  chart: {
    bgColor: "#1D1B41",
    bgAlpha: "0",
    canvasBgAlpha: "0",
    showBorder: "0",
    showCanvasBorder: "0",
    showValues: "0",
    showAlternateHGridColor: "0",
    legendBgAlpha: "0",
    usePlotGradientColor: "0",
    paletteColors: "#48DFBA, #F7E332",
    drawCustomLegendIcon: "1",
    baseFontSize: "14",
    baseFontColor: "#FDFDFD",
    showPlotBorder: "0",
    baseFont: "Nunito Sans",
    legendBorderAlpha: "0",
    numberPrefix: "£",
    toolTipBgcolor: "#484E69",
    toolTipPadding: "5",
    toolTipBorderRadius: "2",
    toolTipBorderAlpha: "30",
    tooltipBorderThickness: "0.7",
    toolTipColor: "#FDFDFD",
    showXAxisLine: "1",
    showYAxisLine: "1",
    xAxisLineColor: "#9092A4",
    yAxisLineColor: "#9092A4",
    xAxisLineThickness: "1.5",
    yAxisLineThickness: "1.5",
    divLineColor: "#414761",
    divLineAlpha: "100",
    divLineThickness: "1.5",
    divLineDashed: "1",
    divLineDashGap: "2",
    divlineDashLen: "3",
    labelDisplay: "ROTATE",
    transposeAxis: "1",
    scrollHeight: "8",
    scrollColor: "#FDFDFD",
    flatScrollBars: "1",
    scrollShowButtons: "0",
    chartLeftMargin: "0",
    chartRightMargin: "0",
    canvasLeftMargin: "0",
    canvasRightMargin: "0"
  },
  categories: [
    {
      category: catArr
    }
  ],
  dataset: [
    {
      seriesname: "Gas",
      data: []
    }
  ]
};


// Cost LAST MONTH Data
catArr = [];
// eslint-disable-next-line
for (var i = 1; i <= moment().subtract(1, 'month').daysInMonth(); i++) {
  catArr.push({ "label": moment().subtract(1, 'month').format('MMM') + " " + i });
}
var cost_last_month = {
  chart: {
    bgColor: "#1D1B41",
    bgAlpha: "0",
    canvasBgAlpha: "0",
    showBorder: "0",
    showCanvasBorder: "0",
    showValues: "0",
    showAlternateHGridColor: "0",
    legendBgAlpha: "0",
    usePlotGradientColor: "0",
    paletteColors: "#48DFBA, #F7E332",
    drawCustomLegendIcon: "1",
    baseFontSize: "14",
    baseFontColor: "#FDFDFD",
    showPlotBorder: "0",
    baseFont: "Nunito Sans",
    legendBorderAlpha: "0",
    numberPrefix: "£",
    toolTipBgcolor: "#484E69",
    toolTipPadding: "5",
    toolTipBorderRadius: "2",
    toolTipBorderAlpha: "30",
    tooltipBorderThickness: "0.7",
    toolTipColor: "#FDFDFD",
    showXAxisLine: "1",
    showYAxisLine: "1",
    xAxisLineColor: "#9092A4",
    yAxisLineColor: "#9092A4",
    xAxisLineThickness: "1.5",
    yAxisLineThickness: "1.5",
    divLineColor: "#414761",
    divLineAlpha: "100",
    divLineThickness: "1.5",
    divLineDashed: "1",
    divLineDashGap: "2",
    divlineDashLen: "3",
    labelDisplay: "ROTATE",
    transposeAxis: "1",
    scrollHeight: "8",
    scrollColor: "#FDFDFD",
    flatScrollBars: "1",
    scrollShowButtons: "0",
    chartLeftMargin: "0",
    chartRightMargin: "0",
    canvasLeftMargin: "0",
    canvasRightMargin: "0"
  },
  categories: [
    {
      category: catArr
    }
  ],
  dataset: [
    {
      seriesname: "Gas",
      data: []
    }
  ]
};


// year
export var yearArr = [1700, 1620, 1450];
export var yGasSplit = [30, 44, 35, 34, 35, 33, 37, 39, 41, 30, 39, 40];
export var lyGasSplit = [49, 44, 35, 34, 35, 39, 37, 39, 41, 40, 39, 40];

// Cost THIS YEAR Data
catArr = [];
// eslint-disable-next-line
for (var i = 0; i < 12; i++) {
  catArr.push({ "label": moment().month(i).format('MMM') });
}
var cost_this_year = {
  chart: {
    bgColor: "#1D1B41",
    bgAlpha: "0",
    canvasBgAlpha: "0",
    showBorder: "0",
    showCanvasBorder: "0",
    showValues: "0",
    showAlternateHGridColor: "0",
    legendBgAlpha: "0",
    usePlotGradientColor: "0",
    paletteColors: "#48DFBA, #F7E332",
    drawCustomLegendIcon: "1",
    baseFontSize: "14",
    baseFontColor: "#FDFDFD",
    showPlotBorder: "0",
    baseFont: "Nunito Sans",
    legendBorderAlpha: "0",
    numberPrefix: "£",
    toolTipBgcolor: "#484E69",
    toolTipPadding: "5",
    toolTipBorderRadius: "2",
    toolTipBorderAlpha: "30",
    tooltipBorderThickness: "0.7",
    toolTipColor: "#FDFDFD",
    showXAxisLine: "1",
    showYAxisLine: "1",
    xAxisLineColor: "#9092A4",
    yAxisLineColor: "#9092A4",
    xAxisLineThickness: "1.5",
    yAxisLineThickness: "1.5",
    divLineColor: "#414761",
    divLineAlpha: "100",
    divLineThickness: "1.5",
    divLineDashed: "1",
    divLineDashGap: "2",
    divlineDashLen: "3",
    transposeAxis: "1",
    scrollHeight: "8",
    scrollColor: "#FDFDFD",
    flatScrollBars: "1",
    scrollShowButtons: "0",
    chartLeftMargin: "0",
    chartRightMargin: "0",
    canvasLeftMargin: "0",
    canvasRightMargin: "0"
  },
  categories: [
    {
      category: catArr
    }
  ],
  dataset: [
    {
      seriesname: "Gas",
      data: []
    }
  ]
};


// Cost LAST YEAR Data
catArr = [];
// eslint-disable-next-line
for (var i = 0; i < 12; i++) {
  catArr.push({ "label": moment().month(i).format('MMM') });
}
var cost_last_year = {
  chart: {
    bgColor: "#1D1B41",
    bgAlpha: "0",
    canvasBgAlpha: "0",
    showBorder: "0",
    showCanvasBorder: "0",
    showValues: "0",
    showAlternateHGridColor: "0",
    legendBgAlpha: "0",
    usePlotGradientColor: "0",
    paletteColors: "#48DFBA, #F7E332",
    drawCustomLegendIcon: "1",
    baseFontSize: "14",
    baseFontColor: "#FDFDFD",
    showPlotBorder: "0",
    baseFont: "Nunito Sans",
    legendBorderAlpha: "0",
    numberPrefix: "£",
    toolTipBgcolor: "#484E69",
    toolTipPadding: "5",
    toolTipBorderRadius: "2",
    toolTipBorderAlpha: "30",
    tooltipBorderThickness: "0.7",
    toolTipColor: "#FDFDFD",
    showXAxisLine: "1",
    showYAxisLine: "1",
    xAxisLineColor: "#9092A4",
    yAxisLineColor: "#9092A4",
    xAxisLineThickness: "1.5",
    yAxisLineThickness: "1.5",
    divLineColor: "#414761",
    divLineAlpha: "100",
    divLineThickness: "1.5",
    divLineDashed: "1",
    divLineDashGap: "2",
    divlineDashLen: "3",
    transposeAxis: "1",
    scrollHeight: "8",
    scrollColor: "#FDFDFD",
    flatScrollBars: "1",
    scrollShowButtons: "0",
    chartLeftMargin: "0",
    chartRightMargin: "0",
    canvasLeftMargin: "0",
    canvasRightMargin: "0"
  },
  categories: [
    {
      category: catArr
    }
  ],
  dataset: [
    {
      seriesname: "Gas",
      data: []
    }
  ]
};


var costchart = {
  type: "scrollstackedcolumn2d",
  className: "fc-column2d",
  width: "100%",
  id: "mychart8",
  height: 500,
  dataSource: cost_this_month
};

export default costchart;

export { cost_last_month };
export { cost_this_month };

export { cost_this_year };
export { cost_last_year };
