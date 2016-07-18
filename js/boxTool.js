/**
 * Created by lloogeoustc on 2016/05/06.
 */

		//BOX组件
		var BOX = BOX || {};
		BOX.GLOBALS = {};
		BOX.APPS = {};
		BOX.DBS = {};
		BOX.DBS.APPS = {};
		BOX.APPS.ROLES = {dev:0,other:1};
		BOX.DBS.APPS.REQUEST = {};
		BOX.APPS.OTHERSYSTEM = {};
		BOX.APPS.BUTTONS = {};
		BOX.APPS.REQUEST = {};
		BOX.APPS.FUNCTIONS = {};
		BOX.APPS.FUNCTIONS.CALLBACK = {};
		BOX.APPS.REQUEST.NAMES = [];
		BOX.APPS.REQUEST.URLS = [];
		BOX.APPS.REQUEST.PARAMS = [];
		//0-get,1-post
		BOX.APPS.REQUEST.METHODS = [];

		BOX.GLOBALS.TSP = {};
		BOX.GLOBALS.TSP.PARAMS = function(tspName,tspMethod,tspParam){
			return "{\"name\": \"" + tspName + "\",\"method\":\"" + tspMethod+ "\",\"param\": [" + tspParam+ "]}";
		}
		BOX.GLOBALS.URL = function(){
			return "./getResultByTsp";
		}
			

		/**
		 * you can insert your code for test;
		 */
		BOX.APPS.TEST = function(){
			
		}
		
		BOX.APPS.INIT = function(){
			BOX.APPS.TEST();
			BOX.APPS.REQUEST.INIT();
			BOX.APPS.REQUEST.CLICK();
			BOX.APPS.BUTTONS.INIT();
			BOX.APPS.OTHERSYSTEM.INIT();
			setInterval(BOX.APPS.FUNCTIONS.Dinging.exe,1000);
		}
		
		BOX.GLOBALS.AJAX = function(url,method,params,dataType,callback){
			$.ajax({
				url:url,
				type:method,
				data:params,
				dataType:dataType,
				success:callback,
				error:function(){
					alert('请求异常！');
				}
			});
		}
		
		
		BOX.APPS.FUNCTIONS.IS_DEVLOPER = function(salerId){
			return $.inArray(parseInt(salerId,10),BOX.APPS.ROLES.DEVLOPERS)>-1?true:false;
		}
		
		BOX.APPS.OTHERSYSTEM.INIT = function(){
			$("#personInfo").hide();
			$("#dining").hide();
			
			$("#personInfoBtn").click(function(e){
				$("#personInfo").slideToggle();
			});
			$("#diningBtn").click(function(e){
				$("#dining").slideToggle();
			});			
		}
		
		
		BOX.APPS.BUTTONS.INIT = function(){
			
			$("#url").click(function(e){
				window.open(BOX.APPS.FUNCTIONS.getJsonpUrl(),"_blank");
			});
			$("#esc").click(function(e){
				$("#resp").val(BOX.APPS.FUNCTIONS.escChar($("#resp").val()));
			});
			$("#myUnEsc").click(function(e){
				$("#resp").val(BOX.APPS.FUNCTIONS.unEscChar($("#resp").val()));
			});
			$("#unicodeToChinese").click(function(e){
				$("#resp").val(BOX.APPS.FUNCTIONS.reconvert($("#resp").val()));
			});
			
			$("#myescape").click(function(e){
				 $("#resp").val(escape($("#resp").val()));
			});	
			$("#myunescape").click(function(e){
				 $("#resp").val(unescape($("#resp").val()));
			});	
			$("#toRight").click(function(e){
				 $("#resp").val($("#reqParam").val());
				 $("#reqParam").val('');
			});
			$("#toLeft").click(function(e){
				 $("#reqParam").val($("#resp").val());
				 $("#resp").val('');
			});			
			$("#decode").click(function(e){
                $("#resp").val(Base64.decode($("#resp").val()));
            });
			$("#encode").click(function(e){
				$("#resp").val(Base64.encode($("#resp").val()));
			});
			$("#format").click(function(e){
				var res = BOX.APPS.FUNCTIONS.format($("#resp").val());
				$("#resp").val(res);
			});
			$("#removeWhite").click(function(e){
				var res = BOX.APPS.FUNCTIONS.getRemoveWhiteSpace($("#resp").val());
				$("#resp").val(res);
			});
			$("#clearLeft").click(function(e){
				$("#reqParam").val("");
			});
			$("#clearRight").click(function(e){
				$("#resp").val("");
			});
			$("#sub").click(function(e){
				//if(!confirm("确定执行吗？")){return;}
				
				$("#resp").val('执行中...');
				var paramData=$("#reqParam").val().trim();
				var selectedTitle = $("#urlLink").find("option:selected").text();
				var reqUrl = $("#reqUrl").val().trim();
				var reqMethod = $("#reqMethod").val();
				var callback = BOX.APPS.FUNCTIONS.CALLBACK.REST;
				
				paramData = BOX.APPS.FUNCTIONS.RemoveCommentSingle(paramData);
				//php运行		
				paramData = ("PHPRun"==selectedTitle) ? "{\"code\":\""+paramData+"\"}":paramData;
				
				//tsp处理
				if(!reqUrl.match(/http/g)){
					selectedTitle = reqUrl;
					reqUrl = BOX.GLOBALS.URL();
					paramData = BOX.GLOBALS.TSP.PARAMS(selectedTitle, reqMethod, paramData);
					callback = BOX.APPS.FUNCTIONS.CALLBACK.TSP;
				}
				
				paramData = BOX.APPS.FUNCTIONS.RemoveComment(paramData);
				reqUrl = BOX.APPS.FUNCTIONS.RemoveComment(reqUrl);
				console.log(paramData);
				paramData=Base64.encode(paramData);
								
				BOX.GLOBALS.AJAX(reqUrl,reqMethod,paramData,"text",callback);
			 });

			 $("#batch").click(function(e){
				if(!confirm("!!!!!Warning,are you sure?")){return;}
       			var	str = $("#reqParam").val(); //这是一字符串
				var strs=str.split(","); //字符分割
				var OriUrl = $("#reqUrl").val();
				for (var i=0,len = strs.length;i<len ;i++ ){ 
					$("#reqUrl").val(OriUrl+strs[i]);
					$("#sub").click();
					console.log(OriUrl+strs[i]);
				}
				$("#reqUrl").val(OriUrl);
				$("#resp").val("success!");
				alert("执行完毕！");
			});
		}
		
		
		
		/**
		 * 转义字符；
		 * 去掉`\`
		 */
		BOX.APPS.FUNCTIONS.escChar = function(str){
			return str.replace(/\\/g,'').trim();
		}
		
		/**
		 * 反转义字符；
		 * 只做`"`处理=> `\"`
		 */
		BOX.APPS.FUNCTIONS.unEscChar = function(str){
			return str.replace(/\"/g,'\\\"').trim();
		}
		
		/**
		 * 处理单行注释
		 * 
		 */
		BOX.APPS.FUNCTIONS.RemoveCommentSingle = function(str){
				return str.replace(/\/\/.*/g,"");
		}
		
		/**
		 * 多行注释和换行会被去掉；
		 * 不处理单行；
		 */
		BOX.APPS.FUNCTIONS.RemoveComment = function(str){
			return str.replace(/[\r\n]/g,"").replace(/\/\*.*?\*\//g,"").trim();
		}
		
		/**
		 * 无论字符串加密与否，都可进行处理；
		 */
		BOX.APPS.FUNCTIONS.Base64Decode = function(str){
			if(isNaN(str) && !str.match(/{/g) && !str.match(/\(/g)){
				str = Base64.decode(str);
			}
			return str;
		}
		
		BOX.APPS.FUNCTIONS.CALLBACK.REST = function(msg){
			msg = BOX.APPS.FUNCTIONS.format(BOX.APPS.FUNCTIONS.Base64Decode(msg));
			msg = BOX.APPS.FUNCTIONS.reconvert(msg);
			
			$("#resp").val(msg);
			console.log(msg);
		}
		
		BOX.APPS.FUNCTIONS.CALLBACK.TSP = function(msg){
			msg = BOX.APPS.FUNCTIONS.Base64Decode(msg);
			msg = $.parseJSON(msg);			
			msg = msg["success"] ? msg["data"]:msg["message"];
			msg = BOX.APPS.FUNCTIONS.reconvert(BOX.APPS.FUNCTIONS.format(msg));
			
			$("#resp").val(msg);
			console.log(msg);
		}
		
		BOX.APPS.REQUEST.INIT = function(){
			
			BOX.APPS.REQUEST.NAMES = BOX.APPS.REQUEST.NAMES.concat(_NAMES);
			BOX.APPS.REQUEST.URLS = BOX.APPS.REQUEST.URLS.concat(_URLS);
			BOX.APPS.REQUEST.PARAMS = BOX.APPS.REQUEST.PARAMS.concat(_PARAMS);
			BOX.APPS.REQUEST.METHODS = BOX.APPS.REQUEST.METHODS.concat(_METHODS);
			
			var optionPrefix = "<option value='";
			var optionMiddle = "'>";
			var optionSuffix = "</option>";
			var salerId = currUserId;
			var isDevloper = BOX.APPS.FUNCTIONS.IS_DEVLOPER(salerId);
			
			for(var len = BOX.APPS.REQUEST.NAMES.length,i = 0 ; i <len ;i++){
				//权限控制
				var isOtherRole = BOX.DBS.APPS.REQUEST.ROLES[i];
				
				if(!isDevloper && !isOtherRole ){
					//当前登录者不是开发人员，并且请求的角色是开发角色（不是其他角色）
					continue;
				}else{
					$("#urlLink").append(optionPrefix+i+optionMiddle+BOX.APPS.REQUEST.NAMES[i]+optionSuffix);										
				}
				
			}
					
		}

		BOX.APPS.REQUEST.CLICK = function(){
			$("#urlLink").change(function(){
				var selectedIndex = $("#urlLink option:selected").val();
				
				$("#reqParam").val(BOX.APPS.REQUEST.PARAMS[selectedIndex]);
				$("#reqUrl").val(BOX.APPS.REQUEST.URLS[selectedIndex]);
				$("#reqMethod").val(BOX.APPS.REQUEST.METHODS[selectedIndex]? "POST":"GET");
				
				$("#reqParam").val(BOX.APPS.FUNCTIONS.format($("#reqParam").val()));
				$("#clearRight").click();
			});	
		}


	BOX.APPS.Nibbler = function (options) {
		var construct,

			// options
			pad, dataBits, codeBits, keyString, arrayData,

			// private instance variables
			mask, group, max,

			// private methods
			gcd, translate,

			// public methods
			encode, decode,

			utf16to8, utf8to16;
			
		// pseudo-constructor
		construct = function () {
			var i, mag, prev;

			// options
			pad = options.pad || '';
			dataBits = options.dataBits;
			codeBits = options.codeBits;
			keyString = options.keyString;
			arrayData = options.arrayData;

			// bitmasks
			mag = Math.max(dataBits, codeBits);
			prev = 0;
			mask = [];
			for (i = 0; i < mag; i += 1) {
				mask.push(prev);
				prev += prev + 1;
			}
			max = prev;

			// ouput code characters in multiples of this number
			group = dataBits / gcd(dataBits, codeBits);
		};

		// greatest common divisor
		gcd = function (a, b) {
			var t;
			while (b !== 0) {
				t = b;
				b = a % b;
				a = t;
			}
			return a;
		};

		// the re-coder
		translate = function (input, bitsIn, bitsOut, decoding) {
			var i, len, chr, byteIn,
				buffer, size, output,
				write;

			// append a byte to the output
			write = function (n) {
				if (!decoding) {
					output.push(keyString.charAt(n));
				} else if (arrayData) {
					output.push(n);
				} else {
					output.push(String.fromCharCode(n));
				}
			};

			buffer = 0;
			size = 0;
			output = [];

			len = input.length;
			for (i = 0; i < len; i += 1) {
				// the new size the buffer will be after adding these bits
				size += bitsIn;

				// read a character
				if (decoding) {
					// decode it
					chr = input.charAt(i);
					byteIn = keyString.indexOf(chr);
					if (chr === pad) {
						break;
					} else if (byteIn < 0) {
						throw 'the character "' + chr + '" is not a member of ' + keyString;
					}
				} else {
					if (arrayData) {
						byteIn = input[i];
					} else {
						byteIn = input.charCodeAt(i);
					}
					if ((byteIn | max) !== max) {
						throw byteIn + " is outside the range 0-" + max;
					}
				}

				// shift the buffer to the left and add the new bits
				buffer = (buffer << bitsIn) | byteIn;

				// as long as there's enough in the buffer for another output...
				while (size >= bitsOut) {
					// the new size the buffer will be after an output
					size -= bitsOut;

					// output the part that lies to the left of that number of bits
					// by shifting the them to the right
					write(buffer >> size);

					// remove the bits we wrote from the buffer
					// by applying a mask with the new size
					buffer &= mask[size];
				}
			}

			// If we're encoding and there's input left over, pad the output.
			// Otherwise, leave the extra bits off, 'cause they themselves are padding
			if (!decoding && size > 0) {

				// flush the buffer
				write(buffer << (bitsOut - size));

				// add padding keyString for the remainder of the group
				len = output.length % group;
				for (i = 0; i < len; i += 1) {
					output.push(pad);
				}
			}

			// string!
			return (arrayData && decoding) ? output : output.join('');
		};

		/**
		 * Encode.  Input and output are strings.
		 */
		encode = function (str) {
			//return translate(input, dataBits, codeBits, false);
			str = utf16to8(str);
			var out = "", i = 0, len = str.length, c1, c2, c3, base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
			while (i < len) {
				c1 = str.charCodeAt(i++) & 0xff;
				if (i == len) {
					out += base64EncodeChars.charAt(c1 >> 2);
					out += base64EncodeChars.charAt((c1 & 0x3) << 4);
					out += "==";
					break;
				}
				c2 = str.charCodeAt(i++);
				if (i == len) {
					out += base64EncodeChars.charAt(c1 >> 2);
					out += base64EncodeChars.charAt(((c1 & 0x3) << 4)
							| ((c2 & 0xF0) >> 4));
					out += base64EncodeChars.charAt((c2 & 0xF) << 2);
					out += "=";
					break;
				}
				c3 = str.charCodeAt(i++);
				out += base64EncodeChars.charAt(c1 >> 2);
				out += base64EncodeChars.charAt(((c1 & 0x3) << 4)
						| ((c2 & 0xF0) >> 4));
				out += base64EncodeChars.charAt(((c2 & 0xF) << 2)
						| ((c3 & 0xC0) >> 6));
				out += base64EncodeChars.charAt(c3 & 0x3F);
			}
			return out;
		};

		/**
		 * Decode.  Input and output are strings.
		 */
		decode = function (str) {
			//return translate(input, codeBits, dataBits, true);
		   var c1, c2, c3, c4; var i, len,out;
		   var base64DecodeChars = new Array(-1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53,54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1,0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26,27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);len = str.length; i = 0; out = ""; while (i < len) { do { c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]; } while (i < len && c1 == -1); if (c1 == -1) break; do { c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]; } while (i < len && c2 == -1); if (c2 == -1) break; out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4)); do { c3 = str.charCodeAt(i++) & 0xff; if (c3 == 61) {out = utf8to16(out);return out;} c3 =     base64DecodeChars[c3]; } while (i < len && c3 == -1); if (c3 == -1) break; out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2)); do { c4 = str.charCodeAt(i++) & 0xff; if (c4 == 61) {out = utf8to16(out);return out;} c4 = base64DecodeChars[c4]; } while (i < len && c4 == -1); if (c4 == -1) break; out += String.fromCharCode(((c3 & 0x03) << 6) | c4); } out = utf8to16(out);return out;
		};

		utf16to8 = function (str){
			var out, i, len, c;
			out = "";
			len = str.length;
			for (i = 0; i < len; i++) {
				c = str.charCodeAt(i);
				if ((c >= 0x0001) && (c <= 0x007F)) {
					out += str.charAt(i);
				} else if (c > 0x07FF) {
					out += String
							.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
					out += String
							.fromCharCode(0x80 | ((c >> 6) & 0x3F));
					out += String
							.fromCharCode(0x80 | ((c >> 0) & 0x3F));
				} else {
					out += String
							.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
					out += String
							.fromCharCode(0x80 | ((c >> 0) & 0x3F));
				}
			}
			return out;
		};

		utf8to16 = function (str){
			var out, i, len, c; var char2,char3; out = ""; len = str.length; i = 0; while (i < len) { c = str.charCodeAt(i++); switch (c >> 4) { case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7: out += str.charAt(i - 1); break; case 12: case 13: char2 = str.charCodeAt(i++); out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F)); break; case 14: char2 = str.charCodeAt(i++); char3 = str.charCodeAt(i++); out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0)); break; } } return out;
		}
		this.encode = encode;
		this.decode = decode;
		construct();
	};
	
	
	
	BOX.APPS.FUNCTIONS.getJsonpUrl = function (){
		var tmpParam = BOX.APPS.FUNCTIONS.RemoveCommentSingle($("#reqParam").val());	
		tmpParam = BOX.APPS.FUNCTIONS.RemoveComment(tmpParam);
		var tmpUrl = BOX.APPS.FUNCTIONS.RemoveComment($("#reqUrl").val());
		
		if(null!=tmpParam&&''!=tmpParam){
			tmpUrl += "?"+ Base64.encode(tmpParam);
		}
		return tmpUrl;
	}
	
	
	BOX.APPS.FUNCTIONS.reconvert = function(str){ 
		str = str.replace(/(\\u)(\w{1,4})/gi,function($0){ 
			return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g,"$2")),16))); 
		}); 
		str = str.replace(/(&#x)(\w{1,4});/gi,function($0){ 
			return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g,"$2"),16)); 
		}); 
		str = str.replace(/(&#)(\d{1,6});/gi,function($0){ 
			return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g,"$2"))); 
		}); 
		return str; 
	}
	
	
	BOX.APPS.FUNCTIONS.format = function(msg) {
		
		if(!msg.match(/{/g)){
			return msg;
		}
		
		var text = msg.split("\n").join(" ");
		var t = [];
		var tab = 0;
		var inString = false;
		for (var i = 0, len = text.length; i < len; i++) {
			var c = text.charAt(i);
			if (inString && c === inString) {
				if (text.charAt(i - 1) !== '\\') {
					inString = false;
				}
			} else if (!inString && (c === '"' || c === "'")) {
				inString = c;
			} else if (!inString && (c === ' ' || c === "\t")) {
				c = '';
			} else if (!inString && c === ':') {
				c += ' ';
			} else if (!inString && c === ',') {
				c += "\n" + String.space(tab * 2);
			} else if (!inString && (c === '[' || c === '{')) {
				tab++;
				c += "\n" + String.space(tab * 2);
			} else if (!inString && (c === ']' || c === '}')) {
				tab--;
				c = "\n" + String.space(tab * 2) + c;
			}
			t.push(c);
		}
		return t.join('');
		//$("#resp").val(t.join(''));
	};
    
	BOX.APPS.FUNCTIONS.Dinging = {
		 alreayDining : false,
		 DiningMinute : 50,
		 DiningHour : 15,
		 DiningStep : 2,
		 remainingTime : 10
	};
	
	BOX.APPS.FUNCTIONS.Dinging.exe = function(){
		//console.log("hello");
		var	date = new Date();
		var	hour = ''+date.getHours();
		var	mintue = ''+date.getMinutes();
		//console.log(BOX.APPS.FUNCTIONS.Dinging.DiningMinute);	
		//每天下午3点50提醒订餐；之后每隔2分钟再次提醒；
		if(!BOX.APPS.FUNCTIONS.Dinging.alreayDining && BOX.APPS.FUNCTIONS.Dinging.DiningHour==hour && BOX.APPS.FUNCTIONS.Dinging.DiningMinute==mintue){
			BOX.APPS.FUNCTIONS.Dinging.alreayDining = confirm("**系统友情提醒：还有"+BOX.APPS.FUNCTIONS.Dinging.remainingTime+"分钟截止订餐！");
			BOX.APPS.FUNCTIONS.Dinging.DiningMinute += BOX.APPS.FUNCTIONS.Dinging.DiningStep;
			BOX.APPS.FUNCTIONS.Dinging.remainingTime -= BOX.APPS.FUNCTIONS.Dinging.DiningStep;
		}
		//归位
		if(BOX.APPS.FUNCTIONS.Dinging.remainingTime==0){
			BOX.APPS.FUNCTIONS.Dinging.remainingTime = 10;
			BOX.APPS.FUNCTIONS.Dinging.DiningMinute = 50;
		}	
	};
	
	
	
	BOX.APPS.FUNCTIONS.getRemoveWhiteSpace = function(msg) {
		//alert(msg);
		var text =  msg.split("\n").join(" ");
		var t = [];
		var inString = false;
		for (var i = 0, len = text.length; i < len; i++) {
			var c = text.charAt(i);
			if (inString && c === inString) {
				// TODO: \\"
				if (text.charAt(i - 1) !== '\\') {
					inString = false;
				}
			} else if (!inString && (c === '"' || c === "'")) {
				inString = c;
			} else if (!inString && (c === ' ' || c === "\t")) {
				c = '';
			}
			t.push(c);
		}
		return t.join('');
	};
	
	window.Base32 = new BOX.APPS.Nibbler({
		dataBits: 8,
		codeBits: 5,
		keyString: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
		pad: '='
	});
	window.Base64 = new BOX.APPS.Nibbler({
		dataBits: 8,
		codeBits: 6,
		keyString: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
		pad: '='
	});
	
	String.space = function (len) {
		var t = [], i;
		for (i = 0; i < len; i++){
			t.push(' ');
		}
		return t.join('');
	};
	