// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAx0Wo5qiYzps_kReaCLr4AzlhYLFvK-MU",
    authDomain: "gene-higgins.firebaseapp.com",
    databaseURL: "https://gene-higgins.firebaseio.com",
    projectId: "gene-higgins",
    storageBucket: "gene-higgins.appspot.com",
    messagingSenderId: "557188003562"
  }
};
