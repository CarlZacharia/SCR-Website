<?php
session_start();    
    if(!isset($_SESSION['user']) || $_SESSION['user'] == " ")
    {
        echo "<script language='javascript'>";
        echo "window.location='../index.php'";
        echo "</script> ";
        exit;
    }
?>
<html>
<head>
<style>
table.maintable {
    border-collapse: separate;
    border-spacing: 10px;
}

input {
  font-size: 16px;
  width: 200px;
  background-color: #CCFFFF;
  border: black solid 2px;
  padding: 4px;
}
select {
line-height: 1.5em;
  font-size: 16px;
  width: 200px;
  background-color: #CCFFFF;
  border: black solid 2px;
  padding: 4px;
}
#choicesmenu
{
  width:700px;
  height: 800px;
  background-color: #ccc;
  color: black;
  margin: auto;
}
</style>

<script src="http://code.jquery.com/jquery-latest.min.js"></script>
  <link rel="stylesheet" href="../css/bootstrap.css">
 <script src="../js/bootstrap.js"></script>
<title >Zacharia & Brown Document Generator</title>

</head>
<body>
  <h1 align="center"> Zacharia & Brown</h1>
<section id="outerContainer">
  <div id="choicesmenu">
<table class="maintable">
<tr><td><button type="btn" class="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#poaModal" >Draft POA</button></td></tr>
<tr><a href="docs/gifting.pdf"  class="btn btn-primary btn-lg btn-block">Gifting PDF</a></td></tr>
<tr><a href="docs/mmna2.pdf"  class="btn btn-primary btn-lg btn-block">MMMNA PDF</a></td></tr>
<tr></tr>

</table>
</div>
</section>

<div class="modal fade" id="poaModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
  <h4 class="modal-title">POA Generator</h4>
      </div>
      <div class="modal-body">
        <form method="post" action="php/draftpoa.php">
        <table class="maintable">

          <tr>
          <td>Principal Name</td>
            <td><input type="text" id="pname" name="pname"/></td>
          </tr>
          <tr>
          <td>County of Residence</td>
            <td><select style="width: 200px; float: left;" onchange="this.nextElementSibling.value=this.value">
              <option></option>
              <option>Allegheny</option>
              <option>Washington</option>
              <option>Westmoreland</option> 
              <option>Fayette</option>
              <option>Somerset</option>
              <option>Green</option>
              <option>Beaver</option>
              <option>Butler</option>
          </select>
            <input style="width: 185px; margin-left: -199px; margin-top: 1px; border: none; float: left;"  name="countyres" id="countyres"/>
            </td>
        </tr>
          <tr>
          <td>County Signed In</td>
            <td><select style="width: 200px; float: left;" onchange="this.nextElementSibling.value=this.value">
              <option></option>
              <option>Allegheny</option>
              <option>Washington</option>
              <option>Westmoreland</option> 
              <option>Fayette</option>
              <option>Somerset</option>
              <option>Green</option>
              <option>Beaver</option>
              <option>Butler</option>
          </select>
            <input style="width: 185px; margin-left: -199px; margin-top: 1px; border: none; float: left;"  name="county" id="county"/>
            </td>
          </tr>         
          <tr>
          <td>GDPOA Agent</td>
            <td><input type="text" id="a1name" name="a1name" onblur="dupepoas()"/></td>
          </tr>
          <tr>
          <td>GDPOA Alternate Agent</td>
            <td><input type="text" id="a2name" name="a2name"onblur="dupepoas()"/></td>
          </tr>
          <tr>          
          <td>HCPOA Agent</td>
            <td><input type="text" id="ha1name" name="ha1name"/></td>
          </tr>
          <tr>
          <td>GDPOA Alternate Agent</td>
            <td><input type="text" id="ha2name" name="ha2name"/></td>
          </tr>
          <tr>
          <td>Day Signed</td>
            <td><input type="text" id="day" name="day" onfocus="popcurrent()"/></td>
          </tr>
          <tr>
          <td>Month Signed</td>
            <td><input type="text" id="month" name="month"/></td>
          </tr> 
          <tr>
          <td>Year Signed</td>
            <td><input type="text" id="year" name="year"/></td>
          </tr> 
          <tr>
          <td>Attorney</td>
            <td><select style="width: 200px; float: left;" onchange="this.nextElementSibling.value=this.value">
    <option></option>
    <option>Carl B. Zacharia</option>
    <option>Christine B. Murphy</option>
    <option>Colleen D. Bratkovich</option> 
    <option>Thomas A. McCaffrey</option>
    <option>Justin E. Ellis</option>
    <option>Carrie E. Conboy</option>
    <option>Benjamin W. Urso</option> 
</select>
<input style="width: 185px; margin-left: -199px; margin-top: 1px; border: none; float: left;"  name="atty" id="atty"/></td>
          </tr>
          <tr><td colspan="2">
        <input type="submit" id="submitbtn" class="btn btn-lg btn-primary"></td>
      </tr> 
        </table>
        </form>
      
      </div>
    </div>
  </div>
</div>

<script type="text/javascript">
function dupepoas() {
  var gdpoa = $('#a1name').val();
  var gdpoa2 = $('#a2name').val();
$("#ha1name").val(gdpoa);
$("#ha2name").val(gdpoa2);
}

function popcurrent() {
var d = new Date();
var Amonth = new Array();
Amonth[0] = "January";
Amonth[1] = "February";
Amonth[2] = "March";
Amonth[3] = "April";
Amonth[4] = "May";
Amonth[5] = "June";
Amonth[6] = "July";
Amonth[7] = "August";
Amonth[8] = "September";
Amonth[9] = "October";
Amonth[10] = "November";
Amonth[11] = "December";
var mo = Amonth[d.getMonth()];
var yr = d.getFullYear();
var dt = d.getDate();
$('#year').val(yr);
$('#day').val(dt);
$('#month').val(mo);
};


$('#submitbtn').click(function() {
   $('#poaModal').modal('hide')
   });
</script>
</body>
</html>