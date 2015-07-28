<rm-toast>

	<h2>Yum toast</h2>
	<div class="message_container" if="{ opts.toasts.length > 0 }">
		<div class="toast" each="{ opts.toasts }" onclick="{ parent.toastClicked }">
			{ text }
		</div>
	</div>
	
	var me = this;
</rm-toast>
