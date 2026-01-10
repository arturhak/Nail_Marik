import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Input, Modal, Select, Spin } from "antd";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import MainButton from "../buttons/MainButton";
import { getBookTime } from "../constants/bookTime";
import { allServices } from "../constants/allServices";
import { useTranslation } from "react-i18next";

type ModalType = "success" | "error";

type BusyResponseItem = {
    booked_hours: string[];
};

const MASTER_NAME = "Irina Kostanyan";
const API_GET_BUSY = "https://chicchoc.top/public/service";
const API_BOOK = "https://chicchoc.top/public/service/data";

/* ================= HELPERS ================= */

function startOfDay(d: Date) {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
}

function sameDay(a: Date, b: Date) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

async function safeJson(res: Response) {
    const ct = res.headers.get("content-type");
    if (!ct || !ct.includes("application/json")) {
        const text = await res.text();
        throw new Error(text);
    }
    return res.json();
}

/* ================= TELEGRAM ================= */
/* ⚠️ как ты просил — во фронте */

async function tgFormWeb(_date: any, _time: any, _name: any, _phone: any, _master: any, _service: any, _price: any) {
    const date = typeof _date === 'number' || typeof _date === 'string' ? new Date(Number(_date)) : new Date(_date);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
    let message = ` Կատարվել է Գրանցում \n\n`;
    message += `Անուն:\n ${_name} \n\n`;
    message += `Ամսաթիվ:\n ${formattedDate} \n\n`;
    message += `Ժամ:\n${_time} \n\n`;
    message += `Մասնագետ:\n${_master} \n\n`;
    message += `Ծառայություն:\n${_service} \n\n`;
    message += `Արժեք:\n${_price} AMD\n\n`;

    const token = "7919607900:AAESSDQomcRQ2gBFpJ5NEXVZijW8FdA4kiY"
    const chat_id = "-4552058619";
    const URI_API = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(message)}`;
    console.log("📩 SENDING TG MESSAGE:", message);

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

/* ================= COMPONENT ================= */

function Book() {
    const { t } = useTranslation();

    const [dateState, setDateState] = useState<Date>(() =>
        startOfDay(new Date())
    );
    const [timeState, setTimeState] = useState("");
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [phoneNumber, setPhoneNumber] = useState("");

    const [busyTimes, setBusyTimes] = useState<string[]>([]);
    const [loadingBusy, setLoadingBusy] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<ModalType>("success");
    const [confirmStatus, setConfirmStatus] = useState("");
    const [userName, setUserName] = useState<string>("");

    const master = MASTER_NAME;
    const isWednesday = dateState.getDay() === 3;

    /* ===== SERVICES ===== */

    const allServiceGroup = useMemo(
        () => [
            ...(allServices["manicure"] || []),
            ...(allServices["pedicure"] || []),
            ...(allServices["faceSkinCare"] || []),
        ],
        []
    );

    const totalPrice = useMemo(
        () =>
            allServiceGroup
                .filter((s: any) => selectedItems.includes(s.value))
                .reduce((sum: number, s: any) => sum + Number(s.startPrice || 0), 0),
        [allServiceGroup, selectedItems]
    );

    const totalTime = useMemo(
        () =>
            allServiceGroup
                .filter((s: any) => selectedItems.includes(s.value))
                .reduce((sum: number, s: any) => sum + Number(s.timeToMinute || 0), 0),
        [allServiceGroup, selectedItems]
    );


    /* ===== TIME ===== */

    const allTimes = useMemo(() => getBookTime(10, 30), []);

    function isPastTimeSlot(time: string) {
        if (!sameDay(new Date(), dateState)) return false;
        const [h, m] = time.split(":").map(Number);
        const slot = new Date(dateState);
        slot.setHours(h, m, 0, 0);
        return slot.getTime() < Date.now();
    }

    const isSlotDisabled = useCallback(
        (time: string) =>
            isWednesday ||
            busyTimes.includes(time) ||
            isPastTimeSlot(time),
        [busyTimes, isWednesday, dateState]
    );

    /* ===== BUSY TIMES ===== */

    const getBusyTimes = useCallback(async (date: Date) => {
        if (date.getDay() === 3) {
            setBusyTimes([]);
            return;
        }

        setLoadingBusy(true);

        try {
            const res = await fetch(API_GET_BUSY, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    master,
                    date: String(date.getTime()),
                }),
            });

            const data: BusyResponseItem[] = await safeJson(res);

            const flat: string[] = [];
            data.forEach((x) =>
                x.booked_hours?.forEach((t) => {
                    if (!flat.includes(t)) flat.push(t);
                })
            );

            setBusyTimes(flat);
        } catch {
            setBusyTimes([]);
        } finally {
            setLoadingBusy(false);
        }
    }, [master]);

    useEffect(() => {
        getBusyTimes(dateState);
        setTimeState("");
    }, [dateState, getBusyTimes]);

    /* ===== BOOK ===== */

    const handleBook = async () => {
        const errors: string[] = [];

        if (phoneNumber.replace(/\D/g, "").length < 8)
            errors.push(t("Please enter a valid phone number"));
        if (!selectedItems.length)
            errors.push(t("Please select at least one service"));
        if (!timeState) errors.push(t("Please select a time"));
        if (isWednesday) errors.push("Չորեքշաբթի օրը փակ է");
        if (isSlotDisabled(timeState))
            errors.push(t("Selected time is not available"));

        if (errors.length) {
            setModalType("error");
            setConfirmStatus(errors.join("\n"));
            setModalOpen(true);
            return;
        }

        try {
            const res = await fetch(API_BOOK, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    master,
                    name: userName,
                    date: String(dateState.getTime()),
                    timeState,
                    services: selectedItems,
                    phoneNumber,
                    totalPrice,
                    totalTime,
                }),

            });

            if (!res.ok) {
                throw new Error("Booking failed");
            }

            // 🔔 Telegram — ОК
            await tgFormWeb(
                dateState,
                timeState,
                userName,
                phoneNumber,
                master,
                selectedItems,
                totalPrice
            );

            setModalType("success");
            setModalOpen(true);

            getBusyTimes(dateState);
        } catch (e) {
            console.error(e);
            setModalType("error");
            setConfirmStatus(t("Something went wrong. Please try again."));
            setModalOpen(true);
        }

    };

    /* ================= JSX (ТВОЙ ДИЗАЙН) ================= */

    return (
        <div className="book-layout">
            <div className="book-left-side">
                <div className="book-left-side_content">
                    <div className="book-left-side_content_bottom">
                        {t("Book Manicure Now")}
                    </div>
                </div>
            </div>

            <div className="book-right-side book-right-side-margin">
                <div className="form">
                    <div className="input-grid">
                        <div className="input_item">
                            <div className="input_item-title">{t("Name Surname")}</div>
                            <input
                                type="text"
                                className="input"
                                placeholder={t("Name Surname")}
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>

                        <div className="input_item">
                            <div className="input_item-title">{t("Phone Number")}</div>
                            <Input
                                placeholder="92309128"
                                prefix="+374"
                                value={phoneNumber.replace("+374 ", "")}
                                onChange={(e) =>
                                    setPhoneNumber("+374 " + e.target.value)
                                }
                            />
                        </div>

                        <div className="input_item">
                            <div className="input_item-title">
                                {t("Select the Service Type")}
                            </div>
                            <Select
                                mode="multiple"
                                placeholder={t("Services")}
                                value={selectedItems}
                                onChange={setSelectedItems}
                                options={allServiceGroup.map((s: any) => ({
                                    value: s.value,
                                    label: `${t(s.value)} - ${s.startPrice} AMD`,
                                }))}
                            />
                        </div>

                        <div className="input_item">
                            <div className="input_item-title">{t("Choose Master")}</div>
                            <Select value={master} disabled />
                        </div>
                    </div>
                </div>

                <div className="book-now-datetime">
                    <Calendar
                        value={dateState}
                        minDate={startOfDay(new Date())}
                        onChange={(d: any) => setDateState(startOfDay(d))}
                    />

                    <div className="book-time">
                        <div className="book-time-title">{t("Time")}</div>

                        {isWednesday && (
                            <div style={{ color: "#C62828", fontWeight: 600 }}>
                                Չորեքշաբթի օրը փակ է
                            </div>
                        )}

                        <div className="time-group">
                            {loadingBusy ? (
                                <Spin />
                            ) : (
                                allTimes.map((time) => (
                                    <div
                                        key={time}
                                        className={
                                            isSlotDisabled(time)
                                                ? "is-time-busy"
                                                : timeState === time
                                                    ? "book-time-local is-selected"
                                                    : "book-time-local"
                                        }
                                        onClick={() =>
                                            !isSlotDisabled(time) && setTimeState(time)
                                        }
                                    >
                                        {time}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="book-footer">
                    <div className="book-price">
                        {t("The service will cost")}{" "}
                        <span>{totalPrice} {t("AMD")}</span>
                    </div>
                    <MainButton text="Book" func={handleBook} />
                </div>
            </div>

            {/* ================= МОДАЛКА (РОВНО ТВОЯ) ================= */}

            <Modal
                open={modalOpen}
                footer={null}
                onCancel={() => setModalOpen(false)}
                centered
                className="share-modal"
                title="CHIC · CHOC"
            >
                <div className="modal-content">
                    <h3
                        style={{
                            textAlign: "center",
                            fontSize: "20px",
                            marginBottom: "16px",
                            fontWeight: 600,
                            color: modalType === "success" ? "#2E7D32" : "#C62828",
                        }}
                    >
                        {modalType === "success"
                            ? t("Your booking was successful")
                            : t("Booking failed")}
                    </h3>

                    <div
                        style={{
                            background: modalType === "success" ? "#F1FFF5" : "#FFF5F5",
                            border: modalType === "success"
                                ? "1px solid #C8E6C9"
                                : "1px solid #FFCDD2",
                            padding: "16px",
                            borderRadius: "10px",
                            marginBottom: "16px",
                            fontSize: "15px",
                            lineHeight: "22px",
                        }}
                    >
                        {modalType === "success" ? (
                            <>
                                <div><b>Ամսաթիվ․</b> {dateState.toLocaleDateString("hy-AM")}</div>
                                <div><b>Ժամ․</b> {timeState}</div>
                                <div><b>Մասնագետ․</b> {master}</div>
                                <div><b>Հեռախոսահամար․</b> {phoneNumber}</div>
                                <div><b>Ծառայություն․</b> {selectedItems.join(", ")}</div>
                                <div><b>Արժեք․</b> {totalPrice} AMD</div>
                            </>
                        ) : (
                            <>
                                <p style={{ marginBottom: 8 }}>
                                    {t("Please fix the following issues:")}
                                </p>
                                <ul style={{ paddingLeft: 18 }}>
                                    {confirmStatus.split("\n").map((err, i) => (
                                        <li key={i}>{err}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>

                    {modalType === "success" ? (
                        <>
                            <p style={{ textAlign: "center", marginBottom: 12 }}>
                                {t("Activate Telegram notifications")}
                            </p>

                            <a
                                href={`https://t.me/chicchocregistration_bot?start=${phoneNumber.replace(/\D/g, "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "block",
                                    background: "#E75F36",
                                    color: "#fff",
                                    padding: "14px",
                                    borderRadius: "8px",
                                    fontSize: "16px",
                                    textAlign: "center",
                                    fontWeight: 600,
                                    textDecoration: "none",
                                }}
                            >
                                📩 Telegram
                            </a>
                        </>
                    ) : (
                        <button
                            onClick={() => setModalOpen(false)}
                            style={{
                                width: "100%",
                                padding: "12px",
                                background: "#E75F36",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "16px",
                                cursor: "pointer",
                            }}
                        >
                            {t("Edit information")}
                        </button>
                    )}
                </div>
            </Modal>
        </div>
    );
}

export default Book;
