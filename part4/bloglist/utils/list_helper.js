const dummy = () => {
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.reduce((sum, current) => sum + current.likes, 0);
};

module.exports = {
    dummy,
    totalLikes
};