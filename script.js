
const galleryData = [
  { id: 1, title: 'Misty Forest Trail', category: 'nature', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: 'Modern Skyscraper', category: 'architecture', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
  { id: 3, title: 'Tropical Beach Sunset', category: 'travel', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
  { id: 4, title: 'Alpine Mountain Peaks', category: 'nature', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80' },
  { id: 5, title: 'Classic Spiral Staircase', category: 'architecture', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80' },
  { id: 6, title: 'Venice Canal View', category: 'travel', url: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800&q=80' },
  { id:  7,title: 'Cherry Blossom Rain Path', category: 'nature', url: 'https://i.pinimg.com/736x/67/60/a3/6760a342340208db8cb29aaa4567e945.jpg'},
  { id: 8, title: 'natural beauty', category: 'travel', url: 'https://i.pinimg.com/1200x/ed/65/02/ed65027a80e9751a36aa504460ba7694.jpg' },
   { id: 9, title: 'Whitewater rafting in Slovenia', category: 'travel', url: 'https://i.pinimg.com/736x/b9/17/fd/b917fdc63744ad30426969f6d5402ce8.jpg' },
    { id: 10, title: 'Dream home library', category: 'architecture', url: 'https://i.pinimg.com/736x/95/1b/71/951b71a157037b0ded16885578fe39d5.jpg' },
 { id: 11, title: 'A crescent moon glowing in a violet sky', category: 'nature', url: 'https://i.pinimg.com/1200x/01/a4/3e/01a43e283b4253f80b1e401a6c5bf05d.jpg' },
 { id: 12, title: 'Inner peace', category: 'spiritual', url: 'https://i.pinimg.com/736x/3b/c3/d1/3bc3d1f5e77171d494e4b64c3edfb39d.jpg' },
 { id: 13, title: 'Lotus Awakening', category: 'spiritual', url: 'https://i.pinimg.com/736x/6f/fa/4d/6ffa4da03e86123651c041c13244a567.jpg' },
 { id: 14, title: 'god helping', category: 'spiritual', url: 'https://i.pinimg.com/736x/ac/c5/c8/acc5c8b6c3c89501e52df14a1d5644c8.jpg' },
 { id: 15, title: 'invisible power', category: 'spiritual', url: 'https://i.pinimg.com/736x/74/61/15/7461152b8808291bb56c2d8c088112b1.jpg' },
{ id: 16, title: 'Thor', category: 'Super Heroes', url: 'https://i.pinimg.com/736x/3f/28/7a/3f287a000945262cd30887d0566d12c6.jpg' },
{ id: 17, title: 'Supermen', category: 'Super Heroes', url: 'https://i.pinimg.com/736x/f3/ac/0b/f3ac0b30b4f3eed1c39d3a31e67730d0.jpg' },
{ id: 18, title: 'Spidermen', category: 'Super Heroes', url: 'https://i.pinimg.com/1200x/0c/6f/e8/0c6fe80e89b3810f669c88940ad9e5a1.jpg' },
{ id: 19, title: 'Iron Men', category: 'Super Heroes', url: 'https://i.pinimg.com/736x/e5/34/c0/e534c083d35a01285168a98e27acd0b9.jpg' },
{ id: 20, title: 'Captain America', category: 'Super Heroes', url: 'https://i.pinimg.com/736x/43/08/f7/4308f7f61a4146a4d6997f51e48fb471.jpg' },




];


const gallery = document.getElementById('gallery');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.getElementById('close-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let visibleItems = [];
let currentIndex = 0;


function renderGallery() {
  gallery.innerHTML = galleryData.map(item => `
    <div class="gallery-item" data-category="${item.category}" data-title="${item.title.toLowerCase()}" data-id="${item.id}">
      <img src="${item.url}" alt="${item.title}" loading="lazy">
      <div class="overlay">
        <h3>${item.title}</h3>
        <span>${item.category}</span>
      </div>
    </div>
  `).join('');

  updateVisibleItems();
}


function updateVisibleItems() {
  visibleItems = Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
}


function filterGallery() {
  const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
  const searchQuery = searchInput.value.toLowerCase().trim();

  document.querySelectorAll('.gallery-item').forEach(item => {
    const matchesCategory = activeFilter === 'all' || item.dataset.category === activeFilter;
    const matchesSearch = item.dataset.title.includes(searchQuery);

    if (matchesCategory && matchesSearch) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });

  updateVisibleItems();
}


function openLightbox(index) {
  currentIndex = index;
  const targetElement = visibleItems[currentIndex];
  const imgUrl = targetElement.querySelector('img').src;
  const title = targetElement.querySelector('h3').textContent;

  lightboxImg.src = imgUrl;
  lightboxCaption.textContent = title;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden'; // Lock background scrolling
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function navigateLightbox(direction) {
  if (visibleItems.length === 0) return;
  currentIndex = (currentIndex + direction + visibleItems.length) % visibleItems.length;
  openLightbox(currentIndex);
}




filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterGallery();
  });
});


searchInput.addEventListener('input', filterGallery);


gallery.addEventListener('click', (e) => {
  const item = e.target.closest('.gallery-item');
  if (item && !item.classList.contains('hidden')) {
    const index = visibleItems.indexOf(item);
    if (index !== -1) openLightbox(index);
  }
});


closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', () => navigateLightbox(-1));
nextBtn.addEventListener('click', () => navigateLightbox(1));


lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigateLightbox(-1);
  if (e.key === 'ArrowRight') navigateLightbox(1);
});

// --- Initial Run ---
renderGallery();
