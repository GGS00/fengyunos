angular
	.module('cloudshop')
	.controller('MainCtrl', MainCtrl)
	.controller('HomeCtrl', HomeCtrl)
	.controller('CenterCtrl', CenterCtrl)
	.controller('CodeCtrl',CodeCtrl)
	.controller('OrderCtrl',OrderCtrl)
	.controller('StoreCtrl',StoreCtrl)
	.controller('StoreEditCtrl',StoreEditCtrl)
	.controller('customCtrl',customCtrl)
	.controller('shopInfoCtrl',shopInfoCtrl)
	.controller('ShopCtrl',ShopCtrl)
	.controller('DetailCtrl',DetailCtrl)
	.controller('GoodslistCtrl',GoodslistCtrl)
    .controller('SearchByNameCtrl',SearchByNameCtrl)
	
	
angular.$inject = ['$http', '$stateParams'];

function MainCtrl(Public,$location) {
  //var GLOB_AID = globSessionStorage["sessionAid"];

 //GLOB_SHOPID = 20599;
    var vm = this;
	GLOB_KEYWORDS = '';
	GLOB_BASEID = $location.search().baseid;
	SHARE_TITTLE = "这是我的小店，快来看看吧";
    SHARE_TEXT = "更多优惠商品，尽在我的小店";
	GLOB_localStorage = window.localStorage;
	vm.isfanli = GLOB_localStorage["sessionisfanli"];
	GLOB_FANLI = GLOB_localStorage["sessionisfanli"];
	GLOB_localStorage["keywordlist"] = "";
    vm.shopId = GLOB_SHOPID;
	vm.toMenu = function(){

		window.location.href = "view/bindingBankCard/bankCardList.html?shopid="+vm.shopId;
        /*if(vm.isfanli == 1){
            
          window.location.href = "view/bindingBankCard/bankCardList.html?shopid="+vm.shopId;

        }else{

          window.location.href = "#/store/store";

        }*/

	}

 
 
}

function HomeCtrl(Public,$location){

    var vm = this;
    if(GLOB_AID == undefined && GLOB_AID == null){
       Glob_AID = globSessionStorage["sessionAid"];
	   GLOB_ALIAS = globSessionStorage["sessionAlias"];
	   GLOB_SHOPID = globSessionStorage["sessionshopid"];

	  if(Glob_AID == undefined || Glob_AID == null){
	    	window.location.href = "wxlogin.html";
	  }

    }

        vm.aid = GLOB_AID;
    vm.isfanli = GLOB_localStorage["sessionisfanli"];
    vm.alias = GLOB_ALIAS;
    vm.shopId = GLOB_SHOPID;
	loadAgentLog();
	function loadAgentLog(){
		Public.IndexReport().success(function(data){
				vm.d = data.resultValue;
				$(document).attr("title",vm.d.shopName);
		})
	}
    vm.toNiceMobile = function(){

    	window.location.href = "view/niceMobile/html/index.html?agentid="+vm.aid+"&shopid="+vm.shopId;
    }
	
	vm.toYouPin = function(){
		window.location.href="http://10000dp.com/youpin_mobile/#!/home?aid="+vm.aid;
	}
   

}


function CenterCtrl(Agent,$location){
	var vm = this;
	vm.aid = GLOB_AID;
    vm.alias = GLOB_ALIAS;
	vm.clear = false;
	loadAgentInfo()
	function loadAgentInfo(){
		Agent.getAgent().success(function(data){
				vm.d = data.resultValue;	
		})
	}
	
	vm.editShopMsg = function (keynum,val){
		 vm.editValue = val;
		 vm.data ={}
		 vm.keynum = keynum;
		 
		 $("#myCarousel").carousel('next');
	}
	
	
	vm.canceledit = function (){
	     $("#myCarousel").carousel('prev');
	}
	
	vm.updateagentmsg = function(){
		vm.data[vm.keynum] = vm.editValue;
		vm.data['agentid'] = GLOB_AID;
		Agent.updataAgent(vm).success(function(){
			loadAgentInfo();
            $("#myCarousel").carousel('prev');
		})
	}
	
	vm.loginOut = function (){
		window.location.href = "wxlogin.html"
	}


	vm.to1 = function(){
		window.location.href="http://10000dp.com/tvhelp/sign_action.html?agentId="+vm.aid;
	}

	vm.to2 = function(){
		window.location.href="http://10000dp.com/tvhelp/zhuanpan/index.html?agentId="+vm.aid;
	}
	
}

function CodeCtrl(Agent,$location){
	var vm = this;
	if(GLOB_AID == undefined){
		GLOB_AID =  $location.search().aid;
		console.log(GLOB_AID);
		GLOB_ALIAS =  $location.search().alias;
	}
	loadAgentErCode()
	function loadAgentErCode(){
		Agent.getAgent().success(function(data){
				vm.d = data.resultValue;	
				var qrcode = new QRCode(document.getElementById("qrcodezoon"), {
		            width : 696,//设置宽高
		            height : 696
		        });
		        var currenturl = ""+ShreShopCommonLink+"?alias="+GLOB_ALIAS+"&aid="+GLOB_AID+"&shopid="+ data.shopid +"&isshare=1";
		        qrcode.makeCode(currenturl);	
		})	
	}
}


function OrderCtrl(Order,Agent){
	var vm = this;
	vm.page = 1;
	vm.status = 0;
	vm.pagenum =1;
	vm.list = [];
	vm.isfanli = GLOB_FANLI;
	GLOB_SHOPID = "";
	loadOrderList();
	function loadOrderList(){
		if((0<vm.page) && (vm.pagenum>=vm.page)){
			Order.getOrder(vm).success(function(data){
				for(var item in data.resultValue){
					vm.list.push(data.resultValue[item]);
				}
			
				vm.pagenum = Math.ceil(data.count/15);
	            if(vm.pagenum== 0)
	            {
	               vm.pagenum = 1;
	            }
			})
		}
	}
	
	
	
	vm.getShopMsg = function(id){
		vm.shopId = id
		Agent.getShop(vm).success(function(data){
			vm.shopInfo =  data.resultValue
		})
	}
	
	vm.getRemarkMsg = function(ordernum){
	    vm.orderRemark  =ordernum;
	    Order.getRemark(vm).success(function(data){
			vm.remarkTextarea =  data.resultValue
		})
	      
	}
	
	vm.saveRemark = function(){
	    Order.saveRemark(vm).success(function(data){})
	}
	
	vm.delOrder = function(ordernum){
	    vm.success_status  =15;
	    vm.orderDel = ordernum;
	    Order.delRemark(vm).success(function(data){
	    	vm.typeChoice(vm.status);
	    })
	}
	
	vm.typeChoice = function(num){
		if(typeof(num) != undefined){
			vm.status = num;
		}
		vm.list = [];
		vm.page = 1;
		loadOrderList();
	}
	
	$(window).scroll(function(){
	    var scrollTop = $(this).scrollTop();
	        var scrollHeight = $(document).height();
	        var windowHeight = $(this).height();
	        if(scrollTop + windowHeight == scrollHeight){       
	             vm.page++;
	             loadOrderList();
	        }
	});
	
	
	
}



