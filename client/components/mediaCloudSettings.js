import React, { Component, PropTypes } from "react";
import { registerComponent } from "/imports/plugins/core/layout/lib/components";
import { CardGroup, SettingsCard, TextField, Button, Select } from "/imports/plugins/core/ui/client/components";

class mediaCloudSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: props.settings || {},
      isSaving: false
    };
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleStateChange(e) {
    const { settings } = this.state;
    settings[e.target.name] = e.target.value;
    this.setState({ settings });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { saveSettings } = this.props;
    const { settings } = this.state;
    this.setState({ isSaving: true });
    saveSettings(settings, () => this.setState({ isSaving: false }));
  }

  handleSelect(e) {
    const { settings } = this.state;
    settings.region = e;
    this.setState({ settings });
  }

  handleProductFieldSave = (productId, fieldName, value) => {
    let updateValue = value;
    // special case, slugify handles.
    if (fieldName === "handle") {
      updateValue = Reaction.getSlug(value);
    }
    Meteor.call("products/updateProductField", productId, fieldName, updateValue);
  }

  render() {
    const settings = this.state.settings;
    const isSaving = this.state.isSaving;

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
          <form onSubmit={this.handleSubmit}>
            <Select
              clearable={false}
              label="Region"
              placeholder="Select a Region"
              name="region"
              onChange={this.handleSelect}
              options={regions}
              value={settings.region || ""}
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
              value={settings.bucket || ""}
              onChange={this.handleStateChange}
            />
            <Button
              bezelStyle="solid"
              status="primary"
              className="pull-right"
              type="submit"
            >
              {isSaving ?
                <i className="fa fa-refresh fa-spin" />
              : <span>Save</span>}
            </Button>
          </form>
        </SettingsCard>
      </CardGroup>
    );
  }
}

mediaCloudSettings.propTypes = {
  saveSettings: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    region: PropTypes.string,
    accessKeyID: PropTypes.string,
    secretAccessKey: PropTypes.string,
    bucket: PropTypes.string
  })
};

// Register react component.
registerComponent({
  name: "mediaCloudSettings",
  component: mediaCloudSettings
});

export default mediaCloudSettings;
