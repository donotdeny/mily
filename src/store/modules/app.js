// App
// PQBinh -3/8/2022
const state = {
  isShowModal: false,
  modeModal: 0
};

const mutations = {
  IS_SHOW_MODAL: (state) => {
    state.isShowModal = !state.isShowModal;
    // Khi chỉnh sửa trạng thái đóng mở modal kiểm tra xem nếu modal đóng thì modeModal cập nhật lại là 0
    // PQBinh - 3/8/2022
    if (state.isShowModal === false) {
      state.modeModal = 0
    }
  },
  SET_MODE_MODAL: (state, modeModal) => {
    state.modeModal = modeModal;
  }
};

const actions = {
  toggleModal({ commit }) {
    commit('IS_SHOW_MODAL');
  },
  setModeModal ({ commit }, modeModal) {
    commit('SET_MODE_MODAL', modeModal)
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};