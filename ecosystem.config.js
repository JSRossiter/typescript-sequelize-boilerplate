module.exports = {
  apps: [
    {
      name: 'server',
      script: 'dist/server.js',
      interpreter_args: '-r dotenv/config',
    },
    {
      name: 'worker',
      script: 'dist/worker.js',
      interpreter_args: '-r dotenv/config',
      kill_timeout: 10000,
      restart_delay: 5000,
    },
  ],

  deploy: {
    production: {
      user: 'deploy',
      host: '',
      ref: 'origin/master',
      repo: 'git@github.com:user/example',
      path: '',
      'pre-deploy-local': '',
      'post-deploy':
        'NODE_ENV=build && npm install && npm run build && NODE_ENV=production && npx sequelize db:migrate && pm2 startOrRestart ecosystem.config.js --env production --only server',
      'pre-setup': '',
    },
  },
};
