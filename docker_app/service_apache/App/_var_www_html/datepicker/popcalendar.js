///   written   by Tan Ling Wee on 2 Dec 2001
//   email : fuushikaden@yahoo.com
//   website : www.pengz.com

//   Rewritten by Ricaute Jiménez Sánchez
//   PopCalendar 2.6.5
//   email : rjimenez@pancanal.com
//   last updated 2 de Junio de 2004

//   Special Characters
//   Correct Parsing Error in .NET
var c_zTilde = unescape("%u017E")
var c_cTilde = unescape("%u010D")
var c_tTilde = unescape("%u0165")
var c_sTilde = unescape("%u0161")
var c_aTilde = unescape('%E4')
var c_STilde = unescape("%u0160")
var c_nTilde = unescape("%F1")
var c_aTilde = unescape("%E1")
var c_eTilde = unescape("%E9")
var c_iTilde = unescape("%ED")
var c_oTilde = unescape("%F3")
var c_uTilde = unescape("%FA")
var c_NTilde = unescape("%D1")
var c_ATilde = unescape("%C1")
var c_ETilde = unescape("%C9")
var c_ITilde = unescape("%CD")
var c_OTilde = unescape("%D3")
var c_UTilde = unescape("%DA")
var c_u2Puntos = unescape("%FC")
var c_a2Puntos = unescape("%E4")

//   Manage Multiples Instance 
var objPopCalList = []
var lPopCalList = -1
var PopCalendar = new PopCalInstance()

function PopCalInstance()
{
   this.newCalendar = getCalendarInstance
}

function getCalendarInstance()
{
   var objPopCalendar = new PoPCalCreateCalendarInstance()

   if (!objPopCalendar.ns4)
   {
      if (objPopCalendar.dom)
      {
         if (lPopCalList==-1)
         {
            PopCalCommonComponents(objPopCalendar);
         }
         objPopCalendar.id = ++lPopCalList
         objPopCalendar.calendarInstance = new PopCalCalendarInstance()
         objPopCalendar.initCalendar = new Function("PopCalInitCalendar(" + lPopCalList + ");")
         objPopCalendar.show = new Function("ctl", "format", "from", "to", "execute", "overwrite", "PopCalShow(ctl, format, from, to, execute, overwrite, " + lPopCalList + ");")
         objPopCalendar.addHoliday = new Function("d", "m", "y", "desc0", "desc1", "PopCalAddHoliday(d, m, y, desc0, " + lPopCalList + ");")
         objPopCalendar.addIrregularHoliday = new Function("s", "dw", "m", "desc0", "desc1", "PopCalAddIrregularHoliday(s, dw, m, desc0, " + lPopCalList + ");")
         objPopCalendar.addSpecialDay = new Function("d", "m", "y", "desc0", "desc1", "PopCalAddSpecialDay(d, m, y, desc0, " + lPopCalList + ");")
         objPopCalendar.addIrregularSpecialDay = new Function("s", "dw", "m", "desc0", "desc1", "PopCalAddIrregularSpecialDay(s, dw, m, desc0, " + lPopCalList + ");")
         objPopCalendar.addRecurrenceSpecialDay = new Function("d", "m", "y", "i", "f", "r", "desc0", "desc1", "PopCalAddRecurrenceSpecialDay(d, m, y, i, f, r, desc0, " + lPopCalList + ");")
         objPopCalendar.formatDate = new Function("dateValue", "oldFormat", "newFormat", "return(PopCalFormatDate(dateValue, oldFormat, newFormat, " + lPopCalList + "));")
         objPopCalendar.addDays = new Function("dateValue", "format", "daysToAdd", "return(PopCalAddDays(dateValue, format, daysToAdd, " + lPopCalList + "))")
         objPopCalendar.forcedToday = new Function("dateValue", "format", "PopCalForcedToday(dateValue, format, " + lPopCalList + ")")
         objPopCalendar.getDate = new Function("dateValue", "dateFormat","return(PopCalGetDate(dateValue, dateFormat, " + lPopCalList + "))")
         objPopCalendar.selectWeekendHoliday = new Function("weekend", "holidays", "PopCalSelectWeekendHoliday(weekend, holidays, " + lPopCalList + ")")
         objPopCalendar.scroll = new Function("PopCalScroll(" + lPopCalList + ");")
         objPopCalendar.hide = new Function("PopCalHideCalendar(" + lPopCalList + ",true)")
         objPopCalList[lPopCalList] = objPopCalendar
      }
   }
   return (objPopCalendar)
}

function PoPCalCreateCalendarInstance()
{
   this.id = 0
   this.startAt = 1 // 0 - sunday, 1 - monday
   this.showWeekNumber = 0 // 0 - don't show, 1 - show
   this.showToday = 1 // 0 - don't show, 1 - show
   this.showWeekend = 0  // 0 - don't show, 1 - show
   this.showHolidays = 1 // 0 - don't show, 1 - show
   this.showSpecialDay = 1 // 0 - don't show, 1 - show
   this.selectWeekend = 0 // 0 - don't Select, 1 - Select
   this.selectHoliday = 0 // 0 - don't Select, 1 - Select
   this.addCarnival = 0 // 0 - don't Add, Add to Holiday (Tuesday)
   this.addGoodFriday = 0 // 0 - don't Add, Add to Holiday
   this.language = 3 // 0 - Spanish, 1 - English, 2 - German, 3 - Slovensky
   this.defaultFormat = "d.m.yyyy" //Default Format
   this.fixedX = -1 // x position (-1 if to appear below control)
   this.fixedY = -1 // y position (-1 if to appear below control)
   this.fade = 0 // 0 - don't fade, .1 to 1 - fade (Only IE) 
   this.shadow = 0 // 0  - don't shadow, 1 - shadow
   this.move = 1  // 0  - don't move, 1 - move
   this.saveMovePos = 0  // 0  - don't save, 1 - save
   this.centuryLimit = 40 // 1940 - 2039
   this.keepInside = 1 // 0 - don't keep inside, 1 - keep inside (Only IE)
   this.addRegularHolidays   = 1
   this.addRegularSpecialDays = 1
   this.showEndOfWeek = null // compatibility version 2.0
   this.selectEndOfWeek = null // compatibility version 2.0
   this.executeFade = true
   this.forceTodayTo = null
   this.forceTodayFormat = null
   this.overWriteSelectWeekend = null
   this.overWriteSelectHoliday = null
   this.overWriteWeekend = null
   this.overWriteHoliday = null
   this.imgDir = "imgs/" // directory for images ... e.g. var imgDir="/img/"
   
   this.gotoString = ""
   this.todayString = ""
   this.weekString = ""
   this.scrollLeftMessage = ""
   this.scrollRightMessage = ""
   this.selectMonthMessage = ""
   this.selectYearMessage = ""
   this.selectDateMessage = ""
   this.monthSelected = null
   this.yearSelected = null
   this.dateSelected = null
   this.omonthSelected = null
   this.oyearSelected = null
   this.odateSelected = null
   this.monthConstructed = null
   this.yearConstructed = null
   this.intervalID1 = null
   this.intervalID2 = null
   this.timeoutID1 = null
   this.timeoutID2 = null
   this.timeoutID3 = null
   this.ctlToPlaceValue = null
   this.ctlNow = null
   this.dateFormat = null
   this.nStartingYear = null
   this.onKeyPress = null
   this.onClick = null
   this.onSelectStart = null
   this.onContextMenu = null
   this.onmousemove = null
   this.onmouseup = null
   this.onresize = null
   this.onscroll = null

   this.ie = false
   this.ieVersion = 0
   this.dom = document.getElementById
   this.ns4 = document.layers
   this.opera = navigator.userAgent.indexOf("Opera") != -1
   
   if (!this.opera)
   {
      this.ie = document.all
      var ms = navigator.appVersion.indexOf("MSIE")
      if (ms>0)
      {
         this.ieVersion = parseFloat(navigator.appVersion.substring(ms+5, ms+8))
      }
   }
   this.dateFrom = 01
   this.monthFrom = 00
   this.yearFrom = 1900

   this.dateUpTo = 31
   this.monthUpTo = 11
   this.yearUpTo = 2099

   this.oDate = null
   this.oMonth = null
   this.oYear = null

   this.countMonths = 12

   this.today = null
   this.dayNow = 0
   this.dateNow = 0
   this.monthNow = 0
   this.yearNow = 0
   
   this.defaultX = 0
   this.defaultY = 0

   this.keepMonth = false
   this.keepYear = false
   this.bShow = false

   this.PopCalTimeOut = null
   this.PopCalDragClose = false

   this.HalfYearList = 5

   this.HolidaysCounter = 0
   this.Holidays = new Array()
   this.movePopCal = false
   this.styleAnchor="text-decoration:none;color:black;cursor:default;"
   this.styleLightBorder="border-style:solid;border-width:1px;border-color:#a0a0a0;"
   this.commandExecute = null
   this.calendarInstance = null
}

function PopCalCalendarInstance()
{
   this.initialized = 0
}

function PopCalCommonComponents(objPopCalendar)
{
   var sComponents = ""
   if (objPopCalendar.ie) sComponents += "<div id='CalendarLoadFilters' Style='z-index:+100000;position:absolute;top:0;left:0;display:none;filter=" + '"' + "alpha() blendTrans()" + '"' + "'></div>"
   if (objPopCalendar.ieVersion>=5.5) sComponents += "<iframe id='popupOverShadow' scrolling=no frameborder=0 style='position:absolute;left:0px;top:0px;width:0px;height:0px;z-index:+10000;display:none;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0)'></iframe>"
   if (((!objPopCalendar.ie)&&(!objPopCalendar.opera))||(objPopCalendar.ieVersion>=5.5))
   {
      sComponents += "<iframe id='popupOverCalendar' scrolling=no frameborder=0 style='position:absolute;left:0px;top:0px;width:0px;height:0px;z-index:+10000;display:none;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);'></iframe>"
      sComponents += "<iframe id='popupOverYearMonth' scrolling=no frameborder=0 style='position:absolute;left:0px;top:0px;width:0px;height:0px;z-index:+10000;display:none;'></iframe>"
   }
   sComponents += "<div id='popupSuperShadowRight' style='z-index:+100000;position:absolute;top:0;left:0;font-size:10px;width:10px;visibility:hidden;background-color:black;' onclick='PopCalCalendarVisible().bShow=true;'></div>"
   sComponents += "<div id='popupSuperShadowBottom' style='z-index:+100000;position:absolute;top:0;left:0;font-size:10px;height:10px;visibility:hidden;background-color:black' onclick='PopCalCalendarVisible().bShow=true;'></div>"
   sComponents += "<div id='popupSuperMonth' style='z-index:+100000;position:absolute;top:0;left:0;display:none;' onclick='PopCalCalendarVisible().bShow=true;'></div>"
   sComponents += "<div id='popupSuperYear' style='z-index:+100000;position:absolute;top:0;left:0;display:none;' onclick='PopCalCalendarVisible().bShow=true;' onMouseWheel='PopCalWheelYear(PopCalCalendarVisible().id)'></div>"
   PopCalWriteHTML(sComponents)
}

