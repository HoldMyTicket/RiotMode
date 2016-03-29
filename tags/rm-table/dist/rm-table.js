riot.tag('rm-table', '<table class="awesometable { tableType }"> <thead if="{ validateTableSection(tableHeaders) }"> <tr class="{ pointer: sortTable }"> <th onclick="{ sortTable ? sortByTableColumn : \'\' }" data-header-index="{ i }" each="{ headerContent, i in tableHeaders}">{ headerContent }<i data-header-index="{ i }" if="{ sortTable }" class="material-icons sort-icon">keyboard_arrow_down</i></th> </tr> </thead> <tbody if="{ validateTableSection(tableContent) }"> <tr each="{ bodyContentRows, i in tableContent }"> <td id="body" each="{ bodyContentData, i in bodyContentRows }">{ processBody(bodyContentData) }</td> </tr> </tbody> <tfoot if="{ validateTableSection(tableFooter) }"> <tr class="awesome-section"> <td each="{ footerContent, i in tableFooter }">{ processFooter(footerContent) }</td> </tr> </tfoot> </table>', 'rm-table .awesometable { width: 100%; margin-bottom: 20px; max-width: 100%; background-color: transparent; border-collapse: collapse; border-spacing: 0; font-family: helvetica; } rm-table .awesometable-fixed { table-layout: fixed; } rm-table .awesometable th,rm-table .awesometable td { padding: 8px; line-height: 20px; text-align: left; vertical-align: top; border-top: 1px solid #dddddd; font-family: helvetica; } rm-table .awesometable.awesometable-small td,rm-table .awesometable.awesometable-small th { font-size: 10px; } rm-table .awesometable th { font-weight: bold; font-size: 11px; } rm-table .awesometable thead th { vertical-align: bottom; } rm-table .awesometable caption + thead tr:first-child th,rm-table .awesometable caption + thead tr:first-child td,rm-table .awesometable colgroup + thead tr:first-child th,rm-table .awesometable colgroup + thead tr:first-child td,rm-table .awesometable thead:first-child tr:first-child th,rm-table .awesometable thead:first-child tr:first-child td { border-top: 0; } rm-table .awesometable tbody + tbody { border-top: 2px solid #dddddd; } rm-table .awesometable .awesometable { background-color: #ffffff; } rm-table .awesometable-condensed th,rm-table .awesometable-condensed td { padding: 4px 5px; font-size: 11px; } rm-table .awesometable-bordered { border: 1px solid #dddddd; border-collapse: separate; *border-collapse: collapse; border-left: 0; -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px; } rm-table .awesometable-bordered th,rm-table .awesometable-bordered td { border-left: 1px solid #dddddd; } rm-table .awesometable-bordered caption + thead tr:first-child th,rm-table .awesometable-bordered caption + tbody tr:first-child th,rm-table .awesometable-bordered caption + tbody tr:first-child td,rm-table .awesometable-bordered colgroup + thead tr:first-child th,rm-table .awesometable-bordered colgroup + tbody tr:first-child th,rm-table .awesometable-bordered colgroup + tbody tr:first-child td,rm-table .awesometable-bordered thead:first-child tr:first-child th,rm-table .awesometable-bordered tbody:first-child tr:first-child th,rm-table .awesometable-bordered tbody:first-child tr:first-child td { border-top: 0; } rm-table .awesometable-bordered thead:first-child tr:first-child > th:first-child,rm-table .awesometable-bordered tbody:first-child tr:first-child > td:first-child { -webkit-border-top-left-radius: 4px; -moz-border-radius-topleft: 4px; border-top-left-radius: 4px; } rm-table .awesometable-bordered thead:first-child tr:first-child > th:last-child,rm-table .awesometable-bordered tbody:first-child tr:first-child > td:last-child { -webkit-border-top-right-radius: 4px; -moz-border-radius-topright: 4px; border-top-right-radius: 4px; } rm-table .awesometable-bordered thead:last-child tr:last-child > th:first-child,rm-table .awesometable-bordered tbody:last-child tr:last-child > td:first-child,rm-table .awesometable-bordered tfoot:last-child tr:last-child > td:first-child { -webkit-border-bottom-left-radius: 4px; -moz-border-radius-bottomleft: 4px; border-bottom-left-radius: 4px; } rm-table .awesometable-bordered thead:last-child tr:last-child > th:last-child,rm-table .awesometable-bordered tbody:last-child tr:last-child > td:last-child,rm-table .awesometable-bordered tfoot:last-child tr:last-child > td:last-child { -webkit-border-bottom-right-radius: 4px; -moz-border-radius-bottomright: 4px; border-bottom-right-radius: 4px; } rm-table .awesometable-bordered tfoot + tbody:last-child tr:last-child td:first-child { -webkit-border-bottom-left-radius: 0; -moz-border-radius-bottomleft: 0; border-bottom-left-radius: 0; } rm-table .awesometable-bordered tfoot + tbody:last-child tr:last-child td:last-child { -webkit-border-bottom-right-radius: 0; -moz-border-radius-bottomright: 0; border-bottom-right-radius: 0; } rm-table .awesometable-bordered caption + thead tr:first-child th:first-child,rm-table .awesometable-bordered caption + tbody tr:first-child td:first-child,rm-table .awesometable-bordered colgroup + thead tr:first-child th:first-child,rm-table .awesometable-bordered colgroup + tbody tr:first-child td:first-child { -webkit-border-top-left-radius: 4px; -moz-border-radius-topleft: 4px; border-top-left-radius: 4px; } rm-table .awesometable-bordered caption + thead tr:first-child th:last-child,rm-table .awesometable-bordered caption + tbody tr:first-child td:last-child,rm-table .awesometable-bordered colgroup + thead tr:first-child th:last-child,rm-table .awesometable-bordered colgroup + tbody tr:first-child td:last-child { -webkit-border-top-right-radius: 4px; -moz-border-radius-topright: 4px; border-top-right-radius: 4px; } rm-table .awesometable-striped tbody tr:nth-child(odd) td { background-color: #F6F6F6; } rm-table .awesometable-hover tbody tr:hover td,rm-table .awesometable-hover tbody tr:hover th { background-color: #f3f3f3; } rm-table .awesometable tr.foot td { background: #eee; font-weight: bold; } rm-table table td[class*="span"],rm-table table th[class*="span"],rm-table .row-fluid table td[class*="span"],rm-table .row-fluid table th[class*="span"] { display: table-cell; float: none; margin-left: 0; } rm-table .awesometable td.span1,rm-table .awesometable th.span1 { float: none; width: 44px; margin-left: 0; } rm-table .awesometable td.span2,rm-table .awesometable th.span2 { float: none; width: 124px; margin-left: 0; } rm-table .awesometable td.span3,rm-table .awesometable th.span3 { float: none; width: 204px; margin-left: 0; } rm-table .awesometable td.span4,rm-table .awesometable th.span4 { float: none; width: 284px; margin-left: 0; } rm-table .awesometable td.span5,rm-table .awesometable th.span5 { float: none; width: 364px; margin-left: 0; } rm-table .awesometable td.span6,rm-table .awesometable th.span6 { float: none; width: 444px; margin-left: 0; } rm-table .awesometable td.span7,rm-table .awesometable th.span7 { float: none; width: 524px; margin-left: 0; } rm-table .awesometable td.span8,rm-table .awesometable th.span8 { float: none; width: 604px; margin-left: 0; } rm-table .awesometable td.span9,rm-table .awesometable th.span9 { float: none; width: 684px; margin-left: 0; } rm-table .awesometable td.span10,rm-table .awesometable th.span10 { float: none; width: 764px; margin-left: 0; } rm-table .awesometable td.span11,rm-table .awesometable th.span11 { float: none; width: 844px; margin-left: 0; } rm-table .awesometable td.span12,rm-table .awesometable th.span12 { float: none; width: 924px; margin-left: 0; } rm-table .awesometable tbody tr.success td { background-color: #dff0d8; } rm-table .awesometable tbody tr.error td { background-color: #f2dede; } rm-table .awesometable tbody tr.warning td { background-color: #fcf8e3; } rm-table .awesometable tbody tr.info td { background-color: #d9edf7; } rm-table .awesometable-hover tbody tr.success:hover td { background-color: #d0e9c6; } rm-table .awesometable-hover tbody tr.error:hover td { background-color: #ebcccc; } rm-table .awesometable-hover tbody tr.warning:hover td { background-color: #faf2cc; } rm-table .awesometable-hover tbody tr.info:hover td { background-color: #c4e3f3; } rm-table .awesometable tr.awesome-section:nth-child(odd),rm-table .awesometable tr.awesome-section:nth-child(even) { background: #eee; font-weight: bold; color: #000; } rm-table .awesometable tr.awesome-section td { font-weight: bold; font-size: 15px; } rm-table .awesometable tr.awesome-section2 { background-color: black; color: #EEE; } rm-table .awesometable div.show-on-hover { visibility: hidden; opacity:0; } rm-table .awesometable tr:hover .show-on-hover { visibility: visible; opacity: 100; } rm-table .awesometable-rowhover tr:hover td { border-top: 1px solid #999; border-bottom: 1px solid #999; } rm-table .awesometable-rowhover tr:hover td:first-child { border-left: 1px solid #999; } rm-table .awesometable-rowhover tr:hover td:last-child { border-right: 1px solid #999; } rm-table .awesometable .head-multiple td { background-color: #E9E9E9; } rm-table .awesometable .head-single td { background-color: #E9E9E9; } rm-table .awesometable .sub-ticket td { font-size: .8em; color: #333; background-color: white; padding-top: 3px; padding-bottom: 3px; } rm-table .awesometable .sub-ticket td:first-child { padding-left: 25px; } rm-table .awesometable .boldfoot td { font-weight: bold; } rm-table .awesometable .reversed-footer td { font-size: 1.1em; font-weight: bold; } rm-table .awesometable .reversed-footer.small td { padding-top: 3px; padding-bottom: 3px; font-size: .83em; background-color: #CCC; } rm-table .awesometable.table td.span12,rm-table .awesometable.table th.span12 { float: none; width: 924px; margin-left: 0; } rm-table .awesometable.table tbody tr.success > td { background-color: #dff0d8; } rm-table .awesometable.table tbody tr.error > td { background-color: #f2dede; } rm-table .awesometable.table tbody tr.warning > td { background-color: #fcf8e3; } rm-table .awesometable.table tbody tr.info > td { background-color: #d9edf7; } rm-table .awesometable.table-hover tbody tr.success:hover > td { background-color: #d0e9c6; } rm-table .awesometable.table-hover tbody tr.error:hover > td { background-color: #ebcccc; } rm-table .awesometable.table-hover tbody tr.warning:hover > td { background-color: #faf2cc; } rm-table .awesometable.table-hover tbody tr.info:hover > td { background-color: #c4e3f3; } rm-table .awesometable-nc tr.head th{ background-color: #f0f0f0; } rm-table .pointer { cursor: pointer; } rm-table .sort-icon { vertical-align: middle; }', function(opts) {
    
    
    var me = this;
    
    this.tableType = opts.type;
    this.tableHeaders = opts.tableHeaders;
    this.tableContent = opts.tableContent;
    this.tableFooter = opts.tableFooter;
    this.sortTable = opts.sortTable || false;
    this.toggleSort = false;
    
    this.validateTableSection = function(section) {
        if(section === null || section === undefined)
            return false;
        
        if(Array.isArray(section) === false)
            return false;
            
        return true;
    }.bind(this);
    
    this.processBody = function(cells) {
        if(cells.indexOf('$') !== -1) {
            cells = parseFloat(cells.replace('$', ''));
            cells = cells.toFixed(2, 10);
            
            return '$'+cells;
        }
        
        return cells;
    }.bind(this);
    
    this.processFooter = function(cells) {
        var currency_found = false;
        var total = 0;
        var averageCount = 0;
        var cellIndex;
        
        if(cells.indexOf('{{') !== -1) {
            cellIndex = cells.replace(/[^0-9.]/g, '');
        } else {
            return cells;
        }
        
        for(var i = 0; i < this.tableContent.length; i++) {
            if(this.tableContent[i][cellIndex].indexOf('$') !== -1) {
                currency_found = true;
            } else {
                currency_found = false;
            }
            
            if(isNaN(parseFloat(this.tableContent[i][cellIndex].replace('$', ''))) === false) {
                averageCount++;
                total += parseFloat(this.tableContent[i][cellIndex].replace('$', ''));
            }
        }
        
        if(cells.indexOf('{{total') !== -1)
            return currency_found ? '$'+total.toFixed(2, 10) : total;
            
        if(cells.indexOf('{{average') !== -1)
            return currency_found ? '$'+(total/averageCount).toFixed(2, 10) : (total/averageCount).toFixed(2, 10);
    }.bind(this);
    
    this.sortByTableColumn = function(e) {
        var rows = this.tableContent;
        var currency_found = false;
        var columnIndex = e.target.dataset.headerIndex;
        
        var mappedRows = rows.map(function(el, i) {
            return {index: i, value: el};
        });
        
        mappedRows.sort(function(a, b) {
            if(!me.toggleSort)
                return +(a.value[columnIndex] > b.value[columnIndex]) || +(a.value[columnIndex] === b.value[columnIndex]) - 1;
            
            if(me.toggleSort)
                return +(a.value[columnIndex] < b.value[columnIndex]) || +(a.value[columnIndex] === b.value[columnIndex]) - 1;
        });
        
        var result = mappedRows.map(function(el) {
            return rows[el.index];
        });
        
        if(e.target.nodeName === 'TH') {
            !this.toggleSort ? e.target.querySelector('i').innerText = 'keyboard_arrow_up' : e.target.querySelector('i').innerText = 'keyboard_arrow_down';
        } else if(e.target.nodeName === 'I') {
            !this.toggleSort ? e.target.innerText = 'keyboard_arrow_up' : e.target.innerText = 'keyboard_arrow_down';
        }
        
        this.toggleSort = !this.toggleSort;
        this.tableContent = result;
    }.bind(this);

});