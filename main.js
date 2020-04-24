// ENDPOINT
const endpoint = 'https://quotes.rest/qod.json';
// DOM ELEMENTS
[quote_div, alert, button, author, categoryDOM, permalink, DOMdate] = 
    [   
        document.querySelector('.quote'), 
        document.querySelector('.info-text'), 
        document.getElementById('copy-btn'), 
        document.querySelector('.author'), 
        document.querySelector('.category'), 
        document.querySelector('.permalink'),
        document.querySelector('.date')
    ]
// OTHER VARIABLES
let callTimes = 0;
let qod = []

// FETCH function, and page render
async function quote () {
        
    await fetch(endpoint)
        .then(blob => blob.json())
        .then(data => data.contents)
        .then(data => {
            const datas = data.quotes[0];
            qod.push(datas.quote);
            // Rendering page
            quote_div.innerHTML = datas.quote;
            author.innerHTML = `-${datas.author}`;
            categoryDOM.innerHTML = `${datas.category}`;
            permalink.innerHTML = `<a href="${datas.permalink}" target='_blank'>Permalink</a>`;
            DOMdate.innerHTML = datas.date;

            // Logging stuff into console
            console.clear();
            console.log(`%cID: %c${datas.id}`, 'color: green; background: #222; font-size: 24px;', 'background: green; font-size: 24px; color: black;');
            console.log(`%cDAY: %c${datas.date}`, 'color: blue; background: #222; font-size: 24px;', 'background: blue; font-size: 24px; color: black;');
            console.log(`%cLENGTH: %c${datas.length}`, 'color: yellow; background: #222; font-size: 24px;', 'background: yellow; font-size: 24px; color: black;');
            console.log(`%cLANGUAGE: %c${datas.language}`, 'color: purple; background: #222; font-size: 24px;', 'background: purple; font-size: 24px; color: black;');
            console.info('https://github.com/MFoxx/QuoteOfTheDay');
        })
        .catch(error => console.warn(error));

}

// Function for copying quote to clipboard
function copyToClipBoard () {
    const quote = qod[0];
    const elem = document.createElement('textarea');
    document.body.appendChild(elem);
    elem.value = quote;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
    
    // Displaying how many times you smashed that copy button
    callTimes++;
    console.log(callTimes);
    // ALERT TEXT
    if(callTimes < 2) {
        alert.innerHTML = 'Copied to clipboard!';
    } else {
        alert.innerHTML = `Copied to clipboard ${callTimes} times!`;
    }
}

// Calling the quote function
quote();
// Listening for call on copy button, then executing copy function
button.addEventListener('click', copyToClipBoard);