function PopCalInitCalendar(l)
{
   var objPopCalendar = objPopCalList[l]
   var PopCal=objPopCalendar.calendarInstance
   if (PopCal)
   {
      if (PopCal.initialized==0)
      {
         if (objPopCalendar.showEndOfWeek!=null) // compatibility
         {
            objPopCalendar.showWeekend = objPopCalendar.showEndOfWeek
         }
         if (objPopCalendar.selectEndOfWeek!=null) // compatibility
         {
            objPopCalendar.selectWeekend = objPopCalendar.selectEndOfWeek
         }

         if ((objPopCalendar.centuryLimit < 0) || (objPopCalendar.centuryLimit > 99))
         {
            objPopCalendar.centuryLimit = 40
         }
         var sCalendar = "<div id='popupSuperCalendar" + objPopCalendar.id +  "' onclick='PopCalDownMonth("+l+");PopCalDownYear("+l+");objPopCalList["+l+"].bShow=true;' style='z-index:+100000;position:absolute;top:0;left:0;visibility:hidden;background-color:#ffffff;'><table id='popupSuperHighLight" + objPopCalendar.id +  "' width="+((objPopCalendar.showWeekNumber==1)?250:220)+" style='font-family:arial;font-size:11px;border-width:1;border-style:solid;border-color:#a0a0a0;font-family:arial;font-size:11px;' bgcolor='#ffffff'><tr bgcolor='#0000aa'><td Style='cursor:default'><table width='"+((objPopCalendar.showWeekNumber==1)?248:218)+"'><tr><td style='padding:2px;font-family:arial; font-size:11px;cursor:default'><font color='#ffffff'><B><span id='popupSuperCaption" + objPopCalendar.id +  "'></span></B></font></td><td id='popupSuperMoveCalendar" + objPopCalendar.id +  "' width='1px'></td><td align=right Style='cursor:default'><Span onClick='ImgCloseBoton" + objPopCalendar.id +  ".src=\""+ objPopCalendar.imgDir + "close.gif\";objPopCalList["+l+"].PopCalTimeOut=window.setTimeout(\"window.clearTimeout(objPopCalList["+l+"].PopCalTimeOut);objPopCalList["+l+"].PopCalTimeOut=null;PopCalHideCalendar("+l+")\",100)'><IMG ID='ImgCloseBoton" + objPopCalendar.id +  "' SRC='"+objPopCalendar.imgDir+"close.gif' onMouseOver='if(objPopCalList["+l+"].PopCalDragClose){this.src=\""+ objPopCalendar.imgDir + "closedown.gif\"}' onMouseDown='this.src=\""+ objPopCalendar.imgDir + "closedown.gif\"' onMouseUp='this.src=\""+ objPopCalendar.imgDir + "close.gif\"' onMouseOut='this.src=\""+ objPopCalendar.imgDir + "close.gif\"' onDrag='objPopCalList["+l+"].PopCalDragClose=true;return(false)' WIDTH='15' HEIGHT='13' BORDER='0'></Span></td></tr></table></td></tr><tr><td style='padding:5px;cursor:default' bgcolor=#ffffff><span id='popupSuperContent" + objPopCalendar.id +  "'></span></td></tr>"

         if (objPopCalendar.showToday==1)
         {
            sCalendar += "<tr bgcolor=#f0f0f0><td style='padding:5px;cursor:default' align=center><span id='popupSuperToday" + objPopCalendar.id +  "'></span></td></tr>"
         }
         sCalendar += "</table></div>"
         PopCalWriteHTML(sCalendar)

         if ((objPopCalendar.language < 0) || (objPopCalendar.language > 3))
         {
            objPopCalendar.language = 0
         }

         objPopCalendar.monthName = 
                              new Array(
                                 new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"),
                                 new Array("January","February","March","April","May","June","July","August","September","October","November","December"),
                                 new Array('Januar','Februar','M' + c_a2Puntos + 'rz','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'),
                                 new Array('Január','Február','Marec','Apríl','Máj','Jún','Júl','August','September','Október','November','December')
                              )[objPopCalendar.language];

         if (objPopCalendar.startAt==0)
         {
            objPopCalendar.dayName = 
                              new Array(
                                 new Array("Domingo","Lunes","Martes","Mi" + c_eTilde + "rcoles","Jueves","Viernes","Sabado"),
                                 new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"),
                                 new Array('Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'),
                                 new Array('Nede¾a','Pondelok','Utorok','Streda',c_STilde + 'tvrtok','Piatok','Sobota')
                              )[objPopCalendar.language];
         }
         else
         {
            objPopCalendar.dayName = 
                              new Array(
                                 new Array("Lunes","Martes","Mi" + c_eTilde + "rcoles","Jueves","Viernes","Sabado","Domingo"),
                                 new Array("Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"),
                                 new Array('Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag','Sonntag'),
                                 new Array('Pondelok','Utorok','Streda',c_STilde + 'tvrtok','Piatok','Sobota','Nede¾a')
                              )[objPopCalendar.language];
         }

         objPopCalendar.gotoString = 
                              new Array(
                                 "Mes Actual",
                                 "Current Month",
                                 'Gehe zu aktuellem Monat',
                                 "Aktuálny mesiac"
                              )[objPopCalendar.language];         
                              
         objPopCalendar.weekString = 
                              new Array(
                                 "#",
                                 "Week",
                                 '#',
                                 "Tý" + c_zTilde + "deò"
                              )[objPopCalendar.language];
                                                               
         objPopCalendar.scrollLeftMessage = 
                              new Array(
                                 "Presione para saltar al mes anterior. Deje presionado para saltar varios meses.",
                                 "Click to scroll to previous month. Hold mouse button to scroll automatically.",
                                 "Klicken um zum vorigen Monat zu gelangen. Gedr" + c_u2Puntos + "ckt halten, um automatisch weiter zu scrollen.",
                                 "Klikni pre presun na predchádzajúci mesiac. Dr" + c_zTilde + " stla" + c_cTilde + "ené pre automatické presúvanie"
                              )[objPopCalendar.language];
   
         objPopCalendar.scrollRightMessage = 
                              new Array(
                                 "Presione para saltar al siguiente mes. Deje presionado para saltar varios meses.",
                                 "Click to scroll to next month. Hold mouse button to scroll automatically.",
                                 "Klicken um zum n" + c_a2Puntos + "chsten Monat zu gelangen. Gedr" + c_u2Puntos + "ckt halten, um automatisch weiter zu scrollen.",
                                 "Klikni pre presun na ïal" + c_sTilde + "í mesiac. Dr" + c_zTilde + " stla" + c_cTilde + "ené pre automatické presúvanie"
               )[objPopCalendar.language];

         objPopCalendar.selectMonthMessage = 
                              new Array(
                                 "Seleccionar Mes.",
                                 "Select Month.",
                                 "Klicken um Monat auszuw" + c_a2Puntos + "hlen",
                                 "Vybra" + c_tTilde + " mesiac"
                              )[objPopCalendar.language];
                                 
         objPopCalendar.selectYearMessage = 
                              new Array(
                                 "Seleccionar A" + c_nTilde + "o.",
                                 "Select Year.",
                                 "Klicken um Jahr auszuw" + c_a2Puntos + "hlen",
                                 "Vybra" + c_tTilde + " rok"
                              )[objPopCalendar.language];

                                          
         objPopCalendar.selectDateMessage = // do not replace [date], it will be replaced by date.
                              new Array(
                                 "Seleccionar [date] .",
                                 "Select [date] .",
                                 "W" + c_a2Puntos + "hle [date] als Datum.",
                                 "Vybra" + c_tTilde + " [date] ."
                              )[objPopCalendar.language]; 

         objPopCalendar.today = new Date()

         if (objPopCalendar.forceTodayTo!=null)
         {
            if (objPopCalendar.forceTodayFormat==null)
            {
               objPopCalendar.forceTodayFormat = objPopCalendar.defaultFormat
            }
            
            if (PopCalSetDMY(objPopCalendar.forceTodayTo, objPopCalendar.forceTodayFormat, l))
            {
               objPopCalendar.today = new Date(objPopCalendar.oYear, objPopCalendar.oMonth, objPopCalendar.oDate)
            }
         }

         objPopCalendar.dayNow = objPopCalendar.today.getDay()
         objPopCalendar.dateNow = objPopCalendar.today.getDate()
         objPopCalendar.monthNow = objPopCalendar.today.getMonth()
         objPopCalendar.yearNow = objPopCalendar.today.getFullYear()

         objPopCalendar.todayString =
                              new Array(
                                 "Hoy es " + objPopCalendar.dayName[(objPopCalendar.dayNow-objPopCalendar.startAt==-1)?6:(objPopCalendar.dayNow-objPopCalendar.startAt)]+ ", " + objPopCalendar.dateNow + " de " + objPopCalendar.monthName[objPopCalendar.monthNow] + " de " + objPopCalendar.yearNow,
                                 "Today is " + objPopCalendar.dayName[(objPopCalendar.dayNow-objPopCalendar.startAt==-1)?6:(objPopCalendar.dayNow-objPopCalendar.startAt)]+ ", " + objPopCalendar.monthName[objPopCalendar.monthNow] + " " + objPopCalendar.dateNow + ", " + objPopCalendar.yearNow,
                                 "Heute ist " + objPopCalendar.dayName[(objPopCalendar.dayNow-objPopCalendar.startAt==-1)?6:(objPopCalendar.dayNow-objPopCalendar.startAt)]+ ", " + objPopCalendar.monthName[objPopCalendar.monthNow] + " " + objPopCalendar.dateNow + ", " + objPopCalendar.yearNow,
                                 "Dnes je " + objPopCalendar.dayName[(objPopCalendar.dayNow-objPopCalendar.startAt==-1)?6:(objPopCalendar.dayNow-objPopCalendar.startAt)]+ ", " + objPopCalendar.dateNow + " " + objPopCalendar.monthName[objPopCalendar.monthNow] + ", " + objPopCalendar.yearNow
                              )[objPopCalendar.language];

         objPopCalendar.monthConstructed=false
         objPopCalendar.yearConstructed=false

         if (objPopCalendar.showToday==1)
         {
            document.getElementById("popupSuperToday" + objPopCalendar.id).innerHTML = "<Span onmouseover='window.status=\""+objPopCalendar.gotoString+"\"' onmouseout='window.status=\"\"' title='"+objPopCalendar.gotoString+"' style='"+objPopCalendar.styleAnchor+"Font-Size:11px;' onClick='PopCalChangeCurrentMonth("+l+");'>" + objPopCalendar.todayString   + "</Span>"
         }

         var sHTML1="<span id='popupSuperSpanLeft" + objPopCalendar.id +  "' style='border-style:solid;border-width:1;border-color:#3366FF;cursor:default;' onDrag='return(false)' onmouseover='PopCalSwapImage(\"popupSuperChangeLeft" + objPopCalendar.id +  "\",\"left2.gif\","+l+");this.style.borderColor=\"#88AAFF\";window.status=\""+objPopCalendar.scrollLeftMessage+"\"' onmouseout='clearInterval(objPopCalList["+l+"].intervalID1);PopCalSwapImage(\"popupSuperChangeLeft" + objPopCalendar.id +  "\",\"left1.gif\","+l+");this.style.borderColor=\"#3366FF\";window.status=\"\"' onclick='PopCalDecMonth("+l+")' onmousedown='clearTimeout(objPopCalList["+l+"].timeoutID1);objPopCalList["+l+"].timeoutID1=setTimeout(\"PopCalStartDecMonth("+l+")\",100)' onmouseup='clearTimeout(objPopCalList["+l+"].timeoutID1);clearInterval(objPopCalList["+l+"].intervalID1)'>&nbsp;<IMG id='popupSuperChangeLeft" + objPopCalendar.id +  "' SRC='"+objPopCalendar.imgDir+"left1.gif' width=10 height=11 border=0>&nbsp;</span>&nbsp;"
         sHTML1+="<span id='popupSuperSpanRight" + objPopCalendar.id +  "' style='border-style:solid;border-width:1;border-color:#3366FF;cursor:default;' onDrag='return(false)' onmouseover='PopCalSwapImage(\"popupSuperChangeRight" + objPopCalendar.id +  "\",\"right2.gif\","+l+");this.style.borderColor=\"#88AAFF\";window.status=\""+objPopCalendar.scrollRightMessage+"\"' onmouseout='clearInterval(objPopCalList["+l+"].intervalID1);PopCalSwapImage(\"popupSuperChangeRight" + objPopCalendar.id +  "\",\"right1.gif\","+l+");this.style.borderColor=\"#3366FF\";window.status=\"\"' onclick='PopCalIncMonth("+l+")' onmousedown='clearTimeout(objPopCalList["+l+"].timeoutID1);objPopCalList["+l+"].timeoutID1=setTimeout(\"PopCalStartIncMonth("+l+")\",100)' onmouseup='clearTimeout(objPopCalList["+l+"].timeoutID1);clearInterval(objPopCalList["+l+"].intervalID1)'>&nbsp;<IMG id='popupSuperChangeRight" + objPopCalendar.id +  "' SRC='"+objPopCalendar.imgDir+"right1.gif' width=10 height=11 border=0>&nbsp;</span>&nbsp;"
         sHTML1+="<span id='popupSuperSpanMonth" + objPopCalendar.id +  "' style='border-style:solid;border-width:1;border-color:#3366FF;cursor:default;' onDrag='return(false)' onmouseover='PopCalSwapImage(\"popupSuperChangeMonth" + objPopCalendar.id +  "\",\"drop2.gif\","+l+");this.style.borderColor=\"#88AAFF\";window.status=\""+objPopCalendar.selectMonthMessage+"\"' onmouseout='PopCalSwapImage(\"popupSuperChangeMonth" + objPopCalendar.id +  "\",\"drop1.gif\","+l+");this.style.borderColor=\"#3366FF\";window.status=\"\"' onclick='objPopCalList["+l+"].keepMonth=!PopCalIsObjectVisible(objPopCalList["+l+"].calendarInstance.popupSuperMonth,"+l+");PopCalUpMonth("+l+")'></span>&nbsp;"
         sHTML1+="<span id='popupSuperSpanYear" + objPopCalendar.id +  "' style='border-style:solid;border-width:1;border-color:#3366FF;cursor:default;' onDrag='return(false)' onmouseover='PopCalSwapImage(\"popupSuperChangeYear" + objPopCalendar.id +  "\",\"drop2.gif\","+l+");this.style.borderColor=\"#88AAFF\";window.status=\""+objPopCalendar.selectYearMessage+"\"'   onmouseout='PopCalSwapImage(\"popupSuperChangeYear" + objPopCalendar.id +  "\",\"drop1.gif\","+l+");this.style.borderColor=\"#3366FF\";window.status=\"\"' onclick='objPopCalList["+l+"].keepYear=!PopCalIsObjectVisible(objPopCalList["+l+"].calendarInstance.popupSuperYear,"+l+");PopCalUpYear("+l+")' onMouseWheel='PopCalWheelYear("+l+")'></span>&nbsp;"
         
         document.getElementById("popupSuperCaption" + objPopCalendar.id).innerHTML = sHTML1

         if (objPopCalendar.ie)
         {
            if (objPopCalendar.move == 1)
            {
               var superMoveCalendar = document.getElementById("popupSuperMoveCalendar" + objPopCalendar.id)
               superMoveCalendar.width="100%"
               superMoveCalendar.onmousedown=new Function("PopCalDrag("+l+")")
               superMoveCalendar.ondblclick=new Function("PopCalMoveDefault("+l+")")
               superMoveCalendar.onmouseup=new Function("PopCalDrop("+l+")")
            }
         }
         else
         {
            objPopCalendar.keepInside = 0
         }

         if (objPopCalendar.addRegularHolidays==1) PopCalAddRegularHolidays(l)
         if (objPopCalendar.addRegularSpecialDays==1) PopCalAddRegularSpecialDays(l)
         
         PopCal.id = objPopCalendar.id
         PopCal.startAt = objPopCalendar.startAt
         PopCal.showWeekNumber = objPopCalendar.showWeekNumber
         PopCal.showToday = objPopCalendar.showToday
         PopCal.showWeekend = objPopCalendar.showWeekend
         PopCal.showHolidays = objPopCalendar.showHolidays
         PopCal.showSpecialDay = objPopCalendar.showSpecialDay
         PopCal.selectWeekend = objPopCalendar.selectWeekend
         PopCal.selectHoliday = objPopCalendar.selectHoliday
         PopCal.addCarnival = objPopCalendar.addCarnival
         PopCal.addGoodFriday = objPopCalendar.addGoodFriday
         PopCal.language = objPopCalendar.language
         PopCal.defaultFormat = objPopCalendar.defaultFormat
         PopCal.fixedX = objPopCalendar.fixedX
         PopCal.fixedY = objPopCalendar.fixedY
         PopCal.fade = objPopCalendar.fade
         PopCal.shadow = objPopCalendar.shadow
         PopCal.centuryLimit = objPopCalendar.centuryLimit
         PopCal.move = objPopCalendar.move
         PopCal.saveMovePos = objPopCalendar.saveMovePos
         PopCal.keepInside = objPopCalendar.keepInside
         PopCal.popupSuperCalendar = (objPopCalendar.dom)?document.getElementById("popupSuperCalendar" + objPopCalendar.id) : objPopCalendar.ie? eval("document.all.popupSuperCalendar" + objPopCalendar.id) : eval("document.popupSuperCalendar" + objPopCalendar.id)
         PopCal.popupSuperShadowRight = (objPopCalendar.dom)?document.getElementById("popupSuperShadowRight") : objPopCalendar.ie? document.all.popupSuperShadowRight : document.popupSuperShadowRight
         PopCal.popupSuperShadowBottom = (objPopCalendar.dom)?document.getElementById("popupSuperShadowBottom") : objPopCalendar.ie? document.all.popupSuperShadowBottom : document.popupSuperShadowBottom
         PopCal.popupSuperMonth = (objPopCalendar.dom)?document.getElementById("popupSuperMonth") : objPopCalendar.ie? document.all.popupSuperMonth : document.popupSuperMonth
         PopCal.popupSuperYear = (objPopCalendar.dom)?document.getElementById("popupSuperYear") : objPopCalendar.ie? document.all.popupSuperYear : document.popupSuperYear
         PopCal.popupSuperYearList = []

         PopCal.popupSuperCalendar.OverSelect = (objPopCalendar.dom)?document.getElementById("popupOverCalendar") : objPopCalendar.ie? document.all.popupOverCalendar : document.popupOverCalendar
         PopCal.popupSuperMonth.OverSelect = (objPopCalendar.dom)?document.getElementById("popupOverYearMonth") : objPopCalendar.ie? document.all.popupOverYearMonth : document.popupOverYearMonth
         PopCal.popupSuperYear.OverSelect = (objPopCalendar.dom)?document.getElementById("popupOverYearMonth") : objPopCalendar.ie? document.all.popupOverYearMonth : document.popupOverYearMonth
         if (objPopCalendar.ie)
         {
            if (PopCal.shadow==1) PopCal.popupSuperCalendar.ShadowOverSelect = (objPopCalendar.dom)?document.getElementById("popupOverShadow") : objPopCalendar.ie? document.all.popupOverShadow : document.popupOverShadow
            PopCal.popupSuperCalendar.style.filter="blendTrans()"
            PopCal.popupSuperShadowRight.style.filter="alpha(opacity=50)"
            PopCal.popupSuperShadowBottom.style.filter="alpha(opacity=50)"
            if ((objPopCalendar.ieVersion < 5.5) || (typeof(document.getElementById("CalendarLoadFilters").filters)!="object"))
            {
               PopCal.fade = 0
            }
         }
         else
         {
            PopCal.popupSuperShadowRight.style.MozOpacity=.5
            PopCal.popupSuperShadowBottom.style.MozOpacity=.5
         }
         PopCal.initialized = 1
      }
   }
}

