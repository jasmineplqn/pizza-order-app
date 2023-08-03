const getMenu = (callback) => {
    fetch("/menu")
        .then((response) => response.json())
        .then((data) => {
        if (data.status === 400 || data.status === 500) {
            throw new Error(data.message);
        } else {
            callback(data.data);
        }
        })
        .catch((error) => {
        console.log(error);
        });
}

export {
    getMenu
}