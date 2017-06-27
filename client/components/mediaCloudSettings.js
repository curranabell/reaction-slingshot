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

class mediaCloudSettings extends Component {

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
              },
              region: {
                type: "select",
              },
              accessKeyID: {
                type: "input",
              },
              secretAccessKey: {
                type: "input",
              },
              bucket: {
                type: "input",
              }
            }}
            name="cloudSetup"
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
