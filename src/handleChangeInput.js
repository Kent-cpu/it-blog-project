

export const handleChangeInput = (e, setData) => {
    setData(prevData => {
        return {
            ...prevData,
            [e.target.name]: e.target.value,
        };
    });
}