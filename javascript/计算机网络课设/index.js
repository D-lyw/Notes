
/**
 * [obj_mac 一个mac封装帧对象]
 * @type {Object}
 */
var obj_mac = {
		target_mac: '',
		target_binary: '',
		source_mac: '',
		source_binary: '',
		length_type: '',
		data_convery: '',
		data_binary: '',
		padding: false,
		fcs: ''
};

/**
 * [Mac_List 生成的mac帧数组]
 * @type {Array}
 */
var Mac_List = [];







/**
 * @author [D-lyw] 
 * @description [判断输入的内容格式是否正确]
 * @return {Boolean} [true 格式正确]
 */

function JudgeFormat() {

	// 获取输入的值
	var msg_target = document.getElementById('input_target').value;
	var msg_source = document.getElementById('input_source').value;
	var msg_data   = document.getElementById('text_data').value;

	console.log(msg_target, msg_source, msg_data);

	// 检测是否输入地址
	if(msg_source == '' || msg_target == ''){
		alert("数据未填写完整!");
		return false;
	}

	// 通过正则表达式检测输入Mac帧的格式是否正确
	var judgeMac = /^[a-fA-F0-9]{2}(:[a-fA-F0-9]{2}){5}$/i ;

	var judgeData = /[^a-fA-F0-9\s\n]/ig;

	if(!judgeMac.test(msg_target) || !judgeMac.test(msg_source)){
		alert("Mac帧格式输入错误!");
		return false;
	}

	if(judgeData.test(msg_data)){
		alert("传输的Data部分格式错误!");
		return false;
	}

	// if(msg_data.length > 3000){
	// 	alert("传输的Data超过最大的范围!");
	// 	return false;
	// }

	obj_mac.target_mac = msg_target;
	obj_mac.source_mac = msg_source;

	obj_mac.target_binary = AnalysisMac(msg_target);
	obj_mac.source_binary = AnalysisMac(msg_source);

	alert("格式正确");
		DealData();
	$("#makeCRC").attr('disabled',false);

	return true;
}



/**
 * [changeToBinary 将输入的一位１６进制位转换过成４位２进制位]
 * @param  {[string]} str [	一位16进制位]
 * @return {[string]} Binary [４位二进制位]
 */
function changeToBinary(str) {
	
	var Binary = parseInt(str, 16).toString(2);

	Binary = ( "0000" + Binary ).substring( Binary.length);

	return Binary;
}


/**
 * [changeToHex 将输入转成十六进制]
 * @param  {[type]} str [输入的二进制]
 * @return {[string]} Hex [输出的十六进制]
 */
function changeToHex(str){
	var length = str.length;
	var Hex = '';
	for(var i = 0; i < length; i = i + 4){
		var changestr = str.substr(i, 4);
		Hex += parseInt(changestr,2).toString(16);
	}
	return Hex;
}


/**
 * @author [D-lyw]
 * @description [将 16进制的Mac地址转为二进制字符串]
 * @param {[string]} [str_mac] [Mac address]
 * @return {[string]} [2进制Mac地址]
 */
function AnalysisMac(str_mac) {

	// 去除冒号
	var mac_12 = str_mac.replace(/[:\s]/g, "");

	// 将１６进制字符串转成　２进制字符串
	var BinaryMac = "";
	var length = mac_12.length;
	for(var i = 0; i < length; i++){
		BinaryMac += changeToBinary(mac_12.charAt(i));
	}

	return BinaryMac;
}



/**
 * @author [D-lyw]
 * @description [将 输入的Data转为二进制字符串]
 * @param {[string]} [输入的十六进制Data字符串]
 * @return {[string]} [2进制Data字符串]
 */
function AnalysisData(str_data) {

	// 删除字符串中可能存在的的空格，换行
	str_data = str_data.replace(/[\s\n]/g, "");

	var BinaryData = "";
	var length = str_data.length;
	for(var i = 0; i < length; i++){
		BinaryData += changeToBinary(str_data.charAt(i));
	}

	return BinaryData;
}


/**
 * [DealData 处理输入的data格式]
 */
