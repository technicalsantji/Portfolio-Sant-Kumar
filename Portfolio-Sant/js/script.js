/*========== menu icon navbar ==========*/


let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick=()=>{
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}

/*========== scroll sections active link ==========*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec=>{
        let top=window.scrollY;
        let offset=sec.offsetTop - 150;
        let height=sec.offsetHeight;
        let id=sec.getAttribute('id')
        if (top>= offset && top < offset + height) {
            navLinks.forEach(links=>{
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            })
        }
    })


    
    /*========== sticky navbar ==========*/
   
    let header= document.querySelector('.header');
    header.classList.toggle('sticky',window.scrollY >100);
    
    /*========== remove menu icon navbar when click navbar link (scroll) ==========*/

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};


/*========== swiper ==========*/

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    grabCursor:true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

/*========== dark light mode ==========*/
let darModeIcon=document.querySelector('#darkMode-icon')
darModeIcon.onclick=()=>{
  darModeIcon.classList.toggle('bx-sun');
 document.body.classList.toggle('dark-mode');
}

/*========== scroll reveal ==========*/

ScrollReveal({ 
  // reset: true ,
  distance:'80px',
  duration:2000,
  delay:200
});
ScrollReveal().reveal('.home-content,.heading', { origin: 'top' });
ScrollReveal().reveal('.home-image img,.services-container,.portfolio-box,.testimonial-wrapper,.contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1,.about-img img', { origin: 'left' });
ScrollReveal().reveal('.home-content h3,.home-content p,.about-content p', { origin: 'right' });


document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  
  // Collect form data
  var formData = new FormData(this);
  
  // Check if any required field is empty
  var isFormValid = true;
  formData.forEach(function(value, key) {
    if (!value.trim()) { // Check if the field is empty or contains only whitespace
      isFormValid = false;
      var fieldName = document.querySelector('[name="' + key + '"]').getAttribute('placeholder');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: fieldName + ' is required',
        confirmButtonText: 'OK',
        showClass: {
          popup: 'animated fadeInDown faster'
        },
        hideClass: {
          popup: 'animated fadeOutUp faster'
        }
      });
      return; // Exit the loop early
    }
  });

  // If form is not valid, don't proceed with form submission
  if (!isFormValid) {
    return;
  }
  
  // Send form data asynchronously using fetch API
  fetch('https://formspree.io/f/mleqvraa', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Show success message using SweetAlert
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Form submitted successfully !!',
      confirmButtonText: 'OK',
      showClass: {
        popup: 'animated fadeInDown faster'
      },
      hideClass: {
        popup: 'animated fadeOutUp faster'
      }
    });
    // You can add additional actions here if needed
  })
  .catch(error => {
    // Show error message using SweetAlert
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Somethings Went Wrong !!',
      confirmButtonText: 'OK',
      showClass: {
        popup: 'animated fadeInDown faster'
      },
      hideClass: {
        popup: 'animated fadeOutUp faster'
      }
    });
  });
});
