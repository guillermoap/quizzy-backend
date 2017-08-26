import path from 'path';

export const index = (req, res, next) => {
    res.sendFile(path.join(__dirname,'../../../quizzy-frontend/public/views','index.html'));
};