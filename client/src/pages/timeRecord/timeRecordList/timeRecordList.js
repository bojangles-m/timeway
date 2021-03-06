import React, { useState, useEffect } from 'react';
import moment from 'moment';
import sf from 'seconds-formater';
import { time_format } from '../../../../config';
import BillableButton from '../../../components/billableButton';
import { DropdownMenuFilter } from '../timeRecordComponents';
import { dateFormat } from '../../../../config';
import Clod from 'clod';

import './timeRecordList.scss';

export const TimeRecordList = ({ timeRecords, handleIsBillableButtonClicked, handleSelectedProject }) => {
    const [TR, setTR] = useState({ records: [], total: 0, date: 0 });

    useEffect(() => {
        if (!Clod.isEmpty(timeRecords)) setTR(timeRecords);
    }, [timeRecords]);

    return (
        <div className="tr-table timerecord-list tr-table-bordered">
            <div className="trl-head tr-row clearfix">
                <span className="title">{moment(TR.date).calendar(null, dateFormat)}</span>
                <span className="total">
                    <span className="total-text">Total:</span>
                    <span className="total-time">{sf.convert(TR.total).format()}</span>
                </span>
            </div>

            <div className="tr-body">
                {TR.records.map((tt, i) => (
                    <div key={tt._id} className="tr-row clearfix">
                        <span className="description tr-cell0">{tt.description}</span>
                        <DropdownMenuFilter
                            className="tr-cell1"
                            selectedProject={tt.project}
                            handleSelectedProject={(project) => handleSelectedProject(tt._id, project)}
                        />
                        <BillableButton
                            isBillable={tt.isBillable}
                            handleButtonClick={(isBillable) => handleIsBillableButtonClicked(tt._id, isBillable)}
                        />
                        <span className="tr-cell3 interval">
                            {moment(tt.start).format(time_format)} - {moment(tt.stop).format(time_format)}
                        </span>
                        <span className="tr-cell4 duration">{sf.convert(tt.duration).format()}</span>
                        <span className="options last-child">|||</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
