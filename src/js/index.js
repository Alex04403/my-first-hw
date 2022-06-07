'use strict'

import { PixabayAPI } from "./search-form";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const btnEl = document.querySelector('.load-more')

const pixabayApi = new PixabayAPI();

function addElement(data) {
    
    const createElement = data
    .map(el => 
        `<div class="photo-card">
        <img class="image-card" src="${el.webformatURL}" alt="${el.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b> ${el.likes}
          </p>
          <p class="info-item">
            <b>Views</b>${el.views}
          </p>
          <p class="info-item">
            <b>Comments</b>${el.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>${el.downloads}
          </p>
        </div>
      </div>`)
    .join('');
    
    galleryEl.insertAdjacentHTML("beforeend", createElement)
}





// Форма

const onSubmitForm = async event => {
    event.preventDefault();
    btnEl.classList.remove('is-hidden');
    galleryEl.innerHTML = '';
   
    

    pixabayApi.q = event.currentTarget[0].value.trim()
    pixabayApi.page = 1;
  
  try {
    const { data } = await pixabayApi.searchImages();

    console.log(data.hits);

    if (!data.hits.length) {
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      return
    }

    addElement(data.hits)
    btnEl.classList.add('is-hidden');
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

  } catch (error) {
    console.log(error);
  }
}

// Кнопка

const onAddNewPages = async event => {
  pixabayApi.addPages()

  try {
    const { data } = await pixabayApi.searchImages();

    addElement(data.hits)

  } catch (err) {
    console.log(err);
  }
}

formEl.addEventListener('submit', onSubmitForm);
btnEl.addEventListener('click', onAddNewPages)

// Litebox


const onClickImage = event => {
  open
  console.log('hhh');
}

galleryEl.addEventListener('click', onClickImage)