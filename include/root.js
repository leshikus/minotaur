// Configuration
var imageDir = 'images/',
	defaultMenuTarget = '_blank',
	mail = 'alexei.fedotov@gmail.com',
	rootDir = '';

// System variables
var navie = (navigator.appName == "Microsoft Internet Explorer"),
	doctext = '',
	square = ' width="30" height="30">', tdSquare  = '</td><td' + square,
	numBut = 0,
	relImageDir, tdLeftHalfSphere, tdRightHalfSphere;

String.prototype.attr = function(val) {
	return ' ' + this + '= "' + val + '"';
}

String.prototype.activeLink = function(content, target) {
    var a, sl;
    sl = "P" + numBut + "But.src";
    a = '<img src="' + relImageDir + 'empty.gif" name=P'
        + (numBut++) + 'But border="0" width="20" height="25" alt="bullet">'
        + '<a href="' + this.setDefaultTarget(target) 
        + '" onMouseOver="' + sl + "='" + relImageDir + "trv.gif'"
        + '" onMouseOut="'  + sl + "='" + relImageDir + "empty.gif'"
        + '" onMouseDown="' + sl + "='" + relImageDir + "trc.gif'"
        + '" style="vertical-align: bottom">' + content + '</a>';
//    alert(a);
    return a;    
}

String.prototype.trim = function()
{
	return this.replace(/^\s*|\s*$/, '');
}

String.prototype.commasplit = function()
{
	var arr = this.split(',');
	for (i in arr) arr[i] = arr[i].trim();
	return arr;
}

function addImage(src, alt)
{
	doctext += '<img border="0" src="' + relImageDir + src + '" alt="' + alt + '"' + square;
}

function addMenuItem(href, text, desc)
{
	if (desc == null) desc = '';
    doctext += '<tr><td></td><td></td><td height="30"' 
        + ((/(\d+[KM])/i.test(desc)) ? ' class="folder">' + RegExp.$1 : '>')
        + '</td><td></td><td><nobr><a href="' + href
        + '" target="' + defaultMenuTarget + '">&nbsp;' + text + '</a></nobr>' + tdSquare + '</td></tr>';
}

function addMenuTitle(text)
{
    doctext += '<tr>' + tdLeftHalfSphere + '<td colspan="4" style="text-align: center" bgcolor="black">' + '<font color="white"><nobr>' + text + '</nobr></font>' + tdSquare  + '<a href="#top">';
    addImage('goup.gif', 'top');
	doctext += '</a></td>' + tdRightHalfSphere + '</tr>';
}

function addMenuHeader(head, epi)
{
	doctext += '<div align="center"><table cols="7" width="500"><tr><td width="18"></td><td width="30"></td><td width="30"></td><td width="30"></td><td width="344"></td><td width="18"></td><td width="18"></td></tr>';
    doctext += '<tr><td colspan="7" class="right-ref">[<a name="top" href="' + rootDir + 'index.html" target="_top">home</a>] [<a href="mailto:' + mail + '">mail</a>]</td></tr>';

	if (epi != null) doctext += '<tr><td colspan="4"></td><td colspan="3" align="right">' + epi + '</td></tr>';
	doctext += '<tr><td colspan="7" style="text-align: center"><h2>' + head + '</h2></td></tr>';
}

function setRootDir(dir)
{
	rootDir = dir;
	relImageDir = rootDir + imageDir;
	tdLeftHalfSphere = '<td><img src="' + relImageDir
	    + 'sphhrf.gif" width="18" height="30"></td>';
	tdRightHalfSphere = '<td><img src="' + relImageDir
	    + 'sphhlf.gif" width="18" height="30"></td>';
}

function addMenuFooter()
{
	doctext += '<tr><td colspan="7" class="right-ref">[<a href="#top">top</a>] [<a href="' + rootDir + 'index.html" target="_top">home</a>]</td></tr></table></div>';
	flush();
}


function makeSection(name){
    doctext += '<tr height="30"><td bgcolor="black" width="202" height="30"><font color="white"><nobr>&nbsp;&nbsp;' + name + '</nobr></font></td>' + tdRightHalfSphere + '</tr>';
}

function SetDefaultTarget(target) {
  targetstr = "\" target=\"";
  if (this.indexOf(targetstr) == -1) {
    return this + targetstr + target;
  } else {
    return this;
  }
}
String.prototype.setDefaultTarget = SetDefaultTarget;

function addItem(hypref, txt){
  doctext += '<tr><td colspan="2">' + hypref.activeLink(txt, "text") + "</td></tr>";
}

function makeSectionR(name){
  doctext += '<tr>' + tdLeftHalfSphere + '<td bgcolor="black" width="184"><font color="white"><nobr>' + name + '</nobr></font></td>' + tdRightHalfSphere + '</tr>';
}

function addItemR(hypref, txt){
  doctext += '<tr><td colspan="3">' + hypref.activeLink(txt, "_top") + "</td></tr>";
}

function addItemS(hypref, txt){
  doctext += '<nobr>' + hypref.activeLink(txt, "text") + "</nobr> ";
}

function docReload(){
	self.location.reload();
}


function init(){
	var version = navigator.appVersion.split(' ');
	version = parseFloat(version[0]);
	if ((navigator.appName == 'Netscape') && (version < 4.5)) window.onresize = docReload;
}

/*
function qq(s)
{
	return "'" + s.replace(/(\\|\'|\")/gi, "\\$1") + "'";
}
*/

function writediv(s, div, win) {
	if (!win) win = self;
	if (navie) win[div].innerHTML = s;
	else with (win.document[div].document) {
	  open();
	  write(s);
	  close();
	}
}

function flush() {
	document.write(doctext);
	doctext = '';
}

onload = init;
setRootDir(rootDir);


