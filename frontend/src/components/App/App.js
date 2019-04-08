import React, { Component } from 'react';
import './App.css';
import Sidebar from "../Sidebar";
import Tip from "../Tip";

class App extends Component {
  render() {
    return (
        <div>
            <div className="container-fluid">
                <div className="row flex-xl-nowrap">
                    <Sidebar/>

                    <div id="content-body" className="col-12 col-md-9 col-xl-10 pl-4 pr-4 bd-content">
                        {/* <!-- heading row --> */}
                        <div className="row">
                            <div className="col-md-12 pt-4 mt-3"><h2>Usage Summary</h2></div>
                        </div>
                        {/* <!-- heading row end-->

                    <!-- time frame row start --> */}
                        <div className="row mt-3">
                            <div className="col-md-7"><ul className="buttonwrapper">
                                <li id="today">
                                    <label id="l1">TODAY</label>
                                </li>
                                <li id="month" className="active">
                                    <label id="l2">MONTH</label>
                                </li>
                                <li id="year">
                                    <label id="l3">YEAR</label>
                                </li>
                            </ul></div>
                            <div className="col-md-5 text-right date-indicator" id="date">Date</div>
                        </div>
                        {/* <!-- time frame row end -->
                            <!-- chart row start -->  */}
                        <div className="row mt-3 db-chart">
                            <div id="parent2" className="col-lg-6">
                                <div className="chart-card mb-4">
                                    <div className="chart-title" id="text2">CHANGE IN COST</div>
                                    <div id="chart2" className="chart">Chart 2</div>
                                </div>
                            </div>
                            <div id="parent3" className="col-lg-6">
                                <div className="chart-card mb-4">
                                    <div className="chart-title" id="text3">USAGE ESTIMATE</div>
                                    <div id="chart3" className="chart">Chart 3</div>
                                </div>
                            </div>
                        </div>

                        <Tip/>

                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default App;
