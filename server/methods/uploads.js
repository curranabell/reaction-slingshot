Meteor.methods({
  deleteUpload: function(id) {
    if (!this.userId) {
      throw new Meteor.Error("unauthorized", "Unauthorized");
    }

    let upload = Uploads.findOne({_id: id, owner: this.userId});

    if (!upload) {
      throw new Meteor.Error("missing-data", "Upload not found");
    }
    // Delete from s3
    let resp = S3.deleteObjectSync({
      Bucket: Meteor.settings.S3Bucket,
      Key: upload.key,
    });

    // Delete from collection
    Uploads.remove({_id: id});
  },

  saveUpload: function(url) {
    if (!this.userId) {
      throw new Meteor.Error("unauthorized", "Unauthorized");
    }

    let split = url.split("/");

    Uploads.insert({
      owner: this.userId,
      url: url,
      key: split[split.length - 1]
    });
  }
});
