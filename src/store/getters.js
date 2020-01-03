const getters = {
    api_token: state => state.user.api_token,
    user: state => state.user.user,
    tools: state => state.tool
};
export default getters;
