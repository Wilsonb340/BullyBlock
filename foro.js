// Toggle side menu visibility
function toggleMenu(open) {
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('overlay');
    if (open) {
      sideMenu.style.transform = 'translateX(0)';
      overlay.style.display = 'block';
    } else {
      sideMenu.style.transform = 'translateX(-100%)';
      overlay.style.display = 'none';
    }
  }
  
  // Toggle FAQ answer visibility
  function toggleQuestion(index) {
    const answer = document.getElementById(`answer${index}`);
    const arrow = answer.previousElementSibling.querySelector('.arrow');
    const isVisible = answer.style.display === 'block';
    
    answer.style.display = isVisible ? 'none' : 'block';
    arrow.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
  }
  