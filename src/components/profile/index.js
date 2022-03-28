import React, { useEffect, useState } from "react";
import MyTuits from "./my-tuits";
import {
    HashRouter,
    Link,
    Route,
    Routes,
    useNavigate,
    useLocation,
} from "react-router-dom";
import * as service from "../../services/security-service";
import TuitsAndReplies from "./tuits-and-replies";
import Media from "./media";
import MyLikes from "./my-likes";
const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [profile, setProfile] = useState({});
    useEffect(() => {
        (async () => {
            try {
                const user = await service.profile();
                setProfile(user);
            } catch (e) {
                navigate("/login");
            }
        })();
    }, []);

    const logout = () => {
        service.logout().then(() => navigate("/login"));
    };
    return (
        <div className="ttr-profile">
            <div className="border border-bottom-0">
                <h4 className="p-2 mb-0 pb-0 fw-bolder">
                    {profile.username}
                    <i className="fa fa-badge-check text-primary"></i>
                </h4>
                <div className="mb-5 position-relative">
                    <Link
                        to="/profile/edit"
                        className="mt-2 me-2 btn btn-large btn-light border border-secondary fw-bolder rounded-pill fa-pull-right"
                    >
                        Edit profile
                    </Link>
                    <button
                        onClick={logout}
                        className="mt-2 float-end btn btn-warning rounded-pill"
                    >
                        Logout
                    </button>
                </div>
            </div>
            <Routes>
                <Route path="/mytuits" element={<MyTuits />} />
                <Route
                    path="/tuits-and-replies"
                    element={<TuitsAndReplies />}
                />
                <Route path="/media" element={<Media />} />
                <Route path="/likes" element={<MyLikes />} />
            </Routes>
        </div>
    );
};
export default Profile;
