import { StatesAction } from "redux/Actions/StatesAction";
import Log from "utils/Log";
import { Reducer } from "redux";


// export const HomeReducer: Reducer<HomeStates, StatesAction<HomeActionType>> = (state = new HomeStates(), action) => {
//     switch (action.type) {
//         case HomeActionType.GetNotificationStart:
//             return { ...state, notifications: [] }
//         case HomeActionType.GetNotificationSuccess:
//             return { ...state, notifications: action.payload?.notifications ?? [] }
//     }
//     return state;
// };
