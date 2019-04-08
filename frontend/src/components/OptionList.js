import React, {Component} from "react";

class OptionList extends Component {

    render() {
        return (
            <ul className="left-options">
                <li className="left-option"> <a href="/dashboard">Dashboard</a></li>
                <li className="left-option"> <a href="/cost">Cost</a></li>
            </ul>
        );
    }
}

export default OptionList;