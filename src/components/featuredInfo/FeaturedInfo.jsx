import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import "./featuredInfo.css";

const FeaturedInfo = () => {
    return (
        <div className="featuredInfo">
            <div className="featuredItem">
                <span className="featuredTitle">Revenue</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$2,342</span>
                    <span className="featuredMoneyRate">
                        -11.2<ArrowDownward className="featuredIcon negative"/>
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Sales</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$4,342</span>
                    <span className="featuredMoneyRate">
                        -1.2<ArrowDownward className="featuredIcon negative"/>
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Cost</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$3,332</span>
                    <span className="featuredMoneyRate">
                        9.2<ArrowUpward className="featuredIcon"/>
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
        </div>
    );
};

export default FeaturedInfo;
