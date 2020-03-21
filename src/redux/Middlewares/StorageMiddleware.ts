import { Middleware } from "redux";
import { saveItemAsync, removeItemAsync } from "../../utils/Storage";
import { StorageType } from "core/Models/StorageType";
import Consts from "redux/Consts";


export const StorageMiddleware: Middleware = api => next => action => {
  if (action.type == Consts.storage) {
    switch (action.storageType) {
      case StorageType.Add:
        saveItemAsync(action.key, action.value)
          .then(() => {
            if (action.onSuccess) {
              api.dispatch(action.onSuccess)
            }
          })
          .catch(error => console.error(error));

        break;
      case StorageType.Remove:
        removeItemAsync(action.key)
          .then(() => {
            if (action.onSuccess) {
              api.dispatch(action.onSuccess)
            }
          })
          .catch(error => console.error(error));

        break;
      default:
        break;
    }
  } else {
    return next(action);
  }
};