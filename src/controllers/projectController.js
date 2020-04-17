module.exports = ({
    async index(req, res) {
        return res.send({
            ok: true,
            user: req.userId
        })
    },
});