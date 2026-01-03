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
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const { t } = useTranslation();

  // 💇‍♀️ Hairstyling services only
  const allServiceGroup = allServices["hairstyling"] || [];

  // Мастера
  const masters = [
    { value: "Gayane Khudoyan", label: t("Gayane Khudoyan") },
    { value: "Vaghinak Ohanyan", label: t("Vaghinak Ohanyan") },
  ];
  // Выходные дни
  const daysOff: any = {
    "Gayane Khudoyan": [1, 5],   // Пн, Пт
    "Vaghinak Ohanyan": [2, 4],  // Вт, Чт
  };

  // Выбранный мастер
  const [master, setMaster] = useState<string>("");

  useEffect(() => {
    if (!dateState) return;

    const day = new Date(dateState).getDay();

    const gayaneWorks = !daysOff["Gayane Khudoyan"].includes(day);
    const vaghinakWorks = !daysOff["Vaghinak Ohanyan"].includes(day);

    if (gayaneWorks && !vaghinakWorks) {
      setMaster("Gayane Khudoyan");
    } else if (!gayaneWorks && vaghinakWorks) {
      setMaster("Vaghinak Ohanyan");
    } else if (gayaneWorks && vaghinakWorks) {
      // если раньше выбрал — оставить
      if (master === "Vaghinak Ohanyan") setMaster("Vaghinak Ohanyan");
      else setMaster("Gayane Khudoyan");
    } else {
      setMaster("");  // никто не работает
    }
  }, [dateState]);


  // init times
  useEffect(() => {
    setAllTimes(getBookTime(10, 30));
  }, []);

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
    message += `Հեռախոս:\n${_phone} \n\n`;
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
    console.log("📤 CALL tgFormWeb() FROM FRONT");

    const errors = [];

    if (!userName || userName.trim() === "") errors.push(t("Please enter your name"));
    if (!phoneNumber || phoneNumber.trim().length < 8) errors.push(t("Please enter a valid phone number"));
    if (!master) errors.push(t("Please select a master"));
    if (!selectedItems || selectedItems.length === 0) errors.push(t("Please select at least one service"));
    if (!dateState) errors.push(t("Please select a date"));
    if (!timeState) errors.push(t("Please select a time"));

    if (errors.length > 0) {
      setIsSuccess(false);                 // ❌ ошибки
      setConfirmStatus(errors.join("\n"));
      setModalOpen(true);
      return;
    }

    try {

      const response = await fetch('https://chicchoc.top/public/service/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          master,
          name: userName,
          date: String(dateState),
          timeState,
          services: selectedItems,
          phoneNumber,
          totalPrice,
          totalTime,
        })
      });

      if (!response.ok) {
        setIsSuccess(false);               // ❌ ошибка сервера
        setConfirmStatus(`Server error: ${response.status}`);
        setModalOpen(true);
        return;
      }

      tgFormWeb(
        dateState,
        timeState,
        userName,
        phoneNumber,
        master,
        selectedItems,
        totalPrice
      );

      // 🎉 Успешно
      setIsSuccess(true);
      setConfirmStatus("Registration Successfully Completed");
      setModalOpen(true);

    } catch (err) {
      setIsSuccess(false);                 // ❌ ошибка сети
      setConfirmStatus("Something went wrong");
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

  const masterOptions = masters.map((m) => ({
    value: m.value,
    label: m.label,
    disabled: dateState ? daysOff[m.value]?.includes(new Date(dateState).getDay()) : false
  }));


  return (
    <div className="book-layout">
      <div className="hair-left-side">
        <div className="book-left-side_content_bottom">{t("Book Now")}</div>
      </div>

      <div className="book-right-side book-right-side-margin">
        <div className="form">
          <div className="book-right-side-title">{t("Book a Visit")}</div>
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
                value={master || undefined}
                placeholder={t("Choose Master")}
                options={masterOptions}
                onChange={(v) => {
                  setMaster(v);
                  if (dateState) getData(dateState);
                }}
                disabled={masterOptions.filter((m) => !m.disabled).length === 1}
              />

            </div>
          </div>
        </div>

        <div className="book-now-datetime">
          <Calendar value={dateState} onChange={changeDate} minDate={new Date()} />
          <div className="book-time">
            <div className="book-time-title">{t("Time")}</div>
            <div className="time-group">
              {allTimes.map((time: any, index: number) => (
                <div
                  key={index}
                  className={
                    !busyTimes?.includes(time) && !isPastTimeSlot(time)
                      ? timeIndex !== index
                        ? "book-time-local"
                        : "book-time-local is-selected"
                      : "is-time-busy"
                  }
                  onClick={() => {
                    if (!busyTimes?.includes(time) && !isPastTimeSlot(time)) {
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
        className="share-modal"
        title="CHIC - CHOC"
      >
        {isSuccess ? (
          // 🎉 SUCCESS
          <div>
            <h3 style={{ textAlign: "center", fontSize: "18px", marginBottom: "12px" }}>
              Շնորհակալություն։ Ձեր գրանցումը հաջողությամբ կատարվել է։
            </h3>

            <div style={{
              background: "#FFF5F0",
              border: "1px solid #FFD2C4",
              padding: "16px",
              borderRadius: "10px",
              marginBottom: "18px",
              fontSize: "15px",
              lineHeight: "22px",
              color: "#444"
            }}>
              <div><b>Ամսաթիվ․</b> {new Date(Number(dateState)).toLocaleDateString("hy-AM")}</div>
              <div><b>Ժամ․</b> {timeState}</div>
              <div><b>Մասնագետ․</b> {master}</div>
              <div><b>Հեռախոսահամար․</b> {phoneNumber}</div>
              <div><b>Ծառայություն․</b> {selectedItems.join(", ")}</div>
              <div><b>Արժեք․</b> {totalPrice} AMD</div>
            </div>

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
        ) : (
          // ❌ ERROR
          <div style={{
            textAlign: "center",
            color: "red",
            fontSize: "16px",
            whiteSpace: "pre-line"
          }}>
            {confirmStatus}
          </div>
        )}
      </Modal>


    </div>
  );
}

export default Book;
