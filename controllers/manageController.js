
// Load home page
const outputs = (req, res) => {
    res.render('manage/manage-outputs', {
        title: 'Outputs',
        csrfToken: req.csrfToken()
    });
}

export {
    outputs
}