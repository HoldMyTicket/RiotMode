<rm-datepicker>

	<style scoped>
		a {
			text-decoration:none;
		}
		.rm-datepicker {
			position: relative;
		}
		.base_input {
			height:40px;
			padding-left:5px;
			border:1px solid #D3D3D3;
			box-sizing:border-box;
			padding-left:5px;
			cursor: pointer;
		}
		.view {
			position: absolute;
			border: 1px solid #D3D3D3;
			width:280px;
			height:280px;
			margin-top:5px;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			-webkit-box-shadow: 0 2px 10px -4px #444;
			-moz-box-shadow: 0 2px 10px -4px #444;
			box-shadow: 0 2px 10px -4px #444;
		}
		.view_title {
			display:block;
			text-align:center;
			background: rgb(233,229,227);
			color: rgb(176, 174, 173);
			line-height: 50px;
		}
		.view_title a {
			cursor: pointer;
		}
		.left_arrow {
			float:left;
			line-height:50px;
			margin-left:10px;
		}
		.right_arrow {
			float:right;
			line-height:50px;
			margin-right:10px;
		}
		table {
			height:230px;
			width: 100%;
			text-align:center;
			table-layout: fixed;
		}	
		table td {
			border-radius: 20px;
		}
		table td .active {
			background:rgb(176, 174, 173);
		}
		table td:hover {
			background:rgb(233,229,227);
		}
		
	</style>

	<div class="rm-datepicker">
		<input class="base_input" type="text" onclick="{ show }" value="{ date }" readonly>
		<div show={ open } class="view">
			<div class="view_title">
				<a onclick="{ previous }"><i class="material-icons left_arrow">&#xE5C4;</i></a>
				<span class="month">July</span>&nbsp;<span class="year">2015</span>
				<a onclick="{ next }"><i class="material-icons right_arrow">&#xE5C8;</i></a>
			</div>
			
			<table>
				<thead>
					<th>Mo</th>
					<th>Tu</th>
					<th>We</th>
					<th>Th</th>
					<th>Fr</th>
					<th>Sa</th>
					<th>Su</th>
				</thead>
				<tbody><tr><td class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td><td class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td><td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">1</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">2</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">3</a></td><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">4</a></td><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">5</a></td></tr><tr><td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">6</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">7</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">8</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">9</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">10</a></td><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">11</a></td><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">12</a></td></tr><tr><td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">13</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">14</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">15</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">16</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">17</a></td><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">18</a></td><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">19</a></td></tr><tr><td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">20</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">21</a></td><td class=" ui-datepicker-days-cell-over  ui-datepicker-current-day ui-datepicker-today" data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default ui-state-highlight ui-state-active" href="#">22</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">23</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">24</a></td><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">25</a></td><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">26</a></td></tr><tr><td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">27</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">28</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">29</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">30</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="6" data-year="2015"><a class="ui-state-default" href="#">31</a></td><td class=" ui-datepicker-week-end ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td><td class=" ui-datepicker-week-end ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td></tr></tbody>
			</table>
		</div>
	</div>

	var me = this;

	this.date = (opts.date ? new Date(opts.date) : new Date() );
	this.open = false;

	show(e) {
		me.open = !me.open;
	}

	previous(e) {
		
	}

	next(e) {
		
	}

</rm-datepicker>
