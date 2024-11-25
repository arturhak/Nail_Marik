import React, { useEffect, useState } from "react";
import { Input, Modal, Select } from 'antd';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import MainButton from "../buttons/MainButton";
import { getBookTime } from "../constants/bookTime";
import { allServices } from "../constants/allServices";
import { allMasters } from "../constants/allServices";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

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
    const [lastTimes, setLastTimes] = useState<any>([]);
    const [totalTime, setTotalTime] = useState<any>();
    const [selectMaster, setSelectMaster] = useState<any>("");
    const [receiveData, setReceiveData] = useState<any>([]);
    const [busyTimes, setBusyTimes] = useState<any>();
    const [modalOpen, setModalOpen] = useState(false)
    const [confirmStatus, setConfirmStatus] = useState("")

    const { t } = useTranslation()
    // console.log("Book Data",bookHours);

    useEffect(() => {
        getData()
    }, [dateState, selectMaster]);


    useEffect(() => {
        let defaultDate = new Date().toLocaleString();
        let date = new Date(defaultDate);
        let milliseconds = date.getTime();
        setDateState(milliseconds);

        const getSelectedItem: any = localStorage.getItem("selectedService")
        console.log("selected item from services=>", JSON.parse(getSelectedItem))
        if (JSON.parse(getSelectedItem)?.value) {
            setSelectedItems([...selectedItems, JSON.parse(getSelectedItem).value])
            localStorage.removeItem("selectedService")
        }
    }, []);

    useEffect(() => {
        setAllTimes(getBookTime(10, 30))

        if (selectedItems.length > 0) {
            selectedItems.forEach(() => {
                const filteredSelections = allServiceGroup.filter((o) => selectedItems.includes(o.value));

                let selectedItemsPrice = filteredSelections.map((item: any) => item.startPrice)
                setPrice(selectedItemsPrice)

                let selectedItemsTime = filteredSelections.map((item: any) => item.timeToMinute);
                setLastTimes(selectedItemsTime)

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
        if (lastTimes.length > 0) {
            let total = lastTimes.reduce((x: any, y: any) => x + y);
            setTotalTime(total)
        }
    }, [lastTimes]);

    // console.log("total Time", totalTime)
    // console.log("total Price", totalPrice)
    // console.log("selected for Book", selectedForBook)

    const allServiceGroup = Object.values(allServices).flat();
    // const filteredOptions = allServiceGroup.filter((o) => !selectedItems.includes(o.value));

    async function tgFormWeb(_date: any, _time: any, _name: any, _phone: any, _master: any, _service: any, _price: any) {
        const date = new Date(_date); // Assuming _date is a valid date string or object
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
        let message = ` Կատարվել է Գրանցում \n\n`;
        message += `Անուն:\n ${_name} \n\n`;
        message += `Ամսաթիվ:\n ${formattedDate} \n\n`;
        message += `Ժամ:\n${_time} \n\n`;
        message += `Հեռախոս:\n${_phone} \n\n`;
        message += `Մասնագետ:\n${_master} \n\n`;
        message += `Ծառայություն:\n${_service} \n\n`;
        message += `Արժեք:\n${_price} AMD\n\n`;

        const token = "7919607900:AAESSDQomcRQ2gBFpJ5NEXVZijW8FdA4kiY"
        const chat_id = "-4552058619";
        const URI_API = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(message)}`;

        try {
            let response = await fetch(URI_API, { method: 'GET' });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // You can handle the response if needed
            console.log('Message sent successfully');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    const getData = () => {

        fetch('https://chicchoc.top/public/public/service', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                master: selectMaster,
                date: dateState,
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const filteredTimes = data.map((el: any) => { return el.booked_hours })
                setReceiveData(data)
                setBusyTimes(filteredTimes.flat())
                console.log('On Receive Data:', receiveData);
                // Process data here
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
        // navigate("/")

    }
    console.log("out Receive Data =>", receiveData)

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

        fetch('https://chicchoc.top/public/public/service/data', {
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
                tgFormWeb(allBooks[0]?.date, allBooks[0]?.timeState, allBooks[0]?.name, allBooks[0]?.phoneNumber, allBooks[0]?.master, allBooks[0]?.services, allBooks[0]?.totalPrice);
                setModalOpen(true);
                setConfirmStatus('Registration Successfully Completed')
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setModalOpen(true);
                setConfirmStatus("Fill in all fields")
            });
        console.log("Book = >", allBooks);
    };

    const changeDate = (e: any) => {
        let date = moment(e).format('MMMM Do YYYY')
        let cleanDateString = date.replace(/(\d+)(st|nd|rd|th)/, '$1');
        let replace = new Date(cleanDateString);
        console.log("timestamp", new Date(replace).getTime())
        setDateState(new Date(replace).getTime());
        getData()

        // fetch('http://chicchoc.top/public/public/service', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         date: dateState,
        //         master: selectMaster
        //     })
        // })
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error(`HTTP error! Status: ${response.status}`);
        //         }
        //         return response.json();
        //     })
        //     .then(data => {
        //         console.log('Data received:', data);
        //         // Process data here
        //     })
        //     .catch(error => {
        //         console.error('Fetch error:', error);
        //     });
    };

    const handleSelectedServices = (e: any) => {
        setSelectedItems(e);
    };
    const handleSetTime = (time: any, index: number) => {
        if (!busyTimes?.includes(time)) {
            setTimeState(time);
            setTimeIndex(index)
        }

    };

    const handleInputPhoneNumber = (event: any) => {
        setPhoneNumber('+374 ' + event.target.value)
    }

    const handleSelectedMaster = (master: any) => {
        setSelectMaster(master)
    }

    const translatedMasters = allMasters.map((master) => ({
        value: master.value,
        label: t(`${master.value}`)
    }));

    const translatedServices = allServiceGroup.map((service) => ({
        value: service.value,
        label: t(`${service.value}`) + ' - ' + `${service.startPrice}` + ' ' + `${t('AMD')}`
    }));
    return (
        <div className="book-layout">
            <div className="book-left-side">
                <div className="book-left-side_content">
                    <div className="book-left-side_content_top">
                        {t('Simply fill in the necessary information to secure your appointment with us. From preferred service to date and time, your nail care needs are in good hands.')}
                    </div>
                    <div className="book-left-side_content_bottom">
                        {t('Book Now')}
                    </div>
                </div>
            </div>

            <div className="book-right-side book-right-side-margin">
                <div className="form">
                    <div className="book-right-side-title">
                        {t('Book an Arrangement')}
                    </div>
                    <div className="input-group">
                        <div className="input_item">
                            <div className="input_item-title">{t('Name Surname')}</div>
                            <input
                                type="text"
                                className="input"
                                placeholder={t("Name Surname")}
                                onChange={(event) => setUserName(event.target.value)}
                            />
                        </div>
                        <div className="input_item">
                            <div className="input_item-title">{t('Choose Master')}</div>
                            <Select
                                placeholder={t("Choose Master")}
                                value={selectMaster || undefined}
                                onChange={handleSelectedMaster}
                                options={translatedMasters}
                            />
                        </div>

                    </div>
                    <div className="input-group">
                        <div className="input_item">
                            <div className="input_item-title">{t('Phone Number')}</div>
                            <Input
                                placeholder="92309128"
                                prefix="+374"
                                onChange={handleInputPhoneNumber}
                            />
                        </div>

                        <div className="input_item">
                            <div className="input_item-title">{t('Select the Service Type')}</div>
                            <Select
                                mode="multiple"
                                placeholder={t("Services")}
                                value={selectedItems}
                                onChange={handleSelectedServices}
                                options={translatedServices}
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
                        <div className="book-time-title">{t('Time')}</div>
                        <div className="time-group">
                            {allTimes.map((time: any, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        className={!busyTimes?.includes(time) ? (timeIndex !== index ? "book-time-local" : "book-time-local is-selected") : "is-time-busy"}
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
                        {t('The service will cost')} <span>{totalPrice} {t('AMD')}</span>
                    </div>
                    <MainButton
                        text="Book"
                        func={handleBook}
                    />
                </div>
            </div>
            <Modal
                open={modalOpen}
                footer={null}
                onCancel={() => setModalOpen(false)}
                className="share-modal"
                title={"CHIC - CHOC"}
            >
                <p>{t(confirmStatus)}</p>
            </Modal>
        </div>
    )
}

export default Book