//designed by po-fang hsu in 2015 NCHU Awin Lab
//http://github.com/nightheronry
var tag_name = ["hits_10", "mt_10", "hits_13", "mt_13", "hits_14", "mt_14", "hits_91", "mt_91", "hits_92", "mt_92", "hits_5", "mt_5", "hits_6", "mt_6"];
var semantic_tag= [];
var section_tag_hits;
var timeserial= [];
var player;
var hightlightNum=5;
var timeTag = 0;
var timeshift = 0;
var allSparktable = [];
var allOrdertable = [];
var allIDCGtable = [];
var sectionSparktable = [];
var sectionOrdertable = [];
var sectionIDCGtable = [];
var ordertable = [];
var droplistNum = 4;
var count = 1;
var proposal="";
var turn=0;
var final=0;
var thispage_name = "";
var score = -1;
$(function(){
  var $radios = $('input:radio[name=optradio]');
    if($radios.is(':checked') === false) {
        $radios.filter('[value=MT]').prop('checked', true);
    }
  $("#proposalModal").modal({keyboard: false});
  $("#proposalModal").modal("show");
});
function initialize(){
     if ($("#jquery_jplayer_1").length > 0) {
       player = $("#jquery_jplayer_1");
       if(proposal==="HITS"){
        thispage_name = tag_name[0];
      }else{thispage_name = tag_name[1];}
        $.post( "db.php", { hits: "hits-tf-idf-7-10" , mt: "mt-tf-idf-7-10"})
       .done(function( data ) {
       	var object = $.parseJSON(data);
       	console.log(object);
         vedioinfo_process(data);
         setinitialShift();
         setjplayer("荷蘭 VS 阿根廷","video/Video_2014-07-10_074719.mp4","img/Video_2014-07-10.png");
       });

     }
     if ($("#jquery_jplayer_2").length > 0) {
       player = $("#jquery_jplayer_2");
       if(proposal==="HITS"){
        thispage_name = tag_name[2];
      }else{thispage_name = tag_name[3];}
           $.post( "db.php", { hits: "hits-tf-idf-7-13" , mt: "mt-tf-idf-7-13"})
          .done(function( data ) {
          	console.log(data);
            var object = $.parseJSON(data);
            vedioinfo_process(data);
            setinitialShift();
            setjplayer("巴西 VS 荷蘭","video/Video_2014-07-13_055916.mp4","img/Video_2014-07-10.png");
          });

        }
        if ($("#jquery_jplayer_3").length > 0) {
          player = $("#jquery_jplayer_3");
          if(proposal==="HITS"){
           thispage_name = tag_name[4];
         }else{thispage_name = tag_name[5];}
              $.post( "db.php", { hits: "hits-tf-idf-7-14" , mt: "mt-tf-idf-7-14"})
             .done(function( data ) {
             	console.log(data);
               var object = $.parseJSON(data);
               vedioinfo_process(data);
               setinitialShift();
               setjplayer("巴西 VS 荷蘭","video/Video_2014-07-14_054237.mp4","img/Video_2014-07-10.png");
             });

           }
           if ($("#jquery_jplayer_4").length > 0) {
             player = $("#jquery_jplayer_4");
             if(proposal==="HITS"){
              thispage_name = tag_name[6];
            }else{thispage_name = tag_name[7];}
                 $.post( "db.php", { hits: "hits-tf-idf-7-09-1" , mt: "mt-tf-idf-7-09-1"})
                .done(function( data ) {
                  console.log(data);
                  var object = $.parseJSON(data);
                  vedioinfo_process(data);
                  setinitialShift();
                  setjplayer("巴西 VS 德國(上半場)","video/Video_2014-07-09_1.mp4","img/Video_2014-07-10.png");
                });

              }
              if ($("#jquery_jplayer_5").length > 0) {
                player = $("#jquery_jplayer_5");
                if(proposal==="HITS"){
                 thispage_name = tag_name[8];
               }else{thispage_name = tag_name[9];}
                $.post( "db.php", { hits: "hits-tf-idf-7-09-2" , mt: "mt-tf-idf-7-09-2"})
                   .done(function( data ) {
                   	console.log(data);
                     var object = $.parseJSON(data);
                     vedioinfo_process(data);
                     setinitialShift();
                     setjplayer("巴西 VS 德國(下半場)","video/Video_2014-07-09_2.mp4","img/Video_2014-07-10.png");
                   });

                 }
                 if ($("#jquery_jplayer_6").length > 0) {
                   player = $("#jquery_jplayer_6");
                   if(proposal==="HITS"){
                     //dothis
                    thispage_name = tag_name[10];
                  }else{thispage_name = tag_name[11];}
                  //dothis
                   $.post( "db.php", { hits: "hits-tf-idf-3-05" , mt: "mt-tf-idf-3-05"})
                      .done(function( data ) {
                        console.log(data);
                        var object = $.parseJSON(data);
                        vedioinfo_process(data);
                        setinitialShift();
                        setjplayer("2016中職日職對抗賽(名古屋)","video/Video_2016-03-05.mp4","img/Video_2016-03-05.png");
                      });

                    }
                    if ($("#jquery_jplayer_7").length > 0) {
                      player = $("#jquery_jplayer_7");
                      if(proposal==="HITS"){
                        //dothis
                       thispage_name = tag_name[12];
                     }else{thispage_name = tag_name[13];}
                     //dothis
                      $.post( "db.php", { hits: "hits-tf-idf-3-06" , mt: "mt-tf-idf-3-06"})
                         .done(function( data ) {
                           var object = $.parseJSON(data);
                           vedioinfo_process(data);
                           setinitialShift();
                           setjplayer("2016中職日職對抗賽(大阪)","video/Video_2016-03-06.mp4","img/Video_2016-03-05.png");
                         });

                       }
}
function checkProposal(){
  var method =$("input[name='optradio']:checked").val();
   proposal=method+"";
   initialize();
}
function vedioinfo_process(tag_json){
  var object = $.parseJSON(tag_json);
  var timeserial_temp;
  var semantic_tag_temp;
  if(proposal==="MT"){
    //console.log(object.mt);
    semantic_tag_temp = JSON.parse(object.mt)
    timeserial_temp = JSON.parse(object.mttimeserial);
    timeshift = 1*object.mttimeshift;
  }else{
    semantic_tag_temp = JSON.parse(object.hits)
    //console.log(object.hits);
    timeserial_temp = JSON.parse(object.hitstimeserial);
    timeshift = 1*object.hitstimeshift;
  }
    if(hightlightNum !==0){
        var semantic_tag1=[];
        var semantic_tag2=[];
        var semantic_tag3=[];
        var semantic_tag4=[];

        timeserial_temp2 = timeserial_temp.slice();;

        for(var i= 0; i<hightlightNum; i++){
          timeserial.push(timeserial_temp[i]);
        }
        timeserial_temp.sort(function(a, b){return a - b;});
        //console.log(timeserial_temp2);
        //console.log(semantic_tag_temp.length);
        //console.log(timeserial_temp.length);
        for(var i=hightlightNum; i<timeserial_temp.length; i++){
          for(var j=0; j<semantic_tag_temp.length; j++){
              semantic_tag_temp[j].splice(timeserial_temp.indexOf(timeserial_temp2[i]), 1);

            }
        }
        //console.log(semantic_tag_temp[0]);
        for(var i= 0; i<hightlightNum; i++){
          semantic_tag1.push(semantic_tag_temp[0][i]);
          semantic_tag2.push(semantic_tag_temp[1][i]);
          semantic_tag3.push(semantic_tag_temp[2][i]);
          semantic_tag4.push(semantic_tag_temp[3][i]);
        }

        semantic_tag.push(semantic_tag1);
        semantic_tag.push(semantic_tag2);
        semantic_tag.push(semantic_tag3);
        semantic_tag.push(semantic_tag4);
  }
        //console.log(semantic_tag);

    timeTag = hightlightNum;
}