function PopCalCalendarVisible()
{
   for( var i = 0; i <= lPopCalList; i++ )
   {
      if ( objPopCalList[i].calendarInstance.popupSuperCalendar.style.visibility != "hidden" ) 
      {
         return (objPopCalList[i])
      }
   }
   return (null)
}

function PopCalSetFocus(ctl)
{
   try
   {
      ctl.focus()
   }
   catch(e)
   {
      //Nothing
   }
}

function PopCalWriteHTML(sHTML)
{
   if (document.body)
   {
      if (document.body.insertAdjacentHTML)
      {
         document.body.insertAdjacentHTML("afterBegin", sHTML)
      }
      else
      {
         document.write(sHTML)
      }
   }
   else
   {
      document.write(sHTML)
   }
}

function PopCalSetPosition(o, t, l, h, w)
{
   if (t!=null) o.style.top = t
   if (l!=null) o.style.left = l
   if (h!=null) o.style.height = h
   if (w!=null) o.style.width = w
   if (o.ShadowOverSelect)
   {
      o.ShadowOverSelect.style.top = parseInt(o.style.top, 10) + 10
      o.ShadowOverSelect.style.left = parseInt(o.style.left, 10) + 10
      o.ShadowOverSelect.style.height = o.offsetHeight + 2
      o.ShadowOverSelect.style.width = o.offsetWidth
   }
   if (o.OverSelect)
   {
      o.OverSelect.style.top = parseInt(o.style.top, 10) 
      o.OverSelect.style.left = parseInt(o.style.left, 10)
      o.OverSelect.style.height = o.offsetHeight
      o.OverSelect.style.width = o.offsetWidth
   }
}

function PopCalShow(ctl, format, from, to, execute, overwrite, l)
{
   var objPopCalendar = objPopCalList[l]
   var PopCal=objPopCalendar.calendarInstance

   var CenturyOn = true
   if (PopCal)
   {
      if (PopCal.initialized==1)
      {
         if (document.body)
         {
            PopCalSetFocus(document.body)
         }
         
         objPopCalendar.movePopCal = false

         if (objPopCalendar.timeoutID3 != null)
         {
            clearTimeout(objPopCalendar.timeoutID3)
            objPopCalendar.timeoutID3 = null
         }
         var objPopCalVisible = PopCalCalendarVisible()
         if ( objPopCalVisible == null ) 
         {

            objPopCalendar.overWriteSelectWeekend = objPopCalendar.overWriteWeekend
            objPopCalendar.overWriteSelectHoliday = objPopCalendar.overWriteHoliday
            
            objPopCalendar.overWriteWeekend = null
            objPopCalendar.overWriteHoliday = null

            if (overwrite!=null)
            {
               overwrite = PopCalPad(overwrite, 2, " ", "R")
               if (("01").indexOf(overwrite.substr(0,1))!=-1)
               {
                  objPopCalendar.overWriteSelectWeekend = parseInt(overwrite.substr(0,1), 10)
               }
               if (("01").indexOf(overwrite.substr(1,1))!=-1)
               {
                  objPopCalendar.overWriteSelectHoliday = parseInt(overwrite.substr(1,1), 10)
               }
            }

            objPopCalendar.commandExecute = null

            if (execute!=null)
            {
               objPopCalendar.commandExecute = execute
            }

            if (objPopCalendar.ie)
            {
               objPopCalendar.onKeyPress = document.onkeyup
               document.onkeyup = new Function("objPopCalList["+l+"].bShow=false;PopCalClickDocumentBody("+l+");PopCalSetFocus(objPopCalList["+l+"].ctlToPlaceValue);")
               objPopCalendar.onmouseup = document.onmouseup
               document.onmouseup=new Function("objPopCalList["+l+"].movePopCal=false;if(event.button==2){objPopCalList["+l+"].bShow=false;PopCalClickDocumentBody("+l+");}")
               if (PopCal.move == 1)
               {
                  objPopCalendar.onmousemove = document.onmousemove
                  document.onmousemove= new Function('PopCalTrackMouse('+l+');')
               }
               objPopCalendar.onresize = window.onresize
               window.onresize = new Function('PopCalScroll('+l+');')
               if (PopCal.keepInside==1)
               {
                  objPopCalendar.onscroll = window.onscroll
                  window.onscroll = new Function('PopCalScroll('+l+');')
               }
               PopCalSetScroll("Div", l)
            }
            else
            {
               objPopCalendar.onKeyPress = document.onkeyup
               document.captureEvents(Event.KEYUP)
               document.onkeyup = new Function("objPopCalList["+l+"].bShow=false;PopCalClickDocumentBody("+l+");PopCalSetFocus(objPopCalList["+l+"].ctlToPlaceValue);")
            }


            objPopCalendar.onClick = document.onclick
            document.onclick = new Function('PopCalClickDocumentBody('+l+');')

            if (objPopCalendar.ie)
            {
               objPopCalendar.onSelectStart = document.onselectstart
               document.onselectstart=new Function('return(false);')

               objPopCalendar.onContextMenu = document.oncontextmenu
               document.oncontextmenu=new Function('return(false);')
            }

            objPopCalendar.yearConstructed=false
            objPopCalendar.monthConstructed=false

            objPopCalendar.ctlToPlaceValue = ctl
            objPopCalendar.dateFormat=""

            if (format!=null)
            {
               objPopCalendar.dateFormat = format.toLowerCase()
            }
            else if (PopCal.defaultFormat!=null)
            {
               objPopCalendar.dateFormat = PopCal.defaultFormat.toLowerCase()
            }

            objPopCalendar.dateFrom = 01
            objPopCalendar.monthFrom = 00
            objPopCalendar.yearFrom = 1900
            objPopCalendar.dateUpTo = 31
            objPopCalendar.monthUpTo = 11
            objPopCalendar.yearUpTo = 2099

            objPopCalendar.dateSelected = 0
            objPopCalendar.monthSelected = objPopCalendar.monthNow
            objPopCalendar.yearSelected = objPopCalendar.yearNow

            if (PopCalSetDMY(ctl.value, objPopCalendar.dateFormat, l))
            {
               objPopCalendar.dateSelected = objPopCalendar.oDate
               objPopCalendar.monthSelected = objPopCalendar.oMonth
               objPopCalendar.yearSelected = objPopCalendar.oYear
            }
            if (from!=null)
            {
               if (PopCalIsToday(from))
               {
                  objPopCalendar.dateFrom = objPopCalendar.today.getDate()
                  objPopCalendar.monthFrom = objPopCalendar.today.getMonth()
                  objPopCalendar.yearFrom = objPopCalendar.today.getFullYear()
               }
               else if (PopCalSetDMY(from, objPopCalendar.dateFormat, l))
               {
                  objPopCalendar.dateFrom = objPopCalendar.oDate
                  objPopCalendar.monthFrom = objPopCalendar.oMonth
                  objPopCalendar.yearFrom = objPopCalendar.oYear
               }
            }

            if (to!=null)
            {
               if (PopCalIsToday(to))
               {
                  objPopCalendar.dateUpTo = objPopCalendar.today.getDate()
                  objPopCalendar.monthUpTo = objPopCalendar.today.getMonth()
                  objPopCalendar.yearUpTo = objPopCalendar.today.getFullYear()
               }
               else if (PopCalSetDMY(to, objPopCalendar.dateFormat, l))
               {
                  objPopCalendar.dateUpTo = objPopCalendar.oDate
                  objPopCalendar.monthUpTo = objPopCalendar.oMonth
                  objPopCalendar.yearUpTo = objPopCalendar.oYear
               }
            }

            if (!PopCalCenturyOn(objPopCalendar.dateFormat))
            {
               if (PopCalDateFrom(l) < PopCalPad(1900 + objPopCalendar.centuryLimit, 4, "0", "L") + "0001")
               {
                  objPopCalendar.dateFrom = 01
                  objPopCalendar.monthFrom = 00
                  objPopCalendar.yearFrom = 1900 + objPopCalendar.centuryLimit
               }

               if (PopCalDateUpTo(l) >  PopCalPad(2000 + (objPopCalendar.centuryLimit-1), 4, "0", "L" ) + "1131")
               {
                  objPopCalendar.dateUpTo = 31
                  objPopCalendar.monthUpTo = 11
                  objPopCalendar.yearUpTo = 2000 + (objPopCalendar.centuryLimit-1)
               }
            }

            if (PopCalDateFrom(l) > PopCalDateUpTo(l))
            {
               objPopCalendar.oDate = objPopCalendar.dateFrom
               objPopCalendar.oMonth = objPopCalendar.monthFrom
               objPopCalendar.oYear = objPopCalendar.yearFrom

               objPopCalendar.dateFrom = objPopCalendar.dateUpTo
               objPopCalendar.monthFrom = objPopCalendar.monthUpTo
               objPopCalendar.yearFrom = objPopCalendar.yearUpTo

               objPopCalendar.dateUpTo = objPopCalendar.oDate
               objPopCalendar.monthUpTo = objPopCalendar.oMonth
               objPopCalendar.yearUpTo = objPopCalendar.oYear
            }

            if (PopCalDateSelect(l) < PopCalDateFrom(l))
            {
               objPopCalendar.dateSelected = 0
               objPopCalendar.monthSelected = objPopCalendar.monthFrom
               objPopCalendar.yearSelected = objPopCalendar.yearFrom
            }

            if (PopCalDateSelect(l) > PopCalDateUpTo(l))
            {
               objPopCalendar.dateSelected = 0
               objPopCalendar.monthSelected = objPopCalendar.monthUpTo
               objPopCalendar.yearSelected = objPopCalendar.yearUpTo
            }

            objPopCalendar.odateSelected = objPopCalendar.dateSelected
            objPopCalendar.omonthSelected = objPopCalendar.monthSelected
            objPopCalendar.oyearSelected = objPopCalendar.yearSelected

            PopCalMoveDefaultPos(l)

            if (objPopCalendar.ie)
            {
               if ((PopCal.move == 1) && (PopCal.saveMovePos == 1))
               {
                  if (objPopCalendar.ctlToPlaceValue != null)
                  {
                     if (objPopCalendar.ctlToPlaceValue.CalendarTop != null)
                     {
                        PopCalSetPosition(PopCal.popupSuperCalendar, objPopCalendar.ctlToPlaceValue.CalendarTop)
                     }
                     if (objPopCalendar.ctlToPlaceValue.CalendarLeft != null)
                     {
                        PopCalSetPosition(PopCal.popupSuperCalendar, null, objPopCalendar.ctlToPlaceValue.CalendarLeft)
                     }
                  }
               }
            }

            PopCalConstructCalendar(l)
            
            PopCalFadeIn(l)

            PopCalScroll(l)

            objPopCalendar.bShow = true
            
         }
         else
         {
            objPopCalVisible.executeFade = (objPopCalVisible.ctlNow==ctl)
            objPopCalendar.executeFade = (objPopCalVisible.ctlNow==ctl)
            
            PopCalHideCalendar(objPopCalVisible.id)

            if (objPopCalVisible.ctlToPlaceValue != null)
            {
               objPopCalVisible.ctlToPlaceValue = null
            }
            
            if (objPopCalendar!=objPopCalVisible)
            {
               objPopCalendar.ctlNow = null
            }

            if (objPopCalendar.ctlNow!=ctl) 
            {
               PopCalShow(ctl, format, from, to, execute, overwrite, objPopCalendar.id)
            }
            
            objPopCalendar.executeFade = true
            objPopCalVisible.executeFade = true
         }
         objPopCalendar.ctlNow = ctl
      }
   }
}

