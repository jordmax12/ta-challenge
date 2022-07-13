const requestOtp = (email) => {
    return new Promise((resolve) => {
        fetch(`https://84xn86axhf.execute-api.us-east-2.amazonaws.com?email=${email}`)
            .then(res => res.json())
            .then((result) => {
                resolve(result);
            })
    })
}

const verifyOtp = (email, password) => {
    return new Promise((resolve) => {
        fetch(`https://84xn86axhf.execute-api.us-east-2.amazonaws.com/verify?email=${email}&password=${password}`)
            .then(res => res.json())
            .then((result) => {
                resolve(result);
            })
    })
}

const getPunkData = () => {
    return new Promise((resolve) => {
        fetch(`https://api.punkapi.com/v2/beers?brewed_before=11-2012&abv_gt=6`)
            .then(res => res.json())
            .then((result) => {
                resolve(result);
            })
    })
}

const getRandomPunkData = () => {
    return new Promise((resolve) => {
        fetch(`https://api.punkapi.com/v2/beers/random`)
            .then(res => res.json())
            .then((result) => {
                resolve(result);
            })
    })
}

export { getPunkData, getRandomPunkData, requestOtp, verifyOtp };
