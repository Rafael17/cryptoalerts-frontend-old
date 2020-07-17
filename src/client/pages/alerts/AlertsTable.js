import React from 'react';
import AddSVG from './../../svgs/addSVG.js';
import DeleteSVG from './../../svgs/deleteSVG.js';

const AlertsTable = (props) => {

    const checkbox = (checked) => {
        return (checked ? <input disabled="disabled" type="checkbox" checked /> : <input disabled="disabled" type="checkbox" />)
    };
    const priceAlertsHTML = props.alerts.map((e, i) => {
        return (
            <tr key={i}>
                {props.list.map((item, index) => {
                    return <td key={index}>{item.isCheckbox ? checkbox(e[item.property]) : e[item.property]}</td>
                })}
                <td style={{ width: '25px' }}>
                    <div data-id={e._id} className="button-svg-wrapper" onClick={props.handleDeleteAlert}>
                        <DeleteSVG />
                    </div>
                </td>
            </tr>
        )
    }
    );

    return (
        <div className="alerts-table-container">
            <h2>{props.title}</h2>
            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                    <tr>
                        {props.list.map((e, index) => <td key={index}>{e.label}</td>)}
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {priceAlertsHTML}
                </tbody>
            </table>
            <div className="button-svg-wrapper" onClick={props.openModal}>
                <AddSVG />
            </div>
        </div>
    )
}

export default AlertsTable;