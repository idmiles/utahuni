var api;
jQuery('document').ready(function()
{
	//Pass anon function
	api = jQuery("#gallery").unitegallery({
	gallery_width:1600,
	gallery_height:700,
	gallery_min_width: 300,
	gallery_min_height: 300,
	gallery_theme:"default",
	gallery_skin:"default",
	gallery_images_preload_type:"minimal",
	gallery_autoplay:"false",
	gallery_play_interval:3000,
	gallery_pause_on_mouseover:true,
	gallery_control_thumbs_mousewheel:false,
	gallrey_control_keyboard:true,
	gallery_carousel:true,
	gallery_preserve_ratio:true,
	gallery_debug_errors:false,
	galler_background_color:"",
	theme_panel_position:"right",
	theme_enable_text_panel: "false"
	});//unitegallery
	api.on("item_change",function()
	{
		var w = window.innerWidth; 
		var h = window.innerHeight*0.65;
		api.resetZoom();
		api.resize(w,h);
		
	});
});
function dismiss()
{
	$('#jmbo').hide();	
};