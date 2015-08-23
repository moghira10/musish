function play(id){
var oSound = jsPlayer.createSound('msPlayer', '{"path":"mp3/64/63/59163/576091","sType":"rtmp"}');
}

$(document).ready(function() {

    $("#search").on("keyup", function(e) {
		e.preventDefault();       
        var token = $("#term").val();
        //console.log(token);
        var data = 'type=search&subtype=search_song&key='+token;
        $.ajax({
			url:'http://api.gaana.com/',
			data: data,
			type: 'post',
			dataType: 'jsonp',
			crossDomain:true,
			before:function(){
				$('.loader').show();
				setTimeout(function(){ },350000);
			},
			success:function(data){
				console.log(data);
				$('.loader').hide();
				$('.result').empty();
				if(data.count==0)
					$('.result').append('Ok.. seems like this song has stolen from the database :(');
				for(var i=0; i<data.count;i++){
					var path = data.tracks[i].artwork;
					var duration = (data.tracks[i].duration/60).toPrecision(3);
					duration = duration.replace('.',':');
					//var time = new Date(0,0,0,(data.tracks[i].duration/60).toPrecision(1),data.tracks[i].duration%60);
					//duration = time.getTime();
					
				/*	$('.result #path').html(path);
					var p = $('.result #path').innerHtml;*/
					var obj = '<p class="list" onclick="play('+data.tracks[i].track_id+');"><img class="song_art" src="'+path+'" /><span class="song_title">  '+data.tracks[i].track_title+'</span><span class="song_duration" style="color:grey; display:block;margin-left: 70px;margin-top: -25px;"> '+duration+'</span></p>';
					$('.result').append(obj);
					/*var art = $('.song_art').append('<img class="art" src="'+path+'"/>');
					var title = $('.song_title').append(data.tracks[i].track_title);
					var duration = $('.song_duration').append((data.tracks[i].duration/60).toPrecision(3));*/

				}
			}
		});
    });

});
