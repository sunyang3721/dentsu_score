<?php
namespace Home\Controller;

use Think\Controller;

class CommonController extends Controller
{
    public function _initialize()
    {	
    	$conn = @ldap_connect('192.168.245.30');
		$username = 'ysun11';
		if(!$username){
			return false;
		}
		ldap_set_option($conn, LDAP_OPT_PROTOCOL_VERSION, 3);
		ldap_set_option($conn, LDAP_OPT_REFERRALS, 0);
		ldap_bind($conn,'AP-MEDIA\ysun11','Admin5188');
		$dn = "dc=ap,dc=media,dc=global,dc=loc";
		$filer = "(&(objectClass=user)(objectCategory=Person)(sAMAccountName=$username))";

		$res = ldap_search($conn,$dn,$filer,array('extensionattribute5','name','mail','givenName','msDS-PrincipalName','displayname','sAMAccountName'));

		$info = ldap_get_entries($conn, $res);
		echo 'mail:'.$info['0']['mail']['0'];
		echo '<br/>';
		echo '员工编号：'.$info['0']['extensionattribute5']['0'];
		echo '<br/>';
		echo '姓名：'.$info['0']['displayname']['0'];
		echo '<br/>';

		echo "<pre>";
		var_dump($info['0']);
		echo "</pre>";
    }
}