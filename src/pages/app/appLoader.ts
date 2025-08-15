const appLoader = async () => {
    try {
        const url = import.meta.env.VITE_API_BASE;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        return {
            error: true,
            message: "Server error. We were not able to reach the back end, this means that most of the app will not work, please try again later...",
        }
    }
}

export default appLoader;