function PopCalAddDays(dateValue, format, daysToAdd, l)
{
   var objPopCalendar = objPopCalList[l]
   if ((dateValue!=null)&&(dateValue!=""))
   {
      var sDateFormat = (format==null) ? objPopCalendar.calendarInstance.defaultFormat.toLowerCase() : format.toLowerCase()
      var incDays = (daysToAdd==null) ? 0 : daysToAdd * 86400000
      var dFecha = null
      if (PopCalIsToday(dateValue))
      {
         dFecha = new Date(objPopCalendar.today -(-incDays))            
      }
      else if (PopCalSetDMY(dateValue, sDateFormat, l))
      {
         dFecha = new Date(PopCalGetDate(dateValue, sDateFormat, l) -(-incDays))
      }
      if (dFecha!=null) return (PopCalConstructDate(dFecha.getDate(),dFecha.getMonth(),dFecha.getFullYear(),sDateFormat,l))
   }
   return ("")
}

function PopCalScroll(l)
{
   var objPopCalendar = objPopCalList[l]
   if (objPopCalendar.calendarInstance.popupSuperCalendar.OverSelect)
   {
      objPopCalendar.calendarInstance.popupSuperCalendar.OverSelect.style.visibility = 'hidden'
      objPopCalendar.calendarInstance.popupSuperCalendar.OverSelect.style.visibility = 'visible'
   }
   if (objPopCalendar.calendarInstance.popupSuperCalendar.ShadowOverSelect)
   {
      objPopCalendar.calendarInstance.popupSuperCalendar.ShadowOverSelect.style.visibility = 'hidden'
      objPopCalendar.calendarInstance.popupSuperCalendar.ShadowOverSelect.style.visibility = 'visible'
   }
   if (objPopCalendar.calendarInstance.popupSuperCalendar.style.visibility != "hidden")
   {
      if ((objPopCalendar.ctlToPlaceValue.CalendarTop == null) && (objPopCalendar.ctlToPlaceValue.CalendarLeft == null))
      {
         PopCalDownMonth(l)
         PopCalDownYear(l)
         PopCalMoveDefault(l)   
      }
   }
}

function PopCalMoveDefaultPos(l)
{
   var objPopCalendar = objPopCalList[l]
   var PopCal = objPopCalendar.calendarInstance
   var leftpos=0
   var toppos=0
   var lDivTop = -1
   if ((PopCal.fixedX==-1)&&(PopCal.fixedY==-1)&&(objPopCalendar.ctlToPlaceValue.style.display!='none'))
   {
      var aTag = objPopCalendar.ctlToPlaceValue
      
      do 
      {
         aTag = aTag.offsetParent
         leftpos += aTag.offsetLeft
         toppos  += aTag.offsetTop
         if (aTag.tagName == "DIV")
         {
            if (lDivTop == -1)
            {
               lDivTop += (1 + aTag.offsetTop)
            }
            leftpos -= aTag.scrollLeft
            toppos -= aTag.scrollTop

         }
         else if (lDivTop != -1)
         {
            lDivTop += aTag.offsetTop
         }
      } 
      while(aTag.tagName!="BODY")
   }
   else
   {
      var aTag = document.body
   }
      
   leftpos = parseInt(PopCal.fixedX==-1 ? objPopCalendar.ctlToPlaceValue.offsetLeft + leftpos: PopCal.fixedX, 10)
   toppos = parseInt(PopCal.fixedY==-1 ? objPopCalendar.ctlToPlaceValue.offsetTop + toppos + objPopCalendar.ctlToPlaceValue.offsetHeight + 7 : PopCal.fixedY, 10)

   if (PopCal.keepInside==1)
   {
      if (((leftpos + PopCal.popupSuperCalendar.offsetWidth + 10) - aTag.scrollLeft) > aTag.offsetWidth)
      {
         leftpos -= ((((leftpos + PopCal.popupSuperCalendar.offsetWidth) - aTag.offsetWidth) + 10) - aTag.scrollLeft)
      }
      if (toppos < lDivTop)
      {
         toppos = lDivTop
      }
      
      if (((toppos + PopCal.popupSuperCalendar.offsetHeight + 65) - aTag.scrollTop) > aTag.offsetHeight)
      {
         toppos -= ((((toppos + PopCal.popupSuperCalendar.offsetHeight) - aTag.offsetHeight) + 65) - aTag.scrollTop)
      }
      if    (leftpos < aTag.scrollLeft + 10)
      {
         leftpos = aTag.scrollLeft + 10
      }
      
      if    (toppos < aTag.scrollTop + 10)
      {
         toppos = aTag.scrollTop + 10
      }
   }
   PopCalSetPosition(PopCal.popupSuperCalendar, toppos, leftpos)
}


function PopCalMoveDefault(l)
{
   var objPopCalendar = objPopCalList[l]
   var PopCal = objPopCalendar.calendarInstance
   
   PopCalMoveDefaultPos(l)

   PopCalMoveShadow(l)

   if (PopCal.saveMovePos == 1)
   {
      if (objPopCalendar.ctlToPlaceValue != null)
      {
         objPopCalendar.ctlToPlaceValue.CalendarLeft = null
         objPopCalendar.ctlToPlaceValue.CalendarTop = null
      }
   }

   objPopCalendar.bShow = false
}

function PopCalDrag(l)
{
   var objPopCalendar = objPopCalList[l]
   if (!objPopCalendar.movePopCal)
   {
      var PopCal = objPopCalendar.calendarInstance
      var ex = event.clientX+document.body.scrollLeft
      var ey = event.clientY+document.body.scrollTop
      document.getElementById("popupSuperHighLight" + objPopCalendar.id).style.borderColor = "red"
      PopCal.popupSuperCalendar.style.xoff=parseInt(PopCal.popupSuperCalendar.style.left)-ex
      PopCal.popupSuperCalendar.style.yoff=parseInt(PopCal.popupSuperCalendar.style.top)-ey
      if (PopCal.shadow==1)
      {
         PopCal.popupSuperShadowRight.style.xoff=parseInt(PopCal.popupSuperShadowRight.style.left)-ex
         PopCal.popupSuperShadowRight.style.yoff=parseInt(PopCal.popupSuperShadowRight.style.top)-ey
         PopCal.popupSuperShadowBottom.style.xoff=parseInt(PopCal.popupSuperShadowBottom.style.left)-ex
         PopCal.popupSuperShadowBottom.style.yoff=parseInt(PopCal.popupSuperShadowBottom.style.top)-ey
      }
      PopCalDownMonth(l)
      PopCalDownYear(l)
      objPopCalendar.movePopCal = true
   }
   objPopCalendar.bShow = true
}

function PopCalTrackMouse(l)
{
   var objPopCalendar = objPopCalList[l]
   var PopCal = objPopCalendar.calendarInstance
   if (objPopCalendar.movePopCal)
   {
      var x = event.clientX+document.body.scrollLeft
      var y = event.clientY+document.body.scrollTop

      var lLeft = (PopCal.popupSuperCalendar.style.xoff + x)
      var lTop = (PopCal.popupSuperCalendar.style.yoff + y)
      if ((parseInt(PopCal.popupSuperCalendar.style.left) != parseInt(lLeft)) || (parseInt(PopCal.popupSuperCalendar.style.top) != parseInt(lTop)))
      {

         PopCalSetPosition(PopCal.popupSuperCalendar, lTop, lLeft)
         
         x = event.clientX+document.body.scrollLeft
         y = event.clientY+document.body.scrollTop

         if (PopCal.shadow==1)
         {
            PopCal.popupSuperShadowRight.style.left = (PopCal.popupSuperShadowRight.style.xoff + x)
            PopCal.popupSuperShadowRight.style.top = (PopCal.popupSuperShadowRight.style.yoff + y)
            PopCal.popupSuperShadowBottom.style.left = (PopCal.popupSuperShadowBottom.style.xoff + x)
            PopCal.popupSuperShadowBottom.style.top = (PopCal.popupSuperShadowBottom.style.yoff + y)
         }

         if (PopCal.saveMovePos == 1)
         {
            if (objPopCalendar.ctlToPlaceValue != null)
            {
               objPopCalendar.ctlToPlaceValue.CalendarLeft = parseInt(PopCal.popupSuperCalendar.style.left)
               objPopCalendar.ctlToPlaceValue.CalendarTop = parseInt(PopCal.popupSuperCalendar.style.top)
            }
         }

      }
      objPopCalendar.bShow = true
   }
}

function PopCalDrop(l)
{
   var objPopCalendar = objPopCalList[l]
   objPopCalendar.bShow = true
   objPopCalendar.movePopCal = false
   document.getElementById("popupSuperHighLight" + objPopCalendar.id).style.borderColor = "#a0a0a0"
}

function PopCalSelectWeekendHoliday(weekend, holidays, l)
{
   var objPopCalendar = objPopCalList[l]
   objPopCalendar.overWriteWeekend = weekend
   objPopCalendar.overWriteHoliday = holidays
}

function PopCalValidateType1(_date, _Type1)
{
   if (parseInt(_Type1.d, 10)==_date.getDate())
   {
      if ((parseInt(_Type1.m, 10)==0)||((parseInt(_Type1.m, 10)==(_date.getMonth()+1))&&(parseInt(_Type1.m, 10)!=0)))
      {
         if ((parseInt(_Type1.y, 10)==0)||((parseInt(_Type1.y, 10)==_date.getFullYear())&&(parseInt(_Type1.y, 10)!=0)))
         {
            return (true)
         }
      }
   }
   return (false)                     
}

function PopCalHolidayRec1(d, m, y, desc0, tipo)
{
   this.d = d
   this.m = m
   this.y = y
   this.type = "Type 1"
   this.desc = Array(".",".",".",".",".",".",".",".",".",".",".")
   if (typeof(desc0)=="object")
   {
      for( var i = 0; i < desc0.length; i++ )
      {
         this.desc[i] = desc0[i]
      }
   }
   else
   {
      this.desc[0] = desc0
   }
   this.tipo = tipo
   for( var i = 1; i < this.desc.length; i++ )
   {
      if (this.desc[i]=='.')
      {
         this.desc[i] = this.desc[0]
      }
   }
}

function PopCalValidateType2(_date, _Type2)
{
   var _NewDate
   if ((_date.getDay()==_Type2.dw)&&((_date.getMonth()==(_Type2.m-1))||(_Type2.m==0)))
   {
      if (_Type2.s==0)
      {
         return (true)
      }
      else if (_Type2.s==-1)
      {
         _NewDate = new Date(_date-(-86400000*7))
         if (_date.getMonth()!=_NewDate.getMonth())
         {
            return (true) 
         }
      }
      else
      {
         for( var i = 1; i <= 5; i++ )
         {
            _NewDate = new Date(_date-(86400000*7*i))
            if (_date.getMonth() != _NewDate.getMonth())
            {
               break
            }            
         }
         if (i==_Type2.s)
         {
            return true
         }
      }
   }
   return (false)   
}

