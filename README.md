# Silverstripe Graphql File Upload Demo

A simple proof of concept for uploading files via graphql using the [silverstripe-graphql](https://github.com/silverstripe/silverstripe-graphql) module.

File upload on the client side is handled using [apollo-upload-network-interface](https://github.com/HriBB/apollo-upload-network-interface) which creates a multipart request if the mutation includes a FileList object as a top level variable.

## To run

A patch is required to get the silverstripe module to add the file object to the Graphql args object. First copy the file into the graphql module directory and then appy: `git patch apply 0001-file-upload-hack.patch`

To run the sample first install the node packages and build the scripts `npm run build`

A page should then be available at /graphqldemo
