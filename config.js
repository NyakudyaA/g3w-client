var conf = {
  distFolder: './dist',
  clientFolder: './dist/client',
  g3w_admin_plugins_basepath: '../g3w-admin-dev/g3w-admin',
  g3w_admin_client_dest_static: '../g3w-admin-dev/g3w-admin/client/static',
  g3w_admin_client_dest_template: '../g3w-admin-dev/g3w-admin/client/templates',
  proxy: {
    url: 'http://localhost:8000/',
    urls: ['/api','/ows','/qdjango2_media','/static', '/en']
  }
};

module.exports = conf;