function DealData() {

	var data = $("#text_data").val();
	data = data.replace(/[\s\n]/g, "");

	console.log(data.length);
	if(data.length <= 3000){
		console.log("xiaoyu 3000");
		// 记录输入数据的长度
		var data_binary_length = (Math.ceil(data.length / 2)).toString(2).length;

		obj_mac.length_type =('0000000000000000'+(Math.ceil(data.length / 2)).toString(2)).substring(data_binary_length);

		obj_mac.data_convery = data;

		obj_mac.data_binary = AnalysisData(data);

		// 判断传输部分的长度是否大于或等于46 Byte
		obj_mac.padding = false;

		if(data.length < 92){
			obj_mac.padding = true;

			// padding data
			for(var i = data.length + 1; i <= 92; i++){
				obj_mac.data_binary += '0000';
			}
		}
		console.log(obj_mac);
	}
	else if(data.length > 3000){
		console.log(data.length);
		for(var i = 0; i < data.length; i = i + 3000){
			var mac_list = {
						length_type: '',
						Mac_length: 0,
						data_convery: '',
						data_binary: '',
						padding: false,
						fcs: '',
						next: false,
				};
			if(i+3000 <= data.length){
				
				mac_list.data_convery = data.substr(i, 3000);
				console.log(data.substr(i, 3000))
				mac_list.data_binary = AnalysisData(data.substr(i,3000));
				mac_list.Mac_length = Math.ceil(mac_list.data_convery.length / 2);
				console.log(mac_list.Mac_length);
				data_binary_length = mac_list.Mac_length.toString(2).length;
				mac_list.length_type = ('0000000000000000'+(Math.ceil(mac_list.Mac_length)).toString(2)).substring(data_binary_length);
				mac_list.padding = false;

				mac_list.next = true;

				Mac_List.push(mac_list);

			}else{
				mac_list.data_convery = data.substring(i);
				mac_list.data_binary = AnalysisData(mac_list.data_convery);
				mac_list.Mac_length = Math.ceil(mac_list.data_convery.length / 2);
				data_binary_length = mac_list.Mac_length.toString(2).length;
				mac_list.length_type = ('0000000000000000'+(Math.ceil(mac_list.Mac_length)).toString(2)).substring(data_binary_length);
				mac_list.next = false;

				if (mac_list.Mac_length < 46) {
					mac_list.padding = true;

					for(var i = mac_list.Mac_length + 1; i <= 46; i++){
						obj_mac.data_binary += '00000000';
					}
				}
				Mac_List.push(mac_list);
			}
		}
		console.log(Mac_List);
		console.log(Mac_List[0].Mac_length);
	}

	console.log(obj_mac);
}




/**
 * @author [D-lyw]
 * @description [通过循环冗余算法（CRC）生成帧检测序列(FCS)]
 * @param {[null]}
 * @return {[string]} [CRC string]
 */
function GetCRC() {
	// cdc校验范围包括源地址字段，目的地址字段，长度字段和数据字段
	// 帧数据字段的最小长度为46B。如果帧的LLC数据少于46B，则应将数据字段填充至46B

	document.getElementById("msg_show_list").innerHTML = '';

	$("#msg_show_list").append("<h5>开始获取二进制TargetMac地址.....</h5>")
	$("#msg_show_list").append("<p>"+obj_mac.target_mac+" &nbsp;&nbsp;&nbsp; ---> &nbsp;&nbsp;&nbsp; "+obj_mac.target_binary+"</p>");

	$("#msg_show_list").append("<p>开始获取二进制SourceMac地址...</p>");
	$("#msg_show_list").append("<p>"+obj_mac.source_mac+" &nbsp;&nbsp;&nbsp; ---> &nbsp;&nbsp;&nbsp; "+obj_mac.source_binary+"</p>");

	$("#msg_show_list").append("<p>开始检测传输部分的Data长度...</p>");



	if (obj_mac.padding) {
		$("#msg_show_list").append("<p>传输部分的Data长度不足最小长度46Byte, 已自动为其填充</p>");
	}else if(Mac_List.length == 0){
		$("#msg_show_list").append("<p>传输部分的Data长度满足条件,开始转换.....</p>");
	}else if(Mac_List.length !=0){
		$("#msg_show_list").append("<p>传输部分的Data长度超过1500字节,将自动为期进行分片处理,开始转换.....</p>");
	}

	if(Mac_List.length == 0){
		$("#msg_show_list").append("<p style='overflow:auto;word-break:break-all'>"+obj_mac.data_convery+"</p>");
		$("#msg_show_list").append("<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-------->></p>"); 
		$("#msg_show_list").append("<p style='overflow:auto;word-break:break-all'>"+obj_mac.data_binary+"</p>");

		$("#msg_show_list").append("<h5>下列二进制串将进行CRC算法，生成FCS</h5>");
		$("#msg_show_list").append("<p style='overflow:auto;word-break:break-all'>"+ obj_mac.target_binary+obj_mac.source_binary+obj_mac.length_type+obj_mac.data_binary+"</p>");
		

		$("#msg_show_list").append("<p>-----------------------------------------------------------------------------------------------------------------------------------------</p>");
		$("#msg_show_list").append("<p>生成多项式G（X）=X8+X2+X1+1       ---->   除数 100000111</p>")
		$("#msg_show_list").append("<p>被除数左移8位 开始运算</p>");

		reminder = CRC(obj_mac.target_binary, obj_mac.source_binary,obj_mac.length_type, obj_mac.data_binary);
		obj_mac.fcs = '000000000000000000000000' + reminder;
		Mac_List = [];
		Mac_List.push(obj_mac);

		obj_mac = {};

		$("#msg_show_list").append("<p>.............................</p>");
		$("#msg_show_list").append("<p>.............................</p>");
		$("#msg_show_list").append("<p>.............................</p>");

		$("#msg_show_list").append("<p>最后获取的8位余数为: "+reminder+"</p>");
	}else{
		for(var i = 0; i < Mac_List.length ; i++){
			console.log(Mac_List[i].Mac_length);
			$("#msg_show_list").append("<br><p style='overflow:auto;word-break:break-all'>第"+ (i+1) +"片长度为:"+Mac_List[i].Mac_length+"B</p>");
			$("#msg_show_list").append("<p style='overflow:auto;word-break:break-all'>开始CRC运算...</p>");
			var reminder = CRC(obj_mac.target_binary, obj_mac.source_binary, Mac_List[i].length_type, Mac_List[i].data_binary);
			Mac_List[i].fcs = '000000000000000000000000' + reminder;
			$("#msg_show_list").append("<p>.............................</p>");
			$("#msg_show_list").append("<p>.............................</p>");
			$("#msg_show_list").append("<p>.............................</p>");

			$("#msg_show_list").append("<p>最后获取的8位余数为: "+reminder+"</p>");
		}
	}



	console.log(Mac_List);
	console.log("IEEE 802.3帧封装成功！");

	$("#msg_show_list").append("<h6>注：每一步的商，以及对应的余数，可在浏览器的控制台中查看.</h6>");


	CleanInput();
}



