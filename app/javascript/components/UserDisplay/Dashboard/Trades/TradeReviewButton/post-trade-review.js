import xhrRequest from "../../../../../helpers/xhr-request";

const postTradeReview = async (trade, status, currentUserId) => {
    try {
        await xhrRequest({
            url: `/multi_trades/${trade.id}`,
            options: {
                method: "PATCH",
                body: JSON.stringify({ status, user_id: currentUserId }),
            },
        });
        window.location.reload();
    } catch (e) {
        window.location.reload();
    }
};

export default postTradeReview;
