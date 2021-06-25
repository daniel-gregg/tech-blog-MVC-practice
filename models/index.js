const User = require('./user');
const Post = require('./post');
const Comment = require('./comment')

User.hasMany(Post);

Post.belongsTo(User,{
    foreignKey: 'author_id',
})

module.exports = {
    User,
    Post,
    Comment,
}