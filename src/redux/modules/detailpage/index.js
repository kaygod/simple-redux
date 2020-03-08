import sr from "../../simple-redux";

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
          case sr.success: return {
            ...state,
            isFetching: 0,
            data: action.value.data
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


const result = sr.born(data);//第二个参数传入配置的axios实例

export default result;







