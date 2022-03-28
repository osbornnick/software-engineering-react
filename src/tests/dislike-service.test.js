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
describe("tuit dislike services", () => {
    const ripley = {
        username: "ellenripley",
        password: "lv426",
        email: "ellenripley@aliens.com",
    };
    const anna = {
        username: "anna",
        password: "anananananan",
        email: "anna@anna.com",
    };

    const tuit = { tuit: "test tuit" };
    let userId1;
    let userId2;
    let tid;
    let tid2;
    beforeAll(async () => {
        const user1 = await createUser(ripley);
        userId1 = user1._id;
        const user2 = await createUser(anna);
        userId2 = user2._id;

        const newTuit = await createTuit(userId1, tuit);
        tid = newTuit._id;
    });

    afterAll(async () => {
        await deleteTuit(tid);
        await deleteUsersByUsername(ripley.username);
        await deleteUsersByUsername(anna.username);
        await deleteTuit(tid2);
    });

    test("dislike tuit updates tuit stats", async () => {
        await userDislikesTuit(userId1, tid);
        const tuit = await findTuitById(tid);
        expect(tuit.stats.dislikes).toBe(1);
    });

    test("all users who dislike tuit are found", async () => {
        await userDislikesTuit(userId2, tid);
        const users = await findAllUsersThatDislikedTuit(tid);
        console.log(users);
        expect(users.length).toBe(2);
    });

    test("all disliked tuits by user are found", async () => {
        const newTuit = await createTuit(userId1, { tuit: "asdfasdf" });
        await userDislikesTuit(userId1, newTuit._id);
        const dislikedTuits = await findAllTuitsDislikedByUser(userId1);
        expect(dislikedTuits.length).toBe(2);
        tid2 = newTuit._id;
    });

    test("second dislike toggles disliking", async () => {
        await userDislikesTuit(userId1, tid);
        const dislikedTuits = await findAllTuitsDislikedByUser(userId1);
        expect(dislikedTuits.length).toBe(1);
        const tuit = await findTuitById(tid);
        expect(tuit.stats.dislikes).toBe(1);
    });
});
