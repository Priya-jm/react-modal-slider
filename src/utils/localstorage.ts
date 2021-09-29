export const getItemFromLocalStorage = (tag: string): any => {
  return localStorage.getItem(tag);
};

export const setItemInLocalStorage = (tag: string, value: string): void => {
  localStorage.setItem(tag, value);
}

export const removeItemFromLocalStorage = (tag: string): void => {
  localStorage.removeItem(tag);
}
