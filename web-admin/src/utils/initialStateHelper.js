import {HOME_TAG_TYPE,
        ADMIN_PANEL_TYPE,
        ADMIN_FORM_TYPE,
        USER_LIST_TYPE} from "../constants";

import { storage } from "../utils/localStorageHelper";

let user = storage.getItem("user");
let newUsers = storage.getItem("notice-new-users");

const initialState = {
    ui: {
        isShowActivityModal: false,
        isShowDrawer: false,
        isShowUserDetail: false,
        activityId: null,
        user: {},
        selectedUsers: [],
        activity: {},
        admin: {},
        loading: false,
        homeTagType: HOME_TAG_TYPE.ACTIVITY,
        adminPanelType: ADMIN_PANEL_TYPE.DETAIL,
        adminFormType: ADMIN_FORM_TYPE.LOGIN,
        userListType: USER_LIST_TYPE.VOLUNTEER
    },
    account:{
        user: user || {}
    },
    admin: {
        admins: []
    },
    activity: {
        activities: []
    },
    user: {
        users: []
    },
    notice: {
        newUsers: newUsers || []
    }
}

export default initialState;