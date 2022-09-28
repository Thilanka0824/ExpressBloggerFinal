const { uuid } = require("uuidv4");
var express = require("express");
var router = express.Router();
const id = uuid()

const { db } = require("../mongo");

try {
router.get('/get-one-example', async function (req, res, next) {
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
});
} catch (err) {
    console.log(err.name)
        res.json({
            success: false,
            error: err.toString()
        })
}

// try {
    router.get('/get-one/:id', async function (req, res, next) {
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
    })
// } catch (err) {
//     console.log("hello")
//     res.json({
//         success: false,
//         error: err.toString()
//     })
// }





module.exports = router
