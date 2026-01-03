import React, { useEffect, useState } from "react";
import { Input, Modal, Select } from "antd";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import MainButton from "../buttons/MainButton";
import { getBookTime } from "../constants/bookTime";
import { allServices } from "../constants/allServices";
import { useTranslation } from "react-i18next";

function Book() {
  const [dateState, setDateState] = useState<any>();
  const [timeState, setTimeState] = useState<any>();
  const [allTimes, setAllTimes] = useState<any>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [userName, setUserName] = useState<any>("");
  const [phoneNumber, setPhoneNumber] = useState<any>("");
  const [price, setPrice] = useState<any>([]);
  const [totalPrice, setTotalPrice] = useState<any>();
  const [timeIndex, setTimeIndex] = useState<any>();
  const [lastTimes, setLastTimes] = useState<any>([]);
  const [totalTime, setTotalTime] = useState<any>();
  const [busyTimes, setBusyTimes] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmStatus, setConfirmStatus] = useState("");

  const { t } = useTranslation();
  type ModalType = "success" | "error";
  const [modalType, setModalType] = useState<ModalType>("success");

  // 💇‍♀️ Hairstyling services only
  const allServiceGroup = allServices["hairstyling"] || [];


  // 💇‍♀️ Единственный мастер
  const master = "Gayane Khudoyan";

  // 📅 Выходные: Понедельник (1) и Пятница (5)
  const daysOff = [1, 5];


  // init times
  useEffect(() => {
    setAllTimes(getBookTime(10, 30));
  }, []);

  useEffect(() => {
    if (!dateState) {
      setBusyTimes([]);
      return;
    }

    getData(dateState);
  }, [dateState]);

  // calculate price and duration
  useEffect(() => {
    if (selectedItems.length > 0) {
      const filtered = allServiceGroup.filter((o) =>
        selectedItems.includes(o.value)
      );
      setPrice(filtered.map((i: any) => i.startPrice));
      setLastTimes(filtered.map((i: any) => i.timeToMinute));
    } else {
      setPrice([]);
      setLastTimes([]);
    }
  }, [selectedItems]);

  useEffect(() => {
    setTotalPrice(price.reduce((a: any, b: any) => a + b, 0));
  }, [price]);

  useEffect(() => {
    setTotalTime(lastTimes.reduce((a: any, b: any) => a + b, 0));
  }, [lastTimes]);

  // 🔹 Get booked times for this master/date
  const getData = async (customDate?: number) => {
    const dateToUse = customDate || dateState;
    if (!dateToUse || isNaN(dateToUse)) return;

    try {
      const response = await fetch("https://chicchoc.top/public/service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          master,
          date: String(dateToUse),
        }),
      });

      const data = await response.json();
      console.log("📅 Received bookings:", data);

      if (Array.isArray(data)) {
        const filtered = data.filter((i: any) => i.master === master);
        const booked = filtered.flatMap((i: any) => i.booked_hours || []);
        setBusyTimes(booked);
      } else if (data?.conflicting_time) {
        setBusyTimes(data.conflicting_time);
        setConfirmStatus(t(data.message || "Some time slots are unavailable"));
        setModalOpen(true);
      }
    } catch (e) {
      console.error("Fetch error:", e);
    }
  };

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

  const handleBook = async () => {
    const errors = [];

    if (!userName?.trim()) errors.push(t("Please enter your name"));
    if (!phoneNumber || phoneNumber.trim().length < 8)
      errors.push(t("Please enter a valid phone number"));
    if (!selectedItems.length)
      errors.push(t("Please select at least one service"));
    if (!dateState) errors.push(t("Please select a date"));
    if (!timeState) errors.push(t("Please select a time"));
    if (isDayOff) errors.push(t("Selected day is unavailable"));

    if (errors.length > 0) {
      setConfirmStatus(errors.join("\n"));
      setModalType("error");
      setModalOpen(true);
      return;
    }

    try {
      const response = await fetch(
        "https://chicchoc.top/public/service/data",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            master,
            name: userName,
            date: String(dateState),
            timeState,
            services: selectedItems,
            phoneNumber,
            totalPrice,
            totalTime,
          }),
        }
      );

      if (!response.ok) {
        setConfirmStatus(t("Booking failed. Please try again."));
        setModalType("error");
        setModalOpen(true);
        return;
      }

      // ✅ TELEGRAM
      await tgFormWeb(
        dateState,
        timeState,
        userName,
        phoneNumber,
        master,
        selectedItems,
        totalPrice
      );

      // ✅ SUCCESS MODAL
      setConfirmStatus(t("Registration Successfully Completed"));
      setModalType("success");
      setModalOpen(true);

    } catch (err) {
      console.error(err);
      setConfirmStatus(t("Network error. Please try again."));
      setModalType("error");
      setModalOpen(true);
    }
  };



  const changeDate = (e: any) => {
    const d = new Date(e);
    d.setHours(0, 0, 0, 0);
    const ts = d.getTime();
    setDateState(ts);
    getData(ts);
  };

  function isPastTimeSlot(time: string): boolean {
    const today = new Date();
    const selected = new Date(dateState);
    if (
      today.getFullYear() !== selected.getFullYear() ||
      today.getMonth() !== selected.getMonth() ||
      today.getDate() !== selected.getDate()
    ) {
      return false;
    }
    const [h, m] = time.split(":").map(Number);
    const slot = new Date(dateState);
    slot.setHours(h, m, 0, 0);
    return slot.getTime() < today.getTime();
  }

  const translatedServices = allServiceGroup.map((service) => ({
    value: service.value,
    label: `${t(service.value)} - ${service.startPrice} ${t("AMD")}`,
  }));

  const isDayOff =
    dateState && daysOff.includes(new Date(dateState).getDay());


  return (
    <div className="book-layout">
      <div className="hair-left-side">
        <div className="book-left-side_content_bottom">{t("Book Hairstyling Now")}</div>
      </div>

      <div className="book-right-side book-right-side-margin">
        <div className="form">
          {/* <div className="book-right-side-title">{t("Book a Visit")}</div> */}
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
                value={master}
                options={[{ value: master, label: t(master) }]}
                disabled
              />


            </div>
          </div>
        </div>

        <div className="book-now-datetime">
          <Calendar
            value={dateState}
            onChange={changeDate}
            minDate={new Date()}
            tileDisabled={({ date }) => daysOff.includes(date.getDay())}
          />

          <div className="book-time">
            <div className="book-time-title">{t("Time")}</div>
            <div className="time-group">
              {allTimes.map((time: any, index: number) => (
                <div
                  key={index}
                  className={
                    isDayOff
                      ? "is-time-busy"
                      : !busyTimes.includes(time) && !isPastTimeSlot(time)
                        ? timeIndex !== index
                          ? "book-time-local"
                          : "book-time-local is-selected"
                        : "is-time-busy"
                  }

                  onClick={() => {
                    if (isDayOff) return;

                    if (!busyTimes.includes(time) && !isPastTimeSlot(time)) {
                      setTimeState(time);
                      setTimeIndex(index);
                    }
                  }}

                >
                  {time}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="book-footer">
          <div className="book-price">
            {t("The service will cost")} <span>{totalPrice} {t("AMD")}</span>
          </div>
          <MainButton text="Book" func={handleBook} />
        </div>
      </div>

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
                <div><b>Ամսաթիվ․</b> {new Date(Number(dateState)).toLocaleDateString("hy-AM")}</div>
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
