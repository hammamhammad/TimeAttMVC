/// <reference types="jquery"/>
//////Helper function
var oaDate = new Date(1899, 11, 30);
var millisecondsOfaDay = 24 * 60 * 60 * 1000;

(function () {

	Date.prototype.ToOADate = function () {
		var result = (Date.parse(this) - Date.parse(oaDate)) / millisecondsOfaDay;
		return parseInt(result);
	};
	String.prototype.stringFormat = function () {
		
		var args = arguments[0];
		return this.replace(/{(\d+)}/g, function (match, number) {
			if (Array.isArray(args))
			return typeof args[number] != 'undefined'
				? args[number]
				: match
				;
				else{
				return 	args;
				}
		});
	};
	Number.prototype.FromOADate = function () {
		var result = new Date();
		result.setTime((this * millisecondsOfaDay) + Date.parse(oaDate));
		return result;
	};
	Number.prototype.paddy = function (p, c) {
		var n = this;
		var pad_char = typeof c !== 'undefined' ? c : '0';
		var pad = new Array(1 + p).join(pad_char);
		return (pad + n).slice(-pad.length);
	}


	Date.prototype.daysInMonth = function () {
		var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
		return d.getDate();
	}
	Date.prototype.ToDateString = function (format) {
		var yyyy = this.getFullYear().toString();
		var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
		var dd = this.getDate().toString();
		format = format.replace('yyyy', yyyy);
		format = format.replace('MM', mm[1] ? mm : "0" + mm[0]);
		format = format.replace('dd', dd[1] ? dd : "0" + dd[0]);

		return format;
	};
})();

//////Data Table Helper///////
(function () {

	jQuery.fn.dataTable.Api.register('row().show()', function (select) {
		var page_info = this.table().page.info();
		// Get row index
		var new_row_index = this.index();
		// Row position
		var row_position = this.table().rows()[0].indexOf(new_row_index);
		// Already on right page ?
		if (row_position >= page_info.start && row_position < page_info.end) {
			// Return row object
			if (select) {
				this.table().$('tr.selected').removeClass('selected');
				$(this.table().row(new_row_index).node()).addClass('selected')
			}
			return this;
		}
		// Find page number
		var page_to_display = Math.floor(row_position / this.table().page.len());
		if (select) {
			this.table().$('tr.selected').removeClass('selected');
			$(this.table().row(new_row_index).node()).addClass('selected')
		}
		// Go to that page
		this.table().page(page_to_display);
		// Return row object
		return this;
	});
	jQuery.fn.dataTable.Api.register('row().drawRow()', function (cid, select) {
		var id = parseInt(cid, 10)
		if (id.toString() == 'NaN')
			return;
		var index = parseInt(this.rows("#" + id.toString())[0], 10)
		var row = null;
		if (index >= 0) {

			row = this.row(index).show(select != null ? select : false).draw();

		}
		return row;
	});
	jQuery.fn.dataTable.Api.register('row().showRow()', function (cid, select) {

		var id = parseInt(cid, 10)
		if (id.toString() == 'NaN')
			return;
		var index = parseInt(this.rows("#" + id.toString())[0], 10)
		var row = null;
		if (index >= 0) {

			row = this.row(index).show(select != null ? select : false).draw(false);

		}
		return row;
	});
	jQuery.fn.dataTable.Api.register('row().updateRow()', function (id, updatedate, select) {
		var index = parseInt(this.rows("#" + id.toString())[0], 10)
		var row = null;
		if (index >= 0) {
			if (updatedate != null) {
				row = this.row(index).show(select != null ? select : false).data(updatedate).draw(false);
			}
			else {
				row = this.row(index).show(select != null ? select : false);
			}
		}
		return row;
	});
	jQuery.fn.dataTable.Api.register('row().addRow()', function (data, select) {

		var row = this.row.add(data).draw().show(select != null ? select : false).draw(false)
		return row;
	});
	jQuery.fn.dataTable.Api.register('row().getRow()', function (id) {
		var index = parseInt(this.rows("#" + id.toString())[0], 10)
		if (index >= 0) {
			var page = Math.floor(index / this.page.info().length);
			this.page(page).draw(false);
			return this.row(index);
		}
		return null;
	});
	jQuery.fn.dataTable.Api.register('row().deleteRow()', function (id) {
		var index = parseInt(this.rows("#" + id.toString())[0], 10)
		if (index >= 0) {
			this.table().row(index).show(false).remove().draw(false)
		}
	});
	jQuery.fn.dataTable.Api.register('row().Exists()', function (id) {
		var index = parseInt(this.rows("#" + id.toString())[0], 10)
		return index.toString() != 'NaN'
	});
})();