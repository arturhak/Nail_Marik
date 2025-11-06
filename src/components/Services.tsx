import React, { useEffect, useState, useMemo } from "react";
import ServiceItem from "./ServiceItem";
import { allServices } from "../constants/allServices";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

function Services() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [expanded, setExpanded] = useState({
        manicure: false,
        pedicure: false,
        faceSkinCare: false,
        design: false,
        LashLiftandLamination: false,
    });

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        localStorage.setItem("selectedService", JSON.stringify([]));
    }, []);

    const handleSelectService = (serviceItem: any) => {
        localStorage.setItem("selectedService", JSON.stringify(serviceItem));
        navigate("/book");
    };

    // Фильтрация по поисковому запросу
    const filteredServices = useMemo(() => {
        if (!searchTerm.trim()) return allServices;
        const lower = searchTerm.toLowerCase();

        const filtered: any = {};
        Object.entries(allServices).forEach(([key, services]) => {
            const list = services as any[]; // ✅ Явно указываем, что это массив
            filtered[key] = list.filter((item: any) =>
                t(item.value).toLowerCase().includes(lower)
            );
        });
        return filtered;
    }, [searchTerm, t]);


    const renderCategory = (
        title: string,
        key: keyof typeof expanded,
        services: any[]
    ) => {
        const isExpanded = expanded[key];
        const visibleServices = isExpanded ? services : services.slice(0, 3);

        if (services.length === 0) return null;

        return (
            <div className="services margin-bottom">
                <div className="services-title">
                    {t(title)}<span>.</span>
                </div>
                <div className="service-content">
                    {visibleServices.map((serviceItem: any, index: number) => (
                        <ServiceItem
                            key={index}
                            bgImage={serviceItem.bg}
                            service={serviceItem.value}
                            startPrice={serviceItem.startPrice}
                            endPrice={serviceItem.endPrice}
                            hour={serviceItem.hour}
                            minute={serviceItem.minute}
                            timeToMinute={serviceItem.timeToMinute}
                            func={() => handleSelectService(serviceItem)}
                        />
                    ))}
                </div>

                {services.length > 3 && (
                    <div className="see-more-container">
                        <button
                            className="see-more-btn"
                            onClick={() =>
                                setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))
                            }
                        >
                            {isExpanded ? t("See less") : t("See more")}
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="layout">
            <div className="service_page_1">
                <div className="home_page_1_title">
                    {t(
                        "Visit our calm retreat and leave behind the busy pace of daily life. Our skilled technicians will provide you with exceptional nail care, creating the perfect experience for you."
                    )}
                </div>
                <div className="home_page_1_content">{t("Services")}</div>

                {/* 🔍 Поисковая строка */}
                <div className="search-container">
                    <input
                        type="text"
                        placeholder={t("Search for a service...")}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="service-search-input"
                    />
                </div>
            </div>

            {renderCategory("Manicure", "manicure", filteredServices.manicure)}
            {renderCategory("Pedicure", "pedicure", filteredServices.pedicure)}
            {renderCategory(
                "Men's Manicure/Pedicure",
                "faceSkinCare",
                filteredServices.faceSkinCare
            )}
            {renderCategory("Design", "design", filteredServices.design)}
            {renderCategory(
                "Lash lift and lamination",
                "LashLiftandLamination",
                filteredServices.LashLiftandLamination
            )}
        </div>
    );
}

export default Services;
