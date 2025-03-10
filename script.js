document.getElementById('submit-btn').addEventListener('click', async () => {
    const countryName = document.getElementById('country-input').value.trim();
    
    if (countryName === '') {
        alert('Please enter a country name!');
        return;
    }

    const url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Country not found');
        }
        
        const data = await response.json();
        const country = data[0];

        document.getElementById('capital').textContent = country.capital ? country.capital[0] : 'N/A';
        document.getElementById('population').textContent = country.population.toLocaleString();
        document.getElementById('region').textContent = country.region;
        document.getElementById('flag').innerHTML = `<img src="${country.flags.png}" alt="Flag" style="width:50px;">`;


        const borderingList = document.getElementById('bordering-list');
        borderingList.innerHTML = ''; 

        if (country.borders) {
            for (const border of country.borders) {
                const borderCountry = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
                const borderData = await borderCountry.json();
                const borderInfo = borderData[0];

                const listItem = document.createElement('li');
                listItem.innerHTML = `<img src="${borderInfo.flags.png}" alt="Flag" style="width:20px; margin-right:10px;">${borderInfo.name.common}`;
                borderingList.appendChild(listItem);
            }
        } else {
            borderingList.innerHTML = '<li>No bordering countries</li>';
        }

    } catch (error) {
        alert('Error: ' + error.message);
    }
});
