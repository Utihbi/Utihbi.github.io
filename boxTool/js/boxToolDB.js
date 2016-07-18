/**
 * Created by lipeng6 on 2016/05/10.
 * 	//示例：
 *	$_NAMES = ["boxExample1","boxExample2"];
 *	$_URLS = ["http://boxExample.com","http://boxExample.org"];
 *	$_PARAMS = [["{\"boxP\":1,\"boxq\":2}"],["boxQ,boxP"]];
 *	////0-get,1-post
 *	$_METHODS =[1,1]
 */


/*
 * 请注意顺序要对应，一定要对应填写! 
 */

	/*
	 * BOX研发团队
	 */
	BOX.APPS.ROLES.DEVLOPERS = [11651];
	/*
	 * 请求权限；
	 * 开发具有全部权限；
	 */
	BOX.DBS.APPS.REQUEST.ROLES = [
	                              BOX.APPS.ROLES.dev, //非研发人员看不到;
	                              BOX.APPS.ROLES.other,//研发，其他人都可以看到;
	                              BOX.APPS.ROLES.other,
	                              BOX.APPS.ROLES.other,
	                              BOX.APPS.ROLES.other,
	                              BOX.APPS.ROLES.dev, 
	                              BOX.APPS.ROLES.dev, 
	                              BOX.APPS.ROLES.dev, 
	                              BOX.APPS.ROLES.other, 
	                              BOX.APPS.ROLES.other, 
	                              BOX.APPS.ROLES.other, 
	                              BOX.APPS.ROLES.other, 
	                              BOX.APPS.ROLES.other, 
	                              BOX.APPS.ROLES.dev, 
	                              BOX.APPS.ROLES.dev,  
	                              BOX.APPS.ROLES.dev, 
	                             ];

	/*
	 *请求名称 
	 */
	BOX.DBS.APPS.REQUEST.NAMES = [
	                              "分单加速器(New)",
	                              "取新产品基础信息", 
	                              "取订单详细信息",
	                              "取产品基础信息",
	                              "取会员详细信息", 
	                              "分单加速器(Old)",
	                              "PHPRun",
	                              "SQL执行(Old)",
	                              "一级品类",
	                              "二级品类",
	                              "查询所有目的地大类",
	                              "目的地分组",
	                              "目的地名称",
	                              "预订城市信息",
	                              "获取组织架构",
	                              "获取人员信息",
	                              
	                              ];
	/*
	 * 请求方式
	 * 0-get,1-post
	 */
	BOX.DBS.APPS.REQUEST.METHODS = [ 
	                                 0,
	                                 0,
	                                 0,
	                                 0,
	                                 0,
	                                 0,
	                                 1,
	                                 1,
	                                 0,
	                                 0,
	                                 0,
	                                 0,
	                                 1,
	                                 0,
	                                 0,
	                                 0,
	                               ];
	
	
	/*http://10.40.50.14:15501/pls/product-line/line BOH.PL.ProductLineController.line
	 *  http://10.40.189.96:12501/boh/product/common/info  BOH.NM.ProductController.queryCommonProductInfos
	 *请求链接
	 */
	BOX.DBS.APPS.REQUEST.URLS = [ 
	                             "http://public-api.nj.box-tnt.tuniu.org/box/scanner/exceptionTask/",
	     						 "http://10.40.50.14:15501/pls/product-line/line/*BOH.PL.ProductLineController.line*/", 
	    				         "http://public-api.bj.pga.tuniu.org/pga-web/nws/order/detail/queryById",
	    				         "http://10.40.189.96:12501/boh/product/common/info/*BOH.NM.ProductController.queryCommonProductInfos*/",
	    				         "http://nebula.tuniu.org/nebula-app/crm-outer/querySalerId.htm", 
	    				         "http://public-api.nj.ord.tuniu.org/srh/Test/Thunder?orderId=",
	    				         "http://public-api.nj.ord.tuniu.org/srh/saler/runphp",
	    				         "http://public-api.nj.ord.tuniu.org/srh/FastAuto/ExeSql",
	    				         "http://10.40.50.14:15501/pls/product-type/root/*BOH.PL.ProductTypeController.root*/",
	    				         "http://10.40.50.11:15501/pls/product-type/sub/*BOH.PL.ProductTypeController.sub*/",
	    				         "http://10.40.189.107:15501/pls/product-type/destclass/*BOH.PL.ProductTypeController.destClass*/",
	    				         "http://10.40.189.102:15501/pls/dest-class/destgroup/*BOH.PL.DestClassController.destGroup*/",
	    				         "http://10.40.189.102:15501/pls/product-dest-name/query/*BOH.PL.ProductDestNameController.query*/",
	    				         "http://10.40.50.14:15501/pls/product-line/bookcity/*BOH.PL.ProductLineController.bookCity*/",
	    				         "http://protected-api.oa.tuniu.org/api",
	    				         "http://protected-api.oa.tuniu.org/api",
	    				       ];
	/*
	 *请求参数 
	 * 可加入多行注释 
	 */
	BOX.DBS.APPS.REQUEST.PARAMS = [ 
	                               ["/*将订单号贴入URL后面提交即可，订单号间用‘,’隔开*/"],
	     						   [ "{\"productLineIds\":[1424039]}" ], 
	    						   [ "{\"orderId\":410728634}" ] ,
	    						   ["{\"productQueryVo\":[{\"productId\":5778555}],\"requestSourceCode\":null,\"marketChannelCode\":100}"],
	    						   ["{\"func\":\"querySalerId\",\"params\":{\"custId\":47218997}}"],
	    						   ["/*将订单号贴入URL后面提交即可，返回结果不会有任何显示(可打开console查看);若有多个订单，请将订单号替换掉此处内容，订单号间用‘,’隔开，点击批量执行*/"],
	     						   [ "echo 2;" ],
	     						   ["{\"select\":\"select count(1) from order_pool where dispatch_times<5 and need_pulled=1 and delayed_time <now()/*select count(1) from order_pool where dispatch_times>=5 and need_pulled=1 and add_time >='2016-05-10 00:00:00'*/\"}"],
	     						   ["{\"productTypeId\":\"\",\"productTypeName\":\"\",\"start\":\"\",\"limit\":\"\"}"],
	     						   ["{\"productTypeId\":\"\",\"start\":\"\",\"limit\":\"\"}"],
	     						   ["{\"productTypeId\":\"25/*二级品类ID*/\",\"start\":\"\",\"limit\":\"\"}"],
	     						   ["{\"typeId\":\"25/*二级品类id*/\", \"destClassId\":\"8/*目的地分类id*/\", \"destClassName\":\"\", \"start\":\"\", \"limit\":\"\" }"],
	     						   ["{\"subTypeId\": 0,\"destClassId\": 8,\"destGroupId\": 205,\"bookCityCode\": 200}"],
	     						   ["{\"bookCityName\":\"\"}"],
	     						   ["{\"subSystem\":\"crm\",\"key\":\"254f1f45891bc9ee\",\"data\":{\"service\":\"tuniu_view\"}}"],
	     						   ["{\"subSystem\":\"crm\",\"key\":\"254f1f45891bc9ee\",\"data\":{\"service\":\"query_all_sales\"}}"],
	    						 ];