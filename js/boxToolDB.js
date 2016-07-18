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
	                             ];

	/*
	 *请求名称 
	 */
	BOX.DBS.APPS.REQUEST.NAMES = [
	                              "示例1",
	                              "示例2"
	                              ];
	/*
	 * 请求方式
	 * 0-get,1-post
	 */
	BOX.DBS.APPS.REQUEST.METHODS = [ 
	                                 0,
	                                 0,
	                               ];
	
	
	/*http://10.40.50.14:15501/pls/product-line/line BOH.PL.ProductLineController.line
	 *  http://10.40.189.96:12501/boh/product/common/info  BOH.NM.ProductController.queryCommonProductInfos
	 *请求链接
	 */
	BOX.DBS.APPS.REQUEST.URLS = [ 
	                             "http://public.org/boxTest",
	     						 "http://public.org/boxTest",
	    				       ];
	/*
	 *请求参数 
	 * 可加入多行注释 
	 */
	BOX.DBS.APPS.REQUEST.PARAMS = [ 
	                               ["/*hello hexo*/"],
	     						   [ "{\"hello\":[hexo]}" ], 
	    						 ];