function StoreCtrl(Goods){
		var vm = this;
		
		getArea();
		function getArea(){
			Goods.area().success(function(data){
		    	vm.areaList = data.resultValue;
		    	vm.shaddow = false;
				vm.edit = [];
				vm.goodsList = [];
				vm.page = 1;
				vm.pagenum = 1;
				vm.marketType = 3;
		    	getGoods(vm.areaList[0].seq)
		    })
		}
		
		function getGoods(seq){
			vm.seq = seq;
			if((0<vm.page) && (vm.pagenum>=vm.page)){
				Goods.getGoods(vm).success(function(data){
				    vm.isRebate = data.is_rebate
					for(var item in data.resultValue){
						vm.goodsList.push(data.resultValue[item]);
					}
			    	vm.goodsList.forEach(function(value, index) {  
	                   vm.edit[index] = false;
	            	})
			    	vm.pagenum = Math.ceil(data.goodsCount/8);
		            if(vm.pagenum== 0)
		            {
		               vm.pagenum = 1;
		            }
			    })
			}
		}
		
		vm.seqChoice = function(seq){
			if(typeof(seq) != undefined){
				vm.shaddow = false;
				vm.goodsList = [];
				vm.page = 1;
				getGoods(seq);
			}	
		}
		
		vm.showEdit = function(index){
			vm.listFlag = index;
			var t = vm.edit[index] 
			vm.goodsList.forEach(function(value, index) {  
                   vm.edit[index] = false;
            })
			vm.edit[index] = !t;
		}
		
		$(window).scroll(function(){
		        var scrollTop = $(this).scrollTop();
		        var scrollHeight = $(document).height();
		        var windowHeight = $(this).height();
		        if(scrollTop + windowHeight == scrollHeight){       
		//            document.getElementById('loadmorediv').style.display="block"; 
		             vm.page++;
		             getGoods(vm.seq);
		        }
		});
	
		
		vm.saveMark = function(){
			if (vm.marketType == 3) {
				var reg = /^[1-9]\d*$/;
				if (!reg.test(vm.onSale)) {
		            alert("降价必须是大于0的整数");
		        } 
			}else{
				vm.onSale = "";
			}
			Goods.updateMark(vm).success(function(data){
					if(data.resultValue == 0){
						alert(data.msg)
						vm.seqChoice(vm.seq);
						$('#marketType').modal('hide');
					}else{
						alert(data.msg)
					}
			})
		
		}
		
		vm.deleteGoods = function(){
			Goods.rmGoods(vm).success(function(data){
				if (data.resultValue === 0) {
                	alert("移除成功");
                	vm.seqChoice(vm.seq);
	            } else {
	                alert("移除失败");
	            }
			})
		}
		
		vm.tounaddgoodslist = function(){
		    var randomstr = GetRandomNum();
		    window.location.href = "./../../App/Modules/weixin/weixinportal/areacommand/wx_platformGoods.html?seq="+ vm.seq +"?" + randomstr;
		}
		function GetRandomNum(){
		    var Min = 0;
		    var Max = 10000;
		    var Range = Max - Min;
		    var Rand = Math.random();
		    return(Min + Math.round(Rand * Range));
		}
		
		vm.deletelist = function(){
			vm.delList = [];
			angular.forEach(vm.goodsList,function(list) {  
	                  if(list.selected == true){
	                  	 	vm.delList.push(list.base_id);
	                  }
	        })
			Goods.rmlGoods(vm).success(function(data){
				if (data.resultValue === 0) {
                	alert("移除成功");
                	vm.seqChoice(vm.seq);
	            } else {
	                alert("移除失败");
	            }
			})
		}
		
}


function StoreEditCtrl(Goods,$location,$http){
		var vm = this;
		vm.base_id = $location.search().baseid; 
        vm.litpic = unescape($location.search().litpic); 
        vm.goodsName = $location.search().goods_name; 
        vm.change = function(index) {
	        vm.show = [0, 0, 0];
	        vm.show[index] = 1
	    }
	    vm.change(0)

		infoList();
		function infoList (){
			Goods.goodsAttr(vm).success(function(data){
				if(data == null){
                    alert("请求错误，请稍后再试，或者联系云店管理")
                }else{
                    vm.infoItem = data.resultValue;
                }
			})
		}
		
		vm.showPrice = function(index,goods_price) {
            //标记要修改的是第几个价格
            vm.nowFlag = index;
            vm.nowPrice = goods_price;
            $("#shopPrice").show();
        }
		vm.hidePrice = function() {
           $("#shopPrice").hide();
        }
		vm.changeprice = function () {
            $("#changepriceshow").show();
        }
        vm.hidenChangePrice = function () {
            $("#changepriceshow").hide();
        }                        
		
		vm.changeBox2 = function() {
            if (!/^[0-9]+(.[0-9]{1})?$/.test(vm.nowPrice))
            {
                alert("请输入正确的价格");
                $("addareparam_input").focus();
            } else {
                attrpricesubmit();
            }
        }
		
		function attrpricesubmit() {
            vm.result = "[";
            for (i = 0; i < vm.infoItem.length; i++)
            {
                var jsonText = {};
                jsonText["atomid"] = vm.infoItem[i].goods_atom_id;
                if (i == vm.nowFlag) {
                    jsonText["price"] = vm.nowPrice;
                } else {
                    jsonText["price"] = vm.infoItem[i].goods_price;
                }
                vm.result += JSON.stringify(jsonText);
                if (i != Number(vm.infoItem.length - 1))
                {
                    vm.result += ",";
                }
            }
            vm.result += "]";
           	Goods.editPrice(vm).success(function(data){
           		if(data.resultValue == 0){
				infoList();
                $("#shopPrice").hide();
                }else{
					alert(data.msg)                
                }
			})
        }
		
		vm.changeBox = function() {
	        if (!/^[0-9]+(.[0-9]{1})?$/.test(vm.allPrice))
	        {
	            alert("请输入正确的价格");
	            $("addareparam_input").focus();
	        } else {
	            fixProfit();
	        }
	    }
        //固定利润修改全部价格
        function fixProfit(){
            var result = "[";
            for (var i = 0; i < vm.infoItem.length; i++)
            {
                var jsonText = {};
                jsonText["atomid"] = vm.infoItem[i].goods_atom_id;
                jsonText["profit"] = vm.allPrice;
                result += JSON.stringify(jsonText);
                if (i != Number(vm.infoItem.length - 1))
                {
                    result += ",";
                }

            }
            result += "]";
            $http({
                method: "post",
                url: "" + Comm_Config + "wx/fixProfit.do",
                params: {
                    "agentid":GLOB_AID ,
                    "atomidprofit": result,
                    "alias": GLOB_ALIAS,
//                  "token": token
                }
            }).success(function(data) {
                infoList();
                $("#changepriceshow").hide();
            })
        }
		
		
		vm.saveCoefficient = function() {
            $http({
                method: "post",
                url: "" + Comm_Config + "wx/recoveryBasicGoodsSysMode.do",
                params: {
                    "agentid": GLOB_AID,
                    "baseid": vm.base_id,
                    "alias": GLOB_ALIAS,
//                  "token": token
                }
            }).success(function(data) {
                infoList();
                $("#changepriceshow").hide();
            })
        }

}



