/**
 * @author wjsu
 * @param  canvas 
 * @return base64 
 */


;(function($){
    'use strict';
    Zepto.fn.editCanvas = function (options) {
        // console.log(options.dataURL,options.width);
        var $self = this;
		$self[0].backgroundAlpha =0;
		var fillterImg,waterMark;
        var context = $self[0].getContext('2d');
        $self[0].width = $self.width();
        $self[0].height = $self.height();

		var fillterReady = true;
		var inputFile=$("#inputfile").html();
		$("#inputfile2").html(inputfile);
		$("#pic_file").css("width","318px");
		if ( typeof options.fillterImage != 'undefined' ) {
			
			if ( options.loading ) options.loading.style.display ='block';

			if ( typeof options.fillterImage.posx == 'undefined') options.fillterImage.posx = 0;
			if ( typeof options.fillterImage.posy == 'undefined') options.fillterImage.posy = 0;

			fillterReady = false;
			if ( typeof options.fillterImage.img == 'object' )	 {
					fillterImg = options.fillterImage.img ;
					drawImgInit ( true );
					if ( options.loading ) options.loading.style.display ='none';
			} else {
				var oImg =new Image();
				
				oImg.onload = function () {
					fillterImg =oImg;	
					drawImgInit ( true );
					if ( options.loading ) options.loading.style.display ='none';
					oImg = oImg.onload =null;
				}	
				oImg.src = options.fillterImage.img;
			}
		} else {
			drawImgInit () ;	
		}
		
       function  drawImgInit ( drawFillter ,drawWaterMark ) {

		   context.drawImage(options.image,0,0,options.image.width,options.image.height);
		   if (drawFillter) {
		    context.drawImage (fillterImg,0,0,fillterImg.width,fillterImg.height,options.fillterImage.posx,options.fillterImage.posy,fillterImg.width,fillterImg.height);}

			document.getElementById(options.commit).onclick =   function () {
			
			
			  //$("#"+options.commit).off('click');
			 // hammertime.off('touch drag transform',touchDragTransform);
			 // hammertime.off("dragstart",dragstart);
			 // hammertime.off("dragend",dragend);
			  if ( options.waterMark  ) {
				  
				 var CANVAS = document.createElement('canvas');
				  CANVAS.width=$self[0].width;
				  CANVAS.height=$self[0].height;
				  
				  var cxt = CANVAS.getContext('2d');
				  cxt.fillStyle="white";
		          cxt.fillRect(0,0, $self[0].width,$self[0].height);
                  cxt.save();
				  cxt.drawImage ($self[0],0,0);
				  
				  cxt.drawImage ( options.waterMark ,
						 0,
						 0,
						 options.waterMark.width,
						 options.waterMark.height,
						 $self[0].width-options.waterMark.width-10,
						 $self[0].height-options.waterMark.height-20,
						 options.waterMark.width,
						 options.waterMark.height 
					 ); 
					 
				 setTimeout (function () {
					options.callback(CANVAS.toDataURL("image/jpeg"));
					CANVAS = cxt = null;	  
				  },100);
			  } else {
				options.callback($self[0]);	  
			  }
	  	
		}
        /**
       
         * @type options.control  
         */
		 
		document.getElementById(options.control).addEventListener ('touchmove',function ( e ) { e.preventDefault ();} ,false);
        var hammertime = Hammer(document.getElementById(options.control), {
          transform_always_block: false,
          transform_min_scale   : 1,
          drag_block_horizontal : false,
          drag_block_vertical   : false,
          drag_min_distance     : 0
        });
        hammertime.on("dragstart",dragstart);

        function dragstart(e) {
          context.clearRect(0, 0,  $self[0].width, $self[0].height);
		 // console.info( $self[0].width, $self[0].height)//获取图片大小
		 // alert($self[0].width)
		  e.preventDefault ();
        }
        /**
         * @type rect
         */
        var rect = document.getElementById(options.element);
        var posX = 0,posY=0,isDrag = false,startPosX=0,startPosY=0;
        /**
         * @param  {[touchEvent]} e 
         */
        hammertime.on("dragend", dragend); 
        function dragend(e) {
          posX = 0;
          posY = 0;
    
          if (isDrag && !istransform) {
            startPosX += e.gesture.deltaX;
            startPosY += e.gesture.deltaY;
			//获取图片移动坐标
			//console.info( startPosX)
			//console.info( startPosY)
            isDrag = false;
          }
		  
		   e.preventDefault ();
        }
		
		var Ges = 0;
		/*document.body.ontouchmove = function (){
			//return false;	
		};*/
		document.body.ontouchend = function (){
			if(Ges){
				 Ges = 0;
			}else
			{
				setTimeout( function (){
					istransform = false;
				} ,200)
			}
			
		}
		document.body.ongesturestart = function (){
			Ges = 1;
		}
		
		
        var last_scale=0,last_rotation=0,scale=1,rotation=0,istransform=false;

        hammertime.on('touch drag transform',touchDragTransform);
   		//	hammertime.on('transform',touchDragTransform);
        /**
         * touch ,drag ,trasform
         * @param  {[event]} ev
         */
		 
		 var Tranx = 0 , Trany = 0;
		 
		 
		 
        function touchDragTransform(ev) {
          isDrag = true;
          var xpos = options.image.width/2;
          var ypos = options.image.height/2;
          switch(ev.type) {
             case 'touch':
              last_scale = scale;
              last_rotation = rotation;
              break;
            case 'drag':
			
              if(istransform) {
                istransform = false;
              } else {
                posX = ev.gesture.deltaX;
                posY = ev.gesture.deltaY;
              }
              break;
            case 'transform':

              posX = 0;
              posY = 0;
			  Tranx = ev.gesture.deltaX;
			  Trany = ev.gesture.deltaY;
              istransform = true;

           //   rotation = last_rotation + ev.gesture.rotation;
		      rotation = 0;
             // scale = Math.max(0.1, Math.min(last_scale * ev.gesture.scale, 2));
			 scale = Math.max(0.6, Math.min(last_scale * ev.gesture.scale, 2));
			 //console.info(scale)//图片缩放多少倍
			 PicWidth = scale*options.image.width
			 PicHeight = scale*options.image.heigh
			
              break;
          }
          redrawImage(xpos,ypos);
		  ev.preventDefault ();
        }

        /**
         * canvas
         * @param  {[number]} xpos 
         * @param  {[number]} ypos 
         */
        function redrawImage(xpos,ypos) {
			
			  context.clearRect(0, 0,  $self[0].width, $self[0].height);
			  context.fillStyle="white";
		      context.fillRect(0,0, $self[0].width,$self[0].height);
			  context.save();
			  context.transform(scale, 0, 0, scale, startPosX + posX, startPosY + posY);
			  
			  
			  
			  context.translate(xpos, ypos);
			  context.rotate(rotation* Math.PI / 180);
			  context.translate(-xpos, -ypos);
			  
			  
			 // $('#text').text(startPosX+'||'+posX+'||'+startPosY+'||'+posY)	
			 // $('#text').html('ro='+rotation +' , xpos:'+xpos + ' , ypos:'+ypos)	
			  context.drawImage(options.image,0,0,options.image.width,options.image.height);
			  
			 // console.info(options.image.width,options.image.height) //图片宽高
			  //alert(options.image.width)
			 // alert(options.image.height)
			  $("#imgInfo").attr("iwidth",options.image.width);
			  $("#imgInfo").attr("iheight",options.image.height);
			  $("#imgInfo").attr("posx",startPosX);
			  $("#imgInfo").attr("posy",startPosY);
			  $("#imgInfo").attr("swimg",options.image.width*scale);
			  $("#imgInfo").attr("shimg",options.image.height*scale);
			  context.restore();
			  if (drawFillter) {
			  context.drawImage (fillterImg,0,0,fillterImg.width,fillterImg.height,options.fillterImage.posx,options.fillterImage.posy,fillterImg.width,fillterImg.height);}
        }
    };
	};
})(Zepto)
