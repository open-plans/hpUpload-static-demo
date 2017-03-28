/**
 *     hpUoload base to AJAX Upload
 *     @隐无为 mysad  thinks  Andris Valums
 *     v-1.0 
 */

(function($){
  var ajaxUpload="";
  var ajaxUpload_plus="";
  //创建  hpUpload  一个默认上传参数  
  var uploadOption = {
      // 提交目标地址   action  url 都可以  建议 使用 url  好记
    action : "${webPath}/common/upload/uploadFiles.jhtml?path=kd",
    // 提交目标地址   action  url 都可以  建议 使用 url  好记
    url:"", 
    // 服务端接收的名称
    name : "file",
    // 是否自动提交
    autoSubmit : true, 
    // 是否开启批量上传  默认是不开启
    multiple : false, 
    // 参数
    data : {
      "path" : "upload/headImg"
    },
    // 成功回调函数
    onSuccess:function(json){
      console.log('请填写上传成功回调函数')
      
    },
    // 成功回调函数
    onError:function(err){
      console.log(err);
      if(layer){
        layer.msg('上传失败！');
      }else{
        alert('上传失败！');
      }
      
      
    },
    // 选择文件之后…
    onChange : function(fileName, extension) {
    },
    // 开始上传文件
    onSubmit : function(file, extension) {
      // 可以来一个“正在上传”的提示
    },
    // 上传完成之后
    onComplete : function(file, json) {
      // 文件上传之后，比如返回文件的URL，或者跳转到其它页面…
      try {
        json=JSON.parse(json);
      } catch (e) {
        ajaxUpload._settings.onError(json);
      }
      ajaxUpload._settings.onSuccess(json);
      
    }
  }
  
  
  
  //创建hpUpload_plus  默认的上传参数
  var uploadOption_plus = {
      // 提交目标地址
    action : "",
    // 提交目标地址
    url : "", 
    // 服务端接收的名称
    name : "file", 
    // 是否自动提交
    autoSubmit : false,
    // 是否开启批量上传  默认是不开启
    multiple : true,
    // 参数
    data : {
      "path" : "upload/headImg"
    },
    //选择添加按钮
    uploadSelect:"#kdUploadSelect",
    //开始上传按钮
    previewUploadBtn:"#kdUploadBtn",
    //预览区域div 
    previewUploadDiv:"#imgsUrlDiv",
    //删除的class
    removeUploadImg:".hp-upload-div-removeUploadBtnDiv-btn span",
    //文件选择完后    可以向预览区域div 如 可以插入img 标签样式
    onPreview:function(urls,selectorDiv,previewUploadBtn){
      // 判断有没有开始上传按钮  有就不填加了
      if(!$("#kdUploadSelect").length){
        $(selectorDiv).append('<div  id="kdUploadSelect" class="hp-upload-div-kdUploadAdd"  style="float:left;"></div>');
      }
      // 填充预览图片
      var $htlml="";
      $.map(urls,function(item){
    	  $htlml+='<div  id="'+item.id+'" class="kdfile kdpvImg" style="float:left;width:110px;height:110px"><img  style="width:110px;height:110px" class="hp-upload-div-removeUploadBtnDiv-img" src="'+item.url+'" /><div class="hp-upload-div-removeUploadBtnDiv-btn"><span class="remove">删除</span></div></div>';
      }) 
      $("#kdUploadSelect").before($htlml);
      // 如果div是隐藏的 就显示出来
      $(selectorDiv).show();   
          
        
    },
    // 选择文件之后…
    onChange : function(fileName, extension) {
    },
    // 开始上传文件
    onSubmit : function(file, extension) {
      // 可以来一个“正在上传”的提示
    },
    // 上传完成之后
    onSuccess:function(json){
      console.log('请填写上传成功回调函数')
    },
    // 上传失败回调函数
    onError:"",
    // 上传完成之后
    onComplete : function(file, json) {
      ajaxUpload_plus._settings.onSuccess(json); 
    }
  }
  
  
  
  
  //====================================================================================================
  // 绑定 类方法      为扩展jQuery类本身.为类添加新的方法  jQuery.extend(object);　为jQuery类添加添加类方法，可以理解为添加静态方法。 
  // $.extend(object);为扩展jQuery类本身.为类添加新的方法。 
  // $.fn.extend({aaa:function(){}}) == $.fn.aaa = function() {} ;给jQuery对象添加方法
  //====================================================================================================
  $.extend({
    // 自动上传   
    hpUpload:function(url,data,success,multiple,selector){
      var select="#kdUploadSelect";
      uploadOption.action=url;
      uploadOption.data=data;
      uploadOption.onSuccess=success;
      if(multiple){
        uploadOption.multiple=multiple; 
      }
      if(selector){
        select=selector;
      }
      // 初始化上传组件AjaxUpload
      var au = new AjaxUpload(select, uploadOption);
      ajaxUpload=au;
    },
    // plus-扩展  
    hpUpload_plus:{
      // 预览上传 带美化样式
      viewUpload:function(url,data,success,error){
            uploadOption_plus.action=url;
            uploadOption_plus.onSuccess=success; 
            uploadOption_plus.onError=error; 
            // 添加初始样式
            var selectorDiv='<div id="kdUploadSelect" class="hp-upload-div-img"></div>';
          $(uploadOption_plus.previewUploadDiv).append(selectorDiv);
          // 初始化上传组件AjaxUpload
          var au = new AjaxUpload(uploadOption_plus.uploadSelect, uploadOption_plus);
          ajaxUpload_plus=au; 
      },
      // 自定义参数预览上传 带css
      viewUploadCss:function(opt){
        var selector="#kdUploadSelect"
        var selectorDiv='<div id="kdUploadSelect" class="hp-upload-div-img"></div>';
          // 合并参数
          if(opt){
            if(opt.selector){
              selector=opt.selector;
            }
            $.extend(uploadOption_plus,opt);
            uploadOption_plus.action=opt.url;
          }
          // 添加样式
          $(uploadOption_plus.previewUploadDiv).append(selectorDiv);
          // 初始化上传组件AjaxUpload
          var au = new AjaxUpload(selector, uploadOption_plus);
          ajaxUpload_plus=au; 
      },
      
      // 完全自定义参数预览上传 不带css
      viewUploadOpt:function(opt){
        var selector="#kdUploadSelect"
        // 合并参数
        if(opt){
          if(opt.selector){
            selector=opt.selector;
          }
          $.extend(uploadOption_plus,opt);
          uploadOption_plus.action=opt.url;
        }
        // 初始化上传组件AjaxUpload
        var au = new AjaxUpload(selector, uploadOption_plus);
        ajaxUpload_plus=au; 
        
      },
      
      
      // 自动上传
      autoUpload:function(opt){
        var selector="#kdUploadSelect";
        uploadOption.action=opt.url;
        // 合并参数
        if(opt){
          if(opt.selector){
            selector=opt.selector;
          }
          $.extend(uploadOption,opt);
        }
        // 初始化上传组件AjaxUpload
        var au = new AjaxUpload(selector, uploadOption);
        ajaxUpload=au;
      },
    }, 
    
    //  获取上传对象
    getHpUploadObj:function(){ 
      return ajaxUpload; 
    },
     //  获取plus上传对象
    getHpUploadPlusObj:function(){ 
      return ajaxUpload_plus; 
    },
    
    // 测试
    testHpUpload_plus:function(){
      var self= this;
      console.log(111)
      self.kd=function(){
        console.log(22)
      }
      return self; 
    }
    
  });
})(jQuery);