function PopCalHolidayRec2(s, dw, m, desc0, tipo)
{
   this.s = s
   this.dw = dw
   this.m = m
   this.type = "Type 2"
   this.desc = Array(".",".",".",".",".",".",".",".",".",".",".")
   if (typeof(desc0)=="object")
   {
      for( var i = 0; i < desc0.length; i++ )
      {
         this.desc[i] = desc0[i]
      }
   }
   else
   {
      this.desc[0] = desc0
   }
   this.tipo = tipo
   for( var i = 1; i < this.desc.length; i++ )
   {
      if (this.desc[i]=='.')
      {
         this.desc[i] = this.desc[0]
      }
   }
}

function PopCalValidateType3(_date, _Type3)
{
   var BeginDate = new Date(_Type3.y, _Type3.m-1, _Type3.d)
   if (BeginDate<=_date)
   {
      var Interval = _Type3.i * (((_Type3.f==1) ? 7 : 1) * 86400000)
      if ((((_date - BeginDate) % Interval)==0))
      {
         if (_Type3.r==0)
         {
            return true
         }
         else
         {
            return (((_date - BeginDate) / Interval) < _Type3.r)
         }
      }
   }
   return false
}

function PopCalHolidayRec3(d, m, y, i, f, r, desc0, tipo)
{
   this.d = d
   this.m = m
   this.y = y
   this.i = i
   this.f = f
   this.r = r
   this.type = "Type 3"
   this.desc = Array(".",".",".",".",".",".",".",".",".",".",".")
   if (typeof(desc0)=="object")
   {
      for( var i = 0; i < desc0.length; i++ )
      {
         this.desc[i] = desc0[i]
      }
   }
   else
   {
      this.desc[0] = desc0
   }
   this.tipo = tipo
   for( var i = 1; i < this.desc.length; i++ )
   {
      if (this.desc[i]=='.')
      {
         this.desc[i] = this.desc[0]
      }
   }
}

function PopCalAddHoliday(d, m, y, desc0, l)
{
   var objPopCalendar = objPopCalList[l]
   objPopCalendar.Holidays[objPopCalendar.HolidaysCounter++] = new PopCalHolidayRec1( d, m, y, desc0, 1)
}

function PopCalAddSpecialDay(d, m, y, desc0, l)
{
   var objPopCalendar = objPopCalList[l]
   objPopCalendar.Holidays[objPopCalendar.HolidaysCounter++] = new PopCalHolidayRec1( d, m, y, desc0, 0)
}

function PopCalAddIrregularHoliday(s, dw, m, desc0, l)
{
   var objPopCalendar = objPopCalList[l]
   objPopCalendar.Holidays[objPopCalendar.HolidaysCounter++] = new PopCalHolidayRec2(s, dw, m, desc0, 1)
}

function PopCalAddIrregularSpecialDay(s, dw, m, desc0, l)
{
   var objPopCalendar = objPopCalList[l]
   objPopCalendar.Holidays[objPopCalendar.HolidaysCounter++] = new PopCalHolidayRec2( s, dw, m, desc0, 0)
}

function PopCalAddRecurrenceSpecialDay(d, m, y, i, f, r, desc0, l)
{
   var objPopCalendar = objPopCalList[l]
   objPopCalendar.Holidays[objPopCalendar.HolidaysCounter++] = new PopCalHolidayRec3( d, m, y, i, f, r, desc0, 0)
}

function PopCalFormatDate(dateValue, oldFormat, newFormat, l)
{
   var objPopCalendar = objPopCalList[l]
   var PopCal = objPopCalendar.calendarInstance
   var newValue = ""
   if (PopCal)
   {
      var formatOld = PopCal.defaultFormat
      if (oldFormat!=null) 
      {
         formatOld = oldFormat
      }
      var formatNew = PopCal.defaultFormat 

      if (newFormat!=null) 
      {
         formatNew = newFormat
      }

      if (PopCalIsToday(dateValue))
      {
         newValue = PopCalConstructDate(objPopCalendar.today.getDate(),objPopCalendar.today.getMonth(),objPopCalendar.today.getFullYear(),formatNew,l)            
      }
      else if (PopCalSetDMY(dateValue, formatOld, l))
      {
         var xDate = new Date(objPopCalendar.oYear, objPopCalendar.oMonth, objPopCalendar.oDate)
         if ((xDate.getDate()==objPopCalendar.oDate)&&(xDate.getMonth()==objPopCalendar.oMonth)&&(xDate.getFullYear()==objPopCalendar.oYear))
         {
            newValue = PopCalConstructDate(objPopCalendar.oDate,objPopCalendar.oMonth,objPopCalendar.oYear,formatNew,l)
         }
      }
   }
   return newValue
}

function PopCalForcedToday(dateValue, format, l)
{
   var objPopCalendar = objPopCalList[l]
   if (objPopCalendar.calendarInstance)
   {
      objPopCalendar.forceTodayTo = dateValue
      objPopCalendar.forceTodayFormat = format
   }
}

function PopCalSetScroll(elmID, l)
{
   var objPopCalendar = objPopCalList[l]
   if( objPopCalendar.ie )
   {
      for( var i = 0; i < document.all.tags( elmID ).length; i++ )
      {
         var obj = document.all.tags( elmID )[i]
         if( !obj || !obj.offsetParent )
         {
            continue
         }   
         obj.onscroll = new Function("PopCalScroll("+l+");")
      }
   }
}

function PopCalSwapImage(srcImg, destImg, l)
{
   var objPopCalendar = objPopCalList[l]
   document.getElementById(srcImg).src = objPopCalendar.imgDir + destImg
}

function PopCalHideCalendar(l, HideNow)   
{
   var objPopCalendar = objPopCalList[l]
   if (!objPopCalendar) 
   {
      objPopCalendar=null
      return(false)
   }
   var PopCal = objPopCalendar.calendarInstance
   if (PopCal.popupSuperCalendar.style.visibility != "hidden")
   {
   
      if (objPopCalendar.ie)
      {
         document.onkeyup = objPopCalendar.onKeyPress
      }
      else
      {
         document.releaseEvents(Event.KEYUP)
         document.onkeyup = objPopCalendar.onKeyPress
      }

      document.onclick = objPopCalendar.onClick
      
      if (objPopCalendar.ie)
      {
         document.onselectstart = objPopCalendar.onSelectStart
         document.oncontextmenu = objPopCalendar.onContextMenu
      }

      if (objPopCalendar.ie)
      {
         if (PopCal.move == 1)
         {
            document.onmousemove = objPopCalendar.onmousemove
         }
         document.onmouseup = objPopCalendar.onmouseup
         window.onresize = objPopCalendar.onresize
         if (PopCal.keepInside==1)
         {
            window.onscroll = objPopCalendar.onscroll
         }
      }
         
      objPopCalendar.onKeyPress = null
      objPopCalendar.onClick = null
      objPopCalendar.onSelectStart = null
      objPopCalendar.onContextMenu = null
      objPopCalendar.onmousemove = null
      objPopCalendar.onmouseup = null
      objPopCalendar.onresize = null
      objPopCalendar.onscroll = null

      
      if (PopCal.popupSuperMonth != null)
      {
         PopCal.popupSuperMonth.style.display="none"
         if (PopCal.popupSuperMonth.OverSelect) PopCal.popupSuperMonth.OverSelect.style.display="none"
      }
      if (PopCal.popupSuperYear != null)
      {
         PopCal.popupSuperYear.style.display="none"
         if (PopCal.popupSuperYear.OverSelect) PopCal.popupSuperYear.OverSelect.style.display="none"
      }

      PopCalFadeOut(l, HideNow)

      if (!objPopCalendar) 
      {
         objPopCalendar=null
         return(false)
      }
   }
}

function PopCalFadeIn(l) 
{

   var objPopCalendar = objPopCalList[l]
   var PopCal = objPopCalendar.calendarInstance

   var objCal =  PopCal.popupSuperCalendar
   var objShdR = PopCal.popupSuperShadowRight
   var objShdB = PopCal.popupSuperShadowBottom
   var objOver = PopCal.popupSuperCalendar.OverSelect
   var objOverShadow = PopCal.popupSuperCalendar.ShadowOverSelect
   if (!objPopCalendar.ie)
   {
      if (PopCal.shadow==1)
      {
         objShdR.style.display="none"
         objShdR.style.visibility="visible"
         objShdR.style.display=""
         
         objShdB.style.display="none"
         objShdB.style.visibility="visible"
         objShdB.style.display=""
      }
      objCal.style.display="none"
      objCal.style.visibility="visible"
      objCal.style.display=""
   }
   else if ((PopCal.fade>0) && (objPopCalendar.executeFade))
   {
      
      objCal.filters.blendTrans.Stop()

      if (PopCal.fade > 1) PopCal.fade = 1

      objCal.style.filter="blendTrans(duration=" + PopCal.fade + ")"

      if ((objCal.style.visibility != "visible") && (objCal.filters.blendTrans.status != 2))
      {
         if (PopCal.shadow==1)
         {
            objShdR.style.filter="alpha(opacity=50)"
            objShdB.style.filter="alpha(opacity=50)"
         }
         objCal.filters.blendTrans.Apply()
         objCal.style.visibility="visible"
         objCal.filters.blendTrans.Play()
         
         if (PopCal.shadow==1)
         {
            objShdR.style.visibility="visible"
            objShdB.style.visibility="visible"
         }
      }
      else
      {
         if (PopCal.shadow==1)
         {
            objShdR.style.visibility="visible"
            objShdB.style.visibility="visible"
         }
         objCal.style.visibility="visible"
      }
   }
   else
   {
      if (PopCal.shadow==1)
      {
         objShdR.style.visibility="visible"
         objShdB.style.visibility="visible"
      }
      objCal.style.visibility="visible"
   }
   if (objOver) objOver.style.display = ''
   
   if (objOverShadow) objOverShadow.style.display = ''
}

function PopCalFadeOut(l, HideNow)
{
   var objPopCalendar = objPopCalList[l]

   var PopCal =  objPopCalendar.calendarInstance
   var objCal =  PopCal.popupSuperCalendar
   var objShdR = PopCal.popupSuperShadowRight
   var objShdB = PopCal.popupSuperShadowBottom
   
   if ((objPopCalendar.ie) && (PopCal.fade>0) && (objPopCalendar.executeFade) && (!HideNow))
   {

      objCal.filters.blendTrans.Stop()

      if (PopCal.fade > 1) PopCal.fade = 1

      objCal.style.filter="blendTrans(duration=" + PopCal.fade + ")"

      if ((objCal.style.visibility != "hidden") && (objCal.filters.blendTrans.status != 2))
      {
         if (PopCal.shadow==1)
         {
            objShdR.style.filter="alpha(opacity=2)"
            objShdB.style.filter="alpha(opacity=2)"
         }
         objCal.filters.blendTrans.Apply()
         objCal.style.visibility="hidden"
         objCal.filters.blendTrans.Play()
         objPopCalendar.timeoutID3=setTimeout("PopCalMoveTo(0, 0, "+l+")",(PopCal.fade + .05) * 1000)
      }
      else
      {
         objCal.style.visibility="hidden"
         PopCalMoveTo(0, 0, l)
      }
   }
   else
   {
      objCal.style.visibility="hidden"
      PopCalMoveTo(0, 0, l)
   }   
}

function PopCalMoveTo(x, y, l)
{
   if (!objPopCalList) return (true)
   var objPopCalendar = objPopCalList[l]
   if (!objPopCalendar) return (true)
   
   var PopCal = objPopCalendar.calendarInstance
   var objCal =  PopCal.popupSuperCalendar
   var objShdR = PopCal.popupSuperShadowRight
   var objShdB = PopCal.popupSuperShadowBottom
   var objOver = PopCal.popupSuperCalendar.OverSelect
   var objOverShadow = PopCal.popupSuperCalendar.ShadowOverSelect

   objCal.style.left = x
   objCal.style.top = y
   if (PopCal.shadow==1)
   {
      objShdR.style.filter="alpha(opacity=50)"
      objShdB.style.filter="alpha(opacity=50)"
   }
   if (PopCalCalendarVisible()==null)
   {
      if (objOver)
      {
         objOver.style.left = x
         objOver.style.top = y
         objOver.style.display = "none"
      }   
      if (objOverShadow)
      {
         objOverShadow.style.left = x
         objOverShadow.style.top = y
         objOverShadow.style.display = "none"
      }   
      objShdR.style.visibility="hidden"
      objShdR.style.left = x
      objShdR.style.top = y

      objShdB.style.visibility="hidden"
      objShdB.style.left = x
      objShdB.style.top = y
   }
   if (objPopCalendar.timeoutID3 != null)
   {
      clearTimeout(objPopCalendar.timeoutID3)
      objPopCalendar.timeoutID3 = null
   }
}

function PopCalIsObjectVisible(obj,l)
{
   var objPopCalendar = objPopCalList[l]
   var bVisible = false
   bVisible = (obj.style.display != 'none')&&(obj.style.visibility!='hidden')
   if (objPopCalendar.ie)
   {
      var objParent = obj.offsetParent
      while((objParent.tagName!="BODY")&&(bVisible))
      {
         bVisible = (objParent.style.display != 'none')&&(objParent.style.visibility!='hidden')
         objParent = objParent.offsetParent
      }
   }
   return (bVisible)
}