function customCtrl(Agent){
	var vm = this;
	Agent.getCustom().success(function(data){
		    vm.list = data.resultValue;
	})

}

function shopInfoCtrl(Agent){
	var vm = this;
	Agent.getShopA().success(function(data){
		    vm.list = data.resultValue;
	})
	
	vm.getLocalTime = function(nS) {     
	   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
	}  
}



function ShopCtrl(Shop,$location){

	    

	  	GLOB_AID =  $location.search().aid;

	    
		var vm = this;
		vm.listShow = 7;
		vm.orderType=0;
		vm.list = [];

        vm.Globmusic = [];
        vm.MainShopParam = {};
		vm.page = 1;
	    vm.pagenum =1;

	    vm.sellType = $location.search().selltype;
        vm.isShare = $location.search().isshare;
        vm.isBoss = GLOB_ISBOSS;
		getAgent();
	

		vm.typeChange = function(num){
		if(typeof(num) != undefined){
			vm.orderType = num;
		}
			vm.list = [];
			vm.page = 1;
			getTopGoodsList(GLOB_ALIAS,GLOB_SHOPID);
	    }

		function getAgent(){
			if ((null == GLOB_AID) || ('null' == GLOB_AID)){

		        if($location.search().boxid == null || $location.search().boxid == undefined){

		        	window.location.href = "wxlogin.html";

		        }else{

		        	vm.boxid = $location.search().boxid.split("?")[0];

		        	Shop.getShopByMac(vm).success(function(data){
			    	    GLOB_AID = data.resultValue[0].agent_id;
                        GLOB_SHOPID = data.resultValue[0].id;
                        getShop(data.id);
            //             Shop.getAgentByAgent().success(function(data){
				    	   //  GLOB_SHOPID = data.shopid
				    	   //  getShop(data.shopid);
				        // })
			        })  

		        }
		        
		    }else{
		    	if(vm.isShare==1){
		    		   GLOB_SHOPID = $location.search().shopid.split("?")[0];
                       vm.shopid = $location.search().shopid.split("?")[0];
                       getShop(vm.shopid);
		    	}else{

		    		Shop.getAgentByAgent().success(function(data){
			    	    GLOB_SHOPID = data.shopid
			    	    getShop(data.shopid);
		            })

		    	}
		    	
		    }
	        
				

		    
		}

		function getShop(shopid){
            vm.shopid = shopid;
			Shop.getAgent(vm).success(function(data){
				    document.title = data.resultValue.shop_name;
					readyshare(data.resultValue.shop_name);
		    	    vm.agent = data.resultValue;
		    	    GLOB_ALIAS = data.alias;
		    	    getArea(data.alias,shopid);
		    	    getTopGoodsList(data.alias,shopid);
					loadBannerText(data.alias,shopid);
					loadBannerMusic(data.alias,shopid)
					getPic(data.alias,shopid);
					visitorshopsharelog(data.resultValue.shop_name);
					
		        })
		}

		function getArea(alias,shopid){
			vm.alias = alias;
			vm.shopid = shopid;
			Shop.area(vm).success(function(data){
		    	vm.areaList = data.resultValue;
		    })
		}

		function getTopGoodsList(alias,shopid){
			vm.alias = alias;
			vm.shopid = shopid;
			/*alert(vm.indexPage);
			alert(vm.rownum);*/
			if((0<vm.page) && (vm.pagenum>=vm.page)){
			Shop.getTopGoodsList(vm).success(function(data){
				for(var item in data.resultValue){
					vm.isrebate = data.is_rebate;
					vm.areaname = data.areaname;
					vm.list.push(data.resultValue[item]);
				}

				vm.pagenum = Math.ceil(data.goodsCount/8);
	            if(vm.pagenum == 0)
	            {
	               vm.pagenum = 1;
	            }


	            $(window).scroll(function(){
			        var scrollTop = $(document).scrollTop();
			        var scrollHeight = $(document).height();
			        var windowHeight = $(this).height();
			        if(scrollTop>=scrollHeight-windowHeight){       
			             vm.page++;
			             getTopGoodsList(GLOB_ALIAS,GLOB_SHOPID);
			        }
			});

			})
		 }

		}

		/*$(window).scroll(function(){
			        var scrollTop = $(document).scrollTop();
			        var scrollHeight = $(document).height();
			        var windowHeight = $(this).height();
			        console.log(scrollTop);
			        console.log(windowHeight);
			        console.log(scrollHeight);
			        if(scrollTop>=scrollHeight-windowHeight){       
			             vm.page++;
			             getTopGoodsList(GLOB_ALIAS,GLOB_SHOPID);
			        }
			});*/


		function getPic(alias,shopid){
			vm.alias = alias;
			vm.shopid = shopid;
			Shop.getPic(vm).success(function(data){
		    	vm.picList = data.resultValue;

		    })
		}


		function loadBannerText(alias,shopid){
			vm.alias = alias;
			vm.shopid = shopid;
			Shop.loadBannerText(vm).success(function(data){	
				var d = eval(data);
	            var bannerText = "";
	            for(i=0;i<d.resultValue.length;i++){
	                if(d.resultValue[i].is_show == 1){
	                    bannerText = bannerText+"&nbsp;&nbsp;&nbsp"+d.resultValue[i].content;
	                }
	            }
	            $("#bannertextcontain").html(bannerText);		    
				// var d = data;
				// vm.bannerText = "";
				// for(i=0;i<d.resultValue.length;i++){
	   //              if(d.resultValue[i].is_show == 1){
	   //                 vm.bannerText = vm.bannerText+"&nbsp;&nbsp;&nbsp"+d.resultValue[i].content;
	   //              }
	   //          }
		    })

		}

		vm.gotorder = function(){
			window.location.href = "#/order";
		}


		vm.toAreaZoon = function(num){
			$("html,body").animate({scrollTop: 0},function(){

			if (GLOB_SHOPID) {	
             window.location.href = "#/goodsList?seq=" + num + "&aid=" + GLOB_AID + "&alias=" + GLOB_ALIAS + "&selltype=" + GLOB_SELLTYPE + "&shopid=" + GLOB_SHOPID + "&isshare=" + vm.isShare + "";
              return;
            }
            window.location.href = "#/goodsList?seq=" + num + "&aid=" + GLOB_AID + "&alias=" + GLOB_ALIAS +"&selltype=" + GLOB_SELLTYPE +  "&isshare=" + vm.isShare + "";


			});
			
		}

		vm.searchGoodsByName = function(){

			if (GLOB_SHOPID) {
		        window.location.href = "#/search?aid=" + GLOB_AID + "&alias=" + GLOB_ALIAS + "&selltype=" + GLOB_SELLTYPE + "&shopid=" + GLOB_SHOPID + "&isshare=" + vm.isShare + "";
		        return;
		    }
		    window.location.href = "#/search?aid=" + GLOB_AID + "&alias=" + GLOB_ALIAS + "&selltype=" + GLOB_SELLTYPE + "&isshare=" + vm.isShare + "";

		}

		vm.toDetail = function(id){
			var ss = GetRandomNum();
		    
		    if (vm.isShare == 1)
		    {
		        if (GLOB_SHOPID) {
		            if(GLOB_SELLTYPE){
		                window.location.href = "#/detail?baseid=" + id + "&aid=" + GLOB_AID + "&isshare=1&shopid=" + GLOB_SHOPID + "&selltype=" + GLOB_SELLTYPE + "&origin=5";
		            }else{
		                window.location.href = "#/detail?baseid=" + id + "&aid=" + GLOB_AID + "&isshare=1&shopid=" + GLOB_SHOPID + "&origin=5";
		            }
		            
		        }
		        else {
		            if(GLOB_SELLTYPE){
		               window.location.href = "#/detail?baseid=" + id + "&aid=" + GLOB_AID + "&isshare=1&selltype=" + GLOB_SELLTYPE + "&origin=5";
		            }else{
		               window.location.href = "#/detail?baseid=" + id + "&aid=" + GLOB_AID + "&isshare=1&origin=5";
		            }
		            
		        }

		    }
		    else
		    {
		        if (GLOB_SHOPID) {

		            window.location.href = "#/detail?baseid=" + id + "&aid=" + GLOB_AID + "&shopid=" + GLOB_SHOPID + "&origin=5";
		        }
		        else {
		            window.location.href = "#/detail?baseid=" + id + "&aid=" + GLOB_AID + "&origin=5";
		        }

		    }
		}


		vm.gotoBossDetail = function(){

			 if (GLOB_SHOPID) {
			     window.location.href = "view/boss/wshop_boss.php?aid=" + GLOB_AID + "&alias=" + GLOB_ALIAS + "&selltype=" + GLOB_SELLTYPE + "&shopid=" + GLOB_SHOPID + "&isshare=" +vm.isShare;
		     }
		     else {
		        window.location.href= "view/boss/wshop_boss.php?aid=" + GLOB_AID + "&alias=" + GLOB_ALIAS + "&selltype=" + GLOB_SELLTYPE + "&isshare=" + vm.isShare;
		     }

		}

		function loadBannerMusic(alias,shopid){
			vm.alias = alias;
			vm.shopid = shopid;
			Shop.loadBannerMusic(vm).success(function(data){
	    	    var d = eval(data);
	            if(d.resultValue.length<1){
	                $("#palyiconid").hide();
	                return;
	            }
	            vm.MainShopParam.isplaybg = 1;
	            vm.MainShopParam.bglength = d.resultValue.length;
	            for(i=0;i<d.resultValue.length;i++){
	                if(d.resultValue[i].is_show == 1){
	                    vm.Globmusic[i] = d.resultValue[i].url;
	                }
	               
	            }
            
	        })	

		}


		vm.playbgmusic = function(){
			
			if (1 != vm.MainShopParam.isplaybg) {
			        return;
			    }
			    if ("" == document.getElementById('bgmusicaudio').src) {
			        vm.MainShopParam.playindex = 0;
			        document.getElementById('bgmusicaudio').src = vm.Globmusic[vm.MainShopParam.playindex];
			    }
			    var myAuto = document.getElementById('bgmusicaudio');
			    myAuto.loop = false;
			    if (1 != vm.MainShopParam.isplay) {

			        vm.MainShopParam.isplay = 1;
			        $("#palyiconid").attr("class", "fa fa-music fa-spin");
			        myAuto.play();
			    }
			    else {
			        vm.MainShopParam.isplay = 0;
			        $("#palyiconid").attr("class", "fa fa-music");
			        myAuto.pause();
			    }
			    var GlobmyAuto = document.getElementById('bgmusicaudio');
			    GlobmyAuto.addEventListener('ended', function() {
			        console.log("over:" + vm.MainShopParam.playindex);
			        vm.MainShopParam.playindex++;
			        if (vm.MainShopParam.playindex < vm.MainShopParam.bglength) {
			            document.getElementById('bgmusicaudio').src = vm.Globmusic[vm.MainShopParam.playindex];
			        }
			        else{
			            vm.MainShopParam.playindex = 0;
			            document.getElementById('bgmusicaudio').src = vm.Globmusic[vm.MainShopParam.playindex];
			        }
			        GlobmyAuto.play();
			    }, false);
		}
	   
}



