	$(document).ready(function(){	  	
	  		/* Load the Buttons */	
	  		getButtons();	 

 			/* Click event to add a new button */
	  		$('#btnAddToList').click(function(){

	  			var txtNewAnimal = jQuery.trim($('#txtAnimal').val());

	  			if(txtNewAnimal == ''){	  	
	  				$('#txtCategory').parent().addClass('has-danger');
	  				$('#txtCategory').addClass('form-control-danger')			
		  			return false;
		  		}

		  		var btnListLength = btnList.length;
	  			var newId = btnListLength + 1;
	  			var newObj = { 'id': newId , 'name': txtNewAnimal }

	  			btnList.push(newObj);

	  			/* Reload the buttons after adding a new one */
	  			getButtons();
	  			$('#txtAnimal').val('');	  			
	  		});


	  		$(document).on('click', '.img-still img', function(e){ 

						e.preventDefault();
						var stillSrc = $(this).attr('data-still');
					    var animateSrc = $(this).attr('data-animate');	
					    
					    /* Stop stop any previous animations */
					    $('.img-still img').each(function(){
					    	if($(this).attr('data-still') != stillSrc){
						    	$(this).removeClass('img-animate');
						    	$(this).attr('src', $(this).attr('data-still'));
						    }
					    });				    
					    

					    /* Animate if clicked for the first */
					    if(!$(this).hasClass('img-animate')){
					    	$(this).addClass('img-animate');
					    	$(this).attr('src', animateSrc);
					    }else{
					    	$(this).removeClass('img-animate');
					    	$(this).attr('src', stillSrc);
					    }	
			    
				});

		});


		/* Button JSON Array: Add your desired animals for initial load */
	  	var btnList = [
						{
							'id': '1',
							'name': 'Cats'
						},
						{
							'id': '2',
							'name': 'Dogs'
						},
						{
							'id': '3',
							'name': 'Cows'
						}
					];


					
		function getButtons(){			

			$('#btnContainer').html('');
            var buttons = '';

			$.each(btnList, function(i){
				buttons += '<button type="button" class="btn btn-success btn-animal" id="btn_' + btnList[i].id + '" value="' + btnList[i].name + '">' + btnList[i].name + '</button>'
			});


			$('#btnContainer').append(buttons);


			$('.btn-animal').click( function(){				
				var animal = $(this).val();
				getImages(animal);


				
		  	});	

			

 
			
	  	
		}



		/*** Function to get images from API call ***/

		function getImages(animal){    
			
			$.ajax({
				url: 'http://api.giphy.com/v1/gifs/search?q=' + animal + '&api_key=dc6zaTOxFJmzC&limit=10',
				data: {},
				method: 'GET',
				dataType: 'json',
				success: function(results){
					
					var galleryHtml = '';

					$.each(results.data, function(i){				

						galleryHtml += '<div class="col-sm-3">' +
											'<small>Rating: ' + results.data[i].rating + '</small>' +
											'<a href="#" class="img-still"><img class="thumbnail img-responsive" src="' + results.data[i].images.fixed_height_still.url + '" data-animate="' + 
												results.data[i].images.fixed_height.url + '" data-still="' + results.data[i].images.fixed_height_still.url + '" /></a>' +
										'</div>';
					});

					$('#igmGallery').html('');
					$('#igmGallery').append(galleryHtml);
					$('#igmGallery').parent().addClass('well');					

				},
				error: function(){
					alert('FAIL')
				}
			});
		}