function CleanInput(){
	$("#input_target").val('');
	$("#input_source").val('');
	$("#text_data").val('');

	$("#table_mac").text('');
	if(Mac_List.length <= 1){
		for(var i = 0; i < Mac_List.length; i++){
			$("#table_mac").append("<tr><td class='td_table' onclick='ShowClickMsg(1)'>"+Mac_List[i].target_mac+"</td><td class='td_table' onclick='ShowClickMsg(2)'>"+Mac_List[i].source_mac+"</td><td class='td_table' onclick='ShowClickMsg(3)'>"+Mac_List[i].length_type+"</td><td class='data_byte_num td_table' onclick='ShowClickMsg(4)'>"+(Mac_List[i].data_binary.length/8)+"B</td><td class='td_table' onclick='ShowClickMsg(5)'>"+Mac_List[i].fcs+"</td></tr>")
			if(Mac_List[i].padding){
				$(".data_byte_num").text("Padding(46B)");
			}
		}
		
		var i = Mac_List.length - 1;
		$("#show_data_binary").text('');
		$("#show_data_binary").append('<span class="p1 show_tip">'+Mac_List[i].target_binary+'</span><span class="p2 show_tip">'+Mac_List[i].source_binary+'</span><span class="p3 show_tip">'+Mac_List[i].length_type+'</span><span class="p4 show_tip">'+Mac_List[i].data_binary+'</span><span class="p5 show_tip">'+Mac_List[i].fcs+'</span>')

		$("#show_data_ox").text('');
		$("#show_data_ox").append('<span class="p1 show_tip">'+Mac_List[i].target_mac.replace(/[:]/g,'')+'</span><span class="p2 show_tip">'+Mac_List[i].source_mac.replace(/[:]/g, '')+'</span><span class="p3 show_tip">'+changeToHex(Mac_List[i].length_type)+'</span><span class="p4 show_tip">'+changeToHex(Mac_List[i].data_binary)+'</span><span class="p5 show_tip">'+changeToHex(Mac_List[i].fcs)+'</span>')
	
	}else{
		for(var i = 0; i < Mac_List.length; i++){
			$("#table_mac").append("<tr><td class='td_table' onclick='ShowClickMsg(1)'>"+obj_mac.target_mac+"</td><td class='td_table' onclick='ShowClickMsg(2)'>"+obj_mac.source_mac+"</td><td class='td_table' onclick='ShowClickMsg(3)'>"+Mac_List[i].length_type+"</td><td class='data_byte_num td_table' onclick='ShowClickMsg(4)'>"+(Mac_List[i].data_binary.length/8)+"B</td><td class='td_table' onclick='ShowClickMsg(5)'>"+Mac_List[i].fcs+"</td></tr>")
			if(Mac_List[i].padding){
				$(".data_byte_num").text("Padding(46B)");
			}
			if(i == 0){
				$("#name_1").text("第"+(i+1)+"片MAC帧");
				$("#show_data_binary").text('');
				$("#show_data_binary").append('<span class="p1 show_tip">'+obj_mac.target_mac.replace(/[:]/g,'')+'</span><span class="p2 show_tip">'+obj_mac.source_mac.replace(/[:]/g, '')+'</span><span class="p3 show_tip">'+changeToHex(Mac_List[i].length_type)+'</span><span class="p4 show_tip">'+changeToHex(Mac_List[i].data_binary)+'</span><span class="p5 show_tip">'+changeToHex(Mac_List[i].fcs)+'</span>')
			}else{
				$("#name_2").text("第"+(i+1)+"片MAC帧");
				$("#show_data_ox").text('');
				$("#show_data_ox").append('<span class="p1 show_tip">'+obj_mac.target_mac.replace(/[:]/g,'')+'</span><span class="p2 show_tip">'+obj_mac.source_mac.replace(/[:]/g, '')+'</span><span class="p3 show_tip">'+changeToHex(Mac_List[i].length_type)+'</span><span class="p4 show_tip">'+changeToHex(Mac_List[i].data_binary)+'</span><span class="p5 show_tip">'+changeToHex(Mac_List[i].fcs)+'</span>')			}
		}


	}

	obj_mac = {};
	Mac_List = [];
}





