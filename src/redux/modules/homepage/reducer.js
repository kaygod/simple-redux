import sr from "../../simple-redux";

export default {

    loadLikes(state, action, code) {

        switch (code) {

            case sr.loading: return {
                ...state,
                likes: {
                    ...state.likes,
                    likesIsFetching: 1
                }
            };
            case sr.success: return {
                ...state,
                likes: {
                    ...state.likes,
                    likes: action.value,
                    likesIsFetching: 0
                }
            };
            case sr.fail: return {
                ...state,
                likes: {
                    ...state.likes,
                    likesIsFetching: 0
                }
            };

        }

    },
    loadRecommends(state, action, code) {

        switch (code) {

            case sr.loading: return {
                ...state,
                recoms: {
                    ...state.recoms,
                    recomIsFetching: 1
                }
            };
            case sr.success: return {
                ...state,
                recoms: {
                    ...state.recoms,
                    recomIsFetching: 0,
                    recommends: action.value
                }
            };
            case sr.fail: return {
                ...state,
                recoms: {
                    ...state.recoms,
                    recomIsFetching: 0
                }
            };

        }

    }

}