function DetailCtrl(Detail,Shop,$location) {


	GLOB_AID =  $location.search().aid;

	
	var vm = this;
	vm.isfanli = GLOB_FANLI;
	vm.indexChange = 0;
	vm.indexRow = 0;
    vm.aid = GLOB_AID;
    vm.aidUrl  =  $location.search().aid;
	vm.sellType = $location.search().selltype;
    vm.isShare = $location.search().isshare;
    vm.isBoss = GLOB_ISBOSS;
    vm.token = token;
    vm.supplyid = '';
    vm.goodprice = '';

    vm.shopId = GLOB_SHOPID;
	vm.baseid = $location.search().baseid;

    GLOB_BASEID = $location.search().baseid;

	vm.goods_price = "";
     
    

    if((null == GLOB_SHOPID) || ('null' == GLOB_SHOPID)||(undefined == GLOB_SHOPID)){
         if($location.search().shopid){
         	GLOB_SHOPID =  $location.search().shopid.split('?')[0];
         }      
	}


	if ((null == GLOB_AID) || ('null' == GLOB_AID)){
        vm.boxid = $location.search().boxid.split('?')[0];
        Shop.getShopByMac(vm).success(function(data){
	    	    GLOB_AID = data.resultValue[0].agent_id;
                GLOB_SHOPID = data.resultValue[0].id;
                vm.aid=GLOB_AID;
                vm.shopId=GLOB_SHOPID;
               
                getAgent();
				getWxIndexReport();
				showScroll();
                
	        })
		        
    }else{
		
	    getAgent();
		getWxIndexReport();
		showScroll();
		

    }

    
	
	
	function getAgent(){

		if(GLOB_SHOPID){
			Detail.getShop(vm).success(function(data){
				if(data.resultValue.length>1){
					vm.agent = data.resultValue[0];
				}else{
					vm.agent = data.resultValue;
				}
	    		GLOB_ALIAS = data.alias;
	    	    getGoods(data.alias);
	        })

		}else{
			Detail.getAgentByAgentId(vm).success(function(data){
	    	    if(data.resultValue.length>1){
					vm.agent = data.resultValue[0];
				}else{
					vm.agent = data.resultValue;
				}
				GLOB_SHOPID = data.shopid;
				vm.shopId = GLOB_SHOPID;
				Detail.getShop(vm).success(function(data){
		    		GLOB_ALIAS = data.alias;
		    	    getGoods(data.alias);
	            })
	        })

		}
	}



	function getisfanli(){

		Detail.getfanli(vm).success(function(data){
			vm.fanlitype = data.isFanli;
	    })
	}



	function getGoods(alias){
		vm.alias = alias;
		vm.shopId = GLOB_SHOPID;
		Detail.getGoods(vm).success(function(data){
			vm.isRebate = data.is_rebate;
            vm.goodsList =[];
			for (i = 0; i < data.resultValue.length; i++) {
                if (data.resultValue[i].is_show == 1) {
                    vm.goodsList.push(data.resultValue[i]);
                }

            }
            document.title = data.resultValue[0].goods_name;
	    	readyDetailShare(vm.baseid,data.resultValue[0].goods_name,data.resultValue[0].goods_price,data.resultValue[0].litpic);
	    	if(data.resultValue[0].photo==null || data.resultValue[0].photo ==''){
	    		vm.picList = data.resultValue[0].litpic.split();
	    	}else{
	    		vm.picList =  data.resultValue[0].photo.split('@');
	    		
	    	}
	    })
	}

	function getWxIndexReport(){
		Detail.getWxIndexReport(vm).success(function(data){
	    	vm.report = data.resultValue;
	    })

	}


	function showScroll() {
		$(window).scroll(function() {
			var scrollValue = $(window).scrollTop();
			scrollValue > 100 ? $('div[class=scroll]').fadeIn() : $('div[class=scroll]').fadeOut();
		});
		$('#scroll').click(function() {
			$("html,body").animate({
				scrollTop: 0
			}, 200);
		});
	}

	vm.setAttrPriceAction = function(){
		vm.result="["
        vm.data={};
		vm.data["atomid"] = vm.atomId;
		vm.data["price"] = ''+ vm.goods_price+'';
		vm.result+=JSON.stringify(vm.data);
		vm.result+="]"
		if((2 == GLOB_SELLTYPE) && (1 == vm.isShare)){
			Detail.changePriceJoin(vm).success(function(data){
	    	    vm.reshow = data.resultValue;
	    	    vm.refresh()
	        })

		}else{
			Detail.changePrice(vm).success(function(data){
                vm.reshow = data.resultValue;
                vm.refresh()
	        })

		}
	}
	vm.openModal =function(){
		vm.goods_price = vm.goodsList[0].goods_price
		
	}

	vm.changeOption = function(index){
		vm.goods_price = vm.goodsList[index].goods_price

	}

	vm.refresh = function(){
        getGoods(GLOB_ALIAS);
		getAgent();
		getisfanli();
		getWxIndexReport();
		showScroll();


	}

	vm.setInstall = function(id){
		vm.goods_atom_id = id;
		vm.agentid = GLOB_AID;
        Detail.setInstall(vm).success(function(data){
	    	    vm.installList = data.resultValue;
	        })
        Detail.setInstalltwice(vm).success(function(data){
	    	    vm.installtwiceList = data.resultValue;
	        })
	}

	vm.toBossShop = function(){
       var randommun = GetRandomNum();

	    if (GLOB_SHOPID) {
	        if (vm.isBoss && (1 !=  vm.isShare)) {
	            window.location.href = "#/shop?aid=" + GLOB_AID + "&alias=" + GLOB_ALIAS + "&shopid=" + GLOB_SHOPID + "?" + randommun + "";
	        }
	        else {
	            window.location.href = "#/shop?aid=" + GLOB_AID + "&alias=" + GLOB_ALIAS + "&selltype=" + GLOB_SELLTYPE + "&isshare=1&shopid=" + GLOB_SHOPID + "?" + randommun + "";
	        }

	    } else {
	        window.location.href = "#/shop?aid=" + GLOB_AID + "&alias=" + GLOB_ALIAS + "&selltype=" + GLOB_SELLTYPE + "&isshare=1?" + randommun + "";
	    }

	}



	vm.showStoreBanner = function(){
		if (!isWeiXin())
	    {
	        alert("此功能在微信浏览器中才有效哦")
	        return;
	    }
	    document.getElementById('storesectionid').style.display = "block";
	}

	vm.missStoreBanner = function(){
		
		document.getElementById('storesectionid').style.display = "none";

	}

	vm.toPGood =function(){

      vm.goodsname = $("#goodsinfo_name").html();
      window.location.href = "http://wsc.51dh.com.cn/search/index?flag=true&mall_id=0&keywords="+vm.goodsname+"&source=yd&site=dh";

	}

/*	vm.getSupply = function(){

		vm.agentid = $location.search().aid;
		 
		Detail.getfanli(vm).success(function(data){

			vm.isfanli = data.isFanli;
			
			if(vm.isfanli==1){   
		    
		    vm.supplyid = $('.attr-value-div .value-block-achive').find('p').attr('supplyid');

		        if(vm.supplyid != 1){ 
		        	$("#editOldCutomer").modal('show');
		        	


		        }else{

		            $("#editCutomer").modal('show');
		        }

			}else{

	                $("#editOldCutomer").modal('show');


			}
	    })    

	}*/

	/*vm.getorder = function(){

		vm.agentid = $location.search().aid;
		 
		Detail.getfanli(vm).success(function(data){

		vm.isfanli = data.isFanli; 
	    vm.supplyid = $('.attr-value-div .value-block-achive').find('p').attr('supplyid');	       

	    }) 

	}*/


	vm.confirmFakeOrder = function(){
		    /*vm.agentid = GLOB_AID;
		    vm.attr = $('.attr-value-div .value-block-achive').find('p').html();
		    vm.goodname = $("#goodsinfo_name").html();
            vm.good_price = $('.attr-value-div .value-block-achive').find('p').attr('gprice');*/

	        $("#alerttext_toast").hide();
	        var name = $("#order_name").val();
	        var phone = $("#order_phone").val();
	        var address = $("#order_address").val();
	        if (name === null || name === "") {
	            $("#alerttext_toast").show();
	            document.getElementById('alerttext_toast').innerHTML = "用户名必须输入";
	            return;
	        }
	        if (!checkPhone(phone)) {
	            $("#alerttext_toast").show();
	            document.getElementById('alerttext_toast').innerHTML = "手机号码格式有误";
	            return;
	        }
	        setAddToOrder(name,phone,address);
	      //addvip(name, phone, address);
	     
		
	}

	function checkPhone(str) {
	    var result = str.match(/^1[3|4|5|7|8][0-9]\d{8}$/);
	    if (result === null)
	        return false;
	    return true;
	}

    function setAddToOrder(name,phone,address) {

    	 vm.attr = $('.attr-value-div .value-block-achive').find('p').html();
	     vm.good_price = $('.attr-value-div .value-block-achive').find('p').attr('gprice');
	     vm.wholesale_price = $('.attr-value-div .value-block-achive').find('p').attr('wprice');
	     vm.goods_alias_id = $('.attr-value-div .value-block-achive').find('p').attr('aliasid');
	     vm.shopid = GLOB_SHOPID;
	     vm.alias = GLOB_ALIAS;
	     vm.agentid = GLOB_AID;
	     vm.baseid = $location.search().baseid;
	     vm.name = name;
	     vm.phone = phone;
	     vm.address = address;

	     Detail.confirmFakeOrder(vm).success(function(data){   
	 	   var d = eval(data);
            $('#editOldCutomer').modal('hide');
            if (d.resultValue == 0)
            {
                   alert("亲，下单成功，我们尽快与您联系");
            }
            else
            {
                   alert("哦！订单提交失败");
            }
                
         })
	   
	}

	vm.confirm = function(){
	     vm.attr = $('.attr-value-div .value-block-achive').find('p').html();
	     vm.good_price = $('.attr-value-div .value-block-achive').find('p').attr('gprice');
	     vm.wholesale_price = $('.attr-value-div .value-block-achive').find('p').attr('wprice');
	     vm.goods_alias_id = $('.attr-value-div .value-block-achive').find('p').attr('aliasid');
	     vm.shopid = GLOB_SHOPID;
	     vm.alias = GLOB_ALIAS;
	     vm.agentid = GLOB_AID;
	     vm.baseid = $location.search().baseid;
	     vm.payHtml = $('#editCutomer .modal-body input[name="pay"]:checked').val();
	     vm.isboss = GLOB_ISBOSS;
	     if(vm.isboss == 1){
	     	vm.boss = 1;
	     }else{

	     	vm.boss=0;
	     }
    
		 Detail.confirmOrder(vm).success(function(data){   
		 	    vm.orderId = data.order_id;
		 	    if(vm.payHtml==1){
					window.location.href="../../../tvhelp/custominfor.html?orderid="+ vm.orderId + "&isboss="+vm.boss;
		 	    }else{
					window.location.href="../../../tvhelp/custominfor2.html?orderid="+ vm.orderId + "&isboss="+vm.boss ;
		 	    }
                
	        })

	}
}


