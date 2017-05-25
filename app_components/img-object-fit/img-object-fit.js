// ObjectFit
function objectFit(img){
    img.style.visibility = 'visible';
    if (document.documentElement.style.objectFit !== undefined)
        img.style.backgroundImage = 'url("' + img.src + '")'; img.style.paddingLeft = '100%';
}
