//Funcion que realiza petición get a la url solicitada
const getJson = async (url, errorCallback) => {
    return await fetch(url, {
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin',
        referrerPolicy: 'no-referrer',
    }).then(request => request.json())
    .catch(error => executeCallBack(errorCallback));
}

const getText = async (url, errorCallback) => {
    return await fetch(url, {
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin',
        referrerPolicy: 'no-referrer',
    }).then(request => request.text())
    .catch(error => executeCallBack(errorCallback));
}
//Funcion que realiza petición post a la url solicitada con el body especificado
const postRequest = async (url, body, errorCallback) => {
    return await fetch(url , {
        method: 'POST',
        mode: "cors",
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(body)
    }).then(request => request)
    .catch(error => executeCallBack(errorCallback));
}
//Funcion que realiza petición put a la url solicitada con el body especificado
const putRequest = async (url, json, errorCallback) => {
    const response = await fetch(url, {
        mode: 'cors',
        method: 'PUT',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(json)
    }).catch(e => executeCallBack(errorCallback));
    return response;
}

//Funcion que realiza petición delete a la url solicitada con el id especificado
const deleteRequest = async(url, id, errorCallback) => {
    let data = { id: id };
    const response = await fetch(url, {
        mode: 'cors',
        method: 'DELETE',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    }).catch(e => executeCallBack(errorCallback));
    return response;
}

const executeCallBack = (callback) => {
    if(typeof callback === 'function' || callback instanceof Function) callback() };

export {getJson, postRequest, getText, putRequest, deleteRequest}