function GoodslistCtrl(Goodslist,Shop,$location) {

	

	GLOB_AID =  $location.search().aid;

	  	
	var vm = this;
	vm.sellType = GLOB_SELLTYPE;
    vm.isShare = $location.search().isshare;
    vm.isBoss = GLOB_ISBOSS;
    vm.token = token;
    vm.shopId = GLOB_SHOPID;
    vm.boxId =$location.search().boxId;
    vm.seq = $location.search().seq;
    vm.page = 1;
	vm.pagenum =1;
	vm.orderType=0;
	vm.list = [];
	vm.keyWord = $location.search().keywords;

	
	
    getAgent();

	function getAgent(){        
				Shop.getAgentByAgent().success(function(data){
		    	    GLOB_SHOPID = data.shopid
		    	    getShop(data.shopid);
		        })

		    
		}

	function getShop(shopid){
            vm.shopid = shopid;
			Shop.getAgent(vm).success(function(data){
					readyshare(data.resultValue.shop_name);
		    	    vm.agent = data.resultValue;
		    	    GLOB_ALIAS = data.alias;
		    	    if(vm.keyWord!=undefined){
						vm.word=GLOB_KEYWORDS;
				        loadGoodsListByName(data.alias,shopid);
					}else{
						loadGoodsList(data.alias,shopid);	
					}
		    	    
		        })
	}

	function loadGoodsList(alias,shopid){
		vm.alias = alias;
		vm.shopid = shopid;
		if((0<vm.page) && (vm.pagenum>=vm.page)){
			Goodslist.getGoods(vm).success(function(data){
				for(var item in data.resultValue){
					vm.isRebate = data.is_rebate;
					vm.count = data.goodsCount;
					vm.list.push(data.resultValue[item]);
				}
			
				vm.pagenum = Math.ceil(data.goodsCount/9);
	            if(vm.pagenum== 0)
	            {
	               vm.pagenum = 1;
	            }
			})
		}
	}

	function loadGoodsListByName(alias,shopid){
		vm.alias = alias;
		vm.shopid = shopid;
		if((0<vm.page) && (vm.pagenum>=vm.page)){
			Goodslist.getGoodsByName(vm).success(function(data){
				for(var item in data.resultValue){
					vm.isRebate = data.is_rebate;
					vm.count = data.goodsCount;
					vm.list.push(data.resultValue[item]);
				}
			
				vm.pagenum = Math.ceil(data.goodsCount/9);
	            if(vm.pagenum== 0)
	            {
	               vm.pagenum = 1;
	            }
			})
		}
	}

	vm.selectgoodsbyincrease = function(num){
		if(typeof(num) != undefined){
			vm.orderType = num;
		}
			vm.list = [];
			vm.page = 1;
			if(vm.keyWord!=undefined){
				loadGoodsListByName(GLOB_ALIAS,GLOB_SHOPID);
			}else{
				loadGoodsList(GLOB_ALIAS,GLOB_SHOPID);
			}
			
	    }

	vm.hrefgoodsDetail = function(id){


		var ss = GetRandomNum();
	    var isshare = $location.search().isshare;
	    if (isshare == 1)
	    {
	        if (GLOB_SHOPID) {
	            if(GLOB_SELLTYPE){
	                window.location.href = "#/detail?baseid=" + id + "&aid=" + GLOB_AID + "&isshare=1&shopid=" + GLOB_SHOPID + "&selltype=" + GLOB_SELLTYPE + "&origin=5";
	            }else{
	                window.location.href = "#/detail?baseid=" + id + "&aid=" + GLOB_AID + "&isshare=1&shopid=" + GLOB_SHOPID + "&origin=5";
	            }
	            
	        }
	        else {
	            if(GLOB_SELLTYPE){
	               window.location.href = "#/detail?baseid=" + id + "&aid=" + GLOB_AID + "&isshare=1&selltype=" + GLOB_SELLTYPE + "&origin=5";
	            }else{
	               window.location.href = "#/detail?baseid=" + id + "&aid=" + GLOB_AID + "&isshare=1&origin=5";
	            }
	            
	        }

	    }
	    else
	    {
	        if (GLOB_SHOPID) {

	            window.location.href = "#/detail?baseid=" + id + "&aid=" + GLOB_AID + "&shopid=" + GLOB_SHOPID + "&origin=5";
	        }
	        else {
	            window.location.href = "#/detail?baseid=" + id + "&aid=" + GLOB_AID + "&origin=5";
	        }

	    }



	}

	vm.searchGoodsByName = function(){

			if (GLOB_SHOPID) {
		        window.location.href = "#/search?aid=" + GLOB_AID + "&alias=" + GLOB_ALIAS + "&selltype=" + GLOB_SELLTYPE + "&shopid=" + GLOB_SHOPID + "&isshare=" + vm.isShare + "";
		        return;
		    }
		    window.location.href = "#/search?aid=" + GLOB_AID + "&alias=" + GLOB_ALIAS + "&selltype=" + GLOB_SELLTYPE + "&isshare=" + vm.isShare + "";

		}

	$(window).scroll(function(){
	    var scrollTop = $(document).scrollTop();
	        var scrollHeight = $(document).height();
	        var windowHeight = $(this).height();
	        if(scrollTop + windowHeight == scrollHeight){       
	//            document.getElementById('loadmorediv').style.display="block"; 
	             vm.page++;
	             if(vm.keyWord!=undefined){
					loadGoodsListByName(GLOB_ALIAS,GLOB_SHOPID);
	             }else{
	             	loadGoodsList(GLOB_ALIAS,GLOB_SHOPID);
	             }
	             
	        }
	});


}


