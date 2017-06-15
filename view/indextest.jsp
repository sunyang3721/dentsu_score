<%@ page language="java" import="java.util.*" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>  
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>CreativeLib</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">    
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
<link rel="stylesheet" type="text/css" href="styles.css">
-->

</head>
<body>
<table border="1">
<tbody>
<tr>
<th>编 码</th>
<th>短 名</th>
<th>邮 箱</th>
<th>姓 名</th>
</tr>
<c:if test="${!empty springTestList }">
<c:forEach items="${springTestList}" var="list">
<tr>
<td>${list.m_userIndex}</td>
<td>${list.m_userId}</td>
<td>${list.m_userEmail}</td>
<td>${list.m_userName}</td>
</tr>                
</c:forEach>
</c:if>
</tbody>
</table>
</body>
</html>
