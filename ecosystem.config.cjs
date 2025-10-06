const instanceName = process.env.INSTANCE_NAME;
if (!instanceName) throw new Error("INSTANCE_NAME is undefined");

module.exports = {
  apps: [
    {
      name: `${instanceName}-server`,
      script: "./server/dist/main.js",
      interpreter: "/home/durhack/.nvm/versions/node/v24.9.0/bin/node",
      env: {
        NODE_ENV: "production"
      },
    },
    {
      name: `${instanceName}-ticket-assigner`,
      script: "./server/dist/ticket-assigner.js",
      interpreter: "/home/durhack/.nvm/versions/node/v24.9.0/bin/node",
      env: {
        NODE_ENV: "production"
      },
      instances: 1,
      exec_mode: "fork",
      cron_restart: "0-59/15 * * * *",
      watch: false,
      autorestart: false,
    },
  ]
}
