module.exports = {
  apps: [
    {
      name: 'nextjs-app',
      script: './node_modules/next/dist/bin/next',
      args: 'start', // Runs 'next start' for production
      instances: 'max', // Utilizes all available CPU cores (cluster mode)
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
}