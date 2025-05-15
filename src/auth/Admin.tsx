import React, { useEffect, useState } from "react";
import { Input, Modal, Pagination, DatePicker } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import QrScaner from "../components/Qr";
import { format, parseISO, isSameDay, isValid } from 'date-fns';

function Admin() {
    const [allData, setAllData] = useState<any[]>([]);
    const [deletedData, setDeletedData] = useState<any>();
    const [modalOpen, setModalOpen] = useState(true);
    const [password, setPassword] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchDate, setSearchDate] = useState<Date | null>(null);
    const pageSize = 10;

    useEffect(() => {
        fetchData();
    }, [deletedData]);

    const fetchData = () => {
        fetch('https://chicchoc.top/public/public/all/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const newData = data.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
                setAllData(newData.reverse());
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    };

    const handleCancelBook = (item: any) => {
        fetch('https://chicchoc.top/public/public/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                master: item.master,
                name: item.name,
                date: item.date,
                timeState: item.time_start,
                totalTime: item.total_time
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Data Deleted', data);
                setDeletedData(data);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    };

    const handleInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        if (process.env.REACT_APP_ADMIN_PASSWORD && process.env.REACT_APP_ADMIN_PASSWORD === password) {
            setModalOpen(false);
        }
    };

    const handleReload = () => {
        fetchData();
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDateChange = (date: any) => {
        setSearchDate(date ? new Date(date.toISOString()) : null);
        setCurrentPage(1);
    };


    const filteredData = searchDate
        ? allData.filter((item: any) => {
            try {
                const itemDate = new Date(Number(item.date)); // безопасно преобразуем timestamp
                return !isNaN(itemDate.getTime()) && isSameDay(itemDate, searchDate);
            } catch {
                return false;
            }
        })
        : allData;

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);


    return (
        <div className="admin">
            <div style={{ marginBottom: "20px", textAlign: "center" }}>
                <DatePicker
                    placeholder="Search by Date"
                    onChange={handleDateChange}
                    style={{ width: "200px" }}
                />
            </div>

            <table id="customers">
                <thead>
                    <tr>
                        <th>Master</th>
                        <th>User</th>
                        <th>Phone</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((user: any) => (
                        <tr key={user.id}>
                            <td>{user.master}</td>
                            <td>{user.name}</td>
                            <td>{user.phone_number}</td>
                            <td>{user.services}</td>
                            <td>
                                {user.date && !isNaN(Number(user.date))
                                    ? format(new Date(Number(user.date)), 'dd.MM.yyyy')
                                    : '—'}
                            </td>

                            <td>{user.booked_hours?.[0]}</td>
                            <td>{user.total_price} AMD</td>
                            <td>
                                <button className="table-remove-btn" onClick={() => handleCancelBook(user)}>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredData.length}
                onChange={handlePageChange}
                style={{ marginTop: "20px", textAlign: "center" }}
            />

            {/* Modal for Admin Login */}
            <Modal
                open={modalOpen}
                footer={null}
                rootClassName="login-modal"
                title="Login"
                closeIcon={false}
            >
                <div className="login-body">
                    <Input.Password
                        placeholder="input password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        onInput={handleInputPassword}
                        style={{ width: '100%' }}
                    />
                    <button className="login-btn" onClick={handleLogin}>Login</button>
                </div>
            </Modal>

            <button className="table-remove-btn" onClick={handleReload}>
                Update
            </button>

            {/* <QrScaner /> */}
        </div>
    );
}

export default Admin;
