Ext.onReady(function() {
	Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);
	
	//added model inside onready
	Ext.define('PersonalInfo', {
		extend: 'Ext.data.Model',
		fields: ['id', 'name', 'address', 'state']
	});
	
	//separated store into unique var for guaranteeRange
	var store = Ext.create('Ext.data.Store', {
		model: 'PersonalInfo',
		autoLoad: true,
		proxy: {
			type: 'direct',
			api: {
			        create: QueryDatabase.createRecord,
			        read: QueryDatabase.getResults,
			        update: QueryDatabase.updateRecords,
			        destroy: QueryDatabase.destroyRecord
			    }
		}
	});
	
	//create the grid
	var grid = Ext.create('Ext.grid.Panel', {
		height: 450,
		width: 700,
		title: 'Velociraptor Owners',
		store: store,
		columns: [{
			dataIndex: 'id',
			width: 50,
			text: 'ID'
		}, {
			dataIndex: 'name',
			flex: 1,
			text: 'Name'
		}, {
			dataIndex: 'address',
			flex: 1.3,
			text: 'Address'
		}, {
			dataIndex: 'state',
			flex: 1,
			text: 'State'
		}],
		renderTo: Ext.getBody()
	});
});