import {
    createTuit,
    findAllTuits,
    findTuitById,
    findTuitByUser,
    updateTuit,
    deleteTuit,
} from "../services/tuits-service";

import { createUser, deleteUsersByUsername } from "../services/users-service";

describe("can create tuit with REST API", () => {
    const testUser = {
        username: "ellenripley",
        password: "password",
        email: "testuser@user.com",
    };
    const testTuit = { tuit: "this is test text for a test tuit" };

    let newUser;
    beforeAll(async () => {
        newUser = await createUser(testUser);
        return newUser;
    });

    afterAll(() => {
        return deleteUsersByUsername(testUser.username);
    });

    test("can insert tuit with defined user", async () => {
        const tuit = await createTuit(newUser.uid, testTuit);

        expect(tuit.tuit).toEqual(testTuit.tuit);
    });
});

describe("can delete tuit wtih REST API", () => {
    // TODO: implement this
});

describe("can retrieve a tuit by their primary key with REST API", () => {
    // TODO: implement this
});

describe("can retrieve all tuits with REST API", () => {
    // TODO: implement this
});
