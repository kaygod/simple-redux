import axios from "axios";

export default class SimpleRedux {

  static fail = 0;
  static success = 2;
  static loading = 1;

  static born(data, _axios = null) {

    const actions = SimpleRedux.generateActions(data, _axios);

    const reducers = SimpleRedux.generateReducers(data);

    const getters = SimpleRedux.generategetters(data);

    return { actions, reducers, getters };

  }

  static toUpper(data) {
    return data;
  }

  /**
   * 
   * @param {*} param0 
   * 生成getters
   * 
   */
  static generategetters({ initialState, getters = null, nameSpace }) {

    if (getters !== null) { //用户自定义了getters
      return getters;
    }

    let obj = {};

    const state_arr = Object.keys(initialState);

    state_arr.forEach((key) => {

      let new_key = `get${key.slice(0, 1).toUpperCase()}${key.slice(1)}`;

      obj[new_key] = (state) => {
        return state[nameSpace][key];
      }

    })

    return obj;


  }


  /**
   * 
   * 生成reducer
   * 
   * code -1 没有进行ajax请求
   *       0 请求失败
   *       1 请求中
   *       2 请求成功
   */
  static generateReducers({ nameSpace, feature, initialState }) {

    return (state = initialState, action) => {

      let fun = action.type.replace(new RegExp(`${SimpleRedux.toUpper(nameSpace)}|\/`, "ig"), "");

      let code = null;

      if (fun.includes("_requestting")) {
        code = SimpleRedux.loading;
        fun = fun.replace("_requestting", "");
      } else if (fun.includes("_request_success")) {
        code = SimpleRedux.success;
        fun = fun.replace("_request_success", "");
      } else if (fun.includes("_request_fail")) {
        code = SimpleRedux.fail;
        fun = fun.replace("_request_fail", "");
      }

      if (feature[fun]) {
        let _fun = feature[fun];
        if (feature[fun].reducer) {
          _fun = feature[fun].reducer;
        }
        const new_state = _fun(state, action, code);
        if (new_state) {
          return new_state;
        } else {
          return state;
        }
      } else {
        return state;
      }

    }
  }

  static toString(data) {

    return Object.prototype.toString.call(data);

  }

  /**
   * 生成actions
   * action有三种情况
   * 1.简单的同步操作
   * 2.自定义异步操作
   */
  static generateActions({ nameSpace, feature }, _axios) {

    if (_axios === null) {
      _axios = axios;
    }

    const arr = Object.keys(feature);

    let actions = {};

    arr.map((key) => {

      if (SimpleRedux.toString(feature[key]) === "[object Function]") { //简单的同步操作

        actions[key] = (...args) => {

          return (dispatch) => {

            dispatch({ type: SimpleRedux.toUpper(`${nameSpace}/${key}`), value: args });

            return Promise.resolve(null);

          }

        }

      } else if (SimpleRedux.toString(feature[key]) === "[object Object]") { //自定义操作

        const { action } = feature[key];

        actions[key] = (...args) => {

          return async (dispatch, getState) => {

            /**
             * 在这里需要对参数进行分析
             * 
             * 如果params是个对象并且携带了url,说明是ajax请求
             * 
             */
            function next(params = null) {

              return new Promise((resolve, reject) => {

                if (SimpleRedux.toString(params) === "[object Object]" && params.url) { //这是一个异步请求

                  dispatch({ type: SimpleRedux.toUpper(`${nameSpace}/${key}_requestting`), args });

                  _axios({
                    ...params,
                    method: params.method || 'post',
                    data: params.data || {}
                  }).then((res) => {

                    dispatch({ type: SimpleRedux.toUpper(`${nameSpace}/${key}_request_success`), value: res, args });

                    resolve(null);

                  }).catch((error) => {

                    dispatch({ type: SimpleRedux.toUpper(`${nameSpace}/${key}_request_fail`), value: error, args });

                    reject(error);

                  })

                } else { //同步请求就简单多了
                  dispatch({ type: SimpleRedux.toUpper(`${nameSpace}/${key}`), value: params, args });
                  resolve(null);
                }

              })

            }

            try {
              await action(next, getState, args, dispatch);
              return Promise.resolve(null);
            } catch (error) {
              return Promise.reject(error);
            }

          }

        }

      }

    })

    return actions;

  }


}




