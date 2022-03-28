import React from "react";
import * as likesService from "../../services/likes-service";
import * as dislikesService from "../../services/dislikes-service";
import { useEffect, useState } from "react";

const TuitStats = ({ tuit, likeTuit = () => {}, dislikeTuit = () => {} }) => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    useEffect(() => {
        isLiked(tuit).then((r) => setLiked(r));
        isDisliked(tuit).then((r) => setDisliked(r));
    }, [tuit]);
    const isLiked = (tuit) =>
        likesService.findAllTuitsLikedByUser("me").then((data) => {
            data = data.map((t) => t._id);
            return data.includes(tuit._id);
        });
    const isDisliked = async (tuit) =>
        dislikesService.findAllTuitsDislikedByUser("me").then((d) => {
            d = d.map((t) => t._id);
            return d.includes(tuit._id);
        });
    return (
        <div className="row mt-2">
            <div className="col">
                <i className="far fa-message me-1"></i>
                {tuit.stats && tuit.stats.replies}
            </div>
            <div className="col">
                <i className="far fa-retweet me-1"></i>
                {tuit.stats && tuit.stats.retuits}
            </div>
            <div className="col">
                <span
                    onClick={() => {
                        likeTuit(tuit);
                        setLiked(!liked);
                    }}
                >
                    <i
                        className="fa-solid fa-thumbs-up me-1"
                        style={{ color: liked ? "red" : "" }}
                    ></i>
                    {tuit.stats && tuit.stats.likes}
                </span>
            </div>
            <div className="col">
                <span
                    onClick={() => {
                        dislikeTuit(tuit);
                        setDisliked(!disliked);
                    }}
                >
                    <i
                        className="fa-solid fa-thumbs-down me-1"
                        style={{ color: disliked ? "blue" : "" }}
                    ></i>
                    {tuit.stats && tuit.stats.dislikes}
                </span>
            </div>
            <div className="col">
                <i className="far fa-inbox-out"></i>
            </div>
        </div>
    );
};
export default TuitStats;
