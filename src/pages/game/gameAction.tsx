import type { ActionFunctionArgs } from "react-router"
const gameAction = async ({ request, params }: ActionFunctionArgs) => {
    try {
        const formData = await request.formData();
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
        console.log("the content of fetchResult is:", fetchResult);
        return fetchResult;
    } catch (error) {
        return {
            error: true,
            message: "Server error. We were not able to check you pick, try again later please.",
        }
    }
}

export default gameAction;
