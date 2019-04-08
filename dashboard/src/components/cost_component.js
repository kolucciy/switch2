import React from 'react';
import ReactFC from 'react-fusioncharts';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { cost_last_month, cost_this_month, cost_last_year, cost_this_year } from '../cost/cost_data1';
import CostTableComponent from './cost_table_component';
import FusionCharts from "fusioncharts";

class CostComponent extends React.Component {

    constructor(props) {
        super(props);
        this.onClickbutton1 = this.onClickbutton1.bind(this);
        this.onClickbutton2 = this.onClickbutton2.bind(this);
    }

    componentDidMount() {
        document.getElementById("c1").click();
    }

    onClickbutton1() {
        window.b2selected = false;

        document.getElementById("c2").style.borderBottom = "none";
        document.getElementById("c2").style.color = "#FDFDFD";
        document.getElementById("c2").style.opacity = "0.5";
        document.getElementById("c1").style.color = "#FDFDFD";
        document.getElementById("c1").style.opacity = "1";
        document.getElementById("c1").style.borderBottom = "solid 2px #FDFDFD";
        document.getElementById("c1").style.textTransform = "uppercase";
        document.getElementById("c2").style.textTransform = "uppercase";

        var dataSource;
        var chartconfig = { ...this.props.costchart };
        const chart = (<ReactFC {...chartconfig} />);
        ReactDOM.unmountComponentAtNode(document.getElementById('co-chart-container'));
        ReactDOM.render(
            chart,
            document.getElementById('co-chart-container')
        );

        if (window.selectedperiod === "month") {
            dataSource = cost_this_month;
            fetch('http://localhost:5000/api/cost/month')
            // We get the API response and receive data in JSON format...
                .then(response => response.json())
                // ...then we update the chart data
                .then(data => {
                    var gasDataArr = [];
                    // eslint-disable-next-line
                    for (var i = 0; i <= moment().daysInMonth(); i++) {
                        // eslint-disable-next-line
                        if (i < parseInt(moment().format('D'))) {
                            gasDataArr.push({ "value": data.current[i] });
                        } else {
                            gasDataArr.push({
                                value: data.current[i],
                                alpha: "30",
                                toolText:
                                    "<div><i>Predicted: $seriesName<br>$label: $dataValue<i><div>"
                            });
                        }
                    }
                    dataSource.dataset[0].data = gasDataArr;
                    FusionCharts.items['mychart8'].setJSONData(dataSource);

                    document.getElementById("co-tablecell-title1").innerHTML = moment().subtract(1, 'month').format('MMMM');
                    document.getElementById("co-tablecell-value1").innerHTML = "£" + data.summary[1];

                    var sfmVal = 0;
                    // eslint-disable-next-line
                    for (var i = 0; i < parseInt(moment().format('D')); i++) {
                        sfmVal = sfmVal + parseFloat(data.current[i]);
                    }
                    sfmVal = Math.round(sfmVal * 100) / 100;

                    document.getElementById("co-tablecell-title2").innerHTML = "So Far This Month";
                    document.getElementById("co-tablecell-value2").innerHTML = "£" + sfmVal;

                    document.getElementById("co-tablecell-title3").innerHTML = "Predicted This Month";
                    document.getElementById("co-tablecell-value3").innerHTML = "£" + data.summary[2];

                    document.getElementById("co-tablecell-title4").style.display = "block";
                    document.getElementById("co-tablecell-value4").style.display = "block";

                    document.getElementById("co-tablecell-title4").innerHTML = "Estimated savings";
                    document.getElementById("co-tablecell-value4").innerHTML = "£" + Math.round((data.summary[1] - data.summary[2]) * 100) / 100;
                })
        }
        else {
            dataSource = cost_this_year;
            fetch('http://localhost:5000/api/cost/year')
            // We get the API response and receive data in JSON format...
                .then(response => response.json())
                // ...then we update the chart data
                .then(data => {
                    var gasDataArr = [];
                    // eslint-disable-next-line
                    for (var i = 0; i < data.current.length; i++) {
                        // eslint-disable-next-line
                        if (i < parseInt(moment().format('M'))) {
                            gasDataArr.push({ "value": data.current[i] });
                        } else {
                            gasDataArr.push({
                                value: data.current[i],
                                alpha: "30",
                                toolText:
                                    "<div><i>Predicted: $seriesName<br>$label: $dataValue<i><div>"
                            });
                        }
                    }
                    dataSource.dataset[0].data = gasDataArr;
                    FusionCharts.items['mychart8'].setJSONData(dataSource);

                    document.getElementById("co-tablecell-title1").innerHTML = moment().subtract(1, 'year').format('YYYY');
                    document.getElementById("co-tablecell-value1").innerHTML = "£" + data.summary[1];

                    var styVal = 0;
                    // eslint-disable-next-line
                    for (var i = 0; i < parseInt(moment().format('M')); i++) {
                        styVal = styVal + parseFloat(data.current[i]);
                    }
                    styVal = Math.round(styVal * 100) / 100;

                    document.getElementById("co-tablecell-title2").innerHTML = "So Far This Year";
                    document.getElementById("co-tablecell-value2").innerHTML = "£" + styVal;

                    document.getElementById("co-tablecell-title3").innerHTML = "Predicted This Year";
                    document.getElementById("co-tablecell-value3").innerHTML = "£" + data.summary[2];

                    document.getElementById("co-tablecell-title4").style.display = "block";
                    document.getElementById("co-tablecell-value4").style.display = "block";

                    document.getElementById("co-tablecell-title4").innerHTML = "Estimated Savings";
                    document.getElementById("co-tablecell-value4").innerHTML = "£" + Math.round((data.summary[1] - data.summary[2]) * 100) / 100;
                })

        }
    }

