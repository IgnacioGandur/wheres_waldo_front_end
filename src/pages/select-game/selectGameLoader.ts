const selectGameLoader = async () => {
    try {
        const gamesUrl = `${import.meta.env.VITE_API_BASE}/games`;
        const fetchOptions: RequestInit = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        };

        const gamesReponse = await fetch(gamesUrl, fetchOptions);
        const gamesResult = await gamesReponse.json();

        if (!gamesResult.success) {
            return {
                fetchError: true,
                message: gamesResult.message
            }
        }

        return gamesResult;
    } catch (error) {
        return {
            fail: true,
            error: "Server error. We were not able to reach the backend.",
        }
    }
}

export default selectGameLoader;
