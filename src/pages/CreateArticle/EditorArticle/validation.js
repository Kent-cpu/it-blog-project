
const validation = (postData) => {
    const error = {};

    if (postData.title.length === 0) {
        error.title = "Обязательное поле";
    }

    if(postData.previewText.length === 0){
        error.previewText = "Обязательное поле";
    }

    if (postData.text.length === 0) {
        error.text = "Обязательное поле";
    } else if (postData.text.length <= 50) {
        error.text = "Слишком маленькая статья";
    }

    if (!postData.previewImg.current.files[0]) {
        error.previewImg = "Выберите картинку";
    }

    return error;

}

export default validation;