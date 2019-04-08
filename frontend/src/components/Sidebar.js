import React, {Component} from "react";
import OptionList from "./OptionList";

class Sidebar extends Component {
    render() {
        return (
            <div id="nav" className="col-12 col-md-3 col-xl-2 bd-sidebar">
                <div className="row">
                    <div className="col-md-12 col-8">
                        <div className="text-sm-left text-md-center logo">Switch2 Usage<span id="beta"> BETA</span>
                        </div>
                    </div>
                    <div className="col-md-12 col-4 text-right">
                        <button className="btn btn-link bd-search-docs-toggle d-md-none p-0 ml-3 collapsed"
                                type="button" data-toggle="collapse" data-target="#bd-docs-nav"
                                aria-controls="bd-docs-nav" aria-expanded="false" aria-label="Toggle docs navigation">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30"
                                 focusable="false">
                                <title>Menu</title>
                                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10"
                                      d="M4 7h22M4 15h22M4 23h22"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <nav className="collapse bd-links" id="bd-docs-nav">
                    <OptionList/>
                </nav>
            </div>
        );
    }
}

export default Sidebar;