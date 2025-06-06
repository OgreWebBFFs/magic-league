import xhrRequest from "../../../../../helpers/xhr-request";

const postTradeReview = async (trade, status) => {
    try {
        await xhrRequest({
            url: `/trades/${trade.id}`,
            options: {
                method: "PUT",
                body: JSON.stringify({ status }),
            },
        });
        window.location.reload();
    } catch (e) {
        window.location.reload();
    }
};

export default postTradeReview;
