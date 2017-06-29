<%@ page language="java" import="java.util.*" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
  String rtnMsg = (String)request.getSession().getAttribute("rtnMsg");
%>
<html>
 <head>
  <title>Identified Error</title>
  <script src="https://cdn.bootcss.com/jquery/2.1.0/jquery.min.js"></script>
  <script type="text/javascript">
 	$(function(){
 		var rtnMsg = '${rtnMsg}';
 		$("#msg").append("<p>" + rtnMsg + "</p>");
 	});
  </script>
 </head>
 <body bgcolor="white">
  <div id="msg"></div>
 </body>
</html>
