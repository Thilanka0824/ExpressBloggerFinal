const { uuid } = require("uuidv4");
var express = require("express");
var router = express.Router();
const id = uuid()

const { db } = require("../mongo");


router.get('/get-one-example', async function (req, res, next) {

    try {
        const blogPost = await db()
            .collection('blogPosts')
            .findOne({
                id: {
                    $exists: true,
                },
            });
        res.json({
            success: true,
            post: blogPost,
        });
    } catch (err) {
        console.log(err.name)
        res.json({
            success: false,
            error: err.toString()
        })
    }
});







router.get('/get-one/:id', async function (req, res, next) {
    try {
        const blogId = req.params.id
        const blogPost = await db()
            .collection('blogPosts')
            .findOne({
                id: blogId
            })
        res.json({
            success: true,
            post: blogPost
        })

    } catch (err) {
        console.log(err.name)
        res.json({
            success: false,
            error: err.toString()
        })

    }

})


router.post('/create-one', async function (req, res, next) {
    try {
        //console.log('POST')
        const title = req.body.title
        const text = req.body.text
        const author = req.body.author
        const email = req.body.email
        const categories = req.body.categories
        const starRating = req.body.starRating
        const id = uuid()

        const createBlog = {
            title,
            text,
            author,
            email,
            categories,
            starRating,
            id: id,
            createdAt: new Date(),
            lastModified: new Date()
        }

        const newBlogPost = await db().collection('blogPosts').insertOne(createBlog)
        res.json({
            success: true,
            post: newBlogPost
        })

    } catch (err) {
        console.com(err)
        res.json({
            success: false,
            error: err.toString()
        })
    }


})





router.put('/update-one/:id', async function (req, res, next) {
    try {
        const id = req.params.id
        const title = req.body.title
        const text = req.body.text
        const author = req.body.author
        const email = req.body.email
        const categories = req.body.categories
        const starRating = req.body.starRating
        const lastModified = new Date()

        const blogData = {
                    lastModified: lastModified

                }
        if(title !== undefined) {
            blogData.title = title
        }
        
        if(text !== undefined) {
            blogData.text = text
        }

        if(author !== undefined) {
            blogData.author = author
        }

        if(email !== undefined) {
            blogData.email = email
        }


        const updatePost = await db().collection('blogPosts').update({
            id: id
        }, {
            $set: blogData
        })

        res.json({
            success: true,
            post: updatePost
        })

    } catch (err) {
        console.log(err)
        res.json({
            success: false,
            error: err.toString()
        })
    }
})


router.delete('/delete-one/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const deletePost = await db().collection('blogPosts').deleteOne({
            id: id
        })
        res.json({
            success: true,
            post: deletePost
        })
    } catch (err) {
        console.log(err)
        res.json({
            success: false,
            error: err.toString()
        })
    }
})



module.exports = router