/* 测试用例

80:ad:16:4d:02:d5
cc:b0:da:c5:02:4d

450000340000400033064f706866a35dc0a82be8
ccb0dac5024d80ad164d02d50800450000340000
400033064f706866a35dc0a82be801bbdaeb4965
a5defa7b245b801272101a2b0000020405640101
04020103

ff:ff:ff:ff:ff:ff
80:ad:16:4d:02:d5

4500058c147640008006876dc0a82be80dfa5efe
80ad164d02d5ccb0dac5024d08004500058c1476
40008006876dc0a82be80dfa5efeddfe01bbbebe
639e9628e23b501000ff93880000a9c215dd8041
f85b221f31864f08e90c2e3511afe2e0feaebbfd
66dfe3c374488c53bd8a4114f868c52b168dea8c
6cab7e3c2ae8223481f690e763db14ee4522b14d
17982f664a860f1b8999bb42c34c761550fd8069
c8bc3cdbedea2744a8eed969e062d1045961a68d
01703a79defdd035848cc6d22a85edd37935c398
5c9524d53642001ade8ee3ad68401f4306118e66
89727b0a2ce8846073aed6a5ce1681d8b4a8d437
e40a4f2b5dddc6019bd69cd04cab581e4152dbcb
c602b2c7ab1614db4b6be288ef1be3cd9c823ca0
ebb28ab81037bd17a969a24a51e9e8f7505ed5cb
aa1ef5a4bce385b0dbecd73f69fa7dedf33b6429
0ec9a6453fda469df6009f7b54d32b3ebf52db69
6c8146755dde2bf5f7be7e5627053644d7eee685
3b4cb25bd2226a204d3497ae3e1fa3369155848d
3013c35101bb3f15d36eb28b5c47462b06a733eb
301ffb0de35e0d408c416aa5d0a1bd8458c15138
19434ce863ae9c88eace27cc39611d5313caf4ba
f7990e16a11e94ebf6e2e11d862db90614bb797c
afc1a7f47789bdba27420ede2b43bba8475d16c7   
d1034616cb808ecf04cfee0f11700845c1d542f9
ac2ee065691f76297312de9e1a002efbee4d6db5
f0bc36671aa4e2ff1e97af51a02701bdd88ad1cb
305cd51faf54014ef1335a0b0c4c7bed7c6d5766
1f68a7829814acde1473cf12c6d7a28f92c8945a
c43590702bd94396e9fef7675de26d9671cd3c56
9ec15e2cac96632893287581bfdae902568db12c
6af28a8cb2527de5dde03d9290955510667e9894
e1a7e39aa6ea62e25d5c028f0b373579a633efd2
acb374e8c71ef503c1d367dcee1838234c957d36
37068115c5170ae5afd41903c80ee406156fbd2a
5213b277737644545c0ea207ba9322896dd744b7
700deb6da6c62d9bbedccd0e9f14c0536c523238
ea558699aeb83d9d2b12a95cfa0a8b2ed46ca90f
1c72b320de91259fc2f1965dd69642c1aab2ddce
096c765b965c25c4d4317d019eb721b469612d7c
969eaab22a16e19746d8a1a4cbc301a7744367aa
bdb40b1576e78ea3d88f4b6aaaec7bd85436c523
c069bb8f7522ec22b60f5e152eee2e83f66a0b3b
c978b1a3ffbee17af31ba345f9a07ddcfbd4c366
6db3f04faa038aa3a98db251b7ca70bb7cf5492d
72c71154cdcc9a3046827149b65d0770cbfda99c
046180e77fa67733203d4900277407340c4e8f4c
750c44bacda15ba0c57b39b7443795398a3918d0
34a72c6f352128637158f9ec8e9a95b66a4f7282
2d9268b3b9923071b7a19d7454ecaa2ae9e8537c
46464bd4fca19dd51c5f89b5211a1ad78d7ab486
43a052db676cc169945b05ec6b769ffd1da7a52c
b3acb078ba5a969263c015dd856e0b9a3f2e8866
06aa10cd1e56a755d913fb78015b4d3111028bbe
5f941eabfe49fcb2f62d59fd1509510010313b3f
a4bbbfd8ea6149756ae751a7e943868e602b3975
fa139b34cca075d83f103639f79d34e4d937e4e0
220d7dc42c43f48f9a1ab0c35d7618e5715506c3
4880c63ec28f85de430887b691b950dac0bd3c63
555510718053f2589c163def91d1a8ac1aac0e86
aa985da9aec0adb0c2b300558e8a599b1f8fde92
1af001805673095455fdf7564934a3ef1d62daa2
924899e1747d158d37fa1c990d85a89c4f04b8ff
8132df33cd4543e05d99ddde208b2ac016d90269
d736b51dce71f0a2c67d7282640107a1e25831ff
f562e3cb671d6f38eb6ce67e14103a39ba20e159
0919e31114b33266f46d00fa304c9c4a53099f9b
500c9f833b700ac0504b9ad1370ccb0201207e77
68acc7ae82b336203e09468ce1544bbf80237e0a
fb384bad4dd3c9e4205fcd1d459a597d27e5e64f
c56f9046dda4b4a7f0ee018254925ce9ffd5dd8d
9e324cf4433793da8347ec04d399bfa618864c86
df2104b49aa8c718d2caee9149cd
*/








