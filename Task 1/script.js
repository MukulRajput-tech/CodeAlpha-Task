const images = [
    { url: 'Images/nature1.jpg', category: 'nature' },
    { url: 'Images/nature2.jpg', category: 'nature' },
    { url: 'Images/mountain1.jpg', category: 'mountain' },
    { url: 'Images/animal1.jpg', category: 'animals' },
    { url: 'Images/animal2.jpg', category: 'animals' },
    { url: 'Images/mountain2.jpg', category: 'mountain' },
    { url: 'Images/nature3.jpg', category: 'nature' },
  ];
  
  const gallery = document.getElementById('gallery');
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImage');
  const closeBtn = document.querySelector('.close');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  let currentImages = images;
  let currentIndex = 0;
  
  function displayImages(imageList) {
    gallery.innerHTML = '';
    imageList.forEach((img, index) => {
      const image = document.createElement('img');
      image.src = img.url;
      image.alt = `Image ${index + 1}`;
      image.setAttribute('data-index', index);
      image.addEventListener('click', () => openModal(index));
      gallery.appendChild(image);
    });
  }
  
  function openModal(index) {
    currentIndex = index;
    modal.style.display = 'flex';
    modalImg.src = currentImages[currentIndex].url;
  }
  
  function closeModal() {
    modal.style.display = 'none';
  }
  
  function showNext() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    modalImg.src = currentImages[currentIndex].url;
  }
  
  function showPrev() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    modalImg.src = currentImages[currentIndex].url;
  }
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      document.querySelector('.filter-btn.active')?.classList.remove('active');
      button.classList.add('active');
  
      const category = button.getAttribute('data-category');
      currentImages = category === 'all' ? images : images.filter(img => img.category === category);
      displayImages(currentImages);
    });
  });
  
  closeBtn.onclick = closeModal;
  nextBtn.onclick = showNext;
  prevBtn.onclick = showPrev;
  
  document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'Escape') closeModal();
    }
  });
  
  displayImages(images);
  