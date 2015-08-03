<page-toggle>
    <style>
        rm-toggle {
            display: block;
            margin-bottom: 20px;
        }
        
        .hidden-message {
            color: red;
        }
    </style>
    
    <h3>Toggles</h3>
    
    <rm-toggle type="checkbox" label-text="Checkbox" ontoggle="{ myToggle }"></rm-toggle>
    <rm-toggle type="radio" label-text="Radio Button" ontoggle="{ myToggle }"></rm-toggle>
    <rm-toggle type="icon-toggle" icon="feedback" ontoggle="{ myToggle }"></rm-toggle>
    <rm-toggle type="switch" label-text="Switch Toggle" ontoggle="{ myToggle }"></rm-toggle>

    <div class="hidden-message" show="{ show }">This is a hidden message! :D</div>
    
    <p>Options</p>
    
    <pre>
        <h6>Type</h6>
        <code class="html">
            &ltrm-toggle type="switch"&gt&lt/rm-toggle&gt
        </code>
        
        <h6>Label Text</h6>
        <code class="html">
            &ltrm-toggle label-text="A switch toggle!"&gt&lt/rm-toggle&gt
        </code>
    </pre>
    
    this.on('mount', function() {
        $('pre code').each(function(i, block) {
            console.log(block);
            hljs.highlightBlock(block);
        });
        
        riot.mount('rm-toggle');
    });
    
    var me = this;
    show = false;
    myToggle(e) {
        show = !show;
        me.update();
    }
</page-toggle>