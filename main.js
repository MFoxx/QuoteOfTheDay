const endpoint = 'http://quotes.rest/qod.json';
const quote_div = document.querySelector('.quote');
const alert = document.querySelector('.info-text');
const button = document.getElementById('copy-btn');
const author = document.querySelector('.author');
const categoryDOM = document.querySelector('.category');
const permalink = document.querySelector('.permalink');
let callTimes = 0;


let qod = []

// async function quote () {
        
//     await fetch(endpoint)
//         .then(blob => blob.json())
//         .then(data => data.contents)
//         .then(data => data.quotes)
//         .then(data => data[0])
//         .then(data => qod.push(data.quote));

//     quote_div.innerHTML = qod;
// }

async function quote () {
        
    await fetch(endpoint)
        .then(blob => blob.json())
        .then(data => data.contents)
        .then(data => {
            console.log(data.quotes[0])
            const datas = data.quotes[0]
            quote_div.innerHTML = datas.quote;
            qod.push(datas.quote);
            author.innerHTML = `-${datas.author}`;
            categoryDOM.innerHTML = `${datas.tags}`;
            permalink.innerHTML = `<a href="${datas.permalink}" target='_blank'>Permalink</a>`
            console.log(`%cID: %c${datas.id}`, 'color: green; background: #222; font-size: 24px;', 'background: green; font-size: 24px; color: black;');
            console.log(`%cCATEGORY: %c${datas.category}`, 'color: red; background: #222; font-size: 24px;', 'background: red; font-size: 24px; color: black;');
            console.log(`%cDAY: %c${datas.date}`, 'color: blue; background: #222; font-size: 24px;', 'background: blue; font-size: 24px; color: black;');
            console.log(`%cLENGTH: %c${datas.length}`, 'color: yellow; background: #222; font-size: 24px;', 'background: yellow; font-size: 24px; color: black;');
            console.log(`%cLANGUAGE: %c${datas.language}`, 'color: purple; background: #222; font-size: 24px;', 'background: purple; font-size: 24px; color: black;');
        })
        .catch(error => console.warn(error));

}

quote();

function copyToClipBoard () {
    const quote = qod[0];
    const elem = document.createElement('textarea');
    document.body.appendChild(elem);
    elem.value = quote;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
    
    callTimes++;
    console.log(callTimes);
    // ALERT TEXT
    if(callTimes < 2) {
        alert.innerHTML = 'Copied to clipboard!';
    } else {
        alert.innerHTML = `Copied to clipboard ${callTimes} times!`;
    }
}

button.addEventListener('click', copyToClipBoard);