module.exports = {
  apps: [
    {
      name: 'prod',
      script: 'dist/server.js',
      exec_mode: 'cluster',
      instance_var: 'INSTANCE_ID',
      instances: 2,
      autorestart: true,
      watch: false,
      ignore_watch: ['node_modules', 'logs'],
      max_memory_restart: '1G',
      merge_logs: true,
      output: './logs/access.log',
      error: './logs/error.log',
      env: { 
        PORT: 3000,
        NODE_ENV: 'production',
      },
    },
    {
      name: 'dev', 
      script: 'ts-node', 
      args: '-r tsconfig-paths/register --transpile-only src/server.ts', 
      exec_mode: 'cluster', 
      instance_var: 'INSTANCE_ID',
      instances: 2, 
      autorestart: true,
      watch: false,
      ignore_watch: ['node_modules', 'logs'],
      max_memory_restart: '1G',
      merge_logs: true,
      output: './logs/access.log', 
      error: './logs/error.log',
      env: { 
        PORT: 3000,
        NODE_ENV: 'development',
      },
    },
  ]
};
