import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "media-cloud",
  name: "media-cloud",
  icon: "fa fa-cloud-upload",
  autoEnable: true,
  settings: {
    name: "media-cloud"
  },
  registry: [{
    provides: "dashboard",
    label: "Media Cloud",
    description: "Upload Media To Cloud Storage",
    route: '/dashboard/media-cloud',
    icon: "fa fa-cloud-upload",
    priority: 1,
    container: "core"
  }, {
    provides: "settings",
    template: "mediaCloudSettings",
    label: "Media Cloud",
    icon: "fa fa-cloud-upload",
    container: "core"
  }]
});
