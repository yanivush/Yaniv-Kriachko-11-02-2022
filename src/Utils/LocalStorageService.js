export const SaveToLocal = (key, data) => {

    const storage = localStorage.getItem(key, "[]");

    var list = storage && JSON.parse(storage);
    if(list)
    {
      list.push(data[0]);
      localStorage.setItem(key, JSON.stringify(list));//add to exists list
    } else {
       localStorage.setItem(key, JSON.stringify(data)); // create new list
    }
};

export const GetFromLocal = (key) => {
    const data = localStorage.getItem(key, "[]");
    return JSON.parse(data);
};

export const RemoveFromLocal = (key, index) => {
    let list = JSON.parse(localStorage.getItem(key, "[]")); 
    list.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(list));
};