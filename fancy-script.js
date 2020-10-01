function transformContent(content, keywords){
  let temp = content

  keywords.forEach(keyword => {
    temp = temp.replace(new RegExp(keyword, 'ig'), wrapKeywordWithLink(keyword, `https://www.google.com/search?q=${keyword}`))
  })

  return temp
}

function wrapKeywordWithLink(keyword, link){
  return `<a href="${link}" target="_blank"> <span style="font-weight: bold; color: red; font-size: 30px">  ${keyword}  </span> </a>`
}

setTimeout(() => {
    let divsToHighlight = document.getElementsByClassName('highlight-target')
    console.log(divsToHighlight)
    for (const div of divsToHighlight) {
        let originalContent = div.innerHTML
        const Http = new XMLHttpRequest();
        const url = `http://127.0.0.1:5001/get-keywords?text=${originalContent}`;

        Http.open("GET", url);
        Http.send();

        Http.onreadystatechange = (e) => {
            let keywords = JSON.parse(Http.responseText);
            div.innerHTML = transformContent(originalContent, keywords)
        }
    }


}, 100)



