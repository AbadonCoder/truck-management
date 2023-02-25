import path from 'path';

export default {
    mode: 'development',
    entry: {
        aside: './src/js/animateAside.js',
        addImage: './src/js/addImage.js',
        deleteTruck: './src/js/delete-truck.js',
        updateTruck: './src/js/update-truck.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve('public/js')
    }
}