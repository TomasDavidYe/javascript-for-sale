const Http = new XMLHttpRequest();
const url=`http://127.0.0.1:5000/custom-endpoint`;
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
    let response = JSON.parse(Http.responseText);
    let result_html = `<h2 style="color: red">${response['message']}</h2>`

    let target = document.getElementById('target')
    target.innerHTML = result_html
}