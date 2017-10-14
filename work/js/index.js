$(document).ready(function() {
var cou="Saved items"+"&nbsp;"+'<button id="countItem">'+localStorage.length+'</button>'
$("#modal").html(cou);
    function search() {
        $.getJSON("https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=robot&min_height=500", function(data) {
            var input = $("#textSearch").val();
            var count = 0;
            data.hits.forEach(function(el) {
                var tags = el.tags.split(/\s*,\s*/).map(el => el.trim());
                var str = input.trim().split(/\s*,\s*/);
                var block = "<div style='background: #E1D3B5'class='block'><button class='btn save'>Save</button><button type='button' name='index' class='close'><i class='fa fa-trash' aria-hidden='true'></i></button><span class='tags'>" + el.tags + "</span><br><img src='" + el.previewURL + "'><br><span class='views'><i class='fa fa-eye' aria-hidden='true'></i>" + el.views + "</span><span data-value='1' class='likes'><i class='fa fa-heart-o' aria-hidden='true'></i>" + el.likes + "</span><p><a class='link' target='_blank' href=" + el.pageURL + " title='go to the original page'>Source link</a></p> <button class=' btn btn-primary'>Approve&nbsp;<i class='fa fa-thumbs-o-up' aria-hidden='true'></i></button><button class='btn btn-danger'>Decline&nbsp;<i class='fa fa-thumbs-o-down' aria-hidden='true'></i></button><div class='comments'></div><textarea placeholder='Add your comment...' class='text' name=''></textarea><br><button class='add_comments btn'><i class='fa fa-check' aria-hidden='true'></i></button><br></div>";
                if (input === "") {
                    $('#addBlock').append(block);
                } else {
                    if (str.every(el => tags.includes(el))) {
                        $('#addBlock').append(block);
                    } else {
                        count++;
                   }
                }
            })
            if (count === data.hits.length) {
                $('#helpDiv').html("<div class='well' style='background: Cornsilk; color: Coral'>" +
                    "Unfortunately, your search returned no results...<br>Please, enter the correct query!</div>").fadeIn();
            }
            $('.save').on('click', function() {
                if (!$(this).hasClass('active')) {
                    $(this).html('Delete');
                    var key = "pic" + localStorage.length;
                 
                    var str = $(this).parent().html()
                    var str1 = str.replace('<button class="btn save">Delete</button>', '').replace('<button type="button" name="index" class="close"><i class="fa fa-trash" aria-hidden="true"></i></button>', '<button type="button" name="index" class="close1 btn"><i class="fa fa-trash" aria-hidden="true"></i></button>')
                    $(this).parent().attr('data-value', key)
                    var color= $(this).parent().attr("style");
                    var inp = "<div style='"+color+"' data-value=" + key + " class='block'>" + str1 + "</div>"
                    localStorage.setItem(key, inp);
                  $("#countItem").html(localStorage.length);
                
                 
                } else {
                 
                    $(this).html('Save');
                    var del_key = $(this).parent().attr("data-value");
                    localStorage.removeItem(del_key);
                 $("#countItem").html(localStorage.length);
                  
                }
                $(this).toggleClass('active');
            });
            $(".btn-primary").on("click", function() {
                var n = 1;
                var dVal = $(this).parent().find(".likes").attr("data-value");
                if (dVal === undefined) {
                    n = 2;
                }
                var str = $(this).parent().find(".likes").text();
                $(this).parent().find(".likes").html("<i class='fa fa-heart-o' aria-hidden='true'></i>" + (Number(str) + n));
                $(this).parent().css("background", "#E3FFD4");
                $(this).attr("disabled", "disabled").css("color", "black");
                $(this).parent().find(".btn-danger").removeAttr("disabled").css("color", "white");
                $(this).parent().find(".likes").removeAttr("data-value");
            })

            $(".btn-danger").on("click", function() {
                var n = 1;
                var dVal = $(this).parent().find(".likes").attr("data-value");
                if (dVal === undefined) {
                    n = 2;
                }
                var str = $(this).parent().find(".likes").text();
                $(this).parent().find(".likes").html("<i class='fa fa-heart-o' aria-hidden='true'></i>" + (Number(str) - n));
                $(this).parent().css("background", "#FCCECE");
                $(this).attr("disabled", "disabled").css("color", "black");
                $(this).parent().find(".btn-primary").removeAttr("disabled").css("color", "white");
                $(this).parent().find(".likes").removeAttr("data-value");
            });

            $(".add_comments").on("click", function() {
                var str = $(this).parent().find(".text").val();
                if (str === "") {
                    return;
                }
                $(this).parent().find(".comments").append("<div class='comm'>" + str + "<button class='delComment'>Delete</button></div>");
                $(".delComment").click(function() {
                    $(this).parent().remove();
                });
            });
            $(".close").click(function() {
                $(this).parent().remove();
            });

          
        });
    }
    search();
    $("#modal").on("click", function() {
        $(".modal-body").empty();
        for (var i in localStorage) {
            $(".modal-body").append(localStorage[i]);
            $(".close1").on("click", function() {
                var del_key = $(this).parent().attr("data-value");
                $(this).parent().remove();
                localStorage.removeItem(del_key);
            $("#countItem").html(localStorage.length);
            })
        }
    });
    $("#notRandom").on("click", function() {
        search();
        $("#textSearch").on("keyup", function() {
            var val = $(this).val();
            if (val.length === 0) {
                $("#helpDiv").fadeOut(500);
                $("#addBlock").empty();
                 search();
            }
        });
        $(".block").fadeOut();
        $('#helpDiv').fadeOut();
    });
    $("#textSearch").keyup(function(e) {
        if (e.keyCode === 13) {
            $("#notRandom").click();
        }
    })
  
});