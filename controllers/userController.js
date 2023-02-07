const loginForm = (req, res) => {
    res.render('auth/login', {
        title: 'My app'
    });
}

export {
    loginForm
}