var t = require('i18n.service');
require('g3w/gui/catalog/catalog');
require('g3w/gui/search/search');
require('g3w/gui/plugins/tools-panel');
require('g3w/gui/plugins/plugins');

var PluginRegistry = require('g3w/core/pluginsregistry');
var PluginsService = require('g3w/core/pluginsservice');

Vue.component('sidebar',{
    template: require('./sidebar.html'),
    props: ['iface'],//iface proprietà ereditata dall'elemento padre app contenente info del progetto/i
    data: function() {
    	return {
        layersService: this.iface.layersService,
        bOpen: true,
    		bPageMode: false,
    		header: t('main navigation'),
    		activePlugin: PluginsService.state
        };
    },
    methods: {
    	activeModule: function(index) {
    		if (this.currentModule === index) {
    			this.currentModule = undefined;
    			return false;
    		}
    		this.currentModule = index;
    	}

	}
});

Vue.component('sidebar-item',{
	props: ['data-icon','data-label','data-type'],
    template: require('./sidebar-item.html'),
    data: function() {
    	return {
        	main: true
        };
    },
    methods: {
    	
	}
});

Vue.component('sidebar-tool',{
    template: require('./sidebar-tool.html'),
    data: function() {
    	return {
        store: PluginRegistry.store
      };
    },
    methods: {
	  }
});