function SearchByNameCtrl(SearchByName,$location){


	  	 GLOB_AID =  $location.search().aid;

	  
        var vm = this;
        loadheistry();
        vm.isShare = $location.search().isshare;
        
        function loadheistry(){
        	  vm.keywordarry =[];  
              vm.stroeagestr = GLOB_localStorage["keywordlist"];
			  if (vm.stroeagestr)
			  {
			     vm.keywordarry = vm.stroeagestr.split(","); //字符分割  
			  }
        }

        vm.handelKeyWords = function(words){
			    vm.keywordarry = []; //定义一数组
			    vm.stroeagestr = GLOB_localStorage["keywordlist"];
			    vm.word = words;
			    GLOB_KEYWORDS = vm.word;
			    if(vm.stroeagestr.indexOf(words) == -1){
				    if (vm.stroeagestr)
				    {
				        vm.keywordarry = vm.stroeagestr.split(","); //字符分割
				        var arrylen = vm.keywordarry.length;
				        vm.keywordarry[arrylen] = vm.word;
				        GLOB_localStorage["keywordlist"] = vm.keywordarry;
				    }
				    else
				    {
				        vm.keywordarry[0] = vm.word;
				        GLOB_localStorage["keywordlist"] = vm.keywordarry;
				    }
			    }
			    	

              if (GLOB_SHOPID) {
		        window.location = "#/goodsList?keywords=1&aid=" + GLOB_AID + "&alias=" + GLOB_ALIAS + "&shopid=" + GLOB_SHOPID + "&selltype=" + GLOB_SELLTYPE + "&isshare=" + vm.isShare + "";
		        return;
			  }
			    window.location = "#/goodsList?keywords=1&aid=" + GLOB_AID + "&alias=" + GLOB_ALIAS + "&selltype=" + GLOB_SELLTYPE + "&isshare=" + vm.isShare + "";


        }

        vm.searchByKeyWord = function(words){
        	if ("" == words)
		    {
		        return;
		    }
              vm.word = words;
              vm.keywordarry = []; //定义一数组
			  vm.stroeagestr = GLOB_localStorage["keywordlist"];			    
			  GLOB_KEYWORDS = vm.word;
			  if(vm.stroeagestr.indexOf(words) == -1){
			    if (vm.stroeagestr)
			    {
			        vm.keywordarry = vm.stroeagestr.split(","); //字符分割
			        var arrylen = vm.keywordarry.length;
			        vm.keywordarry[arrylen] = vm.word;
			        GLOB_localStorage["keywordlist"] = vm.keywordarry;
			    }
			    else
			    {
			        vm.keywordarry[0] = vm.word;
			        GLOB_localStorage["keywordlist"] = vm.keywordarry;
			    }
			  }
			    	

              if (GLOB_SHOPID) {
		        window.location = "#/goodsList?keywords=1&aid=" + GLOB_AID + "&alias=" + GLOB_ALIAS + "&shopid=" + GLOB_SHOPID + "&selltype=" + GLOB_SELLTYPE + "&isshare=" + vm.isShare + "";
		        return;
			  }
			    window.location = "#/goodsList?keywords=1&aid=" + GLOB_AID + "&alias=" + GLOB_ALIAS + "&selltype=" + GLOB_SELLTYPE + "&isshare=" + vm.isShare + "";

        }



        vm.clearhistery = function(){
        	GLOB_localStorage["keywordlist"]="";
   			loadheistry();

        }
        

}


