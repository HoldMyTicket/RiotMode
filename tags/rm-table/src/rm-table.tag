<rm-table>
    
    <style scoped>
        .awesometable {
            width: 100%;
            margin-bottom: 20px;
            max-width: 100%;
            background-color: transparent;
            border-collapse: collapse;
            border-spacing: 0;
            font-family: helvetica;
        }

        .awesometable-fixed {
            table-layout: fixed;
        }

        .awesometable th,
        .awesometable td {
            padding: 8px;
            line-height: 20px;
            text-align: left;
            vertical-align: top;
            border-top: 1px solid #dddddd;
            font-family: helvetica;
        }
        
        .awesometable.awesometable-small td, .awesometable.awesometable-small th {
            font-size: 10px;
        }
        
        .awesometable th {
            font-weight: bold;
            font-size: 11px;
        }

        .awesometable thead th {
            vertical-align: bottom;
        }

        .awesometable caption + thead tr:first-child th,
        .awesometable caption + thead tr:first-child td,
        .awesometable colgroup + thead tr:first-child th,
        .awesometable colgroup + thead tr:first-child td,
        .awesometable thead:first-child tr:first-child th,
        .awesometable thead:first-child tr:first-child td {
            border-top: 0;
        }

        .awesometable tbody + tbody {
            border-top: 2px solid #dddddd;
        }

        .awesometable .awesometable {
            background-color: #ffffff;
        }

        .awesometable-condensed th,
        .awesometable-condensed td {
            padding: 4px 5px;
            font-size: 11px;
        }

        .awesometable-bordered {
            border: 1px solid #dddddd;
            border-collapse: separate;
            *border-collapse: collapse;
            border-left: 0;
            -webkit-border-radius: 4px;
             -moz-border-radius: 4px;
                  border-radius: 4px;
        }

        .awesometable-bordered th,
        .awesometable-bordered td {
            border-left: 1px solid #dddddd;
        }

        .awesometable-bordered caption + thead tr:first-child th,
        .awesometable-bordered caption + tbody tr:first-child th,
        .awesometable-bordered caption + tbody tr:first-child td,
        .awesometable-bordered colgroup + thead tr:first-child th,
        .awesometable-bordered colgroup + tbody tr:first-child th,
        .awesometable-bordered colgroup + tbody tr:first-child td,
        .awesometable-bordered thead:first-child tr:first-child th,
        .awesometable-bordered tbody:first-child tr:first-child th,
        .awesometable-bordered tbody:first-child tr:first-child td {
            border-top: 0;
        }

        .awesometable-bordered thead:first-child tr:first-child > th:first-child,
        .awesometable-bordered tbody:first-child tr:first-child > td:first-child {
            -webkit-border-top-left-radius: 4px;
            -moz-border-radius-topleft: 4px;
            border-top-left-radius: 4px;
        }

        .awesometable-bordered thead:first-child tr:first-child > th:last-child,
        .awesometable-bordered tbody:first-child tr:first-child > td:last-child {
            -webkit-border-top-right-radius: 4px;
            -moz-border-radius-topright: 4px;
            border-top-right-radius: 4px;
        }

        .awesometable-bordered thead:last-child tr:last-child > th:first-child,
        .awesometable-bordered tbody:last-child tr:last-child > td:first-child,
        .awesometable-bordered tfoot:last-child tr:last-child > td:first-child {
            -webkit-border-bottom-left-radius: 4px;
            -moz-border-radius-bottomleft: 4px;
            border-bottom-left-radius: 4px;
        }

        .awesometable-bordered thead:last-child tr:last-child > th:last-child,
        .awesometable-bordered tbody:last-child tr:last-child > td:last-child,
        .awesometable-bordered tfoot:last-child tr:last-child > td:last-child {
            -webkit-border-bottom-right-radius: 4px;
            -moz-border-radius-bottomright: 4px;
            border-bottom-right-radius: 4px;
        }

        .awesometable-bordered tfoot + tbody:last-child tr:last-child td:first-child {
            -webkit-border-bottom-left-radius: 0;
            -moz-border-radius-bottomleft: 0;
            border-bottom-left-radius: 0;
        }

        .awesometable-bordered tfoot + tbody:last-child tr:last-child td:last-child {
            -webkit-border-bottom-right-radius: 0;
            -moz-border-radius-bottomright: 0;
            border-bottom-right-radius: 0;
        }

        .awesometable-bordered caption + thead tr:first-child th:first-child,
        .awesometable-bordered caption + tbody tr:first-child td:first-child,
        .awesometable-bordered colgroup + thead tr:first-child th:first-child,
        .awesometable-bordered colgroup + tbody tr:first-child td:first-child {
            -webkit-border-top-left-radius: 4px;
            -moz-border-radius-topleft: 4px;
            border-top-left-radius: 4px;
        }

        .awesometable-bordered caption + thead tr:first-child th:last-child,
        .awesometable-bordered caption + tbody tr:first-child td:last-child,
        .awesometable-bordered colgroup + thead tr:first-child th:last-child,
        .awesometable-bordered colgroup + tbody tr:first-child td:last-child {
            -webkit-border-top-right-radius: 4px;
            -moz-border-radius-topright: 4px;
            border-top-right-radius: 4px;
        }

        .awesometable-striped tbody tr:nth-child(odd) td {
            background-color: #F6F6F6;
        }

        .awesometable-hover tbody tr:hover td,
        .awesometable-hover tbody tr:hover th {
            background-color: #f3f3f3;
        }

        .awesometable tr.foot td { background: #eee; font-weight: bold; }

        table td[class*="span"],
        table th[class*="span"],
        .row-fluid table td[class*="span"],
        .row-fluid table th[class*="span"] {
            display: table-cell;
            float: none;
            margin-left: 0;
        }

        .awesometable td.span1,
        .awesometable th.span1 {
            float: none;
            width: 44px;
            margin-left: 0;
        }

        .awesometable td.span2,
        .awesometable th.span2 {
            float: none;
            width: 124px;
            margin-left: 0;
        }

        .awesometable td.span3,
        .awesometable th.span3 {
            float: none;
            width: 204px;
            margin-left: 0;
        }

        .awesometable td.span4,
        .awesometable th.span4 {
            float: none;
            width: 284px;
            margin-left: 0;
        }

        .awesometable td.span5,
        .awesometable th.span5 {
            float: none;
            width: 364px;
            margin-left: 0;
        }

        .awesometable td.span6,
        .awesometable th.span6 {
            float: none;
            width: 444px;
            margin-left: 0;
        }

        .awesometable td.span7,
        .awesometable th.span7 {
            float: none;
            width: 524px;
            margin-left: 0;
        }

        .awesometable td.span8,
        .awesometable th.span8 {
            float: none;
            width: 604px;
            margin-left: 0;
        }

        .awesometable td.span9,
        .awesometable th.span9 {
            float: none;
            width: 684px;
            margin-left: 0;
        }

        .awesometable td.span10,
        .awesometable th.span10 {
            float: none;
            width: 764px;
            margin-left: 0;
        }

        .awesometable td.span11,
        .awesometable th.span11 {
            float: none;
            width: 844px;
            margin-left: 0;
        }

        .awesometable td.span12,
        .awesometable th.span12 {
            float: none;
            width: 924px;
            margin-left: 0;
        }

        .awesometable tbody tr.success td {
            background-color: #dff0d8;
        }

        .awesometable tbody tr.error td {
            background-color: #f2dede;
        }

        .awesometable tbody tr.warning td {
            background-color: #fcf8e3;
        }

        .awesometable tbody tr.info td {
            background-color: #d9edf7;
        }

        .awesometable-hover tbody tr.success:hover td {
            background-color: #d0e9c6;
        }

        .awesometable-hover tbody tr.error:hover td {
            background-color: #ebcccc;
        }

        .awesometable-hover tbody tr.warning:hover td {
            background-color: #faf2cc;
        }

        .awesometable-hover tbody tr.info:hover td {
            background-color: #c4e3f3;
        }

        .awesometable tr.awesome-section:nth-child(odd), .awesometable tr.awesome-section:nth-child(even) { background: #eee; font-weight: bold; color: #000; }
        .awesometable tr.awesome-section td { font-weight: bold; font-size: 15px; }
        .awesometable tr.awesome-section2 { background-color: black; color: #EEE; }

        .awesometable div.show-on-hover { visibility: hidden; opacity:0; } 
        .awesometable tr:hover .show-on-hover { visibility: visible; opacity: 100; }

        .awesometable-rowhover tr:hover td {
            border-top: 1px solid #999;
            border-bottom: 1px solid #999;
        }
        
        .awesometable-rowhover tr:hover td:first-child {
            border-left: 1px solid #999;
        }
        
        .awesometable-rowhover tr:hover td:last-child {
            border-right: 1px solid #999;
        }

        .awesometable  .head-multiple td {
            background-color: #E9E9E9;
        }
        
        .awesometable  .head-single td {
            background-color: #E9E9E9;
        }
        
        .awesometable  .sub-ticket td {
            font-size: .8em;
            color: #333;
            background-color: white; 
            padding-top: 3px;
            padding-bottom: 3px;
        }
        
        .awesometable  .sub-ticket td:first-child {
            padding-left: 25px;
        }
        
        .awesometable  .boldfoot td {
            font-weight: bold;
        }
        
        .awesometable .reversed-footer td {
            font-size: 1.1em;
            font-weight: bold;
        }
        
        .awesometable .reversed-footer.small td {
            padding-top: 3px;
            padding-bottom: 3px;
            font-size: .83em;
            background-color: #CCC;
        }
        
        .awesometable.table td.span12,
        .awesometable.table th.span12 {
            float: none;
            width: 924px;
            margin-left: 0;
        }
        
        .awesometable.table tbody tr.success > td {
            background-color: #dff0d8;
        }
        
        .awesometable.table tbody tr.error > td {
            background-color: #f2dede;
        }
        
        .awesometable.table tbody tr.warning > td {
            background-color: #fcf8e3;
        }
        
        .awesometable.table tbody tr.info > td {
            background-color: #d9edf7;
        }
        
        .awesometable.table-hover tbody tr.success:hover > td {
            background-color: #d0e9c6;
        }
        
        .awesometable.table-hover tbody tr.error:hover > td {
            background-color: #ebcccc;
        }
        
        .awesometable.table-hover tbody tr.warning:hover > td {
            background-color: #faf2cc;
        }
        
        .awesometable.table-hover tbody tr.info:hover > td {
            background-color: #c4e3f3;
        }
        
        .awesometable-nc tr.head th{
            background-color: #f0f0f0;
        }
        
        .pointer {
            cursor: pointer;
        }
        
        .sort-icon {
            vertical-align: middle;
        }
    </style>
    
    <table class="awesometable { tableType }">
        <thead if="{ validateTableSection(tableHeaders) }">
            <tr class="{ pointer: sortTable }">
                <th onclick="{ sortTable ? sortTableColumn : '' }" data-header-index="{ i }" each="{ headerContent,  i in tableHeaders}">{ headerContent }<i data-header-index="{ i }" if="{ sortTable }" class="material-icons sort-icon">keyboard_arrow_down</i></th>
            </tr>
        </thead>
        <tbody if="{ validateTableSection(tableContent) }">
            <tr each="{ bodyContentRows, i in tableContent }">
                <td id="body" each="{ bodyContentData,  i in bodyContentRows }">{ processBody(bodyContentData) }</td>
            </tr>
        </tbody>
        <tfoot if="{ validateTableSection(tableFooter) }">
            <tr class="awesome-section">
                <td each="{ footerContent,  i in tableFooter }">{ processFooter(footerContent) }</td>
            </tr>
        </tfoot>
    </table>
    
    /**
     * Table component for RiotJS v2.2
     * 
     * @author joseph-p
     */
    var me = this;
    
    this.tableType = opts.type;
    this.tableHeaders = opts.tableHeaders;
    this.tableContent = opts.tableContent;
    this.tableFooter = opts.tableFooter;
    this.sortTable = opts.sortTable;
    this.toggleSort = false;
    
    validateTableSection(section) {
        if(section === null || section === undefined)
            return false;
        
        if(Array.isArray(section) === false)
            return false;
            
        return true;
    }
    
    processBody(cells) {
        if(cells.indexOf('$') !== -1) {
            cells = parseFloat(cells.replace('$', ''));
            cells = cells.toFixed(2, 10);
            
            return '$'+cells;
        }
        
        return cells;
    }
    
    processFooter(cells) {
        var currency_found = false;
        var total = 0;
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
            total += parseFloat(this.tableContent[i][cellIndex].replace('$', ''));
        }
        
        if(cells.indexOf('{{total') !== -1)
            return currency_found ? '$'+total.toFixed(2, 10) : total;
            
        if(cells.indexOf('{{average') !== -1)
            return currency_found ? '$'+(total/this.tableContent.length).toFixed(2, 10) : (total/this.tableContent.length).toFixed(2, 10);
    }
    
    sortTableColumn(e) {
        var column = [];
        var currency_found = false;
        var columnIndex = e.target.dataset.headerIndex;
        
        for(var i = 0; i < this.tableContent.length; i++) {
            if(this.tableContent[i][columnIndex].indexOf('$') !== -1) {
                currency_found = true;
                this.tableContent[i][columnIndex] = this.tableContent[i][columnIndex].replace('$', '');
            } else {
                currency_found = false;
            }
            
            column.push(this.tableContent[i][columnIndex]);
        }
        
        column.sort();
        
        for(var i = 0; i < column.length; i++) {
            this.tableContent[i][columnIndex] = currency_found ? '$'+column[i] : column[i];
        }
        
        this.toggleSort = !this.toggleSort;
    }
</rm-table>