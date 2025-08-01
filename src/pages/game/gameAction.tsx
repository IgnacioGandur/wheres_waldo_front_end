import type { ActionFunctionArgs } from "react-router";

const gameAction = async ({ request, params }: ActionFunctionArgs) => {
    try {
        const gameName = params.gameName;
        const formData = await request.formData();
        const imageWidth = formData.get("imageWidth");
        const imageHeight = formData.get("imageHeight");
        const x = formData.get("x");
        const y = formData.get("y");
        const character = formData.get("character");

        const userChoiceUrl = `${import.meta.env.VITE_API_BASE}/games/${gameName}`;
        const fetchOptions: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                imageWidth,
                imageHeight,
                x,
                y,
                character,
            }),
        };

        console.log("fetch options is:", fetchOptions);
        const userChoiceResponse = await fetch(userChoiceUrl, fetchOptions);
        console.log("userChoiceResponse", userChoiceResponse);
        const userChoiceResult = await userChoiceResponse.json();
        console.log("userChoiceResult", userChoiceResult);

        return userChoiceResult;
    } catch (error) {
        return {
            error: true,
            message: "Server error. We were not able to reach the app's back-end, please try again later...",
        }
    }
}

export default gameAction;
