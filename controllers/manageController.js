import jwt from 'jsonwebtoken';
// Load home page
const outputs = (req, res) => {
    const {_token} = req.cookies;

    res.render('manage/manage-outputs', {
        title: 'Outputs',
        csrfToken: req.csrfToken(),
        session: jwt.verify(_token, process.env.JWT_SECRET)
    });
}

export {
    outputs
}