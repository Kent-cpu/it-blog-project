

const changeImg = (e, imgElement) => {

    if (e.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            imgElement.src = reader.result;
        }
    }
}

export default changeImg;