import React, {Component} from "react";

class Tip extends Component {

    state = {
        tip: ''
    }

    props = {
        tips: [
            "Bleed air from your radiators to keep your heating system working as efficiently as possible. You would know it’s time to do this when you hear the pipes rustling.",
            "Ventilate your house by opening doors and windows fully for at least 5 minutes.",
            "Houseplants can save you energy because they increase humidity. This will increase comfort and prevent you from having to turn up the heating too high.",
            "Keep the area in front of your radiators clear (approximately 20 inches) to let them get warmth into the room more easily.",
            "Decrease the temperature in your house by one degree to save about 6% on your heating costs.",
            "Close hatches or curtains at night so that warm air won’t escape as fast."
        ]
    }

    componentDidMount() {
        const tips = [
            "Bleed air from your radiators to keep your heating system working as efficiently as possible. You would know it’s time to do this when you hear the pipes rustling.",
            "Ventilate your house by opening doors and windows fully for at least 5 minutes.",
            "Houseplants can save you energy because they increase humidity. This will increase comfort and prevent you from having to turn up the heating too high.",
            "Keep the area in front of your radiators clear (approximately 20 inches) to let them get warmth into the room more easily.",
            "Decrease the temperature in your house by one degree to save about 6% on your heating costs.",
            "Close hatches or curtains at night so that warm air won’t escape as fast.",
            "Get your heating system serviced once a year to keep it running efficiently.",
            "Install double-glazing to your windows and doors to prevent thermal dissipation.",
            "Insulate your walls to avoid heat dissipation."
        ]
        this.setState({
            tip: tips[Math.floor(Math.random()*tips.length)]
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12 pb-3">
                    <span className="footer-text-1">Energy Tip: </span><span className="footer-text-2">{this.state.tip}</span>
                </div>
            </div>
        );
    }
}

export default Tip;