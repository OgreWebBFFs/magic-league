import React, { useState } from "react";
import classNames from "classnames";
import xhrRequest from "../../helpers/xhr-request";
import LoadingIcon from "../Icons/LoadingIcon";
import Button from "../Button";
import Modal from "../Modal";

const Status = {
    initial: () => (
        <>
            <i className="fab fa-discord" /> Send Message
        </>
    ),
    loading: () => "Sending...",
    success: () => "Message Sent!",
    error: () => (
        <>
            <i className="fas fa-exclamation-circle" /> Message Error
        </>
    ),
};

const TradeProposalModal = ({ onClose, card, currentUserId, user, priorMessageTimestamp }) => {
    const [reqState, setReqState] = useState("initial");
    const isComplete = reqState === "success" || reqState === "error";
    const sendMessage = async () => {
        setReqState("loading");
        try {
            await xhrRequest({
                url: "/trade_message",
                options: {
                    method: "POST",
                    body: JSON.stringify({ from_user_id: currentUserId, to_user_id: user.id, card_id: card.id }),
                },
            });
            setReqState("success");
        } catch (e) {
            setReqState("error");
        }
    };

    return (
        <Modal onClose={isComplete ? refreshPage : onClose}>
            <div className="trade-message--prompt">
                <div>
                    <h1>You are contacting:</h1>
                    {user.name}
                </div>
                <div>
                    <h1>To talk about trading for:</h1>
                    {card.name}
                </div>
                {priorMessageTimestamp && (
                    <div>
                        <h1>You previously messaged them about this card on:</h1>
                        {new Date(priorMessageTimestamp).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>
                )}
            </div>
            {reqState === "loading" && <LoadingIcon />}
            <Button
                type="submit"
                className={classNames({ "button--negative": reqState === "error" })}
                disabled={reqState !== "initial"}
                style={{ width: "100%" }}
                onClick={sendMessage}
            >
                {Status[reqState]()}
            </Button>
            {isComplete && (
                <Button className="button--no-button" onClick={refreshPage}>
                    Return to the Previous Page
                </Button>
            )}
        </Modal>
    );
};

export default TradeProposalModal;