//=====================================================================================================
//=====================================================================================================
//=====================================================================================================


(function(){
var localFiles=[];  // 上传文件的数组  
var d = document, w = window;

//jquery之父John Resig 写的  ;
//移出数组的元素   用法:移除数组中的第二项 array.remove(1)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};


/**
 *  移出数组 文件id
 *  @id  唯一的guid
 */ 
function removeLocalFiles(id){
  $.each(localFiles,function(index,item){
    if(item.id==id){
      //delete localFiles[index];
      localFiles.remove(index);
      return false;
    }
  });
}




/**
 * 获取元素对象
 */ 
function get(element){
  if (typeof element == "string")
    element = d.getElementById(element);
  return element;
}

/**
 * 为dom元素绑定事件
 */
function addEvent(el, type, fn){
  if (w.addEventListener){
    el.addEventListener(type, fn, false);
  } else if (w.attachEvent){
    var f = function(){
      fn.call(el, w.event);
    };      
    el.attachEvent('on' + type, f)
  }
}


/**
 * 创建一个div 返回这个元素
 */
var toElement = function(){
  var div = d.createElement('div');
  return function(html){
    div.innerHTML = html;
    var el = div.childNodes[0];
    div.removeChild(el);
    return el;
  }
}();
/**
 * 是否有这个样式
 */
function hasClass(ele,cls){
  return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
/**
 * 增加样式
 */
function addClass(ele,cls) {
  if (!hasClass(ele,cls)) ele.className += " "+cls;
}
/**
 * 移出样式
 */
function removeClass(ele,cls) {
  var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
  ele.className=ele.className.replace(reg,' ');
}

//获取  getOffset  jquery的 copy过来的
if (document.documentElement["getBoundingClientRect"]){
  var getOffset = function(el){
    var box = el.getBoundingClientRect(),
    doc = el.ownerDocument,
    body = doc.body,
    docElem = doc.documentElement,
    
    // for ie 
    clientTop = docElem.clientTop || body.clientTop || 0,
    clientLeft = docElem.clientLeft || body.clientLeft || 0,
    
    zoom = 1;
    
    if (body.getBoundingClientRect) {
      var bound = body.getBoundingClientRect();
      zoom = (bound.right - bound.left)/body.clientWidth;
    }
    
    if (zoom > 1){
      clientTop = 0;
      clientLeft = 0;
    }
    
    var top = box.top/zoom + (window.pageYOffset || docElem && docElem.scrollTop/zoom || body.scrollTop/zoom) - clientTop,
    left = box.left/zoom + (window.pageXOffset|| docElem && docElem.scrollLeft/zoom || body.scrollLeft/zoom) - clientLeft;
        
    return {
      top: top,
      left: left
    };
  }
  
} else {
  // Get offset adding all offsets 
  var getOffset = function(el){
    if (w.jQuery){
      return jQuery(el).offset();
    }   
      
    var top = 0, left = 0;
    do {
      top += el.offsetTop || 0;
      left += el.offsetLeft || 0;
    }
    while (el = el.offsetParent);
    
    return {
      left: left,
      top: top
    };
  }
}
//获取盒子
function getBox(el){
  var left, right, top, bottom; 
  var offset = getOffset(el);
  left = offset.left;
  top = offset.top;
            
  right = left + el.offsetWidth;
  bottom = top + el.offsetHeight;   
    
  return {
    left: left,
    right: right,
    top: top,
    bottom: bottom
  };
}

function getMouseCoords(e){   
  if (!e.pageX && e.clientX){
    var zoom = 1; 
    var body = document.body;
    
    if (body.getBoundingClientRect) {
      var bound = body.getBoundingClientRect();
      zoom = (bound.right - bound.left)/body.clientWidth;
    }

    return {
      x: e.clientX / zoom + d.body.scrollLeft + d.documentElement.scrollLeft,
      y: e.clientY / zoom + d.body.scrollTop + d.documentElement.scrollTop
    };
  }
  
  return {
    x: e.pageX,
    y: e.pageY
  };    

}
/**
 * 获取guid  可以用kd_guid() 
 */ 
var getUID = function(){
  var id = 0;
  return function(){
    return 'ValumsAjaxUpload' + id++;
  }
}();
//获取文件地址
function fileFromPath(file){
  return file.replace(/.*(\/|\\)/, "");     
}
//获取后缀名
function getExt(file){
  return (/[.]/.exec(file)) ? /[^.]+$/.exec(file.toLowerCase()) : '';
}     

/**
 * xhr 原生态请求
 */
var getXhr = function(){
  var xhr;
  
  return function(){
    if (xhr) return xhr;
        
    if (typeof XMLHttpRequest !== 'undefined') {
      xhr = new XMLHttpRequest();
    } else {
      var v = [
        "Microsoft.XmlHttp",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0"          
      ];
      
      for (var i=0; i < v.length; i++){
        try {
          xhr = new ActiveXObject(v[i]);
          break;
        } catch (e){}
      }
    }       

    return xhr;
  }
}();

//构建  AjaxUpload  对象
Ajax_upload = AjaxUpload = function(button, options){
  if (button.jquery){
    // 如果是jquery对象  可以这样获取
    button = button[0];
  } else if (typeof button == "string" && /^#.*/.test(button)){         
    button = button.slice(1);       
  }
  button = get(button); 
  
  this._input = null;
  this._button = button;
  this._disabled = false;
  this._submitting = false;
  // 判断点击用
  this._justClicked = false;
  this._parentDialog = d.body;
    
  if (window.jQuery && jQuery.ui && jQuery.ui.dialog){
    var parentDialog = jQuery(this._button).parents('.ui-dialog');
    if (parentDialog.length){
      this._parentDialog = parentDialog[0];
    }
  }     
          
  this._settings = {
      // 地址
      action: 'upload.jhtml',     
      // 服务器 接受的文件名
      name: 'userfile',
      // 参数
      data: {},
      // 是否自动提交
      autoSubmit: true,
      // 是否开启批量上传  默认是不开启
      multiple:false,
          // 响应类型 可以写json
      responseType: false,
      // 短款连接出错会调用
      closeConnection: '',
      // hover的样式
      hoverClass: 'hover',    
      // 当选择文件改变 回调     
      onChange: function(file, extension){},          
      // 提交
      onSubmit: function(file, extension){},
          // 上传完成之后 
      onComplete: function(file, response) {},
      // 预览
      onPreview:"",
      // 预览上传按钮
        previewUploadBtn:""
  };

  // 合并参数
  for (var i in options) {
    this._settings[i] = options[i];
  }
  
  this._createInput();
  this._rerouteClicks();
  this.bindEvent();
}
      
//AjaxUpload 对象的公共方法
AjaxUpload.prototype = {
    // 改变参数
  setData : function(data){
    this._settings.data = data;
  },
  // 改变地址
  setUrl : function(url){
    this._settings.action = url;
  },
  // 改变参数
  changeData : function(data){
    this._settings.data = data;
  },
  // 改变地址
  changeUrl : function(url){
    this._settings.action = url;
  },
  // 获取参数
  getData : function(){
    return this._settings.data;
  },
  // 获取地址
  getUrl : function(){
    return this._settings.action;
  },
  // 禁用
  disable : function(){
    this._disabled = true;
  },
  // 开启
  enable : function(){
    this._disabled = false;
  },
  //绑定事件 
  bindEvent:function(){
    var self=this;
    // 绑定预览上传按钮
    $(document).on("click",self._settings.previewUploadBtn,function(){
      if(self._settings.onPreview){
      var len=localFiles.length;
      if(len<=0){
        if(layer){
          layer.msg('请选择图片上传');
        }else{
          alert('请选择图片上传');
        }
        return ;
      }
      if(self._settings.onPreview){
        self.uploadFormData(self);
      }
    }
      //self.submit();
    });
    // 绑定删除
    $(document).on("click",self._settings.removeUploadImg,function(){
      if(self._settings.onPreview){
        var id=$(this).parents('.kdfile').attr('id');
        if(id){
          removeLocalFiles(id);
        }else{
          console.log('id 没有 请检查代码');
        }
        $(this).parents('.kdfile').remove();
        
      }
    });
    
    // 绑定删除hover   进入动画
    $(document).on("mouseenter",".kdpvImg",function(){
      $(this).find('.hp-upload-div-removeUploadBtnDiv-btn').stop().animate({height: 30});
    });
    // 绑定删除hover 移出动画
    $(document).on("mouseleave",".kdpvImg",function(){
      $(this).find('.hp-upload-div-removeUploadBtnDiv-btn').stop().animate({height: 0});
    });
    
  },
  
  
  // 重新 构建 input 并绑定点击路由事件
  changeRouteClicks:function(){
    var self=this;
    var uploadSelect=self._settings.uploadSelect.slice(1);    
    var previewUploadBtn=self._settings.previewUploadBtn.slice(1);    
    $(self._settings.uploadSelect).remove();
    d.body.removeChild(self._input);
    $(self._settings.previewUploadDiv).append('<div  id="'+uploadSelect+'" class="hp-upload-div-kdUploadAdd kd520"  style="float:left;"></div>');
    $(self._settings.previewUploadDiv).append('<div  id="'+previewUploadBtn+'" class="hp-upload-div-start-btn "  style="float:left;"></div>');
    self._input = null;
    self._button=$(self._settings.uploadSelect).get(0);
    // create new input
    self._createInput();
    self._rerouteClicks();
  },
  // 销毁实例对象
  destroy : function(){
    if(this._input){
      if(this._input.parentNode){
        this._input.parentNode.removeChild(this._input);
      }
      this._input = null;
    }
  },  
  
  
  /**
   *  IE11 chrome ff  获取浏览器本地图片路径  
   */
    getBrowseFileURL: function (file) {
        var url = null;
        if (window.createObjectURL != undefined) {
            url = window.createObjectURL(file)
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file)
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file)
        }
        return url
    },
  /**
   * 获取浏览器本地图片路径 兼容ie  ie 下 用滤镜
   */
    getLocalFileUrl:function(file){
         try {
          // IE11  chrome ff use createObjectURL
              this.getObjectURL(file);
         }catch (e) {
          // IE5.5~9使用滤镜
           
         }
    },
    
    // ajax 提交文件数据
    uploadFormData:function(self){
    // 构建FormData对象
    var fd = new FormData($('#hpUploadForm')[0]);
      //fd.append('path','kd')
    var jsonData=self._settings.data;
      for(var key in self._settings.data){
        fd.append(key,jsonData[key])
      }
        // 添加文件到formData去
        $.map(localFiles,function(item){
          fd.append('file', item.file);
        })
        
           $.ajax({
      url : self._settings.action,
      type : 'post',
      data : fd,
      processData : false,
      contentType : false,
      success : function(json) {
        $.map(localFiles,function(item){
          // 移出 删除动画
          //$("#"+item.id).removeClass('kdpvImg');
          // 移出删除样式    更改成功样式  一步到位
          $("#"+item.id).find('.hp-upload-div-removeUploadBtnDiv-btn')
          .removeAttr('style')
          .removeClass('hp-upload-div-removeUploadBtnDiv-btn').addClass('hp-upload-div-removeUploadBtnDiv-btn-success')
          .find('span').removeClass('revmove')
          .addClass('success')
          .html('成功')
        })
        localFiles=[];// 清空
        self._settings.onSuccess(json);
      },
      error : function(err) {
        if(self._settings.onError){
          self._settings.onError(err);
        }else{
          if(layer){
            layer.msg('上传失败');
          }else{
            alert('上传失败')
          }
        }
        //alert('上传失败');
      }
    });
    },
  
  /**
   *  创建 input file 
   */
  _createInput : function(){
    var self = this;
    var input = d.createElement("input");
    input.setAttribute('type', 'file');
    input.setAttribute('id', 'absFileInput');
    // 是否开启批量上传
    if(this._settings.multiple){
      input.setAttribute('multiple', 'multiple');
    }
    input.setAttribute('name', this._settings.name);
    var styles = {
      'position' : 'absolute'
      ,'margin': '-5px 0 0 -175px'
      ,'padding': 0
      ,'width': '220px'
      ,'height': '30px'
      ,'fontSize': '14px'               
      ,'opacity': 0
      ,'cursor': 'pointer'
      ,'display' : 'none'
      ,'zIndex' :  2147483583 //Max zIndex supported by Opera 9.0-9.2x 
    };
    for (var i in styles){
      input.style[i] = styles[i];
    }
    if ( ! (input.style.opacity === "0")){
      input.style.filter = "alpha(opacity=0)";
    }
          
    this._parentDialog.appendChild(input);
    
    addEvent(input, 'change', function(){
      // 填充预览图片
      if(self._settings.onPreview){
        var urls=[];
        $.map(this.files,function(item){
          var obj={};
          var id=kd_guid();
          obj.id=id;
          obj.url=self.getBrowseFileURL(item);
          urls.push(obj);
          // 文件
          obj.file=item;
          localFiles.push(obj);
          
        })
        
        
        
        
      // get filename from input  先change后填充预览
      var file = fileFromPath(this.value);  
      if(self._settings.onChange.call(self, urls, getExt(file)) == false ){
        return;       
      }
      // call  onPreview 预览 填充预览
      if(self._settings.onPreview){
        // 删除初始样式  重新绑定选择按钮事件
        if($(".kd520").length<=0){
           self.changeRouteClicks();
        }
               
        // 预览模式div
        self._settings.onPreview.call(self,urls,self._settings.previewUploadDiv,self._settings.previewUploadBtn);
      }
      // 清空文件 要不然 选择同样的文件 不会触发input 的 change 事件
      $(input).val('')
    
  
      }else{
        // 有预览则不开启 自动提交
        if (self._settings.autoSubmit){
          self.submit();            
        }
      }         
    });
    
    
      /*
     $(input).change(function(e){ 
  
     })*/
    
    
    // 绑定input file 点击事件
    addEvent(input, 'click', function(){
      setTimeout(function(){
        self.justClicked = false;
      }, 2500);     
    });   
    
    this._input = input;
  },
  
    // 路由事件 核心 ajaxUpload
  _rerouteClicks : function (){
    var self = this;
    // 用下面方法 不兼容
    // addEvent(this._button, 'click', function(e){
    //   self._input.click();
    // });
        
    var box, dialogOffset = {top:0, left:0}, over = false;
    
    // 移上事件             
    addEvent(self._button, 'mouseover', function(e){
      if (!self._input || over) return;
      
      over = true;
      box = getBox(self._button);
          
      if (self._parentDialog != d.body){
        dialogOffset = getOffset(self._parentDialog);
      } 
    });
    
      // 既然不能自主触发click事件 ,可以换个思,可以在待上传的元素上盖一个<input type="file" /> 标签
    addEvent(document, 'mousemove', function(e){
      var input = self._input;      
      if (!input || !over) return;
      
      if (self._disabled){
        removeClass(self._button, self._settings.hoverClass);
        input.style.display = 'none';
        return;
      } 
                    
      var c = getMouseCoords(e);

      if ((c.x >= box.left) && (c.x <= box.right) && 
      (c.y >= box.top) && (c.y <= box.bottom)){
              
        input.style.top = c.y - dialogOffset.top + 'px';
        input.style.left = c.x - dialogOffset.left + 'px';
        input.style.display = 'block';
        addClass(self._button, self._settings.hoverClass);
                
      } else {    
        // mouse left the button
        over = false;
      
        var check = setInterval(function(){
          // if input was just clicked do not hide it
          // to prevent safari bug
           
          if (self.justClicked){
            return;
          }
          
          if ( !over ){
            input.style.display = 'none'; 
          }           
        
          clearInterval(check);
        
        }, 25);
          

        removeClass(self._button, self._settings.hoverClass);
      }     
    });     
      
  },
  /**
   * 创建 一个隐藏的 iframe
   */
  _createIframe : function(){
    var id = getUID();
    var iframe = toElement('<iframe src="javascript:false;" name="' + id + '" />');
    iframe.id = id;
    iframe.style.display = 'none';
    d.body.appendChild(iframe);     
    return iframe;            
  },
  /**
   *  开始构建页面并请求访问服务器
   */
  submit : function(){
    var self = this, settings = this._settings; 
          
    if (this._input.value === ''){
      return;
    }
    var file = fileFromPath(this._input.value);     
    if (! (settings.onSubmit.call(this, file, getExt(file)) == false)) {
      var iframe = this._createIframe();
      var form = this._createForm(iframe);
      form.appendChild(this._input);
      if (settings.closeConnection && /AppleWebKit|MSIE/.test(navigator.userAgent)){
        var xhr = getXhr();
        xhr.open('GET', settings.closeConnection, false);
        //xhr.open('POST', settings.closeConnection, false);
        xhr.send('');
      }
      
      form.submit();
      
      d.body.removeChild(form);       
      form = null;
      this._input = null;
      
      this._createInput();
      
      var toDeleteFlag = false;
      
      addEvent(iframe, 'load', function(e){
          
        if (// For Safari
          iframe.src == "javascript:'%3Chtml%3E%3C/html%3E';" ||
          // For FF, IE
          iframe.src == "javascript:'<html></html>';"){           
          if( toDeleteFlag ){
            setTimeout( function() {
              d.body.removeChild(iframe);
            }, 0);
          }
          return;
        }       
        
        var doc = iframe.contentDocument ? iframe.contentDocument : frames[iframe.id].document;

        // fixing Opera 9.26
        if (doc.readyState && doc.readyState != 'complete'){
          return;
        }
        
        // fixing Opera 9.64
        if (doc.body && doc.body.innerHTML == "false"){
          return;       
        }
        var response;
        if (doc.XMLDocument){
          response = doc.XMLDocument;
        } else if (doc.body){
          response = doc.body.innerHTML;
          if (settings.responseType && settings.responseType.toLowerCase() == 'json'){
            if (doc.body.firstChild && doc.body.firstChild.nodeName.toUpperCase() == 'PRE'){
              response = doc.body.firstChild.firstChild.nodeValue;
            }
            if (response) {
              response = window["eval"]("(" + response + ")");
            } else {
              response = {};
            }
          }
        } else {
          var response = doc;
        }
                            
        settings.onComplete.call(self, file, response);
        toDeleteFlag = true;
        iframe.src = "javascript:'<html></html>';";                   
      });
      
    } else {
      d.body.removeChild(this._input);        
      this._input = null;
      this._createInput();            
    }
  },    
  /**
   *  在 iframe 页面 创建 form 表单
   */
  _createForm : function(iframe){
    var settings = this._settings;
    var form = toElement('<form id="hpUploadForm" method="post" enctype="multipart/form-data"></form>');
    form.style.display = 'none';
    form.action = settings.action;
    form.target = iframe.name;
    d.body.appendChild(form);
    for (var prop in settings.data){
      var el = d.createElement("input");
      el.type = 'hidden';
      el.name = prop;
      el.value = settings.data[prop];
      form.appendChild(el);
    }     
    return form;
  } 
};
})();

//  获取 guid 全局唯一id 类似uuid 带有 logo信息
function kd_guid(str) {
  var s="hp-kd-";
  if(str){s=str}
    function S4() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return s+(S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}