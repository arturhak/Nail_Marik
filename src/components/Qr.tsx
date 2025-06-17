import React, { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { partnerList } from "../constants/Sale";


function QrScanner() {
    const [isEnabled, setIsEnabled] = useState(false);
    const [errStatus, setErrStatus] = useState("");
    const [qrMessage, setQrMessage] = useState("");
    const [partnerName, setPartnerName] = useState<any>("")
    const [chatID, setChatId] = useState<any>("")
    const [tokenId, setTokenId] = useState<any>("")
    const [partnerSale, setPartnerSale] = useState<any>("")

    useEffect(() => {
        const config = { fps: 10, qrbox: { width: 300, height: 300 } };
        const html5QrCode = new Html5Qrcode("qrCodeContainer");

        // Function to stop the scanner safely
        const scannerStop = async () => {
            try {
                await html5QrCode.stop();
            } catch (err) {
                console.error("Error stopping scanner:", err);
                setErrStatus("Error stopping scanner.");
            }
        };

        const playSound = () => {
            const audio = new Audio("/audio/sound.wav");
            audio.play()
                .then(() => console.log("Sound played successfully."))
                .catch((error) => console.error("Error playing sound:", error));
        };

        const qrCodeSuccess = (decodedText: any) => {
            playSound();
            setQrMessage(decodedText);
            for (let i = 0; i < partnerList.length; i++) {
                if (partnerList[i]?.name === decodedText) {
                    setPartnerSale(partnerList[i].sale)

                    tgForSale(partnerList[i].name, partnerList[i].tokenId, partnerList[i].chatId, partnerList[i].sale)
                } else {
                    console.log("Not found");

                }
            }
            setIsEnabled(false); // Automatically disable the scanner
        };
        if (isEnabled) {
            html5QrCode
                .start(
                    { facingMode: "environment" },
                    config,
                    qrCodeSuccess,
                    (errorMessage) => {
                        if (!errorMessage.includes("NotFoundException")) {
                            console.error("Scanning error:", errorMessage);
                            setErrStatus("Error scanning QR code.");
                        }
                    }
                )
                .catch((err) => {
                    console.error("Error starting scanner:", err);
                    setErrStatus("Error starting scanner.");
                });
        } else {
            scannerStop();
        }

        // Cleanup function to stop the scanner on component unmount
        return () => {
            scannerStop();
        };
    }, [isEnabled]);

    const toggleScanner = () => {
        // Disable toggle temporarily during transitions
        if (isEnabled) {
            setErrStatus("Stopping scanner...");
        }
        setIsEnabled(!isEnabled);
    };

    async function tgForSale(_name: any, _token: any, _chatId: any, _sale: any) {
        // const date = new Date(_date); // Assuming _date is a valid date string or object
        // const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
        let message = ` Զեղչի կտրոն \n\n`;
        message = _name;
        message = `Զեղչ - ${_sale}`;


        const URI_API = `https://api.telegram.org/bot${_token}/sendMessage?chat_id=${_chatId}&text=${encodeURIComponent(message)}`;

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

    return (
        <div className="scanner">
            <div id="qrCodeContainer"></div>
            <button className="startBtn" onClick={toggleScanner} disabled={errStatus === "Stopping scanner..."}>
                {isEnabled ? "Turn Off" : "Turn On"}
            </button>
            {qrMessage && <p>Scanned QR Code: {qrMessage} - {partnerSale}</p>}
        </div>
    );
}

export default QrScanner;
