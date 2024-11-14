import React, {useEffect, useState} from "react";
import {Input, Select} from 'antd';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import MainButton from "../buttons/MainButton";
import {getBookTime} from "../constants/bookTime";
import {allServices} from "../constants/allServices";
import {allMasters} from "../constants/allServices";
import {useNavigate} from "react-router";

function Book() {
    const [dateState, setDateState] = useState<any>();
    const [timeState, setTimeState] = useState<any>();
    const [allTimes, setAllTimes] = useState<any>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [userName, setUserName] = useState<any>("");
    const [phoneNumber, setPhoneNumber] = useState<any>("");
    const [selectedForBook, setSelectedForBook] = useState<any>([]);
    const [price, setPrice] = useState<any>([]);
    const [totalPrice, setTotalPrice] = useState<any>();
    const [timeIndex, setTimeIndex] = useState<any>();
    const [lastTime, setLastTime] = useState<any>([]);
    const [totalTime, setTotalTime] = useState<any>();
    const [selectMaster, setSelectMaster] = useState<any>("");
    const navigate = useNavigate()

    useEffect(() => {
        const getSelectedItem:any = localStorage.getItem("selectedService")
        console.log("hffffffffffffffffffffff",JSON.parse(getSelectedItem))
        if (JSON.parse(getSelectedItem).value) {
            setSelectedItems([...selectedItems, JSON.parse(getSelectedItem).value])
        }else setSelectedItems([...selectedItems])
    }, [])

    useEffect(() => {
        setAllTimes(getBookTime(10, 30))
        console.log("selectedItems", selectedItems)

        if (selectedItems.length > 0) {
            selectedItems.forEach((el) => {
                const filteredSelections = allServiceGroup.filter((o) => selectedItems.includes(o.value));

                console.log("filteredSelections", filteredSelections)

                let selectedItemsPrice = filteredSelections.map((item: any) => item.startPrice)
                setPrice(selectedItemsPrice)

                let selectedItemsTime = filteredSelections.map((item: any) => item.timeToMinute);
                setLastTime(selectedItemsTime)

                setSelectedForBook(filteredSelections);
            });
        } else {
            setPrice([])
        }
    }, [selectedItems]);


    useEffect(() => {
        let total = 0
        price?.map((el: any) => total = total + el);
        setTotalPrice(total)
    }, [price, selectedItems]);

    useEffect(() => {
        if (lastTime.length > 0) {
            let total = lastTime.reduce((x: any, y: any) => x + y);
            setTotalTime(total)
        }
    }, [lastTime]);


    const allServiceGroup = Object.values(allServices).flat();
    const filteredOptions = allServiceGroup.filter((o) => !selectedItems.includes(o.value));

    const handleBook = () => {
        let allBooks: any = [
            {
                master: selectMaster,
                name: userName,
                date: dateState,
                timeState: timeState,
                services: [...selectedItems],
                phoneNumber: phoneNumber,
                totalPrice: totalPrice,
                totalTime: totalTime
            }
        ]


        // const data = { date: allBooks?.date };

        fetch('http://chicchoc.top/public/public/service/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                master: allBooks[0]?.master,
                name: allBooks[0]?.name,
                date: allBooks[0]?.date,
                timeState: allBooks[0]?.timeState,
                services: allBooks[0]?.services,
                phoneNumber: allBooks[0]?.phoneNumber,
                totalPrice: allBooks[0]?.totalPrice,
                totalTime: allBooks[0]?.totalTime
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);
            // Process data here
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
        console.log("Book = >", allBooks);
        navigate("/")
    };

    const changeDate = (e: any) => {
        // console.log("eeeeeeeeeeeeeee",e.toLocaleString())
        // console.log("eeeeeeeeeeeeeee555",moment(e).format('MMMM Do YYYY'))
        let date = moment(e).format('MMMM Do YYYY')
        let cleanDateString = date.replace(/(\d+)(st|nd|rd|th)/, '$1');
        let replace = new Date(cleanDateString);
        console.log("eeeeeeeeeeeeeeeeeeeeeeee",new Date(replace).getTime())
        setDateState(new Date(replace).getTime())

        fetch('http://chicchoc.top/public/public/service', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: dateState,
                master: selectMaster
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);
            // Process data here
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    };
    const handleSelectedServices = (e: any) => {
        setSelectedItems(e);
    };
    const handleSetTime = (time: any, index: number) => {
        setTimeState(time);
        setTimeIndex(index)
    };

    const handleInputPhoneNumber = (event:any) => {
       setPhoneNumber('+374 ' + event.target.value)
    }

    const handleSelectedMaster = (master:any) => {
        setSelectMaster(master)
    }

    return (
        <div className="book-layout">
            <div className="book-left-side">
                <div className="book-left-side_content">
                    <div className="book-left-side_content_top">
                        Simply fill in the necessary information to secure your appointment with us. From preferred
                        service to date and time, your nail care needs are in good hands.
                    </div>
                    <div className="book-left-side_content_bottom">
                        Book Now
                    </div>
                </div>
            </div>

            <div className="book-right-side book-right-side-margin">
                <div className="form">
                    <div className="book-right-side-title">
                        Book an Arrangement
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
                            <div className="input_item-title">Choose Master</div>
                            {/*<input type="email" className="input" onChange={(event) => setEmail(event.target.value)}/>*/}
                            <Select
                                placeholder="Choose Master"
                                value={selectMaster}
                                onChange={handleSelectedMaster}
                                options={allMasters}
                            />
                        </div>

                    </div>
                    <div className="input-group">
                        <div className="input_item">
                            <div className="input_item-title">Phone Number</div>
                            <Input
                                placeholder="92309128"
                                prefix="+374"
                                onChange={handleInputPhoneNumber}
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
                            {allTimes.map((time: any, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        className={timeIndex !== index ? "book-time-local" : "book-time-local is-selected"}
                                        onClick={() => handleSetTime(time, index)}
                                    >
                                        {time}
                                    </div>)
                            })}
                        </div>
                    </div>
                </div>
                <div className="book-footer">
                    <div className="book-price">
                        The service will cost <span>{totalPrice} AMD</span>
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