function PopCalConstructDate(d,m,y,format,l)
{
   var objPopCalendar = objPopCalList[l]
   var sTmp = format
   sTmp = sTmp.replace ("dd","<e>")
   sTmp = sTmp.replace ("d","<d>")
   sTmp = sTmp.replace ("<e>",PopCalPad(d, 2, "0", "L"))
   sTmp = sTmp.replace ("<d>",d)
   sTmp = sTmp.replace ("mmmm","<l>")
   sTmp = sTmp.replace ("mmm","<s>")
   sTmp = sTmp.replace ("mm","<n>")
   sTmp = sTmp.replace ("m","<m>")
   sTmp = sTmp.replace ("yyyy",PopCalPad(y, 4, "0", "L"))
   sTmp = sTmp.replace ("yy",PopCalPad(y, 4, "0", "L").substr(2))
   sTmp = sTmp.replace ("<m>",m+1)
   sTmp = sTmp.replace ("<n>",PopCalPad(m+1, 2, "0", "L"))
   sTmp = sTmp.replace ("<s>",objPopCalendar.monthName[m].substr(0,3))
   sTmp = sTmp.replace ("<l>",objPopCalendar.monthName[m])
   return sTmp
}

function PopCalCloseCalendar(l) 
{
   var objPopCalendar = objPopCalList[l]
   PopCalHideCalendar(l)
   if (!objPopCalendar) 
   {
      objPopCalendar=null
      return(false)
   }
   
   objPopCalendar.ctlToPlaceValue.value = PopCalConstructDate(objPopCalendar.dateSelected,objPopCalendar.monthSelected,objPopCalendar.yearSelected,objPopCalendar.dateFormat,l)

   if (objPopCalendar.commandExecute!=null)
   {
      eval(objPopCalendar.commandExecute)
   }
   else
   {
      PopCalSetFocus(objPopCalendar.ctlToPlaceValue)
   }
}

function PopCalClickDocumentBody(l) 
{       
   var objPopCalendar = objPopCalList[l]
   document.getElementById("popupSuperHighLight" + objPopCalendar.id).style.borderColor = "#a0a0a0"
   objPopCalendar.PopCalDragClose = false
   if (!objPopCalendar.bShow)
   {
      PopCalHideCalendar(l)
   }
   if (!objPopCalendar) 
   {
      objPopCalendar=null
      return(false)
   }
   objPopCalendar.bShow = false
}


/*** Month Pulldown   ***/

function PopCalStartDecMonth(l)
{
   var objPopCalendar = objPopCalList[l]
   objPopCalendar.intervalID1=setInterval("PopCalDecMonth("+l+")",80)
}

function PopCalStartIncMonth(l)
{
   var objPopCalendar = objPopCalList[l]
   objPopCalendar.intervalID1=setInterval("PopCalIncMonth("+l+")",80)
}

function PopCalIncMonth(l) 
{
   var objPopCalendar = objPopCalList[l]
   objPopCalendar.monthSelected++
   if (objPopCalendar.monthSelected>11) {
      objPopCalendar.monthSelected=0
      objPopCalendar.yearSelected++
   }

   if ((objPopCalendar.yearSelected > objPopCalendar.yearUpTo) || (objPopCalendar.yearSelected == objPopCalendar.yearUpTo && objPopCalendar.monthSelected > objPopCalendar.monthUpTo))
   {
      PopCalDecMonth(l)
   }
   else
   {
      PopCalConstructCalendar(l)
   }
}

function PopCalDecMonth(l) 
{
   var objPopCalendar = objPopCalList[l]
   objPopCalendar.monthSelected--
   if (objPopCalendar.monthSelected<0) 
   {
      objPopCalendar.monthSelected=11
      objPopCalendar.yearSelected--
   }

   if ((objPopCalendar.yearSelected < objPopCalendar.yearFrom) || (objPopCalendar.yearSelected == objPopCalendar.yearFrom && objPopCalendar.monthSelected < objPopCalendar.monthFrom))
   {
      PopCalIncMonth(l)
   }
   else
   {
      PopCalConstructCalendar(l)
   }
}

function PopCalConstructMonth(l) 
{
   var objPopCalendar = objPopCalList[l]
   PopCalDownYear(l)
   if (!objPopCalendar.monthConstructed) 
   {
      var beginMonth = 0
      var endMonth = 11

      objPopCalendar.countMonths = 0

      if (objPopCalendar.yearSelected == objPopCalendar.yearFrom)
      {
         beginMonth = objPopCalendar.monthFrom
      }

      if (objPopCalendar.yearSelected == objPopCalendar.yearUpTo)
      {
         endMonth = objPopCalendar.monthUpTo
      }

      var sHTML = ""
      for (var i=beginMonth; i<=endMonth; i++) 
      {
         objPopCalendar.countMonths++

         var sName = objPopCalendar.monthName[i]
         if (i==objPopCalendar.monthSelected){
            sName =   "<B>" +   sName +   "</B>"
         }
         sHTML += "<tr><td id='popupSuperMonth" + i + "' onmouseover='objPopCalList["+l+"].bShow=true;this.style.backgroundColor=\"#FFCC99\"' onmouseout='objPopCalList["+l+"].bShow=false;this.style.backgroundColor=\"\"' style='cursor:default' onclick='objPopCalList["+l+"].bShow=false;objPopCalList["+l+"].monthConstructed=false;objPopCalList["+l+"].monthSelected=" + i + ";PopCalConstructCalendar("+l+");PopCalDownMonth("+l+");event.cancelBubble=true'>&nbsp;" + sName + "&nbsp;</td></tr>"
      }

      var PopCal = objPopCalendar.calendarInstance
      PopCal.popupSuperMonth.innerHTML = "<table width=70 style='font-family:arial; font-size:11px; border-width:1; border-style:solid; border-color:#a0a0a0;' bgcolor='#FFFFDD' cellspacing=0 onmouseover='clearTimeout(objPopCalList["+l+"].timeoutID1)' onmouseout='clearTimeout(objPopCalList["+l+"].timeoutID1);event.cancelBubble=true'>" + sHTML + "</table>"

      objPopCalendar.monthConstructed=true
   }
}

function PopCalUpMonth(l) 
{
   var objPopCalendar = objPopCalList[l]
   if ((objPopCalendar.yearSelected == objPopCalendar.yearFrom) || (objPopCalendar.yearSelected == objPopCalendar.yearUpTo))
   {
      objPopCalendar.monthConstructed=false
   }
   else if (objPopCalendar.countMonths != 12)
   {
      objPopCalendar.monthConstructed=false
   }
   
   PopCalConstructMonth(l)

   var PopCal = objPopCalendar.calendarInstance
   PopCal.popupSuperMonth.style.display = ""
   if (PopCal.popupSuperMonth.OverSelect) PopCal.popupSuperMonth.OverSelect.style.display = ""

   var lLeft = parseInt(PopCal.popupSuperCalendar.style.left, 10) + 50
   var lTop = parseInt(PopCal.popupSuperCalendar.style.top, 10) + 26
   PopCalSetPosition(PopCal.popupSuperMonth, lTop, lLeft)
}

function PopCalDownMonth(l)
{
   var objPopCalendar = objPopCalList[l]
   if (objPopCalendar.calendarInstance.popupSuperMonth.style.display != "none")
   {
      if (!objPopCalendar.keepMonth)
      {
         objPopCalendar.calendarInstance.popupSuperMonth.style.display = "none"
         if (objPopCalendar.calendarInstance.popupSuperMonth.OverSelect) objPopCalendar.calendarInstance.popupSuperMonth.OverSelect.style.display = "none"
      }
   }
   objPopCalendar.keepMonth = false
}


/*** Year Pulldown ***/

function PopCalWheelYear(l)
{
   var objPopCalendar = objPopCalList[l]
   if (PopCalIsObjectVisible(objPopCalendar.calendarInstance.popupSuperYear,l))
   {
      if (event.wheelDelta >= 120)
      {
         for   (var i=0; i<3; i++)
         {
            PopCalDecYear(l)
         }
      }
      else if (event.wheelDelta <= -120)
      {
         for   (var i=0; i<3; i++)
         {
            PopCalIncYear(l)
         }
      }
   }
}


function PopCalIncYear(l) 
{
   var objPopCalendar = objPopCalList[l]
   if ((objPopCalendar.nStartingYear+(objPopCalendar.HalfYearList*2+1)) <= objPopCalendar.yearUpTo)
   {
      var PopCal=objPopCalendar.calendarInstance
      for   (var i=0; i<(objPopCalendar.HalfYearList*2+1); i++){
         var newYear = (i+objPopCalendar.nStartingYear)+1
         var txtYear
         if (newYear==objPopCalendar.yearSelected)
         { 
            txtYear = "&nbsp;<B>" + newYear + "</B>&nbsp;" 
         }
         else
         {
            txtYear = "&nbsp;" + newYear + "&nbsp;" 
         }
         PopCal.popupSuperYearList[i].innerHTML = txtYear
      }
      objPopCalendar.nStartingYear ++
   }
   objPopCalendar.bShow=true
}

function PopCalDecYear(l) 
{
   var objPopCalendar = objPopCalList[l]
   if (objPopCalendar.nStartingYear-1 >= objPopCalendar.yearFrom)
   {
      var PopCal=objPopCalendar.calendarInstance
      for (var i=0; i<(objPopCalendar.HalfYearList*2+1); i++)
      {
         var newYear   = (i+objPopCalendar.nStartingYear)-1
         var txtYear

         if (newYear==objPopCalendar.yearSelected)
         {
            txtYear = "&nbsp;<B>"+ newYear + "</B>&nbsp;"
         }
         else
         {
            txtYear = "&nbsp;" + newYear + "&nbsp;" 
         }
         PopCal.popupSuperYearList[i].innerHTML = txtYear
      }
      objPopCalendar.nStartingYear --
   }
   objPopCalendar.bShow=true
}

function PopCalSelectYear(nYear, l) 
{
   var objPopCalendar = objPopCalList[l]
   objPopCalendar.yearSelected=parseInt(nYear+objPopCalendar.nStartingYear, 10)
   if ((objPopCalendar.yearSelected == objPopCalendar.yearFrom) && (objPopCalendar.monthSelected < objPopCalendar.monthFrom))
   {
      objPopCalendar.monthSelected = objPopCalendar.monthFrom
   }
   else if ((objPopCalendar.yearSelected == objPopCalendar.yearUpTo) && (objPopCalendar.monthSelected > objPopCalendar.monthUpTo))
   {
      objPopCalendar.monthSelected = objPopCalendar.monthUpTo
   }
   objPopCalendar.yearConstructed=false
   PopCalConstructCalendar(l)
   PopCalDownYear(l)
}

function PopCalConstructYear(l) 
{
   var objPopCalendar = objPopCalList[l]
   PopCalDownMonth(l)

   var sHTML = ""
   var longList = true
   if (!objPopCalendar.yearConstructed)
   {
      var beginYear = objPopCalendar.yearSelected-objPopCalendar.HalfYearList
      var endYear = objPopCalendar.yearSelected+objPopCalendar.HalfYearList

      if ((objPopCalendar.yearUpTo - objPopCalendar.yearFrom + 1) <= (objPopCalendar.HalfYearList * 2 + 1))
      {
         beginYear = objPopCalendar.yearFrom
         endYear = objPopCalendar.yearUpTo
         longList = false
      }
      else if (beginYear < objPopCalendar.yearFrom)
      {
         beginYear = objPopCalendar.yearFrom
         endYear = beginYear + objPopCalendar.HalfYearList * 2
      }
      else if (endYear > objPopCalendar.yearUpTo)
      {
         endYear = objPopCalendar.yearUpTo
         beginYear = endYear - (objPopCalendar.HalfYearList * 2)
      }

      objPopCalendar.nStartingYear = beginYear

      if (longList)
      {
         sHTML += "<tr><td align='center' onmouseover='objPopCalList["+l+"].bShow=true;this.style.backgroundColor=\"#FFCC99\"' onmouseout='objPopCalList["+l+"].bShow=false;clearInterval(objPopCalList["+l+"].intervalID1);this.style.backgroundColor=\"\"' style='cursor:default;border-bottom:1px #a0a0a0 solid' onmousedown='clearInterval(objPopCalList["+l+"].intervalID1);objPopCalList["+l+"].intervalID1=setInterval(\"PopCalDecYear("+l+")\",10)' onmouseup='clearInterval(objPopCalList["+l+"].intervalID1)'><IMG id='popupSuperUpYear' onDrag='return(false)' SRC='"+objPopCalendar.imgDir+"up.gif' BORDER=0></td></tr>"
      }

      var j =   0
      for (var i=(beginYear); i<=(endYear); i++)
      {
         var sName =   i
         if (i==objPopCalendar.yearSelected)
         {
            sName = "<B>" + sName + "</B>"
         }

         sHTML += "<tr><td id='popupSuperYear" + j + "' align='center' onmouseover='objPopCalList["+l+"].bShow=true;this.style.backgroundColor=\"#FFCC99\"' onmouseout='objPopCalList["+l+"].bShow=false;this.style.backgroundColor=\"\"' style='cursor:default' onclick='objPopCalList["+l+"].bShow=false;PopCalSelectYear("+j+","+l+");event.cancelBubble=true'>&nbsp;" + sName + "&nbsp;</td></tr>"
         j ++
      }

      if (longList)
      {
         sHTML += "<tr><td align='center' onmouseover='objPopCalList["+l+"].bShow=true;this.style.backgroundColor=\"#FFCC99\"' onmouseout='objPopCalList["+l+"].bShow=false;clearInterval(objPopCalList["+l+"].intervalID2);this.style.backgroundColor=\"\"' style='cursor:default;border-top:1px #a0a0a0 solid' onmousedown='clearInterval(objPopCalList["+l+"].intervalID2);objPopCalList["+l+"].intervalID2=setInterval(\"PopCalIncYear("+l+")\",10)' onmouseup='clearInterval(objPopCalList["+l+"].intervalID2)'><IMG id='popupSuperDownYear' onDrag='return(false)' SRC='"+objPopCalendar.imgDir+"down.gif' BORDER=0></td></tr>"
      }

      var PopCal=objPopCalendar.calendarInstance
      PopCal.popupSuperYear.innerHTML   = "<table width=44 style='font-family:arial; font-size:11px; border-width:1; border-style:solid; border-color:#a0a0a0;'   bgcolor='#FFFFDD' onmouseover='clearTimeout(objPopCalList["+l+"].timeoutID2)' onmouseout='clearTimeout(objPopCalList["+l+"].timeoutID2);' cellspacing=0>"   + sHTML   + "</table>"

      PopCal.popupSuperYearList = []
      for (var i=0; i<j; i++)
      {
         PopCal.popupSuperYearList[i] = document.getElementById("popupSuperYear" + i)
      }

      objPopCalendar.yearConstructed = true
   }
}
function PopCalDownYear(l) 
{
   var objPopCalendar = objPopCalList[l]
   if (objPopCalendar.calendarInstance.popupSuperYear.style.display != "none")
   {
      if (!objPopCalendar.keepYear)
      {
         clearInterval(objPopCalendar.intervalID1)
         clearTimeout(objPopCalendar.timeoutID1)
         clearInterval(objPopCalendar.intervalID2)
         clearTimeout(objPopCalendar.timeoutID2)
         PopCalYearDown = true
         objPopCalendar.calendarInstance.popupSuperYear.style.display = "none"
         if (objPopCalendar.calendarInstance.popupSuperYear.OverSelect) objPopCalendar.calendarInstance.popupSuperYear.OverSelect.style.display = "none"
      }
   }
   objPopCalendar.keepYear = false
}

