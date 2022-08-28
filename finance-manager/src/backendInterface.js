import httpClient from './httpClient'

// Login Post
export const login = async (email, password) => {
    await httpClient.post('//localhost:5000/login', {
        email: email,
        password: password
    })
        .then(resp => resp.data)
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
}

// Logout Post
export const logout = async () => {
    await httpClient.post("//localhost:5000/logout")
        .then(resp => resp.data)
        .then(data => {
            console.log(data)
        })
}

// Get current user
export const getCurrentUser = async () => {
    let user = {}

    await httpClient.post("//localhost:5000/getCurrentUser")
        .then(resp => resp.data)
        .then(data => {
            user = {
                id: data.id,
                email: data.email
            }
        })

    return user
}