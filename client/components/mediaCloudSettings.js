import React, { Component } from "react";
import { registerComponent } from "/imports/plugins/core/layout/lib/components";
import { CardGroup, SettingsCard, TextField, Button, Select } from "/imports/plugins/core/ui/client/components";

class mediaCloudSettings extends Component {

  handleSelect(e) {
    const { settings } = this.state;
    settings.region = e;
    this.setState({ settings });
  }

  render() {
    const regions = [{
      label: "US East (N.Virginia)", value: "us-east-1"
    }, {
      label: "US East (Ohio)", value: "us-east-2"
    }, {
      label: "US West (N. California)", value: "us-west-1"
    }, {
      label: "US West (Oregon)", value: "us-west-2"
    }, {
      label: "Canada (Central)", value: "ca-central-1"
    }, {
      label: "EU (Ireland)", value: "eu-west-1"
    }, {
      label: "EU (Frankfurt)", value: "eu-central-1"
    }, {
      label: "EU (London)", value: "eu-west-2"
    }, {
      label: "Asia Pacific (Tokyo)", value: "ap-northeast-1"
    }, {
      label: "Asia Pacific (Seoul)", value: "ap-northeast-2"
    }, {
      label: "Asia Pacific (Singapore)", value: "ap-southeast-1"
    }, {
      label: "Asia Pacific (Sydney)", value: "ap-southeast-2"
    }, {
      label: "Asia Pacific (Mumbai)", value: "ap-south-1"
    }, {
      label: "South America (São Paulo)", value: "sa-east-1"
    }];
    return (
      <CardGroup>
        <SettingsCard
          i18nKeyTitle="admin.i18nSettings.mediaCloud"
          name="cloudSetup"
          saveOpenStateToPreferences={true}
          showSwitch={false}
          title="S3 Media Storage"
        >
          <form>
            <Select
              clearable={false}
              label="Region"
              placeholder="Select a Region"
              name="region"
              onChange={this.handleSelect}
              options={regions}
            />
            <hr/>
            <TextField
              label="Access Key ID"
              type="text"
              name="accessKeyID"
            />
            <TextField
              label="Secret Access Key"
              type="text"
              name="secretAccessKey"
            />
            <TextField
              label="Bucket Name"
              type="text"
              name="bucket"
            />
            <Button
              bezelStyle="solid"
              status="primary"
              className="pull-right"
              type="submit"
            >
              <span>Save</span>
            </Button>
          </form>
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
