import { PostTypes } from '../../actions/post/post.types';
// import { userTypes } from '../../actions/user/user.types'
const initState = {
    posts: [],
    comments: [],
    loading: true,
    error: {}

};

const postReducer = (state = initState, action) => {
    const { type, payload } = action
    switch (type) {
        case PostTypes.GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false

            };
        case PostTypes.GET_POST:
            return {
                ...state,
                post: payload,
                loading: false
            };
        case PostTypes.ADD_POST:
            return {
                ...state,
                loading: false,
                posts: [...state.posts, payload]

            };
        case PostTypes.DELETE_POST:
            return {
                ...state,
                posts: state.posts.flter((post) => post.id !== payload)
            };
        case PostTypes.POST_ERROR:
            return {
                ...state,
                loading: false,
                error: payload

            };
        case PostTypes.UPDATE_LIKES:
            return {
                ...state,
                loading: false,
                posts: state.posts.map((post) => {
                    return post.id === payload.id ? { ...post, likes: payload } : post
                })


            };
        case PostTypes.ADD_COMMENT:
            return {
                ...state,
                loading: false,
                comments: [...state.comments, payload]


            };
        case PostTypes.GET_COMMENTS:
            return {
                ...state,
                loading: false,
                comments: payload
            }
        case PostTypes.PUSEHER_COMMENT_UPDATE:
            return {
                ...state,
                loading: false,
                comments: [...state.comments, payload]
            }

        case PostTypes.REMOVE_COMMENT:
            return {
                ...state,
                laoding: false,
                comments: {
                    ...state.comments,
                    comments: state.post.comments.filter((comment) => comment.id !== payload)

                }
            }

        default:
            return state;
    }

};
export default postReducer;