function setinitialShift(){
  timeserial.sort(function(a, b){return a - b;});
  //console.log(timeserial);
  $.each(timeserial, function( index, value ) {
  timeserial[index] = value - timeshift;
  });
}
function scroeHighlight(){
  var starbox = $("#starbox");
  starbox.starbox({
    autoUpdateAverage: true,
    buttons: 10,
    ghosting: true
  }).bind('starbox-value-changed', function(event, value) {
					starbox.next().text('評分: '+value*5);
          score = value*5;
				});
  $("#scoreModal").modal({keyboard: false});
  $("#scoreModal").modal("show");

}
function finishedAlert(){
  //$("#scoreModal").modal("hide");
  swal({
       title: "這部影片已經填答完嘍!!",
       text: "請輸入您的名子:",
       type: "input",
       showCancelButton: false,
       closeOnConfirm: false,
       animation: "slide-from-top",
       showLoaderOnConfirm: true,
       inputPlaceholder: "Write something"
       }, function(inputValue){

            if (inputValue === false) return false;
            if (inputValue === "") {
                  swal.showInputError("不好意思 請填寫您的大名!");
                  return false
                }
           var tag = thispage_name.split("_");
           var allSparktable_temp = JSON.stringify({Sparktable: allSparktable});
           var allOdertable_temp = JSON.stringify({Ordertable: allOrdertable});
           var allIDCGtable_temp = JSON.stringify({IDCGOrdertable: allIDCGtable});
           //console.log(inputValue + " "+tag[2]+" "+tag[1]+" "+allIDCGtable_temp);
           setTimeout(function(){
           $.post( "db2.php", { name: inputValue , vedio: tag[1], approach: tag[0], score, sparktable: allSparktable_temp, ordertable: allOdertable_temp, idcg: allIDCGtable_temp})
           .done(function( data ) {
             //console.log(data);
           });
           swal("感謝!", "上傳完成嘍~", "success");
             }, 2000);
          });
          $( "#skipping_scroing" ).attr( "class", "btn btn-warning btn-lg disabled" );
}

