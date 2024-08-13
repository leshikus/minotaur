//
//		Note: last symbol on the screen is taken from the fixed 
//		position from the beginning of the text
//  	add/remove symbols to make it space
//

// Global Variables
var itemNum = 0, scrnTag = new Array()
// Constants
var initW = 515, picW = 30

var	fin,
	ie = (navigator.appName == "Microsoft Internet Explorer"),
	itemW = initW - picW,
	subItemW = itemW - picW

function ww(w)
{
	return (w)? (' width="' + w + '">') : '>'
}

var	picparam = ' height="30"' + ww(picW), tdpic = "<tr><td" + picparam

function begtable(w)
{
	return '<table cols="2"' + ww(w)+"<tr><td" + ww(picW) + "</td><td" + ww(w - picW) + "</td></tr>"
}

function outTag()
{
	var lnk = "<a href='javascript:void(scrnRefresh(" + this.num + "))' onMouseOver=\"self.status = '" + ((this.active)? "shrink": "expand") + "'; return true\">"
	return tdpic + lnk + mkPic((this.active)? "minus": "plus") + "</a></td><td>" + lnk + this.tag + "</a></td></tr>\n"
}

function hr(w)
{
	return  "</td></tr>\n" + tdpic + mkPic("angle") + "</td><td" + ww(w) + '<hr color="black" size="1" width="' + w + '"></td></tr>\n'
}

function thidden(s)
{
	return '<tr><td class="vertical"' + ww(picW) + "&nbsp;</td><td>" + s
}

function scrnInit() 
{
  var i
  self.defaultStatus = ""
  for (i=0; i<itemNum; i++) scrnActive[i] = 0
  document.write('<body>\n<div id="scrndiv" style="margin-left: auto; margin-right:auto; width: ' + initW + 'px;"></div>\n</body>')
  onload = scrnRefresh
}

function drawText() 
{
	return '<tr><td colspan="2">' + this.text + "</td></tr>"
}

function objText(text) 
{
	this.text = text
	this.draw = drawText
	scrnTag[itemNum++] = this
}

function mkPic(name) 
{
	return '<img src="' + relImageDir + 'actscrn/' + name + '.gif" border="0"' + picparam
}

function drawItem() 
{
  var res = fin + this.outtag() 
  if (this.active) {
  	fin = hr(itemW)
  	return res + this.hidden
  }
  else
  {
  	fin =  ""
  	return res
  }
}
                         
function objItem(tag, hidden) 
{
	this.hidden = thidden(hidden)
	this.draw = drawItem
	this.active = 0
	this.num = itemNum
	this.tag = tag
	this.outtag = outTag
	scrnTag[itemNum++] = this
}

function drawSubItem() 
{
  return (fin)? (begtable(itemW) + this.outtag() + ((this.active)? this.hidden + hr(subItemW): "") + "</table>"): ""
}

function objSubItem(tag, hidden) 
{
	this.hidden = thidden(hidden)
	this.draw = drawSubItem
	this.active = 0
	this.num = itemNum
	this.tag = tag
	this.outtag = outTag
	scrnTag[itemNum++] = this
}

function scrnText(text) 
{
	new objText(text)
}

function scrnItem(tag, hidden) 
{
	new objItem(tag, hidden)
}

function scrnSubItem(tag, hidden) 
{
	new objSubItem(tag, hidden)
}

function scrnClose() {}

function scrnRefresh(iNm) 
{
  if (!isNaN(iNm)) scrnTag[iNm].active ^= 1
  fin = ""
  var s = begtable(initW), i
  for (var i=0; i<itemNum; i++) s += scrnTag[i].draw()
  s += fin + "</table>"
  document.getElementById("scrndiv").innerHTML = s
}

