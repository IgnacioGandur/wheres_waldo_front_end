import type { ActionFunctionArgs } from "react-router"
const gameAction = async ({ request, params }: ActionFunctionArgs) => {
    try {
        const formData = await request.formData();
        const intent = formData.get("intent");
        if (intent === "submit-score") {
            try {
                const username = formData.get("username");
                const time = formData.get("time");
                const fetchUrl = `${import.meta.env.VITE_API_BASE}/games/${params.gameSlug}/leaderboard`;
                const fetchOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        time
                    })
                }
                const scoreResponse = await fetch(fetchUrl, fetchOptions);
                const scoreResult = await scoreResponse.json();
                console.log("the content of scoreResult is:", scoreResult);
                if (scoreResult.success) {
                    return {
                        scoreCreated: true,
                        message: scoreResult.message,
                    }
                } else {
                    return {
                        scoreCreationFailed: true,
                        inputErrors: scoreResult,
                    }
                }
            } catch (error) {
                return {
                    error: true,
                    message: "Server error. We were not able to submit your score, please try again later...",
                }
            }
        }
        const renderedImageWidth = formData.get("renderedImageWidth");
        const renderedImageHeight = formData.get("renderedImageHeight");
        const relativeClickY = formData.get("relativeClickY");
        const relativeClickX = formData.get("relativeClickX");
        const selectedCharacter = formData.get("selectedCharacter");
        const selectedCharacterImage = formData.get("selectedCharacterImage");
        const fetchUrl = `${import.meta.env.VITE_API_BASE}/games/${params.gameSlug}`;
        const fetchOptions: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                renderedImageWidth,
                renderedImageHeight,
                relativeClickX,
                relativeClickY,
                selectedCharacter,
                selectedCharacterImage,
            })
        };
        const fetchResponse = await fetch(fetchUrl, fetchOptions);
        const fetchResult = await fetchResponse.json();
        return fetchResult;
    } catch (error) {
        return {
            error: true,
            message: "Server error. We were not able to check your pick, try again later please.",
        }
    }
}

export default gameAction;
