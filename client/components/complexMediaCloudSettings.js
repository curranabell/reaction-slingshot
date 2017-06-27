import React, { Component, PropTypes } from 'react';
import { registerComponent } from "/imports/plugins/core/layout/lib/components";
import {
  CardGroup,
  CardToolbar,
  FlatButton,
  Form,
  List,
  ListItem,
  SettingsCard
} from "/imports/plugins/core/ui/client/components";

import { Shop as ShopSchema } from "/lib/collections/schemas/shops";

class mediaCloudSettings extends Component {

  static propTypes = {
    shop: PropTypes.object, // Shop data
    cloudOptions: PropTypes.array,
    regionOptions: PropTypes.array,
    keyID: PropTypes.string,
    secretKey: PropTypes.string,
    bucketName: PropTypes.string,
  }

  handleSubmit = (event, formData) => {
    if (typeof this.props.onUpdateCloudSetup === "function") {
      this.props.onUpdateCloudSetup(formData.doc);
    }
  }

  render () {
    return (
      <CardGroup>
        <SettingsCard
        i18nKeyTitle="admin.i18nSettings.mediaCloud"
        name="cloudSetup"
        packageName={reaction-media-cloud}
        saveOpenStateToPreferences={true}
        showSwitch={false}
        title="Add Cloud Media Storage"
        >
          <Form
            autoSave={true}
            schema={ShopSchema}
            doc={this.props.shop}
            fields={{
              cloudProvider: {
                type: "select",
                options: this.props.cloudOptions
              },
              region: {
                type: "select",
                options: this.props.regionOptions
              },
              accessKeyID: {
                type: "input",
                options: this.props.keyID
              },
              secretAccessKey: {
                type: "input",
                options: this.props.secretKey
              },
              bucket: {
                type: "input",
                options: this.props.bucketName
              }
            }}
            name="cloudSetup"
            onSubmit={this.handleSubmit}
          />
        </SettingsCard>
      </CardGroup>
    );
  }
}

// Register react component.
registerComponent({
  name: "mediaCloudSettings",
  component: mediaCloudSettings
});

export default mediaCloudSettings;
