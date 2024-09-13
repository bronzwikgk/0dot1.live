const countrySelect = document.getElementById('country');
const countryCodeSpan = document.getElementById('country-code');
const phoneInput = document.getElementById('phone');

// Fetch country data from Restcountries API
fetch('https://restcountries.com/v3.1/all')
  .then(response => response.json())
  .then(data => {
    // Sort countries by name
    const sortedCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
    
    // Populate the country dropdown
    sortedCountries.forEach(country => {
      const option = document.createElement('option');
      option.value = country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : '');
      option.textContent = country.name.common;
      countrySelect.appendChild(option);
    });
  })
  .catch(error => console.error('Error fetching country data:', error));

// Update country code span based on selected country
countrySelect.addEventListener('change', (event) => {
  const countryCode = event.target.value;
  countryCodeSpan.textContent = countryCode;

});

