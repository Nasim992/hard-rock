
document.getElementById('search-song').addEventListener('click',function(event) {
    const songName = document.getElementById('userInput').value;
    
    fetch(`https://api.lyrics.ovh/suggest/${songName}`)
    .then(response=>response.json())
    .then(data=>{
        for (i = 0;i<10;i++) {
            /*   Create Lyrics Elements section starts  */
            const lyricsContainer = document.createElement("div")
            const lyricsAndArtistSection = document.createElement("div");
            const lyricsTitle = document.createElement("h3");
            const pTag = document.createElement("p");
            const artist = document.createElement("span");
            const getLyricsSection = document.createElement("div");
            const getLyrics = document.createElement("button");
            const imageDiv = document.createElement("div");
            const albumImage = document.createElement("img")
            const attribute = document.createAttribute("src")
             /*   Create Lyrics Elements section ends   */

            /* Style to the created Elements section starts  */
            lyricsContainer.classList.add("single-result", "row", "align-items-center", "my-3", "p-3")
            lyricsAndArtistSection.classList.add("col-md-6");
            lyricsTitle.classList.add("lyrics-name");
            pTag.classList.add("author", "lead");
            getLyricsSection.classList.add("col-md-3", "text-md-right", "text-center");
            getLyrics.classList.add("btn", "btn-success");
            imageDiv.classList.add('col-md-3')
            /* Style to the created Elements section ends   */

            /*Assign value to that elements section starts  */
            albumImage.setAttribute('src',`${data.data[i].album.cover}`)
            lyricsTitle.innerHTML= data.data[i].title;
            artist.innerText = data.data[i].artist.name;
            lyricsAndArtistSection.appendChild(lyricsTitle);
            pTag.append("Album by ");
            getLyrics.append("Get Lyrics")
            pTag.appendChild(artist);
            lyricsAndArtistSection.appendChild(pTag);
            getLyricsSection.appendChild(getLyrics);
            
            imageDiv.appendChild(albumImage);
            lyricsContainer.appendChild(imageDiv);
            lyricsContainer.appendChild(lyricsAndArtistSection);
            lyricsContainer.appendChild(getLyricsSection);
            document.getElementById("divContainer").appendChild(lyricsContainer)
            /* Assign value to that elements section ends  */
        }

        /* Show lyrics section starts */

        const getLyrics = document.getElementsByTagName('button')
        for(let j = 0; j<getLyrics.length; j++){
            
            getLyrics[j].addEventListener('click',function(){
            const imgSrc = document.querySelectorAll('img')[j].getAttribute("src");
            let titleName = document.querySelectorAll('h3')[j-3].innerText;
            const artistName = document.querySelectorAll('span')[j-2].innerText;
            document.getElementById("lyricsTitle").innerText = `${artistName}-${titleName}`
            document.getElementById("image").src = imgSrc
          
            fetch(`https://api.lyrics.ovh/v1/${artistName}/${titleName}`)
            .then(res => res.json())
            .then(data => {
                if(typeof data.lyrics == "string"){
                    document.getElementById('lyrics').innerText = data.lyrics
                }
                else{
                    document.getElementById("lyrics").innerText = "Lyrics is not found"
                }
                
            })
           
            document.getElementById("divContainer").innerHTML = ""
            
    })

}
        /* Show lyrics section ends */

    })
    document.getElementById("divContainer").innerHTML= "";
    document.getElementById("lyrics").innerHTML = "";
    document.getElementById("lyricsTitle").innerHTML = "";
    document.getElementById("image").src = "";
    document.getElementById('searchInput').value = ""
})