function changedroglist(listNum){
  /*
    $("#modalDiv").empty();
    $("<div/>").attr({id:"myModal", class:"modal fade", role:"dialog"}).appendTo("#modalDiv");
    $("<div/>").attr({id:"myDialog", class:"modal-dialog"}).appendTo("#myModal");
    $("<div/>").attr({id:"sparkinglist_modal", class:"modal-content"}).appendTo("#myDialog");
    $("<div/>").attr({id:"myMheader", class:"modal-header"}).appendTo("#myDialog");
    $("#myMheader").append("<h4 class=\"modal-title\">請選擇在此段影片你覺得有哪些亮點(請將有相關的打勾並拉動關鍵字來排序)</h4>");
    $("#myMheader").append("<h5 id=\"section\"></h5>");
    $("#section").html("Section:"+count+"/"+timeTag+"   Vedio_info:"+thispage_name);
    $("<div/>").attr({id:"scoreContent", class:"modal-body"}).appendTo("#sparkinglist_modal");
    $("<div/>").attr({id:"myMfooter", class:"modal-footer"}).appendTo("#sparkinglist_modal");
    $("#myMfooter").append("<button id=\"checkboxBT\" type=\"button\" class=\"btn btn-default\"  onclick=\"checkbox_clicked()\">確定提交(點擊後將直接開始撥放下一片段)</button>");
*/
    $("#scoreContent").empty();
    $("#section").text("Section:"+count+"/"+timeTag+"   Vedio_info:"+thispage_name);
    $("<h3/>").attr({id:"methodNum", align:"center"}).appendTo("#section");
    listNumshow = listNum+1;
    $("#methodNum").html("方法"+ listNumshow);
    $("<div/>").attr({id:"sortable-container"}).appendTo("#scoreContent");
    $("<ol/>").attr({id:"foo"}).appendTo("#sortable-container");
    //console.log(semantic_tag);
    var semantic_tag_temp = semantic_tag[listNum].shift();
    //console.log(semantic_tag);
    //console.log(semantic_tag_temp);
    $.each(semantic_tag_temp, function( index, value ) {
    $("<li/>").attr({id:"lable"+index}).appendTo("#foo");
    $("<input type='checkbox'/>").attr({id :index, name:"sparking"}).appendTo("#"+"lable"+index);
    $("#"+"lable"+index).append("<a>"+value+"</a>");

    });

    var length_list = semantic_tag_temp.length;
    ordertable = new Array(length_list);
    for(var i = 0; i <= length_list; i++){
        ordertable[i]=i;
    }


    Sortable.create(document.getElementById('foo'), {
		group: "words",
		animation: 150,
		/*onAdd: function (evt){ console.log('onAdd.foo:', [evt.item, evt.from]); },
		onUpdate: function (evt){ console.log('onUpdate.foo:', [evt.item, evt.from]); },
		onRemove: function (evt){ console.log('onRemove.foo:', [evt.item, evt.from]); },
		onStart:function(evt){ console.log('onStart.foo:', [evt.item, evt.from]);},
		onSort:function(evt){ console.log('onStart.foo:', [evt.item, evt.from]);},*/
		onEnd: function(evt){
      //console.log('onEnd.foo:', [evt.item, evt.from]);
        var temp = ordertable[evt.newIndex];
        ordertable[evt.newIndex]=ordertable[evt.oldIndex];
        ordertable[evt.oldIndex]=temp;
        //console.log(ordertable);

    }
	})
if(listNum != droplistNum-1){
  $("#checkboxBT").text("確定提交");
}else {
  $("#checkboxBT").text("確定提交(點擊後開始撥放下段影片)");
}


}

