import { Meteor } from 'meteor/meteor';
import { Slingshot } from 'meteor/edgee:slingshot';

Slingshot.fileRestrictions( "uploadToAmazonS3", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif", "video/*", "video/mp4", "video/avi"],
  maxSize: 10000 * 1024 * 1024,
});

Slingshot.createDirective( "uploadToAmazonS3", Slingshot.S3Storage, {
  bucket: "nmp-media",
  acl: "public-read",
  region: "west-1",
  authorize: function () {
    return true;
  },
  key: function ( file , metaContext ) {
    //metaContext is used here to dinamically construct the file path
    return metaContext.prePath + file.name;
  }
});
