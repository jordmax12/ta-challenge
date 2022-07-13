const requestOtp = async (email) => {
    return new Promise((resolve) => {
        fetch(`https://84xn86axhf.execute-api.us-east-2.amazonaws.com?email=${email}`)
            .then(res => res.json())
            .then((result) => {
                resolve(result);
            })
    })
}

const verifyOtp = async (email, password) => {
    return new Promise((resolve) => {
        fetch(`https://84xn86axhf.execute-api.us-east-2.amazonaws.com/verify?email=${email}&password=${password}`)
            .then(res => res.json())
            .then((result) => {
                resolve(result);
            })
    })
}

export { requestOtp, verifyOtp };