function PopCalUpYear(l)
{
   var objPopCalendar = objPopCalList[l]
   var PopCal = objPopCalendar.calendarInstance
   PopCalConstructYear(l)
   PopCal.popupSuperYear.style.display = ""
   if (PopCal.popupSuperYear.OverSelect) PopCal.popupSuperYear.OverSelect.style.display = ""
   var lTop = parseInt(PopCal.popupSuperCalendar.style.top, 10) + 26
   var lLeft = parseInt(PopCal.popupSuperCalendar.style.left, 10) + document.getElementById("popupSuperSpanYear" + objPopCalendar.id).offsetLeft
   lLeft += (objPopCalendar.ie)?6:7
   
   PopCalSetPosition(PopCal.popupSuperYear, lTop, lLeft)
}

/*** calendar ***/
function PopCalWeekNbr(n, l) 
{
    // Algorithm used:
    // From Klaus Tondering's Calendar document (The Authority/Guru)
    // hhtp://www.tondering.dk/claus/calendar.html
    // a = (14-month) / 12
    // y = year + 4800 - a
    // m = month + 12a - 3
    // J = day + (153m + 2) / 5 + 365y + y / 4 - y / 100 + y / 400 - 32045
    // d4 = (J + 31741 - (J mod 7)) mod 146097 mod 36524 mod 1461
    // L = d4 / 1460
    // d1 = ((d4 - L) mod 365) + L
    // WeekNumber = d1 / 7 + 1

   var objPopCalendar = objPopCalList[l]
   var PopCal=objPopCalendar.calendarInstance

   var year = n.getFullYear()
   var month = n.getMonth() + 1
   var day
   if (PopCal.startAt == 0) 
   {
      day = n.getDate() + 1
   }
   else 
   {
      day = n.getDate()
   }

   var a = Math.floor((14-month) / 12)
   var y = year + 4800 - a
   var m = month + 12 * a - 3
   var b = Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400)
   var J = day + Math.floor((153 * m + 2) / 5) + 365 * y + b - 32045
   var d4 = (((J + 31741 - (J % 7)) % 146097) % 36524) % 1461
   var L = Math.floor(d4 / 1460)
   var d1 = ((d4 - L) % 365) + L
   var week = Math.floor(d1/7) + 1

   return week
}

function PopCalConstructCalendar(l)
{
   var objPopCalendar = objPopCalList[l]
   var PopCal=objPopCalendar.calendarInstance
   var aNumDays = Array (31,0,31,30,31,30,31,31,30,31,30,31)

   var dateMessage
   var startDate = new Date(objPopCalendar.yearSelected,objPopCalendar.monthSelected,1)
   var endDate
   var numDaysInMonth
   var notSelect
   var selectWeekends = PopCal.selectWeekend
   var selectHolidays = PopCal.selectHoliday
   
   if (objPopCalendar.overWriteSelectWeekend!=null)
   {
      selectWeekends = objPopCalendar.overWriteSelectWeekend
   }

   if (objPopCalendar.overWriteSelectHoliday!=null)
   {
      selectHolidays = objPopCalendar.overWriteSelectHoliday
   }
   
   if (PopCal.showHolidays==0) 
   {
      selectHolidays = true
   }

   if (objPopCalendar.monthSelected==1)
   {
      endDate = new Date(objPopCalendar.yearSelected,2,1)
      
      endDate = new Date(endDate - (86400000))

      numDaysInMonth = endDate.getDate()
   }
   else
   {
      numDaysInMonth = aNumDays[objPopCalendar.monthSelected]
   }

   var datePointer   = 0
   dayPointer = startDate.getDay() - PopCal.startAt
   
   if (dayPointer<0)
   {
      dayPointer = 6
   }

   var sHTML = "<table border=0 style='font-family:verdana;font-size:10px;'><tr>"

   if (PopCal.showWeekNumber==1)
   {
      sHTML += "<td width=20 Style='cursor:default' align='center'><b>" + objPopCalendar.weekString + "</b></td><td width=1 rowspan=7 bgcolor='#d0d0d0' style='padding:0px'></td>"
   }

   for (var i=0; i<7; i++)
   {
      sHTML += "<td width='27' align='right' Style='cursor:default'><B>"+ objPopCalendar.dayName[i].substr(0,3)+"</B></td>"
   }
   sHTML +="</tr><tr>"
   
   if (PopCal.showWeekNumber==1)
   {
      sHTML += "<td align=right Style='cursor:default'>" + PopCalWeekNbr(startDate, l) + "&nbsp;</td>"
   }

   for (var i=1; i<=dayPointer;i++ )
   {
      sHTML += "<td Style='cursor:default'>&nbsp;</td>"
   }

   //Martes de Carnaval y Viernes Santo para el año actual
   if ((PopCal.addCarnival==1) || (PopCal.addGoodFriday==1))
   {
      var dtDomingoPascuas = PopCalDomingoPascuas(objPopCalendar.yearSelected)

      if (PopCal.addCarnival==1)
      {
         var dtDate = new Date(dtDomingoPascuas - (47 * 86400000))
         PopCalAddHoliday(dtDate.getDate(), dtDate.getMonth() + 1, dtDate.getFullYear(),["Martes de Carnaval", "Carnival", "Fastnachtsdienstag"], l)
      }

      if (PopCal.addGoodFriday==1)
      {
         var dtDate = new Date(dtDomingoPascuas - (2 * 86400000))
         PopCalAddHoliday(dtDate.getDate(), dtDate.getMonth() + 1, dtDate.getFullYear() ,["Viernes Santo", "Good Friday", "Karfreitag"], l)
      }
   }
   for (var datePointer=1; datePointer<=numDaysInMonth; datePointer++ )
   {
      dayPointer++
      sHTML += "<td align=right Style='cursor:default;'>"
      var sStyle=objPopCalendar.styleAnchor
      
      var _date = new Date(objPopCalendar.yearSelected, objPopCalendar.monthSelected, datePointer)
      
      if ((datePointer==objPopCalendar.odateSelected) && (objPopCalendar.monthSelected==objPopCalendar.omonthSelected) && (objPopCalendar.yearSelected==objPopCalendar.oyearSelected))
      { 
         sStyle+=objPopCalendar.styleLightBorder 
      }

      notSelect = false

      var bHoliday = false
      var bSpecial = false
      var _IsDate = false
      var sHint = ""
      for (var k=0;k<objPopCalendar.HolidaysCounter;k++)
      {
         _IsDate = false
         if (objPopCalendar.Holidays[k].type == "Type 1")
         {
            _IsDate = PopCalValidateType1(_date, objPopCalendar.Holidays[k])
         }
         else if (objPopCalendar.Holidays[k].type == "Type 2")
         {
            _IsDate = PopCalValidateType2(_date, objPopCalendar.Holidays[k])
         }
         else if (objPopCalendar.Holidays[k].type == "Type 3")
         {
            _IsDate = PopCalValidateType3(_date, objPopCalendar.Holidays[k])
         }
         if (_IsDate)
         {
            if ((PopCal.showHolidays==1) && (objPopCalendar.Holidays[k].tipo==1))
            {
               bHoliday = true
               sHint+=(sHint==""?"":objPopCalendar.ie?"\n":", ") + objPopCalendar.Holidays[k].desc[PopCal.language]
            }
            else if ((PopCal.showSpecialDay==1) && (objPopCalendar.Holidays[k].tipo==0))
            {
               bSpecial = true
               sHint+=(sHint==""?"":objPopCalendar.ie?"\n":", ") + objPopCalendar.Holidays[k].desc[PopCal.language]
            }
               
            if ((selectHolidays!=1) && (objPopCalendar.Holidays[k].tipo==1))
            {
               notSelect = true
            }
         }
      }

      var regexp= /\"/g
      sHint=sHint.replace(regexp,"&quot;")

      dateMessage = "onmouseover='window.status=\""+objPopCalendar.selectDateMessage.replace("[date]",PopCalConstructDate(datePointer,objPopCalendar.monthSelected,objPopCalendar.yearSelected,objPopCalendar.dateFormat,l))+"\"' onmouseout='window.status=\"\"' "
      
      if (objPopCalendar.yearSelected == objPopCalendar.yearFrom && objPopCalendar.monthSelected == objPopCalendar.monthFrom)
      {
         if (datePointer < objPopCalendar.dateFrom)
         {
            notSelect = true
         }
      }

      if (objPopCalendar.yearSelected == objPopCalendar.yearUpTo && objPopCalendar.monthSelected == objPopCalendar.monthUpTo)
      {
         if (datePointer > objPopCalendar.dateUpTo)
         {
            notSelect = true
         }
      }
      
      if ((selectWeekends!=1) && (!notSelect))
      {
         if ((dayPointer % 7 == (PopCal.startAt * -1)+1) || (dayPointer % 7 == (PopCal.startAt * -1)+7) || (dayPointer % 7 == (PopCal.startAt * -1)))
         {
            notSelect = true
         }
      }

      if (bSpecial)
      {
         sStyle+="background-color:#70FFD0;"
      }
      else if (bHoliday)
      {
         sStyle+="background-color:#FFDDDD;"
      }

      if (notSelect)
      {
         sStyle += "text-decoration:line-through;"

         if ((datePointer==objPopCalendar.dateNow)&&(objPopCalendar.monthSelected==objPopCalendar.monthNow)&&(objPopCalendar.yearSelected==objPopCalendar.yearNow))
         {
            sStyle += "font-weight:Bold;color:#ff0000;"
         }
         else if (((dayPointer % 7 == (PopCal.startAt * -1)+1) || (dayPointer % 7 == (PopCal.startAt * -1)+7) || (dayPointer % 7 == (PopCal.startAt * -1))) && (PopCal.showWeekend==1))
         {
            sStyle += "color:#909090;"
         }

         sHTML += "<Span title=\"" + sHint + "\" Style='" + sStyle + "'>&nbsp;" + datePointer + "&nbsp;</Span>"
      }
      else
      {
         if ((datePointer==objPopCalendar.dateNow)&&(objPopCalendar.monthSelected==objPopCalendar.monthNow)&&(objPopCalendar.yearSelected==objPopCalendar.yearNow))
         {
            sStyle += "font-weight:Bold;color:#ff0000;"
         }
         else if (((dayPointer % 7 == (PopCal.startAt * -1)+1) || (dayPointer % 7 == (PopCal.startAt * -1)+7) || (dayPointer % 7 == (PopCal.startAt * -1))) && (PopCal.showWeekend==1))
         {
            sStyle += "color:#909090;"
         }
         sHTML += "<span "+dateMessage+" title=\"" + sHint + "\" style='"+sStyle+"' onClick='objPopCalList["+l+"].dateSelected=" + datePointer + ";PopCalCloseCalendar("+l+");'>&nbsp;" + datePointer + "&nbsp;</span>"
      }
      
      sHTML += ""
      if ((dayPointer+PopCal.startAt) % 7 == PopCal.startAt) { 
         sHTML += "</tr><tr>" 
         if ((PopCal.showWeekNumber==1)&&(datePointer<numDaysInMonth))
         {
            sHTML += "<td align=right Style='cursor:default'>" + (PopCalWeekNbr(new Date(objPopCalendar.yearSelected,objPopCalendar.monthSelected,datePointer+1), l)) + "&nbsp;</td>"
         }
      }
      

   }
   
   if (PopCal.addGoodFriday==1)
   {
      objPopCalendar.Holidays.length = --objPopCalendar.HolidaysCounter
   }

   if (PopCal.addCarnival==1)
   {
      objPopCalendar.Holidays.length = --objPopCalendar.HolidaysCounter
   }

   document.getElementById("popupSuperContent" + objPopCalendar.id).innerHTML = sHTML
   document.getElementById("popupSuperSpanMonth" + objPopCalendar.id).innerHTML = "&nbsp;" + objPopCalendar.monthName[objPopCalendar.monthSelected] + "&nbsp;<IMG id='popupSuperChangeMonth" + objPopCalendar.id +  "' onDrag='return(false)' SRC='"+objPopCalendar.imgDir+"drop1.gif' WIDTH='12' HEIGHT='10' BORDER=0>"
   document.getElementById("popupSuperSpanYear" + objPopCalendar.id).innerHTML = "&nbsp;" + objPopCalendar.yearSelected + "&nbsp;<IMG id='popupSuperChangeYear" + objPopCalendar.id +  "' onDrag='return(false)' SRC='"+objPopCalendar.imgDir+"drop1.gif' WIDTH='12' HEIGHT='10' BORDER=0>"

   PopCalMoveShadow(l)   
}


