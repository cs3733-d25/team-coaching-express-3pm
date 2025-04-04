import { useState, useEffect} from 'react';
import axios from 'axios';
import {FeedBack} from "common/src/Feedback.ts";

// http protocol
//The most common types of HTTP requests are
// GET, POST, PUT, PATCH, and DELETE.
// These methods define how clients and servers communicate with each other over the web

export function FeedBackForm() {
    const [name, setName] = useState('');
    const [feedBack, setFeedBack] = useState('');

    const [feedbacks, setFeedbacks] = useState<FeedBack[]>([]);

    function submit() {
        console.log(`${name} gave the feedback of ${feedBack}`);
    }

    useEffect(() => {
        retrieve_from_database()
    }, [])

    async function handleSubmit() {
        if (!name || !feedBack) return;
        try {
            console.log("sending feedback to the server");

            const response = await axios.post("/api/feedback", {
                name: name,
                feedback: feedBack
            })
            console.log("feedback sent to the server");
            clear();
        } catch (error) {
            console.log(error);
        }
    }



    async function retrieve_from_database() {
        try {
            const response = await axios.get("/api/feedback/all");
            console.log(response.data);
            setFeedbacks(response.data);
        } catch (error){
            console.log(error);
        }
    }




    function clear() {
        setFeedBack('');
        setName('');
    }

    return (
        <div
            className={
                'justify-items-center text-2xl border-2 border-gray-400 rounded-2xl p-10 flex flex-col gap-5 rounded-2'
            }
        >
            <div className={'px-10  gap-5 py-5 flex flex-col rounded-2 border-white'}>
                <h1>Name</h1>
                <input
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    type={'text'}
                    className={'border-2 p-2 border-black rounded-2xl grow'}
                />
            </div>
            <div className={'px-10 gap-5 py-5 flex flex-col rounded-2 border-white'}>
                <h1>Feedback</h1>
                <textarea
                    value={feedBack}
                    onChange={(e) => {
                        setFeedBack(e.target.value);
                    }}
                    className={'border-2 border-black p-2 rounded-2xl'}
                />
            </div>
            <div className={'grid grid-cols-2 justify-items-center'}>
                <button
                    className={'border-2 w-32 px-5 py-2 rounded-3xl border-gray-400 drop-shadow-xl'}
                    onClick={handleSubmit}
                >
                    Submit
                </button>
                <button
                    className={'border-2 w-32 px-5 py-2 rounded-3xl border-gray-400 drop-shadow-xl'}
                    onClick={clear}
                >
                    Clear
                </button>
            </div>
            <button onClick={retrieve_from_database}>Retrieve</button>
            {feedbacks.map((feedback, index) => (
                <p> {feedback.name}, {feedback.feedback}</p>
            ))}


        </div>
    );
}
