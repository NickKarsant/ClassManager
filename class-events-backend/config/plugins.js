module.exports = ({env}) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
        folder: env('CLOUDINARY_FOLDER', 'development'),
      },
      actionOptions: {
        uploadStream: {folder: env('CLOUDINARY_FOLDER', 'development')},
        upload: {folder: env('CLOUDINARY_FOLDER', 'development')},
        delete: {},
      },
    },
  },
})