import {
    createTuit,
    findAllTuits,
    findTuitById,
    findTuitByUser,
    updateTuit,
    deleteTuit,
} from "../services/tuits-service";

import { createUser, deleteUsersByUsername } from "../services/users-service";

describe("createTuit", () => {
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

    test("can create tuit with REST API", async () => {
        const tuit = await createTuit(newUser._id, testTuit);

        expect(tuit.tuit).toEqual(testTuit.tuit);
        expect(tuit.postedBy).toEqual(newUser._id);
        expect(new Date(tuit.postedOn).getMilliseconds()).toBeLessThanOrEqual(
            Date.now()
        );
        deleteTuit(tuit._id);
    });
});

describe("deleteTuit", () => {
    const testUser = {
        username: "ellenripley",
        password: "password",
        email: "testuser@user.com",
    };
    const testTuit = { tuit: "this is test text for a test tuit" };

    let newUser;
    let newTuit;
    beforeAll(async () => {
        newUser = await createUser(testUser);
        newTuit = await createTuit(newUser._id, testTuit);
    });

    afterAll(() => {
        return deleteUsersByUsername(testUser.username);
    });

    test("can delete tuit with REST API", async () => {
        await deleteTuit(newTuit._id);
        let tuit = await findTuitById(newTuit._id);
        expect(tuit).toBeNull();
    });
});

describe("retrieveTuit", () => {
    const testUser = {
        username: "ellenripley",
        password: "password",
        email: "testuser@user.com",
    };
    const testTuit = { tuit: "this is test text for a test tuit" };

    let newUser;
    let newTuit;
    beforeAll(async () => {
        newUser = await createUser(testUser);
        newTuit = await createTuit(newUser._id, testTuit);
    });

    afterAll(async () => {
        await deleteUsersByUsername(newUser.username);
        await deleteTuit(newTuit._id);
    });

    test("can retrieve a tuit by its primary key", async () => {
        let tuit = await findTuitById(newTuit._id);
        expect(tuit._id).toBe(newTuit._id);
        expect(tuit.postedBy._id).toBe(newUser._id);
        expect(tuit.tuit).toBe(testTuit.tuit);
    });
});

describe("retrieveAllTuits", () => {
    const testUser = {
        username: "ellenripley",
        password: "password",
        email: "testuser@user.com",
    };

    let newUser;
    let tuits = ["a", "b", "c", "d"];
    beforeAll(async () => {
        newUser = await createUser(testUser);
        return Promise.all(
            tuits.map((tuit) => createTuit(newUser._id, { tuit }))
        );
    });
    afterAll(async () => {
        const tuits = await findTuitByUser(newUser._id);

        await deleteUsersByUsername(newUser.username);
        return Promise.all(tuits.map((t) => deleteTuit(t._id)));
    });
    test("can retrieve all tuits with REST API", async () => {
        let retrievedTuits = await findAllTuits();

        expect(retrievedTuits.length).toBeGreaterThanOrEqual(tuits.length);
        const tuitsWeInserted = retrievedTuits.filter(
            (tuit) => tuit.postedBy && tuit.postedBy._id === newUser._id
        );

        tuitsWeInserted.forEach((t) => {
            expect(tuits.indexOf(t.tuit)).toBeGreaterThanOrEqual(0);
        });
    });
});