    onClickbutton2() {
        window.b2selected = true;

        document.getElementById("c1").style.borderBottom = "none";
        document.getElementById("c1").style.color = "#FDFDFD";
        document.getElementById("c1").style.opacity = "0.5";
        document.getElementById("c2").style.color = "#FDFDFD";
        document.getElementById("c2").style.opacity = "1";
        document.getElementById("c2").style.borderBottom = "solid 2px #FDFDFD";

        var dataSource;
        var chartconfig = { ...this.props.costchart };
        const chart = (<ReactFC {...chartconfig} />);
        ReactDOM.unmountComponentAtNode(document.getElementById('co-chart-container'));
        ReactDOM.render(
            chart,
            document.getElementById('co-chart-container')
        );

        if (window.selectedperiod === "month") {
            dataSource = cost_last_month;
            fetch('http://localhost:5000/api/cost/month')
            // We get the API response and receive data in JSON format...
                .then(response => response.json())
                // ...then we update the chart data
                .then(data => {
                    var gasDataArr = [];
                    // eslint-disable-next-line
                    for (var i = 0; i <= moment().subtract(1, 'month').daysInMonth(); i++) {
                        gasDataArr.push({ "value": data.last[i] });
                    }
                    dataSource.dataset[0].data = gasDataArr;
                    FusionCharts.items['mychart8'].setJSONData(dataSource);

                    document.getElementById("co-tablecell-title1").innerHTML = moment().subtract(2, 'month').format('MMMM');
                    document.getElementById("co-tablecell-value1").innerHTML = "£" + data.summary[0];

                    document.getElementById("co-tablecell-title2").innerHTML = moment().subtract(1, 'month').format('MMMM');
                    document.getElementById("co-tablecell-value2").innerHTML = "£" + data.summary[1];

                    var savings_value = Math.round((data.summary[0] - data.summary[1]) * 100) / 100;

                    if (savings_value < 0) {
                        savings_value = Math.abs(savings_value);
                        document.getElementById("co-tablecell-title3").innerHTML = "Savings";
                        document.getElementById("co-tablecell-value3").innerHTML = "-£" + savings_value;
                    }

                    else {
                        document.getElementById("co-tablecell-title3").innerHTML = "Savings";
                        document.getElementById("co-tablecell-value3").innerHTML = "£" + savings_value;
                    }

                    document.getElementById("co-tablecell-title4").style.display = "none";
                    document.getElementById("co-tablecell-value4").style.display = "none";
                })
        }
        else {
            dataSource = cost_last_year;
            fetch('http://localhost:5000/api/cost/year')
            // We get the API response and receive data in JSON format...
                .then(response => response.json())
                // ...then we update the chart data
                .then(data => {
                    var gasDataArr = [];
                    // eslint-disable-next-line
                    for (var i = 0; i < data.last.length; i++) {
                        gasDataArr.push({ "value": data.last[i] });
                    }
                    dataSource.dataset[0].data = gasDataArr;
                    FusionCharts.items['mychart8'].setJSONData(dataSource);

                    document.getElementById("co-tablecell-title1").innerHTML = moment().subtract(2, 'year').format('YYYY');
                    document.getElementById("co-tablecell-value1").innerHTML = "£" + data.summary[0];

                    document.getElementById("co-tablecell-title2").innerHTML = moment().subtract(1, 'year').format('YYYY');
                    document.getElementById("co-tablecell-value2").innerHTML = "£" + data.summary[1];

                    document.getElementById("co-tablecell-title3").innerHTML = "Savings";
                    document.getElementById("co-tablecell-value3").innerHTML = "£" + Math.round((data.summary[0] - data.summary[1]) * 100) / 100;

                    document.getElementById("co-tablecell-title4").style.display = "none";
                    document.getElementById("co-tablecell-value4").style.display = "none";
                })
        }
    }

    render() {
        return <div>
            <div className="container-fluid">
              <div className="container-fluid">
                <div className="row pl-5 pr-5 pt-5 pb-0 time-control">
                  <div className="col-xs-6 mr-4 ml-4 pl-1 pr-1" id="c1" onClick={this.onClickbutton1}>
                    THIS MONTH
                  </div>
                  <div className="col-xs-6 mr-4 ml-4 pl-1 pr-1" id="c2" onClick={this.onClickbutton2}>
                    LAST MONTH
                  </div>
                </div>
              </div>
            </div>
            <br />
            <CostTableComponent />
            <br />
                <div id="co-chart-container" className="pt-3 pb-3 pr-5 pl-5" />
          </div>;
    }
}

export default CostComponent;