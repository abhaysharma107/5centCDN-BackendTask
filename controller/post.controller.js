const mongoose = require("mongoose");
const Post = mongoose.model("Post");

module.exports.addPost = (req, res, next) => {
    var post = new Post();
    console.log(req.body);
    post.title = req.body.title;
    post.userId = req.body.userId;
    post.save((err, doc) => {
      if (!err) {
        console.log(doc);
        res.status(200).json({ message: "Post Added Successfully" });
      } else {
        console.log(
          "Error in Post Save :" + JSON.stringify(err, undefined, 2)
        );
      }
    });
}

// find post based on user id
module.exports.getPost = (req, res, next) => {
    Post.find({ userId: req.body.userId }, (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "Error in Retriving Post :" + JSON.stringify(err, undefined, 2)
        );
      }
    });
}
    
// find post based on post id
module.exports.getPostById = (req, res, next) => {
    Post.findById(req.params.id, (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "Error in Retriving Post :" + JSON.stringify(err, undefined, 2)
        );
      }
    });
}

module.exports.getAllPost = (req, res, next) => {
    Post.find((err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        console.log(
          "Error in Retriving Post :" + JSON.stringify(err, undefined, 2)
        );
      }
    });
}

// find and update post 
module.exports.updatePost = (req, res, next) => {
    Post.findByIdAndUpdate(req.body.postId, {title: req.body.title}, { new: true }, (err, doc) => {
        if (!err) {
            res.status(200).json({ message: "Post Updated Successfully" });
        } else {
            console.log(
            "Error in Post Update :" + JSON.stringify(err, undefined, 2)
            );;[]
        }
    });
}


// find and delete post
module.exports.deletePost = (req, res, next) => {
    Post.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.status(200).json({ message: "Post Deleted Successfully" });
        } else {
            console.log(
            "Error in Post Delete :" + JSON.stringify(err, undefined, 2)
            );
        }
        }
    );
}