const Sequelize = require("sequelize")
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/joga_sequelize')
const models = require('../../models')
const createArticle = (req, res) => {
    let name = req.body.name
    let slug = req.body.slug
    let image = req.body.image
    let body = req.body.body
    const newArticle = models.Article.create({
        name: name,
        slug: slug,
        image: image,
        body: body,
        published: new Date().toISOString().slice(0, 19).replace('T', ' ')
    })
        .then(article => {
            console.log(article)
            return res.status(200).json({message: 'New article added'})
        })
        .catch(error => {
            return res.status(500).send(error.message)
        })

}

const updateArticle = (req, res) => {
    if (req.method === 'POST') {
        let id = req.params.id;
        let name = req.body.name;
        let slug = req.body.slug;
        let image = req.body.image;
        let body = req.body.body;

        models.Article.update({
                name: name,
                slug: slug,
                image: image,
                body: body,
            },
            {
                where: {
                    id: id
                }
            })
            .then(() => {
                // Fetch the updated article
                return models.Article.findByPk(id);
            })
            .then(updatedArticle => {
                if (!updatedArticle) {
                    return res.status(404).json({ message: 'Article not found' });
                }
                // Send the updated article information in the response
                return res.status(200).json({ message: 'Article updated', article: updatedArticle });
            })
            .catch(error => {
                return res.status(500).send(error.message);
            });
    }
};


module.exports = {
    createArticle
    updateArticle
}