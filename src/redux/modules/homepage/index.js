import reducer from "./reducer";
import sr from "../../simple-redux";
import _axios from "../../../util/_axios";

export const nameSpace = "homepage";

const data = {
  initialState: {
    likes: {
      likesIsFetching: 1, //0 请求失败 1没有请求 2 请求中  3请求成功
      likes: []
    },
    recoms: {
      recomIsFetching: 1,
      recommends: []
    },
    num: 0 //计数 测试同步操作
  },
  getters: {
    getLikes(state) {
      return state[nameSpace].likes.likes;
    },
    getRecommends(state) {
      return state[nameSpace].recoms.recommends;
    },
    getLoading(state) {
      return state[nameSpace].likes.likesIsFetching;
    },
    getNum(state) {
      return state[nameSpace].num;
    }
  },
  nameSpace,
  feature: {
    countNum(state, action) {

      return { ...state, num: state.num + action.value[0] };

    },
    loadLikes: {
      async action(next, getState, args, dispatch) {

        await next({
          url: "/data/likes.json",
          method: "get",
          data: {
            likes: [1, 2, 3]
          }
        })

      },
      reducer: reducer.loadLikes
    },
    loadRecommends: {

      async action(next) {

        await next({
          url: "/data/recommends.json",
          method: "get"
        })

      },
      reducer: reducer.loadRecommends

    }
  }
}


const result = sr.born(data, _axios);//第二个参数传入配置的axios实例

export default result;