function PopCalMoveShadow(l)
{
   var objPopCalendar = objPopCalList[l]
   var PopCal=objPopCalendar.calendarInstance

   PopCalSetPosition(PopCal.popupSuperCalendar)
   if (PopCal.shadow==1)
   {
      PopCal.popupSuperShadowRight.style.height = PopCal.popupSuperCalendar.offsetHeight - 10
      PopCal.popupSuperShadowRight.style.top =  PopCal.popupSuperCalendar.offsetTop + 10
      PopCal.popupSuperShadowRight.style.left = PopCal.popupSuperCalendar.offsetLeft + PopCal.popupSuperCalendar.offsetWidth

      PopCal.popupSuperShadowBottom.style.width = PopCal.popupSuperCalendar.offsetWidth
      PopCal.popupSuperShadowBottom.style.top =  PopCal.popupSuperCalendar.offsetTop + PopCal.popupSuperCalendar.offsetHeight
      PopCal.popupSuperShadowBottom.style.left = (PopCal.popupSuperCalendar.offsetLeft + PopCal.popupSuperCalendar.offsetWidth + 10) - PopCal.popupSuperCalendar.offsetWidth
   }
}

function PopCalDateNow(l)
{
   var objPopCalendar = objPopCalList[l]
   return PopCalPad(objPopCalendar.yearNow, 4, "0", "L") + PopCalPad(objPopCalendar.monthNow, 2, "0", "L") + PopCalPad(objPopCalendar.dateNow, 2, "0", "L")
}

function PopCalDateSelect(l)
{
   var objPopCalendar = objPopCalList[l]
   return PopCalPad(objPopCalendar.yearSelected, 4, "0", "L") + PopCalPad(objPopCalendar.monthSelected, 2, "0", "L") + PopCalPad(objPopCalendar.dateSelected, 2, "0", "L")
}

function PopCalDateFrom(l)
{
   var objPopCalendar = objPopCalList[l]
   return PopCalPad(objPopCalendar.yearFrom, 4, "0", "L") + PopCalPad(objPopCalendar.monthFrom, 2, "0", "L") + PopCalPad(objPopCalendar.dateFrom, 2, "0", "L")
}

function PopCalDateUpTo(l)
{
   var objPopCalendar = objPopCalList[l]
   return PopCalPad(objPopCalendar.yearUpTo, 4, "0", "L") + PopCalPad(objPopCalendar.monthUpTo, 2, "0", "L") + PopCalPad(objPopCalendar.dateUpTo, 2, "0", "L")
}

function PopCalCenturyOn(dateFormat)
{
   var formatChar =  " "

   dateFormat = dateFormat.toLowerCase()
   
   var aFormat = dateFormat.split(formatChar)
   if (aFormat.length<3)
   {
      formatChar = "/"
      aFormat = dateFormat.split(formatChar)
      if (aFormat.length<3)
      {
         formatChar = "."
         aFormat = dateFormat.split(formatChar)
         if (aFormat.length<3)
         {
            formatChar = "-"
            aFormat = dateFormat.split(formatChar)
            if (aFormat.length<3)
            {
               // invalid date   format
               formatChar = ""
            }
         }
      }
   }

   if ( formatChar != "" )
   {
      for (var i=0;i<3;i++)
      {
         if (aFormat[i]=="yyyy")
         {
            return true
         }
      }
   }
   return false
}

function PopCalSetDMY(dateValue, dateFormat, l)
{
   var objPopCalendar = objPopCalList[l]
   var PopCal=objPopCalendar.calendarInstance
   objPopCalendar.oDate = null
   objPopCalendar.oMonth = null
   objPopCalendar.oYear = null

   var formatChar =  " "

   dateFormat = dateFormat.toLowerCase()
   
   var aFormat = dateFormat.split(formatChar)
   if (aFormat.length<3)
   {
      formatChar = "/"
      aFormat = dateFormat.split(formatChar)
      if (aFormat.length<3)
      {
         formatChar = "."
         aFormat = dateFormat.split(formatChar)
         if (aFormat.length<3)
         {
            formatChar = "-"
            aFormat = dateFormat.split(formatChar)
            if (aFormat.length<3)
            {
               // invalid date   format
               formatChar = ""
            }
         }
      }
   }

   var tokensChanged = 0

   if ( formatChar != "" )
   {
      // use user's date
      var aData = dateValue.split(formatChar)

      for (var i=0;i<3;i++)
      {
         if ((aFormat[i]=="d") || (aFormat[i]=="dd"))
         {
            objPopCalendar.oDate = parseInt(aData[i], 10)
            tokensChanged ++
         }
         else if ((aFormat[i]=="m") || (aFormat[i]=="mm"))
         {
            if (((parseInt(aData[i], 10) - 1)>=0) && ((parseInt(aData[i], 10) - 1)<=11))
            {
               objPopCalendar.oMonth = parseInt(aData[i], 10) - 1
               tokensChanged ++
            }
         }
         else if ((aFormat[i]=="yy") || (aFormat[i]=="yyyy"))
         {
            objPopCalendar.oYear = parseInt(aData[i], 10)
            if (objPopCalendar.oYear<=99)
            {
               tokensChanged ++
               if (objPopCalendar.oYear < 100)
               {
                  if (objPopCalendar.oYear < PopCal.centuryLimit)
                  {
                     objPopCalendar.oYear += 100
                  }
                  objPopCalendar.oYear += 1900
               }
            }
            else if (objPopCalendar.oYear<=9999)
            {
               tokensChanged ++
            }
         }
         else if ((aFormat[i]=="mmm") || (aFormat[i]=="mmmm"))
         {
            for (j=0; j<12;   j++)
            {
               if (aData[i])
               {
                  if ((aData[i].toLowerCase()=="mrz")&&(PopCal.language==2))
                  {
                     objPopCalendar.oMonth=2
                     tokensChanged ++
                     break
                  }
                  else if (aFormat[i]=="mmm")
                  {
                     if (aData[i].toLowerCase()==objPopCalendar.monthName[j].toLowerCase().substr(0,3))
                     {
                        objPopCalendar.oMonth=j
                        tokensChanged ++
                        break
                     }
                  }
                  else
                  {
                     if (aData[i].toLowerCase()==objPopCalendar.monthName[j].toLowerCase())
                     {
                        objPopCalendar.oMonth=j
                        tokensChanged ++
                        break
                     }
                  }
               }
            }
         }
      }
   }
   return ((tokensChanged==3)&&!isNaN(objPopCalendar.oDate)&&!isNaN(objPopCalendar.oMonth)&&!isNaN(objPopCalendar.oYear))
}

function PopCalGetDate(dateValue, dateFormat, l)
{
   var objPopCalendar = objPopCalList[l]
   if (PopCalIsToday(dateValue))
   {
      return (new Date(objPopCalendar.today.getFullYear(),objPopCalendar.today.getMonth(),objPopCalendar.today.getDate()))
   }   
   else if (PopCalFormatDate(dateValue, dateFormat, 'yyyy-mmm-dd', l) != '')
   {
      return (new Date(objPopCalendar.oYear, objPopCalendar.oMonth, objPopCalendar.oDate))
   }
   return null
}

function PopCalChangeCurrentMonth(l)
{
   var objPopCalendar = objPopCalList[l]
   if ((PopCalDateFrom(l).substr(0,6) <= PopCalDateNow(l).substr(0,6)) && (PopCalDateNow(l).substr(0,6) <= PopCalDateUpTo(l).substr(0,6)))
   {

      objPopCalendar.monthSelected=objPopCalendar.monthNow
      objPopCalendar.yearSelected=objPopCalendar.yearNow
      objPopCalendar.yearConstructed=false
      objPopCalendar.monthConstructed=false
      PopCalConstructCalendar(l)
   }
}

function PopCalDomingoPascuas(y)
{
   var lnCentena
   var lnAux
   var lnNroAureo
   var lnDomingo
   var lnEpactaJul
   var lnCorrSolar
   var lnCorrLunar
   var lnEpactaGreg
   var lnDiasLunaP
   var lnDiasLuna15
   var lnDiasPascua
   var dtFecIni
   var dtFecPascua
   
   lnCentena = parseInt(y/100, 10)
   lnAux = (y+1)%19
   lnNroAureo = lnAux+(19*parseInt((19-lnAux)/19, 10))
   lnDomingo = 7+(1-y-parseInt(y/4, 10)+lnCentena-parseInt(lnCentena/4, 10))%7
   lnEpactaJul = ((11*lnNroAureo)-10)%30
   lnCorrSolar = -(lnCentena-16)+parseInt((lnCentena-16)/4, 10)
   lnCorrLunar = parseInt((lnCentena-15-parseInt((lnCentena-17)/25, 10))/3, 10)
   lnEpactaGreg = (30+lnEpactaJul+lnCorrSolar+lnCorrLunar)%30
   lnDiasLunaP = 24-lnEpactaGreg+(30*parseInt(lnEpactaGreg/24, 10))
   lnDiasLuna15 = (27-lnEpactaGreg+(30*parseInt(lnEpactaGreg/24, 10)))%7
   lnDiasPascua = lnDiasLunaP+(7+lnDomingo-lnDiasLuna15)%7
   dtFecIni = new Date(y, 2, 21)
   dtFecPascua = new Date(dtFecIni -(-(lnDiasPascua * 86400000)))
   return (dtFecPascua)
}

function PopCalPad(s, l, c, X)
{
   var x = X
   var r = s.toString()

   if (r.length >= l) return (r.substr(0, l))
   if (c==null) c = ' '

   do
   {
      if (X=='C')
      {
         if (x=='L') x = 'R'
         else x = 'L'
      }
   
      if (x=='L') r = c + r
      else if (x=='R') r = r + c
      
   } while (r.length < l)

   return (r)
}

function PopCalIsToday(_hoy)
{
   return ((',now,today,hoy,heute,').indexOf(',' + _hoy.toLowerCase() + ',') != -1)
}

function PopCalAddRegularHolidays(l)
{
   //Días libres (Panamá)
   //PopCalAddHoliday(9,1,0,["D" + c_iTilde + "a de los M" + c_aTilde + "rtires"], l)
   //PopCalAddHoliday(3,11,0,["Separaci" + c_oTilde + "n de Colombia"], l)
   //PopCalAddHoliday(10,11,0,["1er. Grito de Independencia"], l)
   //PopCalAddHoliday(28,11,0,["Independencia de Espa" + c_nTilde + "a"], l)
   //PopCalAddHoliday(8,12,0,["D" + c_iTilde + "a de la Madre", "Mother's Day"], l)


   PopCalAddHoliday(1,1,0,["A" + c_nTilde + "o Nuevo","Happy New Year","Neujahr","Nový rok"], l)
   PopCalAddHoliday(6,1,0,["","","","Zjavenie pána (Traja králi)"], l)
   PopCalAddHoliday(1,5,0,["D" + c_iTilde + "a del Trabajo", "Labor Day","","Deò práce"], l)
   PopCalAddHoliday(8,5,0,["","","","De" + c_nTilde + " ví" + c_tTilde + "azstva nad fa" + c_sTilde + "izmom"], l)
   PopCalAddHoliday(5,7,0,["","","","Sv.Cyril a Metod"], l)
   PopCalAddHoliday(29,8,0,["","","","Výro" + c_cTilde + "ie SNP"], l)
   PopCalAddHoliday(1,9,0,["","","","De" + c_nTilde + " ústavy"], l)
   PopCalAddHoliday(15,9,0,["","","","Sedembolestná Panna Mária"], l)
   PopCalAddHoliday(1,11,0,["","","","Sviatok v" + c_sTilde + "etkých sv" + c_aTilde + "tých"], l)
   PopCalAddHoliday(17,11,0,["","","","De" + c_nTilde + " boja za slobodu a demokraciu"], l)
   PopCalAddHoliday(24,15,0,["","","",c_STilde + "tedrý de" + c_nTilde], l)
   PopCalAddHoliday(25,12,0,["Navidad", "Christmas","Weihnachten","Prvý sviatok viano" + c_cTilde + "ný"], l)
   PopCalAddHoliday(26,15,0,["","","","Druhý sviatok viano" + c_cTilde + "ný"], l)
   PopCalAddIrregularHoliday(3,0,6,["D" + c_iTilde + "a del Padre", "Father's Day","","De" + c_nTilde + " otcov"], l)
}

function PopCalAddRegularSpecialDays(l)
{

}