function readyshare(title)
            {
                SHARE_TITTLE = "这是" + title + "的云店铺";
                SHARE_TEXT = "更多优惠商品，尽在" + title;
                var randommun = GetRandomNum();
                var sharelink = ShreShopCommonLink + "?alias=" + GLOB_ALIAS + "&aid=" + GLOB_AID + "&isshare=1?" + randommun;
                var imgUrl = "" + ShareShopPublicLink + "/App/Modules/weixin/weixinportal/images/shareshopico.png";

                if (GLOB_SHOPID) {
                    sharelink = ShreShopCommonLink + "?alias=" + GLOB_ALIAS + "&aid=" + GLOB_AID + "&shopid=" + GLOB_SHOPID + "&isshare=1?" + randommun;
                }

                wx.onMenuShareTimeline({
                    title: SHARE_TITTLE,	
                    link: sharelink,
                    imgUrl: imgUrl,
                    success: function(res) {
                        var param = "代理商："+GLOB_AID+";分享到朋友圈";
                        _hmt.push(['_trackEvent', '云店铺', '云店铺分享', param]);
                        shopsharelog();
                    }
                });




                wx.onMenuShareAppMessage({
                    title: SHARE_TITTLE,
                    desc: SHARE_TEXT,
                    link: sharelink,
                    imgUrl: imgUrl,
                    success: function(res) {
                        var param = "代理商："+GLOB_AID+";指定好友分享";
                        _hmt.push(['_trackEvent', '云店铺', '云店铺分享', param]);
                        shopsharelog();
                    }
                });



                wx.onMenuShareQQ({
                    title: SHARE_TITTLE,
                    desc: SHARE_TEXT,
                    link: sharelink,
                    imgUrl: imgUrl,
                    success: function(res) {
                        var param = "代理商："+GLOB_AID+";分享到QQ";
                        _hmt.push(['_trackEvent', '云店铺', '云店铺分享', param]);
                        shopsharelog();
                    }
                });



                wx.onMenuShareWeibo({
                    title: SHARE_TITTLE,
                    desc: SHARE_TEXT,
                    link: sharelink,
                    imgUrl: imgUrl,
                    success: function(res) {
                        var param = "代理商："+GLOB_AID+";分享到微博";
                        _hmt.push(['_trackEvent', '云店铺', '云店铺分享', param]);
                        shopsharelog();
                    }
                });
                
                 wx.getNetworkType({
                    success: function (res) {
                      if(res.networkType.indexOf("wifi")>-1){
                          playbgmusic();
                      }
                    },
                    fail: function (res) {
                      alert(JSON.stringify(res));
                    }
              });
            }


            function shopsharelog()
            {

                //店铺分享页面
                var aid = request.QueryString("aid");
                $.ajax({
                    type: "get",
                    url: "" + Comm_Config + "wx/addShareShop.do",
                    data: {"agentid": aid},
                    success: function(data) {
                        //分享日志统计，成功与否，不做反馈
                    }
                });
            }


 function readyDetailShare(baseid,name,price,pic) {
	var random = GetRandomNum();
	SHARE_CONTENT = name +"，我的店里只卖"+ price +"元";
	SHARE_TITTLE = name +"，来自我的云店";
	SHRE_PIC = pic;
	var shareLink = ShareGoodsPublicLink + "?baseid=" + baseid + "&aid=" + GLOB_AID + "&isshare=1?" + random;
	if(GLOB_SHOPID) {
		shareLink = ShareGoodsPublicLink + "?baseid=" + baseid + "&aid=" + GLOB_AID + "&isshare=1&shopid=" + GLOB_SHOPID + "?" + random;
	}
		wx.onMenuShareTimeline({
			title: SHARE_TITTLE,
			link: shareLink,
			imgUrl: SHRE_PIC,
			success: function(res) {
				goodssharemark(baseid);
			}
		});

		wx.onMenuShareAppMessage({
			title: SHARE_TITTLE,
			desc: SHARE_CONTENT,
			link: shareLink,
			imgUrl: SHRE_PIC,
			success: function(res) {
				goodssharemark(baseid);
			}
		});
		wx.onMenuShareQQ({
			title: SHARE_TITTLE,
			desc: SHARE_CONTENT,
			link: shareLink,
			imgUrl: SHRE_PIC,
			success: function(res) {
				goodssharemark(baseid);
			}
		});
		wx.onMenuShareWeibo({
			title: SHARE_TITTLE,
			desc: SHARE_CONTENT,
			link: shareLink,
			imgUrl: SHRE_PIC,
			success: function(res) {
				goodssharemark(baseid);
			}
		});
}


function goodssharemark(id)
{
    $.ajax({
        type: "get",
        url: "" + Comm_Config + "wx/addShareGoods.do",
        data: {"agentid": GLOB_AID, "baseid": id, "alias": GLOB_ALIAS},
        success: function(data) {
            //分享日志统计，成功与否，不做反馈
        }
    });
}


function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

function visitorshopsharelog(shopname)
{
    //访问浏览次数
    $.ajax({
        type: "get",
        url: "" + Comm_Config + "wx/addVisitShop.do",
        data: {"agentid": GLOB_AID, "agentname": shopname},
        success: function(data) {
            //分享日志统计，成功与否，不做反馈
        }
    });
}