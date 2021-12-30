import "./widgetLg.css";

const WidgetLg = () => {
    const Button = ({ type }) => {
        return <button className={"widgetLgButton " + type}>{type}</button>
    };

    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Latest transactions</h3>
            <table className="widgetLgTable">
                <thead>
                    <tr className="widgetLgTr">
                        <th className="widgetLgTh">Customer</th>
                        <th className="widgetLgTh">Date</th>
                        <th className="widgetLgTh">Amount</th>
                        <th className="widgetLgTh">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="widgetLgTr">
                        <td className="widgetLgUser">
                            <img 
                                src="https://images.pexels.com/photos/2905823/pexels-photo-2905823.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" 
                                alt="" 
                                className="widgetLgImg" 
                            />
                            <span className="widgetLgUsername">Martina Graham</span>
                        </td>
                        <td className="widgetLgDate">2 Dec 2021</td>
                        <td className="widgetLgAmount">$122.50</td>
                        <td className="widgetLgStatus"><Button type="Approved" /></td>
                    </tr>
                    <tr className="widgetLgTr">
                        <td className="widgetLgUser">
                            <img 
                                src="https://images.pexels.com/photos/654690/pexels-photo-654690.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" 
                                alt="" 
                                className="widgetLgImg" 
                            />
                            <span className="widgetLgUsername">Rita Keller</span>
                        </td>
                        <td className="widgetLgDate">2 Nov 2021</td>
                        <td className="widgetLgAmount">$150.00</td>
                        <td className="widgetLgStatus"><Button type="Declined" /></td>
                    </tr>
                    <tr className="widgetLgTr">
                        <td className="widgetLgUser">
                            <img 
                                src="https://images.pexels.com/photos/9553455/pexels-photo-9553455.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" 
                                alt="" 
                                className="widgetLgImg" 
                            />
                            <span className="widgetLgUsername">Bonnie Everett</span>
                        </td>
                        <td className="widgetLgDate">3 Dec 2021</td>
                        <td className="widgetLgAmount">$452.50</td>
                        <td className="widgetLgStatus"><Button type="Pending" /></td>
                    </tr>
                    <tr className="widgetLgTr">
                        <td className="widgetLgUser">
                            <img 
                                src="https://images.pexels.com/photos/2385044/pexels-photo-2385044.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" 
                                alt="" 
                                className="widgetLgImg" 
                            />
                            <span className="widgetLgUsername">Rickie Bob</span>
                        </td>
                        <td className="widgetLgDate">22 Nov 2021</td>
                        <td className="widgetLgAmount">$782.50</td>
                        <td className="widgetLgStatus"><Button type="Approved" /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default WidgetLg;
