import React, {useContext, useEffect, useState} from 'react';
import {sendEmailVerification} from "firebase/auth";
import {AuthContext} from "../../context";

export const TimerVerifiedEmail = () => {
    const {auth} = useContext(AuthContext);
    const [sentMessage, setSentMessage] = useState(localStorage.getItem("sentMessage") === 'true' ? true : false);
    const [time, setTime] = useState(Number(localStorage.getItem("time")) || 180000); // 180000


    const timer = () => {
        return setInterval(() => {
            setTime(remainingMinutes => {
                localStorage.setItem("time", remainingMinutes - 1000);
                return remainingMinutes - 1000;
            });
        }, 1000);
    }

    const convertTime = () => {
        const date = new Date(time);
        return `${date.getMinutes()}:${date.getSeconds()}`;
    }

    const confirmEmail = async () => {
        await sendEmailVerification(auth.currentUser);
        localStorage.setItem("sentMessage", true);
        setSentMessage(true);
    }

    useEffect(() => {
        if (sentMessage) {
            const idTimer = timer();
            return () => clearInterval(idTimer);
        }
    }, [sentMessage])


    useEffect(() => {
        if (time === 0) {
            localStorage.setItem("sentMessage", false);
            localStorage.setItem("time", 180000);
            setSentMessage(false);
            setTime(180000);
        }
    }, [time])


    return (
        <div>
            <h2 style={{
                textAlign: "center",
                color: "#909090",
                marginBottom: "15px",
            }}>Потвердите email, для создания постов :)</h2>
            {
                sentMessage
                    ?
                    <div style={{textAlign: "center"}}>
                        Email можно потвердить повторно через {convertTime()}
                    </div>
                    :
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <button
                            style={
                                {
                                    backgroundColor: "#78ed3e",
                                    padding: "10px 15px",
                                    fontWeight: "600",
                                    border: "none",
                                    cursor: "pointer",
                                }
                            }
                            onClick={confirmEmail}
                        >Потвердить email
                        </button>
                    </div>

            }

        </div>
    );
};

