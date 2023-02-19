import { Dropzone } from 'dropzone';

// Get token from html head
const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

Dropzone.options.uploadImg = {
    dictDefaultMessage: 'Upload your image here',
    acceptedFiles: '.png,.jpg,.jpeg',
    maxFilesize: 5,
    maxFiles: 1,
    parallelUploads: 1,
    addRemoveLinks: true,
    dictRemoveFile: 'Delete Image',
    uploadMultiple: false,
    headers: {
        'CSRF-Token': token
    },
    paramName: 'image',
    init: function() {
        const dropzone = this;

        dropzone.on('queuecomplete', function() {
            if(dropzone.getActiveFiles().length == 0) {
                window.location.href = '/manage/profile';
            }
        });
    }
}