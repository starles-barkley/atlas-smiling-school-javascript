function loading(status, element) {
  if (status === true) {
      console.log("loading...");
    $(`.${element}`).removeClass('d-none');
  } else {
    $(`.${element}`).addClass('d-none');
  }
}

function loadingScuffed(status, element) {
  if (status === true) {
      console.log("loading...");
    $(`.${element}`).wrap('<div class="loader"></div>');
  } else {
    $(`.${element}`).unwrap();
  }
}

function quoteCarouselInitializer() {
  $.get("https://smileschool-api.hbtn.info/quotes", () => {
      loading(true, 'quotes-loader');
  })
  .done((data) => {
      loading(false, 'quotes-loader');
      for (quote of data) {
          const slideContainer = $('<div class="container"></div>');
          const contentRow = $('<div class="row mx-auto align-items-center"></div>');
          const imgContainer = $('<div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center"></div>');
          const avatar = $(`<img src="${quote.pic_url}" class="d-block m-auto rounded-circle quote-avatar" alt="Carousel Pic ${quote.id}"/>`);
          imgContainer.append(avatar);
          const textContainer = $('<div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0"></div>');
          const text = $('<div class="quote-text"></div>');
          const quoteText = $(`<p class="text-white">${quote.text}</p>`);
          const quoteAuthor = $(`<h4 class="text-white font-weight-bold">${quote.name}</h4>`);
          const quoteTitle = $(`<span class="text-white">${quote.title}</span>`);
          text.append(quoteText, quoteAuthor, quoteTitle);
          textContainer.append(text);
          contentRow.append(imgContainer, textContainer);
          slideContainer.append(contentRow);
          $('#quotes-carousel').slick('slickAdd', slideContainer);
          console.log('new slide added!')
      }
  })

  $('.quotes-carousel').slick({
      arrows: true
  });
}

function videoCarouselInitializer(api, element, loader) {
  $.get(`https://smileschool-api.hbtn.info/${api}`, () => {
      loading(true, loader);
  })
  .done((data) => {
      loading(false, loader);
      for (video of data) {
          console.log(video);

          const videoContainer = $('<div class="card-slide"></div>');
          const videoCard = $('<div class="card mx-auto"></div>');
          videoContainer.append(videoCard);

          const cardThumbnail = $(`<img src="${video.thumb_url}" class="card-img-top" alt="${video.title} thumbnail"></img>`);
          videoCard.append(cardThumbnail);

          const playButtonContainer = $('<div class="card-img-overlay text-center"></div>');
          const playButton = $('<img src="images/play.png" alt="Play" width="64px" class="align-self-center mx-auto play-overlay"/>');
          playButtonContainer.append(playButton);
          videoCard.append(playButtonContainer);

          const cardBodyContainer = $('<div class="card-body"></div>');
          const videoTitle = $(`<h5 class="card-title font-weight-bold">${video.title}</h5>`);
          const videoDescription = $(`<p class="card-text text-muted">${video["sub-title"]}</p>`);
          cardBodyContainer.append(videoTitle, videoDescription);

          const authorContainer = $('<div class="creator d-flex align-items-center></div>');
          const authorAvatar = $(`<img src="${video.author_pic_url}" alt="${video.author} avatar" width="30px" class="rounded-circle"/>`);
          const authorName = $(`<h6 class="pl-3 m-0 main-color">${video.author}</h6>`);
          authorContainer.append(authorAvatar, authorName);
          cardBodyContainer.append(authorContainer);

          const ratingContainer = $('<div class="info pt-3 d-flex justify-content-between"></div>');
          const ratingRow = $('<div class="rating"></div>');

          console.log("adding rating");
          for (i = 1; i <= 5; i++) {
              let stars = "";
              let starRating = "";
              if (video.star >= i) {
                  stars = "images/star_on.png";
                  starRating = "star on";
              } else {
                  stars = "images/star_off.png";
                  starRating = "star off";
              }
              const starImg = $(`<img src="${stars}" alt="${starRating}" width="15px" class="d-inline-block"/>`);
              console.log(starImg);
              console.log(`Rating ${i}`);
              ratingRow.append(starImg);
          }
          const watchTime = $(`<span class="main-color">${video.duration}</span>`);
          ratingContainer.append(ratingRow, watchTime);
          cardBodyContainer.append(ratingContainer);
          videoCard.append(cardBodyContainer);
          $(`.${element}`).slick('slickAdd', videoContainer);




      }
  })

  $(`.${element}`).slick({
      arrows: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
          {
              breakpoint: 768,
              settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
              }
          },
          {
              breakpoint: 576,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
              }
          }
      ]
  });
}