/**
 * Created by root on 2017/1/31.
 */
let host = '';
host = 'http://106.14.250.254:129/';
// host = 'http://192.168.13.248:129/';
// host = 'http://10.25.53.26:129/';
let get = (path, data) => {
    return fetch(host + path)
        .then((response) => response.json())
        .then((responseData)=> {
            // console.log('responseData',responseData);
            return Promise.resolve(responseData.result);
        })
        .catch((err) => {
            console.log(err);
        });
}
let upload = (path, file)=> {
    let data = new FormData();
    data.append('image', {
        uri: file.uri,
        name: file.fileName || 'carmera',
    })
    // console.log(host + path);
    return fetch(host + path, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
        },
        body: data,
    })
        .then((response) => response.json())
        .then((responseData)=> {
            console.log('responseData', responseData);
            return Promise.resolve(responseData.result);
        })
        .catch((err) => {
            console.log(err);
        });

}

export {
    get as get
    , upload as upload

}