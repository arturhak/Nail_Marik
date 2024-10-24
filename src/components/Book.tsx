import React, {useEffect, useState} from "react";
import {Input, Select} from 'antd';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import MainButton from "../buttons/MainButton";
import {getBookTime} from "../constants/bookTime";
import {allServices} from "../constants/allServices";

function Book() {
    const [dateState, setDateState] = useState<any>();
    const [timeState, setTimeState] = useState<any>();
    const [allTimes, setAllTimes] = useState<any>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [userName, setUserName] = useState<any>("");
    const [phoneNumber, setPhoneNumber] = useState<any>("");
    const [email, setEmail] = useState<any>("");
    const [selectedForBook, setSelectedForBook] = useState<any>([]);
    const [price, setPrice] = useState<any>([]);
    const [totalSum, setTotalSum] = useState<any>();
    const [timeIndex, setTimeIndex] = useState<any>();
    const [lastTime, setLastTime] = useState<any>([]);
    const [totalTime, setTotalTime] = useState<any>();

    console.log("totalTIME",totalTime)

    useEffect(() => {
        setAllTimes(getBookTime(10, 45))
        selectedItems.forEach((el) => {
            const filteredSelections = allServiceGroup.filter((o) => o.value === el);
            // setPrice([...price,filteredSelections[0]?.startPrice]);
            let sum = filteredSelections[0]?.startPrice;
            setPrice([...price, sum]);
            setSelectedForBook([...selectedForBook, filteredSelections[0]]);

            let time = filteredSelections[0]?.timeToMinute;
            setLastTime([...lastTime, time])
        });
    }, [selectedItems]);

    useEffect(() => {
        if (price.length > 0) {
            let total = price.reduce((x: any, y: any) => x + y);
            setTotalSum(total)
        }
    }, [price]);

    useEffect(() => {
        if (lastTime.length > 0) {
            let total = lastTime.reduce((x: any, y: any) => x + y);
            setTotalTime(total)
        }
    }, [lastTime]);





    const allServiceGroup = Object.values(allServices).flat();
    const filteredOptions = allServiceGroup.filter((o) => !selectedItems.includes(o.value));

    const handleBook = () => {
        let allBooks = [
            {
                name: userName,
                date: dateState,
                timeState: timeState,
                services: [...selectedItems],
                phoneNumber: phoneNumber,
                email: email,
                totalPrice: totalSum
            }
        ]
        console.log("Book = >", allBooks);
    };

    const changeDate = (e: any) => {
        // console.log("eeeeeeeeeeeeeee",e.toLocaleString())
        // console.log("eeeeeeeeeeeeeee555",moment(e).format('MMMM Do YYYY'))
        let date = moment(e).format('MMMM Do YYYY')
        setDateState(date)
    };
    const handleSelectedServices = (e: any) => {
        setSelectedItems(e);
    };
    const handleSetTime = (time: any,index:number) => {
        setTimeState(time);
        setTimeIndex(index)
    };

    return (
        <div className="book-layout">
            <div className="book-left-side">
                <div className="book-left-side_content">
                    <div className="book-left-side_content_top">
                        Simply fill in the necessary information to secure your appointment with us. From preferred
                        service to date and time, your nail care needs are in good hands.
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
                            <input
                                type="text"
                                className="input"
                                onChange={(event) => setUserName(event.target.value)}
                            />
                        </div>
                        <div className="input_item">
                            <div className="input_item-title">Email Address</div>
                            <input type="email" className="input" onChange={(event) => setEmail(event.target.value)}/>
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input_item">
                            <div className="input_item-title">Phone Number</div>
                            <Input
                                placeholder="92309128"
                                prefix="+374"
                                onChange={(event) => setPhoneNumber('+374 ' + event.target.value)}
                            />
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
                                onChange={handleSelectedServices}
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
                            {allTimes.map((time: any,index:number) => {
                                return (
                                    <div
                                        key={index}
                                        className={timeIndex !== index ? "book-time-local" : "book-time-local is-selected"}
                                        onClick={() => handleSetTime(time,index)}
                                    >
                                        {time}
                                    </div>)
                            })}
                        </div>
                    </div>
                </div>
                <div className="book-footer">
                    <div className="book-price">
                        The service will cost <span>{totalSum} AMD</span>
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