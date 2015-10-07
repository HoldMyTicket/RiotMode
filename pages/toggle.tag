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

		<h3>STANDARD TOGGLES</h3>
		<rm-toggle type="checkbox" label-text="Checkbox Off" ontoggle="{ myToggle }"></rm-toggle>
		<rm-toggle type="checkbox" label-text="Checkbox On" ontoggle="{ myToggle }" ischecked="{on_switch}"></rm-toggle>
		
		<br />
		
		<rm-toggle type="radio" name="group1" label-text="Radio 1" ontoggle="{ myToggle }"></rm-toggle>
		<rm-toggle type="radio" name="group1" label-text="Radio 2" ontoggle="{ myToggle }"></rm-toggle>
		<rm-toggle type="radio" name="group1" label-text="Radio 3" ontoggle="{ myToggle }"></rm-toggle>

		<br />

		<rm-toggle type="radio" name="group2" label-text="Radio A" ontoggle="{ myToggle }"></rm-toggle>
		<rm-toggle type="radio" name="group2" label-text="Radio B" ontoggle="{ myToggle }"></rm-toggle>
		<rm-toggle type="radio" name="group2" label-text="Radio C" ontoggle="{ myToggle }"></rm-toggle>
		
		<br />
		
		<rm-toggle type="icon-toggle" icon="feedback" ontoggle="{ myToggle }"></rm-toggle>

		<h3>TOGGLE SWITCHES</h3>
		<p>
			Several states with delays
		</p>

		<rm-toggle type="switch" label-text="No State" ontoggle="{ myToggle }"></rm-toggle>
		<rm-toggle type="switch" label-text="Off State" ontoggle="{ myToggle }" ischecked={off_switch}></rm-toggle>
		<rm-toggle type="switch" label-text="On State" ontoggle="{ myToggle }" ischecked="true"></rm-toggle>
		<rm-toggle id="delayed_on_switch" type="switch" label-text="Delayed On" ontoggle="{ myToggle }" ischecked={off_switch}></rm-toggle>
		<rm-toggle id="delayed_off_switch" type="switch" label-text="Delayed Off" ontoggle="{ myToggle }" ischecked={on_switch}></rm-toggle>
	
		<div class="hidden-message" show="{ show }">This is a hidden message! :D</div>


    <h5>Basic Usage</h5>
    <pre>
      <code>
        &lt;rm-toggle type=&quot;checkbox&quot; label-text=&quot;My Label&quot;&gt;&lt;/rm-toggle&gt;
      </code>
    </pre>

    <h5>More Usage</h5>
    <pre>
      <code>
        
        &lt;rm-toggle id=&quot;myswitch&quot; type=&quot;switch&quot; label-text=&quot;My Special Switch&quot; ischecked=true&gt;&lt;/rm-toggle&gt;
        <br />
        <br />
        somefunction(){<br />
          &nbsp;&nbsp;me.myswitch._tag.trigger(&#39;on&#39;);<br />
        }
        
      </code>
    </pre>


    <h5>TYPES</h5>
    
    <h6>checkbox</h6>
    <p>A simple checkbox on off</p>

    <h6>radio</h6>
    <p>Radio groups</p>

    <h6>toggle-icon</h6>
    <p>An icon that can be toggled on and off</p>

    <h6>switch</h6>
    <p>An on and off switch</p>

    <hr />

    <h5>ATTRIBUTES</h5>

    <h6>label-text</h6>
    <p>Give your toggle a label description</p>

    <h6>ischecked</h6>
    <p>Setup your state of your toggle on mount</p>

    <hr />

    <h5>EVENTS</h5>

    <h6>on</h6>
    <p>Turn on your toggle switch</p>

    <h6>off</h6>
    <p>Turn off your toggle switch</p>

    <h6>toggle</h6>
    <p>When your toggle switch was manually toggled this will be fired</p>
		
		var me = this;
		
		this.show = false;
		
		this.off_switch = false; // stays off
		this.on_switch = true; // stays on
		this.delayed_check = false; // will turn in 2 seconds
		
		this.on('mount',function(){

      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });

			this.update();
			setTimeout(function(){
				me.delayed_on_switch._tag.trigger('on');
				me.delayed_off_switch._tag.trigger('off');
				me.update()
			},2000);
		})
		
		myToggle(e) {
			show = !show;
			me.update();
		}
      
</page-toggle>