function getSparkingcheck(listNum){
  var sparktable = [];
/*
  if($("input[name='sparking']:checked").length === 0 ) {
    $("#myBtn").show();
   //alert("請至少勾選一個選項");
   return false
 }else{
 */
   $("#myBtn").hide();
   //$("#myModal").modal("hide");
   $("input[name='sparking']").each( function () {

    if($(this).prop('checked')){
      sparktable.push(1);
    }else{sparktable.push(0);}

  });
  var sparkitem = {
        "label": count,
        "table": sparktable
    };
    var orderitem = {
          "label": count,
          "table": ordertable
      };
    sectionSparktable.push(sparkitem);
    sectionOrdertable.push(orderitem);

    var tempidcg = parseFloat(sparktable[0]);

    for(var i = 1; i < ordertable.length-1; i++){
        tempidcg += parseFloat(sparktable[i])/Math.log2(i+1);
    }
    //console.log(sparktable);
    //console.log("IDCG:"+tempidcg);
    var idcgitem = {
          "label": count,
          "table": tempidcg
      };
    sectionIDCGtable.push(idcgitem);
    //console.log(semantic_tag[droplistNum-1])
    if(semantic_tag[droplistNum-1].length === 0){
       final = 1;
    }
}
function selectAlert(){
  $("#myBtn").hide();
}
//checkbox_clicked----------------------------------------------------------
function checkbox_clicked() {
          //console.log("turn:"+turn);


}

//vedio_start-------------------------------------------------------------------
function vedio_start() {
    $( "#normal_scroing" ).attr( "class", "btn btn-info btn-lg hidden" );
    $( "#skipping_scroing" ).attr( "class", "btn btn-warning btn-lg" );
		player.jPlayer("play",1*timeserial[0]);
    $("#myModal").on('hidden.bs.modal', function () {
        turn++;
        getSparkingcheck(turn);
        if(turn < droplistNum && final !== 1){
          changedroglist(turn);
          //console.log(turn+"change!!");
          $("#myModal").modal({keyboard: false});
          $("#myModal").modal("show");
          //console.log("hide show");
      }else if(final === 1 ){
        $("#myModal").modal("hide");
        allIDCGtable.push(sectionIDCGtable);
        allSparktable.push(sectionSparktable);
        allOrdertable.push(sectionOrdertable);
        //console.log("sectionIDCGtable:"+JSON.stringify(sectionIDCGtable));
        //console.log("sectionSparktable:"+JSON.stringify(sectionSparktable));
        //console.log("sectionOrdertable:"+JSON.stringify(sectionOrdertable));
        //console.log("--------------------------------------------------------------------");
        //console.log("allIDCGtable:"+JSON.stringify(allIDCGtable));
        //console.log("allSparktable:"+JSON.stringify(allSparktable));
        //console.log("allOrdertable:"+JSON.stringify(allOrdertable));
        scroeHighlight();
      }else if(final !== 1 ){
        $("#myModal").modal("hide");
        allIDCGtable.push(sectionIDCGtable);
        allSparktable.push(sectionSparktable);
        allOrdertable.push(sectionOrdertable);
        //console.log("sectionIDCGtable:"+JSON.stringify(sectionIDCGtable));
        //console.log("sectionSparktable:"+JSON.stringify(sectionSparktable));
        //console.log("sectionOrdertable:"+JSON.stringify(sectionOrdertable));

        sectionSparktable = [];
        sectionOrdertable = [];
        sectionIDCGtable = [];
        player.jPlayer("play", 1*timeserial[0]);
        //console.log("turn:"+turn);
        //console.log("play");
        turn = 0;
        count++;
      }
    });
}

