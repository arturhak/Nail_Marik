import React, { useEffect, useState } from "react";
import { Input, Modal, Select } from 'antd';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
// import moment from 'moment';
import { format } from 'date-fns';
import MainButton from "../buttons/MainButton";
import { getBookTime } from "../constants/bookTime";
import { allServices } from "../constants/allServices";
import { allMasters } from "../constants/allServices";
import { useTranslation } from "react-i18next";
import { babyServices, hairMasters } from "../constants/babyServices";

function ChildBook() {
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
    const [newMaster, setNewMaster] = useState<any>();
    const [newDayOfWeek, setNewDayOfWeek] = useState<any>(new Date().getDay());
    const { t } = useTranslation();


    useEffect(() => {
        if (!dateState || isNaN(dateState)) return;

        const date = new Date(dateState);
        const dow = date.getDay(); // 0 (вс) - 6 (сб)

        // 🔹 Базовый список мастеров
        const allMastersList = [
            { value: "Gayane Khudoyan", label: t("Gayane Khudoyan") },
            { value: "Noro", label: t("Noro") },
        ];

        let availableMasters: any[] = [];

        // 🔹 Условия по дням недели
        if (dow === 4) {
            // Четверг → работает Noro и Gayane
            availableMasters = allMastersList.map((m) => ({
                ...m,
                disabled: false,
            }));
        } else {
            // Остальные дни → только Gayane
            availableMasters = [
                { value: "Gayane Khudoyan", label: t("Gayane Khudoyan"), disabled: false },
                { value: "Noro", label: t("Noro"), disabled: true },
            ];
        }

        // Обновляем состояние
        setNewMaster(availableMasters);

        // Если сегодня четверг — по умолчанию Noro, иначе Gayane
        if (dow === 4) {
            setSelectMaster("Noro");
        } else {
            setSelectMaster("Gayane Khudoyan");
        }
    }, [t, dateState]);





    useEffect(() => {
        getData();
    }, [dateState, selectMaster, modalOpen]);


    useEffect(() => {
        const now = new Date();
        const localMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        setDateState(localMidnight);




        const getSelectedItem: any = localStorage.getItem("selectedHairService")
        if (JSON.parse(getSelectedItem)?.value) {
            setSelectedItems([...selectedItems, JSON.parse(getSelectedItem).value])
            localStorage.removeItem("selectedHairService")
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

    const allServiceGroup = Object.values(babyServices).flat();
    // const filteredOptions = allServiceGroup.filter((o) => !selectedItems.includes(o.value));

    // async function tgFormWeb(_date: any, _time: any, _name: any, _phone: any, _master: any, _service: any, _price: any) {
    //     const date = typeof _date === 'number' || typeof _date === 'string' ? new Date(Number(_date)) : new Date(_date);
    //     const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
    //     let message = ` Կատարվել է Գրանցում \n\n`;
    //     message += `Անուն:\n ${_name} \n\n`;
    //     message += `Ամսաթիվ:\n ${formattedDate} \n\n`;
    //     message += `Ժամ:\n${_time} \n\n`;
    //     message += `Հեռախոս:\n${_phone} \n\n`;
    //     message += `Մասնագետ:\n${_master} \n\n`;
    //     message += `Ծառայություն:\n${_service} \n\n`;
    //     message += `Արժեք:\n${_price} AMD\n\n`;

    //     const token = "7999100182:AAHx_AkoTDBLJG9hkvI4eb5IisxsL7_J3V8"
    //     const chat_id = "-4875084189";
    //     const URI_API = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(message)}`;

    //     try {
    //         let response = await fetch(URI_API, { method: 'GET' });
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
    //         // You can handle the response if needed
    //     } catch (error) {
    //         console.error('Error sending message:', error);
    //     }
    // }


    async function tgFormWeb(_date: any, _time: any, _name: any, _phone: any, _master: any, _service: any, _price: any) {
        const date = typeof _date === 'number' || typeof _date === 'string' ? new Date(Number(_date)) : new Date(_date);
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
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }



    const getData = (customDate?: number) => {
        const dateToUse = customDate || dateState;

        if (!dateToUse || isNaN(dateToUse)) {
            console.error("Invalid dateState:", dateToUse);
            return;
        }

        const formattedDate = new Date(dateToUse).toISOString().split("T")[0]; // 'YYYY-MM-DD'

        const payload = {
            master: selectMaster,
            date: String(dateState), // timestamp в виде строки
        };


        console.log("Sending request with:", payload);

        fetch('https://chicchoc.top/public/service', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const filteredTimes = data.map((el: any) => el.booked_hours);
                setReceiveData(data);
                setBusyTimes(filteredTimes.flat());
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    };

    function isPastTimeSlot(time: string): boolean {
        const today = new Date();
        const selectedDate = new Date(dateState);

        // Если не сегодня — ничего не блокируем
        if (
            today.getFullYear() !== selectedDate.getFullYear() ||
            today.getMonth() !== selectedDate.getMonth() ||
            today.getDate() !== selectedDate.getDate()
        ) {
            return false;
        }

        // Текущее время
        const [hours, minutes] = time.split(":").map(Number);
        const timeSlotDate = new Date(dateState);
        timeSlotDate.setHours(hours, minutes, 0, 0);

        return timeSlotDate.getTime() < today.getTime();
    }


    const handleBook = async () => {
        const errors = [];

        if (!userName || userName.trim() === "") errors.push(t("Please enter your name"));
        if (!phoneNumber || phoneNumber.trim().length < 8) errors.push(t("Please enter a valid phone number"));
        if (!selectMaster) errors.push(t("Please select a master"));
        if (!selectedItems || selectedItems.length === 0) errors.push(t("Please select at least one service"));
        if (!dateState) errors.push(t("Please select a date"));
        if (!timeState) errors.push(t("Please select a time"));

        if (errors.length > 0) {
            setConfirmStatus(errors.join("\n"));
            setModalOpen(true);
            return;
        }

        const allBooks: any = [
            {
                master: selectMaster,
                name: userName,
                date: dateState.toString(),
                timeState: timeState,
                services: [...selectedItems],
                phoneNumber: phoneNumber,
                totalPrice: totalPrice,
                totalTime: totalTime,
            },
        ];

        try {
            const response = await fetch('https://chicchoc.top/public/service/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    master: allBooks[0]?.master,
                    name: allBooks[0]?.name,
                    date: String(allBooks[0]?.date),
                    timeState: allBooks[0]?.timeState,
                    services: allBooks[0]?.services,
                    phoneNumber: allBooks[0]?.phoneNumber,
                    totalPrice: allBooks[0]?.totalPrice,
                    totalTime: allBooks[0]?.totalTime,
                }),
            });

            if (!response.ok) {
                setConfirmStatus(`HTTP error! Status: ${response.status}`);
                setModalOpen(true);
                return;
            }

            // Предположим, что response.json() возвращает что-то, если нужно
            const data = await response.json();

            tgFormWeb(
                allBooks[0]?.date,
                allBooks[0]?.timeState,
                allBooks[0]?.name,
                allBooks[0]?.phoneNumber,
                allBooks[0]?.master,
                allBooks[0]?.services,
                allBooks[0]?.totalPrice
            );
            setConfirmStatus('Registration Successfully Completed');
            setModalOpen(true);
        } catch (error) {
            console.error('Fetch error:', error);
            setConfirmStatus("Fill in all fields");
            setModalOpen(true);
        }
    };


    const changeDate = (e: any) => {
        const dateObj = new Date(e);
        dateObj.setHours(0, 0, 0, 0);
        const timestamp = dateObj.getTime();

        setDateState(timestamp);

        const dayOfWeek = dateObj.getDay();
        setNewDayOfWeek(dayOfWeek);

        getData(); // используем актуальный dateState
    };


    const handleSelectedServices = (e: any) => {
        setSelectedItems(e);
    };

    const handleSetTime = (time: any, index: number) => {
        if (!busyTimes?.includes(time) && !isPastTimeSlot(time)) {
            setTimeState(time);
            setTimeIndex(index);
        }
    };

    const handleInputPhoneNumber = (event: any) => {
        setPhoneNumber('+374 ' + event.target.value)
    }

    const handleSelectedMaster = (master: any) => {
        setSelectMaster(master)
    }

    const translatedServices = allServiceGroup.map((service) => ({
        value: service.value,
        label: t(`${service.value}`) + ' - ' + `${service.startPrice}` + ' ' + `${t('AMD')}`
    }));
    return (
        <div className="book-layout">
            <div className="book-baby-left-side">
                <div className="book-left-side_content">
                    {/* <div className="book-left-side_content_top">
                        {t("Simply fill in the necessary information to secure your appointment with us. From preferred service to date and time, Your little ones' care is in safe hands.")}
                    </div> */}
                    <div className="book-left-side_content_bottom">
                        {t('Book Now')}
                    </div>
                </div>
            </div>

            <div className="book-right-side book-right-side-margin">
                <div className="form">
                    <div className="book-right-side-title">
                        {t('Book a Visit')}
                    </div>
                    <div className="input-grid">
                        <div className="input_item">
                            <div className="input_item-title">{t("Name Surname")}</div>
                            <input
                                type="text"
                                className="input"
                                placeholder={t("Name Surname")}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>

                        <div className="input_item">
                            <div className="input_item-title">{t("Phone Number")}</div>
                            <Input
                                placeholder="92309128"
                                prefix="+374"
                                onChange={(e) => setPhoneNumber("+374 " + e.target.value)}
                            />
                        </div>

                        <div className="input_item">
                            <div className="input_item-title">{t("Select the Service Type")}</div>
                            <Select
                                mode="multiple"
                                placeholder={t("Services")}
                                value={selectedItems}
                                onChange={setSelectedItems}
                                options={translatedServices}
                            />
                        </div>

                        <div className="input_item">
                            <div className="input_item-title">{t("Choose Master")}</div>
                            <Select
                                placeholder={t("Choose Master")}
                                value={selectMaster || undefined}
                                onChange={handleSelectedMaster}
                                options={newMaster}
                            />
                        </div>
                    </div>

                </div>
                <div className="book-now-datetime">
                    <Calendar
                        value={dateState}
                        onChange={changeDate}
                        minDate={new Date()} // 🚫 запрещает выбор прошедших дат
                    />

                    <div className="book-time">
                        <div className="book-time-title">{t('Time')}</div>
                        <div className="time-group">
                            {allTimes.map((time: any, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        className={
                                            !busyTimes?.includes(time) && !isPastTimeSlot(time)
                                                ? (timeIndex !== index ? "book-time-local" : "book-time-local is-selected")
                                                : "is-time-busy"
                                        }
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
                title="CHIC - CHOC"
            >
                <div className="modal-content">

                    <h3 style={{
                        textAlign: "center",
                        fontSize: "18px",
                        marginBottom: "12px"
                    }}>
                        Շնորհակալություն։
                        Ձեր գրանցումը հաջողությամբ կատարվել է։
                    </h3>

                    <div
                        style={{
                            background: "#FFF5F0",
                            border: "1px solid #FFD2C4",
                            padding: "16px",
                            borderRadius: "10px",
                            marginBottom: "18px",
                            fontSize: "15px",
                            lineHeight: "22px",
                            color: "#444"
                        }}
                    >
                        <div><b>Ամսաթիվ․</b>   {new Date(Number(dateState)).toLocaleDateString("hy-AM")}</div>
                        <div><b>Ժամ․</b> {timeState}</div>
                        <div><b>Մասնագետ․</b> {selectMaster}</div>
                        <div><b>Հեռախոսահամար․</b> {phoneNumber}</div>
                        <div><b>Ծառայություն․</b> {selectedItems[0]}</div>
                        <div><b>Արժեք․</b> {totalPrice} AMD</div>
                    </div>

                    <p style={{ textAlign: "center", marginBottom: "10px" }}>
                        Սեղմեք ստորև՝ Telegram ծանուցումները ակտիվացնելու համար
                    </p>

                    <a
                        href={`https://t.me/chicchocregistration_bot?start=${phoneNumber.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="telegram-button"
                        style={{
                            display: "block",
                            background: "#E75F36",
                            color: "white",
                            padding: "14px",
                            borderRadius: "8px",
                            fontSize: "16px",
                            textAlign: "center",
                            textDecoration: "none",
                            fontWeight: "600"
                        }}
                    >
                        📩 Ստանալ Telegram ծանուցումներ
                    </a>
                </div>
            </Modal>
        </div>
    )
}

export default ChildBook