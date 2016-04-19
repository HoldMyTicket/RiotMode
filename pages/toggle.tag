<page-toggle>
    
    <style scoped>
        .hidden-message {
            color: red;
        }
        h6 {
          font-family: monaco;
          font-size: 13px;
          color: rgb(255, 66, 81);
        }
    </style>

		<h3>Toggle</h3>
    
    <h5>Checkbox Toggles</h5>
    
		<rm-toggle type="checkbox" label-text="Checkbox Off" ontoggle="{ myToggle }"></rm-toggle>
    
    <br />
    <br />
    <rm-code snippet="./snippets/toggle-example-1.txt"></rm-code>
    
    <hr />
    
		<rm-toggle type="checkbox" label-text="Checkbox On" ontoggle="{ myToggle }" ischecked="{on_switch}"></rm-toggle>

    <br />
    <br />
    <rm-code snippet="./snippets/toggle-example-2.txt"></rm-code>
    
    <hr />
		
		<br />

    <h5>Radio Toggles</h5>
		
		<rm-toggle type="radio" name="group1" label-text="Radio 1" ontoggle="{ myToggle }"></rm-toggle>
		<rm-toggle type="radio" name="group1" label-text="Radio 2" ontoggle="{ myToggle }"></rm-toggle>
		<rm-toggle type="radio" name="group1" label-text="Radio 3" ontoggle="{ myToggle }"></rm-toggle>

    <br />
    <br />
    <rm-code snippet="./snippets/toggle-example-3.txt"></rm-code>
    
    <hr />

		<h5>Toggle Switches</h5>
		<p>
			Several states with delays
		</p>

		<rm-toggle type="switch" label-text="No State" ontoggle="{ myToggle }"></rm-toggle>
		<rm-toggle type="switch" label-text="Off State" ontoggle="{ myToggle }" ischecked={off_switch}></rm-toggle>
		<rm-toggle type="switch" label-text="On State" ontoggle="{ myToggle }" ischecked="true"></rm-toggle>

    <br />
    <br />
    <rm-code snippet="./snippets/toggle-example-4.txt"></rm-code>
    
    <hr />
    
    <h5>Delayed Toggle Switches</h5>
    
		<rm-toggle id="delayed_on_switch" type="switch" label-text="Delayed On" ontoggle="{ myToggle }" ischecked={delayed_on_switch}></rm-toggle>
		<rm-toggle id="delayed_off_switch" type="switch" label-text="Delayed Off" ontoggle="{ myToggle }" ischecked={delayed_off_switch}></rm-toggle>

    <br />
    <br />
    <rm-code snippet="./snippets/toggle-example-5.txt"></rm-code>
    
    <hr />
	
    <h5>ATTRIBUTES</h5>
    
    <h5 class="attribute">type</h5>
    <ul>
      <li>checkbox - Standard checkbox toggle switch</li>
      <li>radio - Radio group toggles</li>
      <li>switch - Toggle switch, on or off</li>
    </ul>
    
    <h5 class="attribute">toggle-icon</h5>
    <p>An icon that can be toggled on and off</p>

    <h5 class="attribute">label-text</h5>
    <p>Give your toggle a label description</p>

    <h5 class="attribute">ischecked</h5>
    <p>Setup your state of your toggle on mount</p>

    <hr />

    <h5>EVENTS</h5>

    <h5 class="attribute">toggle</h5>
    <p>When your toggle switch was manually toggled this will be fired</p>
		
		var me = this;
		
		this.show = false;
		
		this.off_switch = false; // stays off
		this.on_switch = true; // stays on
		this.delayed_check = false; // will turn in 2 seconds
		
    this.delayed_on_switch = false;
    this.delayed_off_switch = true;
    
		this.on('mount',function(){
			setTimeout(function(){
				me.delayed_on_switch = true;
				me.delayed_off_switch = false;
				me.update()
			},2000);
		})
		
		myToggle(e) {
			me.update();
		}
      
</page-toggle>
