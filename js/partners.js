// SCTREASURY Partners Engine

let allPartners = [];

// Load partners data on page load
document.addEventListener('DOMContentLoaded', function() {
  loadAllPartners();
});

async function loadAllPartners() {
  try {
    const res = await fetch('./data/partners.json');
    allPartners = await res.json();
    displayPartners(allPartners);
  } catch (error) {
    console.error('Error loading partners:', error);
    document.getElementById('partners-container').innerHTML = '<p>Unable to load partners data. Please try again later.</p>';
  }
}

function displayPartners(partners) {
  const container = document.getElementById('partners-container');
  
  if (partners.length === 0) {
    container.innerHTML = '<p>No partners match your criteria.</p>';
    return;
  }

  container.innerHTML = partners.map(partner => `
    <div class="card" style="margin-bottom: 15px;">
      <h4>${partner.name}</h4>
      <p>${partner.description}</p>
      <p><strong>Type:</strong> ${partner.type}</p>
      <p><strong>Location:</strong> ${partner.location}</p>
      <p><strong>Programs:</strong> ${partner.programs.join(', ')}</p>
    </div>
  `).join('');
}

function filterPartners() {
  const partnerType = document.getElementById('partnerType').value;
  const county = document.getElementById('county').value;

  let filtered = allPartners;

  if (partnerType) {
    filtered = filtered.filter(partner => partner.type === partnerType);
  }

  if (county && county !== 'Multiple') {
    filtered = filtered.filter(partner => partner.location.includes(county) || partner.location === 'Statewide');
  }

  displayPartners(filtered);
}