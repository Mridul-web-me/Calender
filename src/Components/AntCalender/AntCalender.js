import { Button, DatePicker, Modal, TimePicker } from 'antd';
import React, { useState } from 'react'
import './AntCalender.css'
import 'antd/dist/antd.css';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { Controller, useForm } from 'react-hook-form';


const AntCalender = () => {

    const [value, onChange] = useState(new Date());
    // const [title, setTitle] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [time, setTime] = useState(new Date())


    const onSubmit = data => {
        // data.preventDefault();

        const scheduleInfo = {
            title: data.title,
            startDate: startDate,
            endDate: endDate,
            time: time
        }
        console.log(scheduleInfo)
        // fetch('http://localhost:8080/schedule', {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(scheduleInfo)
        // })
    };


    // For Data Fetching


    // const [formattedBookings, setFormattedBookings] = useState([])
    // useEffect(() => {
    //     fetch('http://localhost:8080/schedule')
    //         .then(res => res.json)
    //         .then(data => setFormattedBookings(data))
    // }, [])

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);


    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };
    const { register, handleSubmit, control } = useForm();

    return (<>
        <h1>My Schedule</h1>
        <Button type="primary" onClick={showModal}>
            Add Schedule
        </Button>
        <Modal
            title="Title"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <div>
                <form onSubmit={handleSubmit((onSubmit))}>
                    <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} {...register('title')} />
                    <Controller
                        control={control}
                        name='startDate'
                        render={({ field: { value = startDate, onChange } }) => (
                            <DatePicker
                                onChange={date => {
                                    setStartDate(date);
                                    onChange(startDate);
                                }}
                                selected={value}
                                dateFormat='MM/dd/yyyy'
                                required
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name='endDate'
                        render={({ field: { value = endDate, onChange } }) => (
                            <DatePicker
                                onChange={date => {
                                    setEndDate(date);
                                    onChange(endDate);
                                }}
                                selected={value}
                                dateFormat='MM/dd/yyyy'
                                required
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name='time'
                        render={({ field: { value = time, onChange } }) => (
                            <TimePicker
                                onChange={date => {
                                    setTime(date);
                                    onChange(time);
                                }}
                                selected={value}
                                dateFormat='MM/dd/yyyy'
                                required
                            />
                        )}
                    />
                    <button stlye={{ marginTop: "10px" }} type="submit">
                        Add Event
                    </button>
                </form>
            </div>
        </Modal>
        <Calendar onChange={onChange} value={value} />
        {/* <ul className="events">
            {formattedBookings.map((item) => (
                <li key={item.content}>
                    <Badge status={item.type} text={item.content} />
                </li>
            ))}
        </ul> */}
    </>
    );
}

export default AntCalender