/**
 * [CRC getCRC]
 * @param {string} target_binary [目的mac地址]
 * @param {string} source_binary [源mac地址]
 * @param {string} length_type   [长度部分]
 * @param {string} data_binary   [数据部分]
 */
function CRC(target_binary, source_binary, length_type, data_binary){
	var CRC_data_binary = target_binary + source_binary + length_type + data_binary + '00000000';
	// 
	var divisor = '100000111', divisor_num = parseInt(divisor, 2);
	// 商
	var quotient = [];
	// 余数
	var reminder = CRC_data_binary.substr(0, 8);

	for(var point = 8;point < CRC_data_binary.length ; point++){
		reminder = reminder + CRC_data_binary.charAt(point);
		if(reminder.charAt(0) == 1){
			if(reminder.length == 9){
				quotient[point] = 1;
		        // 转换为10进制 进行异或运算
				reminder = (divisor_num ^ parseInt(reminder, 2)).toString(2);
				console.log(point+"   商 "+ 1 +",当前得余数为 "+ reminder);		
			}else{
				quotient[point] = 0;	
				console.log(point+"   商 "+ 0 +",当前得余数为 "+ reminder);
			}
		}
		else{		
			quotient[point] = 0;
			reminder = reminder.substring(1);
			console.log("商 "+ 0 +",当前得余数为 "+ reminder);
		}
	}
	console.log(quotient);
	console.log("最后的余数: " + reminder);
	reminder = ('00000000'+reminder).substring(reminder.length);

	return reminder;
}



/**
 * [ShowClickMsg 将被点击的部分明显的显示出来]
 * @param {[type]} point [被点击的节点]
 */
function ShowClickMsg(point){
	$('.show_tip').removeClass('show_msg');

	if(point == 1){
		$(".p1").addClass('show_msg');
	}else if(point == 2){
		$(".p2").addClass('show_msg');
	}else if(point == 3){
		$(".p3").addClass('show_msg');
	}else if(point == 4){
		$(".p4").addClass('show_msg');
	}else if(point == 5){
		$(".p5").addClass('show_msg');
	}
}





