var gb=gb=gb||{};!function(){function e(e,t,n){var r=t.width,i,a;e.unbind().bind("change",function(e){var t=this,o=t.files,s=o[0],c=new FileReader,u=$("<canvas></canvas>"),h=u[0],g=h.getContext("2d"),d=function(e){var t=h.toDataURL();$.isFunction(n)&&n.call(window,t),u.remove()},l=new MegaPixImage(s),f=function(e,t){var n=t.Orientation;return h.width=r,h.height=r/(i/a),l.render(h,{maxWidth:1*h.width,maxHeight:1*h.height,orientation:n}),d(e)};c.onerror=function(){alert("read file error!!!")},c.onload=function(e){var t=e.target,n=t.result,r=new Image,o;r.onload=function(){i=r.width,a=r.height,f(e,o)};var s=n.replace(/^.*?,/,""),c=atob(s),u=new BinaryFile(c);o=EXIF.readFromBinaryFile(u),r.src=n},c.readAsDataURL(s)})}var t={};t.initInput=e,gb.makeThumb=t}();var BinaryFile=function(e,t,n){var r=e,i=t||0,a=0;this.getRawData=function(){return r},"string"==typeof e?(a=n||r.length,this.getByteAt=function(e){return 255&r.charCodeAt(e+i)},this.getBytesAt=function(e,t){for(var n=[],a=0;t>a;a++)n[a]=255&r.charCodeAt(e+a+i);return n}):"unknown"==typeof e&&(a=n||IEBinary_getLength(r),this.getByteAt=function(e){return IEBinary_getByteAt(r,e+i)},this.getBytesAt=function(e,t){return new VBArray(IEBinary_getBytesAt(r,e+i,t)).toArray()}),this.getLength=function(){return a},this.getSByteAt=function(e){var t=this.getByteAt(e);return t>127?t-256:t},this.getShortAt=function(e,t){var n=t?(this.getByteAt(e)<<8)+this.getByteAt(e+1):(this.getByteAt(e+1)<<8)+this.getByteAt(e);return 0>n&&(n+=65536),n},this.getSShortAt=function(e,t){var n=this.getShortAt(e,t);return n>32767?n-65536:n},this.getLongAt=function(e,t){var n=this.getByteAt(e),r=this.getByteAt(e+1),i=this.getByteAt(e+2),a=this.getByteAt(e+3),o=t?(((n<<8)+r<<8)+i<<8)+a:(((a<<8)+i<<8)+r<<8)+n;return 0>o&&(o+=4294967296),o},this.getSLongAt=function(e,t){var n=this.getLongAt(e,t);return n>2147483647?n-4294967296:n},this.getStringAt=function(e,t){for(var n=[],r=this.getBytesAt(e,t),i=0;t>i;i++)n[i]=String.fromCharCode(r[i]);return n.join("")},this.getCharAt=function(e){return String.fromCharCode(this.getByteAt(e))},this.toBase64=function(){return window.btoa(r)},this.fromBase64=function(e){r=window.atob(e)}},BinaryAjax=function(){function e(){var e=null;return window.ActiveXObject?e=new ActiveXObject("Microsoft.XMLHTTP"):window.XMLHttpRequest&&(e=new XMLHttpRequest),e}function t(t,n,r){var i=e();i?(n&&("undefined"!=typeof i.onload?i.onload=function(){"200"==i.status?n(this):r&&r(),i=null}:i.onreadystatechange=function(){4==i.readyState&&("200"==i.status?n(this):r&&r(),i=null)}),i.open("HEAD",t,!0),i.send(null)):r&&r()}function n(t,n,r,i,a,o){var s=e();if(s){var c=0;i&&!a&&(c=i[0]);var u=0;i&&(u=i[1]-i[0]+1),n&&("undefined"!=typeof s.onload?s.onload=function(){"200"==s.status||"206"==s.status||"0"==s.status?(s.binaryResponse=new BinaryFile(s.responseText,c,u),s.fileSize=o||s.getResponseHeader("Content-Length"),n(s)):r&&r(),s=null}:s.onreadystatechange=function(){if(4==s.readyState){if("200"==s.status||"206"==s.status||"0"==s.status){var e={status:s.status,binaryResponse:new BinaryFile("unknown"==typeof s.responseBody?s.responseBody:s.responseText,c,u),fileSize:o||s.getResponseHeader("Content-Length")};n(e)}else r&&r();s=null}}),s.open("GET",t,!0),s.overrideMimeType&&s.overrideMimeType("text/plain; charset=x-user-defined"),i&&a&&s.setRequestHeader("Range","bytes="+i[0]+"-"+i[1]),s.setRequestHeader("If-Modified-Since","Sat, 1 Jan 1970 00:00:00 GMT"),s.send(null)}else r&&r()}return function(e,r,i,a){a?t(e,function(t){var o=parseInt(t.getResponseHeader("Content-Length"),10),s=t.getResponseHeader("Accept-Ranges"),c,u;c=a[0],a[0]<0&&(c+=o),u=c+a[1]-1,n(e,r,i,[c,u],"bytes"==s,o)}):n(e,r,i)}}(),EXIF={};!function(){function e(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on"+t,n)}function t(e){return!!e.exifdata}function n(e,t){BinaryAjax(e.src,function(n){var i=r(n.binaryResponse);e.exifdata=i||{},t&&t()})}function r(e){var t=[];if(255!=e.getByteAt(0)||216!=e.getByteAt(1))return!1;for(var n=2,r=e.getLength();r>n;){if(255!=e.getByteAt(n))return c&&console.log("Not a valid marker at offset "+n+", found: "+e.getByteAt(n)),!1;var i=e.getByteAt(n+1);if(22400==i){return c&&console.log("Found 0xFFE1 marker"),o(e,n+4,e.getShortAt(n+2,!0)-2);n+=2+e.getShortAt(n+2,!0)}else{if(225==i)return c&&console.log("Found 0xFFE1 marker"),o(e,n+4,e.getShortAt(n+2,!0)-2);n+=2+e.getShortAt(n+2,!0)}}}function i(e,t,n,r,i){for(var o=e.getShortAt(n,i),s={},u=0;o>u;u++){var h=n+12*u+2,g=r[e.getShortAt(h,i)];!g&&c&&console.log("Unknown tag: "+e.getShortAt(h,i)),s[g]=a(e,h,t,n,i)}return s}function a(e,t,n,r,i){var a=e.getShortAt(t+2,i),o=e.getLongAt(t+4,i),s=e.getLongAt(t+8,i)+n;switch(a){case 1:case 7:if(1==o)return e.getByteAt(t+8,i);for(var c=o>4?s:t+8,u=[],h=0;o>h;h++)u[h]=e.getByteAt(c+h);return u;break;case 2:var g=o>4?s:t+8;return e.getStringAt(g,o-1);break;case 3:if(1==o)return e.getShortAt(t+8,i);for(var c=o>2?s:t+8,u=[],h=0;o>h;h++)u[h]=e.getShortAt(c+2*h,i);return u;break;case 4:if(1==o)return e.getLongAt(t+8,i);for(var u=[],h=0;o>h;h++)u[h]=e.getLongAt(s+4*h,i);return u;break;case 5:if(1==o)return e.getLongAt(s,i)/e.getLongAt(s+4,i);for(var u=[],h=0;o>h;h++)u[h]=e.getLongAt(s+8*h,i)/e.getLongAt(s+4+8*h,i);return u;break;case 9:if(1==o)return e.getSLongAt(t+8,i);for(var u=[],h=0;o>h;h++)u[h]=e.getSLongAt(s+4*h,i);return u;break;case 10:if(1==o)return e.getSLongAt(s,i)/e.getSLongAt(s+4,i);for(var u=[],h=0;o>h;h++)u[h]=e.getSLongAt(s+8*h,i)/e.getSLongAt(s+4+8*h,i);return u}}function o(e,t,n){if("Exif"!=e.getStringAt(t,4))return c&&console.log("Not valid EXIF data! "+e.getStringAt(t,4)),!1;var r,a=t+6;if(18761==e.getShortAt(a))r=!1;else{if(19789!=e.getShortAt(a))return c&&console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"),!1;r=!0}if(42!=e.getShortAt(a+2,r))return c&&console.log("Not valid TIFF data! (no 0x002A)"),!1;if(8!=e.getLongAt(a+4,r))return c&&console.log("Not valid TIFF data! (First offset not 8)",e.getShortAt(a+4,r)),!1;var o=i(e,a,a+8,EXIF.TiffTags,r);if(o.ExifIFDPointer){var s=i(e,a,a+o.ExifIFDPointer,EXIF.Tags,r);for(var u in s){switch(u){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":s[u]=EXIF.StringValues[u][s[u]];break;case"ExifVersion":case"FlashpixVersion":s[u]=String.fromCharCode(s[u][0],s[u][1],s[u][2],s[u][3]);break;case"ComponentsConfiguration":s[u]=EXIF.StringValues.Components[s[u][0]]+EXIF.StringValues.Components[s[u][1]]+EXIF.StringValues.Components[s[u][2]]+EXIF.StringValues.Components[s[u][3]]}o[u]=s[u]}}if(o.GPSInfoIFDPointer){var h=i(e,a,a+o.GPSInfoIFDPointer,EXIF.GPSTags,r);for(var u in h){switch(u){case"GPSVersionID":h[u]=h[u][0]+"."+h[u][1]+"."+h[u][2]+"."+h[u][3]}o[u]=h[u]}}return o}function s(){for(var t=document.getElementsByTagName("img"),n=0;n<t.length;n++)"true"==t[n].getAttribute("exif")&&(t[n].complete?EXIF.getData(t[n]):e(t[n],"load",function(){EXIF.getData(this)}))}var c=!1;EXIF.Tags={36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubsecTime",37521:"SubsecTimeOriginal",37522:"SubsecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"ISOSpeedRatings",34856:"OECF",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRation",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",40965:"InteroperabilityIFDPointer",42016:"ImageUniqueID"},EXIF.TiffTags={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright"},EXIF.GPSTags={0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential"},EXIF.StringValues={ExposureProgram:{0:"Not defined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Not defined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},Components:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"}},EXIF.getData=function(e,r){return e.complete?(t(e)?r&&r():n(e,r),!0):!1},EXIF.getTag=function(e,n){return t(e)?e.exifdata[n]:void 0},EXIF.getAllTags=function(e){if(!t(e))return{};var n=e.exifdata,r={};for(var i in n)n.hasOwnProperty(i)&&(r[i]=n[i]);return r},EXIF.pretty=function(e){if(!t(e))return"";var n=e.exifdata,r="";for(var i in n)n.hasOwnProperty(i)&&(r+="object"==typeof n[i]?i+" : ["+n[i].length+" values]\r\n":i+" : "+n[i]+"\r\n");return r},EXIF.readFromBinaryFile=function(e){return r(e)},e(window,"load",s)}(),function(){function e(e){var t=e.naturalWidth,n=e.naturalHeight;if(t*n>1048576){var r=document.createElement("canvas");r.width=r.height=1;var i=r.getContext("2d");return i.drawImage(e,-t+1,0),0===i.getImageData(0,0,1,1).data[3]}return!1}function t(e,t,n){var r=document.createElement("canvas");r.width=1,r.height=n;var i=r.getContext("2d");i.drawImage(e,0,0);for(var a=i.getImageData(0,0,1,n).data,o=0,s=n,c=n;c>o;){var u=a[4*(c-1)+3];0===u?s=c:o=c,c=s+o>>1}var h=c/n;return 0===h?1:h}function n(e,t,n){var i=document.createElement("canvas");return r(e,i,t,n),i.toDataURL("image/jpeg",t.quality||.8)}function r(n,r,a,o){var s=n.naturalWidth,c=n.naturalHeight,u=a.width,h=a.height,g=r.getContext("2d");g.save(),i(r,u,h,a.orientation);var d=e(n);d&&(s/=2,c/=2);var l=1024,f=document.createElement("canvas");f.width=f.height=l;for(var p=f.getContext("2d"),m=o?t(n,s,c):1,v=Math.ceil(l*u/s),S=Math.ceil(l*h/c/m),E=0,y=0;c>E;){for(var _=0,T=0;s>_;)p.clearRect(0,0,l,l),p.drawImage(n,-_,-E),g.drawImage(f,0,0,l,l,T,y,v,S),_+=l,T+=v;E+=l,y+=S}g.restore(),f=p=null}function i(e,t,n,r){switch(r){case 5:case 6:case 7:case 8:e.width=n,e.height=t;break;default:e.width=t,e.height=n}var i=e.getContext("2d");switch(r){case 2:i.translate(t,0),i.scale(-1,1);break;case 3:i.translate(t,n),i.rotate(Math.PI);break;case 4:i.translate(0,n),i.scale(1,-1);break;case 5:i.rotate(.5*Math.PI),i.scale(1,-1);break;case 6:i.rotate(.5*Math.PI),i.translate(0,-n);break;case 7:i.rotate(.5*Math.PI),i.translate(t,-n),i.scale(-1,1);break;case 8:i.rotate(-.5*Math.PI),i.translate(-t,0)}}function a(e){if(e instanceof Blob){var t=new Image,n=window.URL&&window.URL.createObjectURL?window.URL:window.webkitURL&&window.webkitURL.createObjectURL?window.webkitURL:null;if(!n)throw Error("No createObjectURL function found to create blob url");t.src=n.createObjectURL(e),this.blob=e,e=t}if(!e.naturalWidth&&!e.naturalHeight){var r=this;e.onload=function(){var e=r.imageLoadListeners;if(e){r.imageLoadListeners=null;for(var t=0,n=e.length;n>t;t++)e[t]()}},this.imageLoadListeners=[]}this.srcImage=e}a.prototype.render=function(e,t){if(this.imageLoadListeners){var i=this;return void this.imageLoadListeners.push(function(){i.render(e,t)})}t=t||{};var a=this.srcImage.naturalWidth,o=this.srcImage.naturalHeight,s=t.width,c=t.height,u=t.maxWidth,h=t.maxHeight,g=!this.blob||"image/jpeg"===this.blob.type;s&&!c?c=o*s/a<<0:c&&!s?s=a*c/o<<0:(s=a,c=o),u&&s>u&&(s=u,c=o*s/a<<0),h&&c>h&&(c=h,s=a*c/o<<0);var d={width:s,height:c};for(var l in t)d[l]=t[l];var f=e.tagName.toLowerCase();"img"===f?e.src=n(this.srcImage,d,g):"canvas"===f&&r(this.srcImage,e,d,g),"function"==typeof this.onrender&&this.onrender(e)},"function"==typeof define&&define.amd?define([],function(){return a}):this.MegaPixImage=a}(),document.write("<script type='text/vbscript'>\r\nFunction IEBinary_getByteAt(strBinary, iOffset)\r\n        IEBinary_getByteAt = AscB(MidB(strBinary, iOffset + 1, 1))\r\nEnd Function\r\nFunction IEBinary_getBytesAt(strBinary, iOffset, iLength)\r\n  Dim aBytes()\r\n  ReDim aBytes(iLength - 1)\r\n  For i = 0 To iLength - 1\r\n   aBytes(i) = IEBinary_getByteAt(strBinary, iOffset + i)\r\n  Next\r\n  IEBinary_getBytesAt = aBytes\r\nEnd Function\r\nFunction IEBinary_getLength(strBinary)\r\n        IEBinary_getLength = LenB(strBinary)\r\nEnd Function\r\n</script>\r\n"),!function(e,t){"use strict";function n(){r.READY||(S.determineEventTypes(),f.each(r.gestures,function(e){y.register(e)}),S.onTouch(r.DOCUMENT,d,y.detect),S.onTouch(r.DOCUMENT,l,y.detect),r.READY=!0)}var r=function(e,t){return new r.Instance(e,t||{})};r.VERSION="1.0.9",r.defaults={stop_browser_behavior:{userSelect:"none",touchAction:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},r.HAS_POINTEREVENTS=e.navigator.pointerEnabled||e.navigator.msPointerEnabled,r.HAS_TOUCHEVENTS="ontouchstart"in e,r.MOBILE_REGEX=/mobile|tablet|ip(ad|hone|od)|android|silk/i,r.NO_MOUSEEVENTS=r.HAS_TOUCHEVENTS&&e.navigator.userAgent.match(r.MOBILE_REGEX),r.EVENT_TYPES={},r.UPDATE_VELOCITY_INTERVAL=16,r.DOCUMENT=e.document;var i=r.DIRECTION_DOWN="down",a=r.DIRECTION_LEFT="left",o=r.DIRECTION_UP="up",s=r.DIRECTION_RIGHT="right",c=r.POINTER_MOUSE="mouse",u=r.POINTER_TOUCH="touch",h=r.POINTER_PEN="pen",g=r.EVENT_START="start",d=r.EVENT_MOVE="move",l=r.EVENT_END="end";r.plugins=r.plugins||{},r.gestures=r.gestures||{},r.READY=!1;var f=r.utils={extend:function(e,n,r){for(var i in n)e[i]!==t&&r||(e[i]=n[i]);return e},each:function(e,n,r){var i,a;if("forEach"in e)e.forEach(n,r);else if(e.length!==t){for(i=-1;a=e[++i];)if(n.call(r,a,i,e)===!1)return}else for(i in e)if(e.hasOwnProperty(i)&&n.call(r,e[i],i,e)===!1)return},inStr:function(e,t){return e.indexOf(t)>-1},hasParent:function(e,t){for(;e;){if(e==t)return!0;e=e.parentNode}return!1},getCenter:function(e){var t=[],n=[];return f.each(e,function(e){t.push("undefined"!=typeof e.clientX?e.clientX:e.pageX),n.push("undefined"!=typeof e.clientY?e.clientY:e.pageY)}),{pageX:(Math.min.apply(Math,t)+Math.max.apply(Math,t))/2,pageY:(Math.min.apply(Math,n)+Math.max.apply(Math,n))/2}},getVelocity:function(e,t,n){return{x:Math.abs(t/e)||0,y:Math.abs(n/e)||0}},getAngle:function(e,t){var n=t.pageY-e.pageY,r=t.pageX-e.pageX;return 180*Math.atan2(n,r)/Math.PI},getDirection:function(e,t){var n=Math.abs(e.pageX-t.pageX),r=Math.abs(e.pageY-t.pageY);return n>=r?e.pageX-t.pageX>0?a:s:e.pageY-t.pageY>0?o:i},getDistance:function(e,t){var n=t.pageX-e.pageX,r=t.pageY-e.pageY;return Math.sqrt(n*n+r*r)},getScale:function(e,t){return e.length>=2&&t.length>=2?this.getDistance(t[0],t[1])/this.getDistance(e[0],e[1]):1},getRotation:function(e,t){return e.length>=2&&t.length>=2?this.getAngle(t[1],t[0])-this.getAngle(e[1],e[0]):0},isVertical:function(e){return e==o||e==i},toggleDefaultBehavior:function(e,t,n){if(t&&e&&e.style){f.each(["webkit","moz","Moz","ms","o",""],function(r){f.each(t,function(t,i){r&&(i=r+i.substring(0,1).toUpperCase()+i.substring(1)),i in e.style&&(e.style[i]=!n&&t)})});var r=function(){return!1};"none"==t.userSelect&&(e.onselectstart=!n&&r),"none"==t.userDrag&&(e.ondragstart=!n&&r)}}};r.Instance=function(e,t){var i=this;return n(),this.element=e,this.enabled=!0,this.options=f.extend(f.extend({},r.defaults),t||{}),this.options.stop_browser_behavior&&f.toggleDefaultBehavior(this.element,this.options.stop_browser_behavior,!1),this.eventStartHandler=S.onTouch(e,g,function(e){i.enabled&&y.startDetect(i,e)}),this.eventHandlers=[],this},r.Instance.prototype={on:function(e,t){var n=e.split(" ");return f.each(n,function(e){this.element.addEventListener(e,t,!1),this.eventHandlers.push({gesture:e,handler:t})},this),this},off:function(e,t){var n,r,i=e.split(" ");return f.each(i,function(e){for(this.element.removeEventListener(e,t,!1),n=-1;r=this.eventHandlers[++n];)r.gesture===e&&r.handler===t&&this.eventHandlers.splice(n,1)},this),this},trigger:function(e,t){t||(t={});var n=r.DOCUMENT.createEvent("Event");n.initEvent(e,!0,!0),n.gesture=t;var i=this.element;return f.hasParent(t.target,i)&&(i=t.target),i.dispatchEvent(n),this},enable:function(e){return this.enabled=e,this},dispose:function(){var e,t;for(this.options.stop_browser_behavior&&f.toggleDefaultBehavior(this.element,this.options.stop_browser_behavior,!0),e=-1;t=this.eventHandlers[++e];)this.element.removeEventListener(t.gesture,t.handler,!1);return this.eventHandlers=[],S.unbindDom(this.element,r.EVENT_TYPES[g],this.eventStartHandler),null}};var p=null,m=!1,v=!1,S=r.event={bindDom:function(e,t,n){var r=t.split(" ");f.each(r,function(t){e.addEventListener(t,n,!1)})},unbindDom:function(e,t,n){var r=t.split(" ");f.each(r,function(t){e.removeEventListener(t,n,!1)})},onTouch:function(e,t,n){var i=this,a=function(a){var o=a.type.toLowerCase();if(!f.inStr(o,"mouse")||!v){f.inStr(o,"touch")||f.inStr(o,"pointerdown")||f.inStr(o,"mouse")&&1===a.which?m=!0:f.inStr(o,"mouse")&&!a.which&&(m=!1),(f.inStr(o,"touch")||f.inStr(o,"pointer"))&&(v=!0);var s=0;m&&(r.HAS_POINTEREVENTS&&t!=l?s=E.updatePointer(t,a):f.inStr(o,"touch")?s=a.touches.length:v||(s=f.inStr(o,"up")?0:1),s>0&&t==l?t=d:s||(t=l),(s||null===p)&&(p=a),n.call(y,i.collectEventData(e,t,i.getTouchList(p,t),a)),r.HAS_POINTEREVENTS&&t==l&&(s=E.updatePointer(t,a))),s||(p=null,m=!1,v=!1,E.reset())}};return this.bindDom(e,r.EVENT_TYPES[t],a),a},determineEventTypes:function(){var e;e=r.HAS_POINTEREVENTS?E.getEvents():r.NO_MOUSEEVENTS?["touchstart","touchmove","touchend touchcancel"]:["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"],r.EVENT_TYPES[g]=e[0],r.EVENT_TYPES[d]=e[1],r.EVENT_TYPES[l]=e[2]},getTouchList:function(e){return r.HAS_POINTEREVENTS?E.getTouchList():e.touches?e.touches:(e.identifier=1,[e])},collectEventData:function(e,t,n,r){var i=u;return(f.inStr(r.type,"mouse")||E.matchType(c,r))&&(i=c),{center:f.getCenter(n),timeStamp:(new Date).getTime(),target:r.target,touches:n,eventType:t,pointerType:i,srcEvent:r,preventDefault:function(){var e=this.srcEvent;e.preventManipulation&&e.preventManipulation(),e.preventDefault&&e.preventDefault()},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return y.stopDetect()}}}},E=r.PointerEvent={pointers:{},getTouchList:function(){var e=[];return f.each(this.pointers,function(t){e.push(t)}),e},updatePointer:function(e,t){return e==l?delete this.pointers[t.pointerId]:(t.identifier=t.pointerId,this.pointers[t.pointerId]=t),Object.keys(this.pointers).length},matchType:function(e,t){if(!t.pointerType)return!1;var n=t.pointerType,r={};return r[c]=n===c,r[u]=n===u,r[h]=n===h,r[e]},getEvents:function(){return["pointerdown MSPointerDown","pointermove MSPointerMove","pointerup pointercancel MSPointerUp MSPointerCancel"]},reset:function(){this.pointers={}}},y=r.detection={gestures:[],current:null,previous:null,stopped:!1,startDetect:function(e,t){this.current||(this.stopped=!1,this.current={inst:e,startEvent:f.extend({},t),lastEvent:!1,lastVelocityEvent:!1,velocity:!1,name:""},this.detect(t))},detect:function(e){if(this.current&&!this.stopped){e=this.extendEventData(e);var t=this.current.inst,n=t.options;return f.each(this.gestures,function(r){return this.stopped||n[r.name]===!1||t.enabled===!1||r.handler.call(r,e,t)!==!1?void 0:(this.stopDetect(),!1)},this),this.current&&(this.current.lastEvent=e),e.eventType==l&&!e.touches.length-1&&this.stopDetect(),e}},stopDetect:function(){this.previous=f.extend({},this.current),this.current=null,this.stopped=!0},getVelocityData:function(e,t,n,i){var a=this.current,o=a.lastVelocityEvent,s=a.velocity;o&&e.timeStamp-o.timeStamp>r.UPDATE_VELOCITY_INTERVAL?(s=f.getVelocity(e.timeStamp-o.timeStamp,e.center.pageX-o.center.pageX,e.center.pageY-o.center.pageY),a.lastVelocityEvent=e):a.velocity||(s=f.getVelocity(t,n,i),a.lastVelocityEvent=e),a.velocity=s,e.velocityX=s.x,e.velocityY=s.y},getInterimData:function(e){var t,n,r=this.current.lastEvent;e.eventType==l?(t=r&&r.interimAngle,n=r&&r.interimDirection):(t=r&&f.getAngle(r.center,e.center),n=r&&f.getDirection(r.center,e.center)),e.interimAngle=t,e.interimDirection=n},extendEventData:function(e){var t=this.current,n=t.startEvent;(e.touches.length!=n.touches.length||e.touches===n.touches)&&(n.touches=[],f.each(e.touches,function(e){n.touches.push(f.extend({},e))}));var r=e.timeStamp-n.timeStamp,i=e.center.pageX-n.center.pageX,a=e.center.pageY-n.center.pageY;return this.getVelocityData(e,r,i,a),this.getInterimData(e),f.extend(e,{startEvent:n,deltaTime:r,deltaX:i,deltaY:a,distance:f.getDistance(n.center,e.center),angle:f.getAngle(n.center,e.center),direction:f.getDirection(n.center,e.center),scale:f.getScale(n.touches,e.touches),rotation:f.getRotation(n.touches,e.touches)}),e},register:function(e){var n=e.defaults||{};return n[e.name]===t&&(n[e.name]=!0),f.extend(r.defaults,n,!0),e.index=e.index||1e3,this.gestures.push(e),this.gestures.sort(function(e,t){return e.index<t.index?-1:e.index>t.index?1:0}),this.gestures}};r.gestures.Drag={name:"drag",index:50,defaults:{drag_min_distance:10,correct_for_drag_min_distance:!0,drag_max_touches:1,drag_block_horizontal:!1,drag_block_vertical:!1,drag_lock_to_axis:!1,drag_lock_min_distance:25},triggered:!1,handler:function(e,t){if(y.current.name!=this.name&&this.triggered)return t.trigger(this.name+"end",e),void(this.triggered=!1);if(!(t.options.drag_max_touches>0&&e.touches.length>t.options.drag_max_touches))switch(e.eventType){case g:this.triggered=!1;break;case d:if(e.distance<t.options.drag_min_distance&&y.current.name!=this.name)return;if(y.current.name!=this.name&&(y.current.name=this.name,t.options.correct_for_drag_min_distance&&e.distance>0)){var n=Math.abs(t.options.drag_min_distance/e.distance);y.current.startEvent.center.pageX+=e.deltaX*n,y.current.startEvent.center.pageY+=e.deltaY*n,e=y.extendEventData(e)}(y.current.lastEvent.drag_locked_to_axis||t.options.drag_lock_to_axis&&t.options.drag_lock_min_distance<=e.distance)&&(e.drag_locked_to_axis=!0);var r=y.current.lastEvent.direction;e.drag_locked_to_axis&&r!==e.direction&&(e.direction=f.isVertical(r)?e.deltaY<0?o:i:e.deltaX<0?a:s),this.triggered||(t.trigger(this.name+"start",e),this.triggered=!0),t.trigger(this.name,e),t.trigger(this.name+e.direction,e);var c=f.isVertical(e.direction);(t.options.drag_block_vertical&&c||t.options.drag_block_horizontal&&!c)&&e.preventDefault();break;case l:this.triggered&&t.trigger(this.name+"end",e),this.triggered=!1}}},r.gestures.Hold={name:"hold",index:10,defaults:{hold_timeout:500,hold_threshold:1},timer:null,handler:function(e,t){switch(e.eventType){case g:clearTimeout(this.timer),y.current.name=this.name,this.timer=setTimeout(function(){"hold"==y.current.name&&t.trigger("hold",e)},t.options.hold_timeout);break;case d:e.distance>t.options.hold_threshold&&clearTimeout(this.timer);break;case l:clearTimeout(this.timer)}}},r.gestures.Release={name:"release",index:1/0,handler:function(e,t){e.eventType==l&&t.trigger(this.name,e)}},r.gestures.Swipe={name:"swipe",index:40,defaults:{swipe_min_touches:1,swipe_max_touches:1,swipe_velocity:.7},handler:function(e,t){if(e.eventType==l){if(e.touches.length<t.options.swipe_min_touches||e.touches.length>t.options.swipe_max_touches)return;(e.velocityX>t.options.swipe_velocity||e.velocityY>t.options.swipe_velocity)&&(t.trigger(this.name,e),t.trigger(this.name+e.direction,e))}}},r.gestures.Tap={name:"tap",index:100,defaults:{tap_max_touchtime:250,tap_max_distance:10,tap_always:!0,doubletap_distance:20,doubletap_interval:300},has_moved:!1,handler:function(e,t){var n,r,i;e.eventType==g?this.has_moved=!1:e.eventType!=d||this.moved?e.eventType==l&&"touchcancel"!=e.srcEvent.type&&e.deltaTime<t.options.tap_max_touchtime&&!this.has_moved&&(n=y.previous,r=n&&n.lastEvent&&e.timeStamp-n.lastEvent.timeStamp,i=!1,n&&"tap"==n.name&&r&&r<t.options.doubletap_interval&&e.distance<t.options.doubletap_distance&&(t.trigger("doubletap",e),i=!0),(!i||t.options.tap_always)&&(y.current.name="tap",t.trigger(y.current.name,e))):this.has_moved=e.distance>t.options.tap_max_distance}},r.gestures.Touch={name:"touch",index:-1/0,defaults:{prevent_default:!1,prevent_mouseevents:!1},handler:function(e,t){return t.options.prevent_mouseevents&&e.pointerType==c?void e.stopDetect():(t.options.prevent_default&&e.preventDefault(),void(e.eventType==g&&t.trigger(this.name,e)))}},r.gestures.Transform={name:"transform",index:45,defaults:{transform_min_scale:.01,transform_min_rotation:1,transform_always_block:!1,transform_within_instance:!1},triggered:!1,handler:function(e,t){if(y.current.name!=this.name&&this.triggered)return t.trigger(this.name+"end",e),void(this.triggered=!1);if(!(e.touches.length<2)){if(t.options.transform_always_block&&e.preventDefault(),t.options.transform_within_instance)for(var n=-1;e.touches[++n];)if(!f.hasParent(e.touches[n].target,t.element))return;switch(e.eventType){case g:this.triggered=!1;break;case d:var r=Math.abs(1-e.scale),i=Math.abs(e.rotation);if(r<t.options.transform_min_scale&&i<t.options.transform_min_rotation)return;y.current.name=this.name,this.triggered||(t.trigger(this.name+"start",e),this.triggered=!0),t.trigger(this.name,e),i>t.options.transform_min_rotation&&t.trigger("rotate",e),r>t.options.transform_min_scale&&(t.trigger("pinch",e),t.trigger("pinch"+(e.scale<1?"in":"out"),e));break;case l:this.triggered&&t.trigger(this.name+"end",e),this.triggered=!1}}}},"function"==typeof define&&define.amd?define(function(){return r}):"object"==typeof module&&module.exports?module.exports=r:e.Hammer=r}(window);