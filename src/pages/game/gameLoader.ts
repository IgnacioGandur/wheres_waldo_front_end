import type { LoaderFunctionArgs } from "react-router";

const gameLoader = async ({ params }: LoaderFunctionArgs) => {
    try {
        const gameUrl: string = `${import.meta.env.VITE_API_BASE}/games/${params.gameName}`;
        const fetchOptions: RequestInit = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const gameResponse = await fetch(gameUrl, fetchOptions);
        const gameResult = await gameResponse.json();
        if (!gameResult.success) {
            return {
                fetchError: true,
                message: gameResult.message
            }
        }
        return gameResult;
    } catch (error) {
        return {
            fail: true,
            error: "Server error. We were not able to reach the backend."
        }
    }
}

export default gameLoader;
