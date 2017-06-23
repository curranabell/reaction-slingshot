import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';

class DropzoneCom extends Component {


  constructor(props) {
    super();

    this.onDrop   = this.onDrop.bind(this);

  }

     render() {
       return (
           <div>
             <Dropzone onDrop={this.onDrop}>
               <div>Try dropping some files here, or click to select files to upload.</div>
             </Dropzone>
           </div>
       );
     }

     onDrop(quality, files) {

           console.log(quality);
           console.log(files);

           //Amozon Path prefix for the file returns something like
              // 'artist/album/128 (or 320)/'
          //  const pathPrefix = getPathPrefix( this.props.album, quality);
          //  const metaContext = {prePath: pathPrefix};

           //Upload file using Slingshot Directive
          //  let uploader = new Slingshot.Upload( "uploadToAmazonS3", metaContext);
           let uploader = new Slingshot.Upload( "uploadToAmazonS3");

          console.log(uploader);

          var error = uploader.validate(files[0]);

           if (error) {
             console.error(error);
           }

           uploader.send( files[0], ( error, url ) => {

             computation.stop(); //Stop progress tracking on upload finish
             if ( error ) {
                 this.setState({ progress: 0}); //reset progress state
                 console.error('Error uploading', uploader.xhr.response);
             } else {
                 this.setState({ url: url });
                //  Meteor.users.update(Meteor.userId(), {$push: {"profile.files": downloadUrl}});

             }
           });

           //Track Progress
           let computation = Tracker.autorun(() => {
               if(!isNaN(uploader.progress())) {
                 this.setState({ progress: uploader.progress() * 100 });
               }
           });
        }

}

DropzoneContainer = createContainer(() => {
  return { };
}, DropzoneCom);

export default DropzoneContainer;
