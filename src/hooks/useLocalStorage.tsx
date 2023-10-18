type ItemValue = Object | string | number;
type LocalStorageKey = "UserSession" | "SessionExpiresIn"

export function useLocalStorage(key: LocalStorageKey) {
  const set = (value: ItemValue) => {
    try {
      return window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const get = (): ItemValue | undefined => {
    try {
      const itemValue = window.localStorage.getItem(key);
      if (itemValue) return JSON.parse(itemValue);
    } catch (error) {
      console.log(error);
    }
  };

  const remove = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  }

  return { set, get, remove };
}
