import {
    findAllTuitsDislikedByUser,
    findAllUsersThatDislikedTuit,
    userDislikesTuit,
} from "../services/dislikes-service";

import { createUser, deleteUsersByUsername } from "../services/users-service";
import {
    createTuit,
    deleteTuit,
    findTuitById,
} from "../services/tuits-service";
describe("dislike a tuit", () => {
    const ripley = {
        username: "ellenripley",
        password: "lv426",
        email: "ellenripley@aliens.com",
    };

    const tuit = { tuit: "test tuit" };
    let userId;
    let tid;
    beforeAll(async () => {
        const user = await createUser(ripley);
        userId = user._id;
        const newTuit = await createTuit(userId, tuit);
        tid = newTuit._id;
    });

    afterAll(async () => {
        await deleteTuit(tid);
        await deleteUsersByUsername(ripley.username);
    });

    test("dislike tuit updates tuit stats", async () => {
        await userDislikesTuit(userId, tid);
        const tuit = await findTuitById(tid);
        expect(tuit.stats.dislikes).toBe(1);
    });
});
