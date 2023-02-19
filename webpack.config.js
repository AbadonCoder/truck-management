import path from 'path';

export default {
    mode: 'development',
    entry: {
        aside: './src/js/animateAside.js',
        addImage: './src/js/addImage.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve('public/js')
    }
}