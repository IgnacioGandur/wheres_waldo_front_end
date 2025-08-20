const leaderboardLoader = async () => {
    try {
        const leaderboardsUrl = `${import.meta.env.VITE_API_BASE}/leaderboards`;
        const fetchOptions: RequestInit = {
            method: "GET",
            headers: {
                "Content-Type": "appliaction/json",
            },
        };

        const leaderboardsResponse = await fetch(leaderboardsUrl, fetchOptions);
        const leaderboardResult = await leaderboardsResponse.json();
        return leaderboardResult;
    } catch (error) {
        return {
            error: true,
            message: "Server error. We were not able to retrieve leaderboards.",
        };
    }
};

export default leaderboardLoader;
