import * as React from "react";
import { screen, render } from "@testing-library/react";
import tuitsJson from "./tuits.json";
import Tuits from "../components/tuits";
import { HashRouter } from "react-router-dom";

test("tuits dislikes renders", async () => {
    let tuitsRender;
    render(
        <HashRouter>
            <Tuits tuits={tuitsJson} />
        </HashRouter>
    );

    tuitsJson.forEach((tuit) => {
        const likesElement = screen.getByText(tuit.stats.likes);
        const dislikesElement = screen.getByText(tuit.stats.dislikes);
        expect(likesElement).toBeInTheDocument();
        expect(dislikesElement).toBeInTheDocument();
    });
});