//vedio_scoring--------------------------------------------------------------
function vedio_scoring(){
    player.jPlayer("pause", timeserial.shift()+60);
    changedroglist(0);
    $("#myModal").modal({keyboard: false});
    $("#myModal").modal("show");
    //console.log("scoring show");

}
function setjplayer(title, videoPath, posterPath){

	player.jPlayer({
		ready: function () {
			$(this).jPlayer("setMedia", {
				title: title,
				m4v: videoPath,
				poster: posterPath
			});
		},
		swfPath: "dist/jplayer",
		supplied: "webmv, ogv, m4v",
		size: {
			width: "640px",
			height: "360px",
			cssClass: "jp-video-360p"
		},
		useStateClassSkin: true,
		autoBlur: false,
		smoothPlayBar: false
		//keyEnabled: false
	});

	player.bind($.jPlayer.event.timeupdate, function(event) {
			var currentTime = Math.floor(event.jPlayer.status.currentTime)
			if (currentTime == timeserial[0]+60 ){
					player.jPlayer("pause", timeserial.shift()+60);
					changedroglist(0);
          $("#myModal").modal({keyboard: false});
          $("#myModal").modal("show");
          //console.log("pause show");
			}
	});
}
//sticky header on scroll
$(document).ready(function () {
    $(window).load(function () {
        $(".sticky").sticky({topSpacing: 0});
    });
});
/* ==============================================
 WOW plugin triggers animate.css on scroll
 =============================================== */
$(document).ready(function () {
    var wow = new WOW(
            {
                boxClass: 'wow', // animated element css class (default is wow)
                animateClass: 'animated', // animation css class (default is animated)
                offset: 100, // distance to the element when triggering the animation (default is 0)
                mobile: false        // trigger animations on mobile devices (true is default)
            }
    );
    wow.init();
});


//parallax
$(document).ready(function () {
    $(window).stellar({
        horizontalScrolling: false,
        responsive: true/*,
         scrollProperty: 'scroll',
         parallaxElements: false,
         horizontalScrolling: false,
         horizontalOffset: 0,
         verticalOffset: 0*/
    });
});

//owl carousel for work
$(document).ready(function () {

    $("#work-carousel").owlCarousel({
        // Most important owl features
        items: 4,
        itemsCustom: false,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [980, 3],
        itemsTablet: [768, 3],
        itemsTabletSmall: false,
        itemsMobile: [479, 1],
        singleItem: false,
        startDragging: true,
        autoPlay: 6000
    });

});


//owl carousel for news
$(document).ready(function () {

    $("#news-carousel").owlCarousel({
        // Most important owl features
        items: 2,
        itemsCustom: false,
        itemsDesktop: [1199, 2],
        itemsDesktopSmall: [980, 2],
        itemsTablet: [768, 2],
        itemsTabletSmall: false,
        itemsMobile: [479, 1],
        singleItem: false,
        startDragging: true,
        autoPlay: 4000
    });

});



//owl carousel for testimonials
$(document).ready(function () {

    $("#testi-carousel").owlCarousel({
        // Most important owl features
        items: 1,
        itemsCustom: false,
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [980, 1],
        itemsTablet: [768, 1],
        itemsTabletSmall: false,
        itemsMobile: [479, 1],
        singleItem: false,
        startDragging: true,
        autoPlay: 4000
    });

});
//featured work carousel slider

$(document).ready(function () {

    $("#featured-work").owlCarousel({
        autoPlay: 5000, //Set AutoPlay to 3 seconds
        navigation: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        pagination: false,
        items: 4,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        stopOnHover: true

    });

});
/* ==============================================
 Counter Up
 =============================================== */
jQuery(document).ready(function ($) {
    $('.counter').counterUp({
        delay: 100,
        time: 800
    });
});







//MAGNIFIC POPUP
$(document).ready(function () {
$('.show-image').magnificPopup({type: 'image'});
});

/* ==============================================
 flex slider
 =============================================== */

$(document).ready(function () {
$('.main-flex-slider,.testi-slide').flexslider({
    slideshowSpeed: 5000,
    directionNav: false,
    animation: "fade"
});
});
//OWL CAROUSEL
$(document).ready(function () {
$("#clients-slider").owlCarousel({
    autoPlay: 3000,
    pagination: false,
    items: 4,
    itemsDesktop: [1199, 3],
    itemsDesktopSmall: [991, 2]
});
});


/*========tooltip and popovers====*/
$(document).ready(function () {
$("[data-toggle=popover]").popover();

$("[data-toggle=tooltip]").tooltip();
});



/* ==============================================
 mb.YTPlayer
 =============================================== */
$(document).ready(function () {
jQuery(function () {
    jQuery(".player").mb_YTPlayer();
});
});


//transparent header

$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.transparent-header').css("background", "#252525");
        } else {
            $('.transparent-header').css("background", "transparent");
        }
    });
});
