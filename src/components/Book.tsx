import React, {useState} from "react";
import {Input, Select} from 'antd';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import MainButton from "../buttons/MainButton";

function Book () {
    const [dateState, setDateState] = useState<any>();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [userName, setUserName] = useState<any>("");


    const OPTIONS = [
        {
        value: 'մատնահարդարում',
        },
        {
        value: 'հին գել լաքի հեռացում',
        },
        {
        value: 'Լաքապատում',
        },

    ];

    const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o.value));


    const handleBook = () => {
        console.log("selectedItems",selectedItems);
        console.log("date",dateState);
        let all = [
                {name: userName,
                date: dateState,
                services: [...selectedItems]
            }
            ]
        console.log("all", all);
    };

    const changeDate = (e:any) => {
        // console.log("eeeeeeeeeeeeeee",e.toLocaleString())
        // console.log("eeeeeeeeeeeeeee555",moment(e).format('MMMM Do YYYY'))
        let date = moment(e).format('MMMM Do YYYY')
        setDateState(date)
    }

    return (
        <div className="book-layout">
            <div className="book-left-side">
                <div className="book-left-side_content">
                    <div className="book-left-side_content_top">
                        Simply fill in the necessary information to secure your appointment with us. From preferred service to date and time, your nail care needs are in good hands.
                    </div>
                    <div className="book-left-side_content_botton">
                        Book Now
                    </div>
                </div>
            </div>

            <div className="book-right-side">
                <div className="form">
                    <div className="book-right-side-title">
                        Book an Arranegment
                    </div>
                    <div className="input-group">
                        <div className="input_item">
                            <div className="input_item-title">Name Surname</div>
                            <input type="text" className="input" onChange={(event)=>setUserName(event.target.value)}/>
                        </div>
                        <div className="input_item">
                            <div className="input_item-title">Email Address</div>
                            <input type="email" className="input"/>
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input_item">
                            <div className="input_item-title">Phone Number</div>
                            <Input placeholder="92309128" prefix="+374" />
                        </div>

                        <div className="input_item">
                            <div className="input_item-title">Select the Service Type</div>
                            {/*<Select*/}
                            {/*    defaultValue="Services"*/}
                            {/*    style={{ width: 120 }}*/}
                            {/*    onChange={handleSelectChange}*/}
                            {/*    options={[*/}
                            {/*        { value: 'Option1', label: 'Option555' },*/}
                            {/*        { value: 'Option2', label: 'Option2' },*/}
                            {/*        { value: 'Option3', label: 'Option3' },*/}
                            {/*    ]}*/}
                            {/*/>*/}

                            <Select
                                mode="multiple"
                                placeholder="Services"
                                value={selectedItems}
                                onChange={setSelectedItems}
                                options={filteredOptions}
                            />
                        </div>
                    </div>
                </div>
                <div className="book-now-datetime">
                    <Calendar
                        value={dateState}
                        onChange={changeDate}
                    />
                    <div className="book-time">
                        <div className="book-time-title">Time</div>
                        <div className="time-group">
                            {[1,2,3,4,5,8,7,9,4,1,2,5,5,8,7,8,7,7].map((time:any) => <div className="book-time-local">11:30</div>)}
                        </div>
                    </div>
                </div>
                <div className="book-footer">
                    <div className="book-price">
                        The service will cost <span>4500 AMD</span>
                    </div>
                    <MainButton
                        text="Book"
                        func={handleBook}
                    />
                </div>
            </div>


        </div>
    )
}

export default Book