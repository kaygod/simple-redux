import sr from "../../simple-redux";
import _axios from "../../../util/_axios";


export const nameSpace = "detailpage";

const data = {
  initialState: {
    isFetching: 0,
    data: {}
  },
  getters: {
    getData(state) {
      return state[nameSpace].data;
    },
    getFlag(state) {
      return state[nameSpace].isFetching;
    }
  },
  nameSpace,
  feature: {
    updateStatus(state, action) {
      return { ...state, isFetching: action.value[0] };
    },
    loadData: {
      async action(next) {

        await next({
          url: "/data/detail.json",
          method: "get"
        })

      },
      reducer(state, action, code) {

        switch (code) {

          case sr.loading: return {
            ...state,
            isFetching: 1
          };
          case sr.success:
            return {
              ...state,
              data: action.value
            };
          case sr.fail: return {
            ...state,
            isFetching: 0
          };

        }

      }
    }
  }
}


const result = sr.born(data, _axios);//第二个参数传入配置的axios实例

export default result;







